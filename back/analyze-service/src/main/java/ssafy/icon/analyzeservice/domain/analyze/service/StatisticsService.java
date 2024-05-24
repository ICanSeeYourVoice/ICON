package ssafy.icon.analyzeservice.domain.analyze.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.document.BabyStatus;
import ssafy.icon.analyzeservice.domain.analyze.dto.CryReasonCount;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsDetailResponse;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsResponse;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsTimeline;
import ssafy.icon.analyzeservice.domain.analyze.repository.AnalyzeRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsService {


	private final AnalyzeRepository analyzeRepository;

	// 통계보기(기본)
	public StatisticsResponse getCryReasonStatistics(Integer memberId, LocalDate date) {
		LocalDateTime startDateTime = LocalDateTime.of(date, LocalTime.MIN).minusHours(9);
		LocalDateTime endDateTime = LocalDateTime.of(date.plusDays(1), LocalTime.MIN).minusHours(9);

		log.info("조회 시작 : " + startDateTime);
		log.info("조회 끝: " + endDateTime);
		log.info("memberId : " + memberId);
		//UTC 시간 + 9시간 = 서울 시간
		List<CryReasonCount> counts = analyzeRepository.countByCryReason(memberId, startDateTime, endDateTime);

		int hungryCount = 0, tiredCount = 0, painCount = 0, discomfortCount = 0;
		for (CryReasonCount count : counts) {
			switch (count.id()) {
				case "HUNGRY":
					hungryCount = count.count();
					break;
				case "TIRED":
					tiredCount = count.count();
					break;
				case "PAIN":
					painCount = count.count();
					break;
				case "DISCOMFORT":
					discomfortCount = count.count();
					break;
			}
		}

		int totalCount = hungryCount + tiredCount + painCount + discomfortCount;
		return new StatisticsResponse(totalCount, hungryCount, tiredCount, painCount, discomfortCount);
	}

	//통계보기(타임라인 포함)
	public StatisticsDetailResponse getCryReasonStatisticsWithTimeline(Integer memberId, LocalDate date) {
		LocalDateTime startDateTime = LocalDateTime.of(date, LocalTime.MIN).minusHours(9);
		LocalDateTime endDateTime = LocalDateTime.of(date.plusDays(1), LocalTime.MIN).minusHours(9);

		log.info("조회 시작 : " + startDateTime);
		log.info("조회 끝: " + endDateTime);
		log.info("memberId : " + memberId);
		//UTC 시간 + 9시간 = 서울 시간
		List<BabyStatus> babyStatusList = analyzeRepository.findAllByDate(memberId, startDateTime, endDateTime);
		List<StatisticsTimeline> timelines = new ArrayList<>();

		int hungryCount = 0, tiredCount = 0, painCount = 0, discomfortCount = 0;
		for (BabyStatus babyStatus : babyStatusList) {
			timelines.add(new StatisticsTimeline(babyStatus.getCryReason(), babyStatus.getCreatedAt().plusHours(9).format(DateTimeFormatter.ofPattern("a hh:mm"))));
			switch (babyStatus.getCryReason()) {
				case "HUNGRY":
					hungryCount ++;
					break;
				case "TIRED":
					tiredCount ++;
					break;
				case "PAIN":
					painCount ++;
					break;
				case "DISCOMFORT":
					discomfortCount ++;
					break;
			}
		}

		int totalCount = hungryCount + tiredCount + painCount + discomfortCount;
		return new StatisticsDetailResponse(new StatisticsResponse(totalCount, hungryCount, tiredCount, painCount, discomfortCount), timelines);
	}

}
