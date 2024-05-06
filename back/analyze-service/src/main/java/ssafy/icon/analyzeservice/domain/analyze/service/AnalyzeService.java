package ssafy.icon.analyzeservice.domain.analyze.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.Map.Entry;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.client.ColabApiClient;
import ssafy.icon.analyzeservice.domain.analyze.client.dto.AnalyzeResult;
import ssafy.icon.analyzeservice.domain.analyze.document.BabyStatus;
import ssafy.icon.analyzeservice.domain.analyze.dto.KafkaAlarm;
import ssafy.icon.analyzeservice.domain.analyze.repository.AnalyzeRepository;
import ssafy.icon.analyzeservice.global.error.exception.AnalyzeException;
import ssafy.icon.analyzeservice.global.kafka.KafkaBabyStatusProducer;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnalyzeService {

	private final ColabApiClient colabApiClient;
	private final KafkaBabyStatusProducer kafkaBabyStatusProducer;
	private final AnalyzeRepository analyzeRepository;

	//울음 분석
	public String getCryReason(Integer memberId, MultipartFile babyCryingAudio) {
		AnalyzeResult analyzeResult = getAnalyzeResult(babyCryingAudio);
		String cryReason = getKey(analyzeResult).toUpperCase();
		addAlarm(memberId, cryReason);
		saveAnalyze(memberId, cryReason);
		return cryReason;
	}

	//울음 분석 결과 가져오기
	private AnalyzeResult getAnalyzeResult(MultipartFile babyCryingAudio) {
		AnalyzeResult analyzeResult = null;
		try{
			analyzeResult = colabApiClient.getAnalyze(babyCryingAudio);
		} catch (Exception e) {
			e.printStackTrace();
			throw new AnalyzeException(HttpStatus.BAD_REQUEST, "분석에 실패했습니다.");
		}
		return analyzeResult;
	}

	//울음 분석 결과에서 이유만 뽑기
	private static String getKey(AnalyzeResult analyzeResult) {
		Entry<String, Double> max = Collections.max(analyzeResult.prediction().entrySet(), Entry.comparingByValue());
		return max.getKey();
	}


	//울음 분석 결과 저장
	protected void saveAnalyze(Integer memberId, String cryReason) {
		analyzeRepository
			.save(new BabyStatus(memberId, cryReason, LocalDateTime.now()));
	}

	//울음 분석 결과 카프카에 저장
	private void addAlarm(Integer memberId, String cryReason) {
		kafkaBabyStatusProducer.send("baby-status", new KafkaAlarm(memberId, cryReason));
	}
}
