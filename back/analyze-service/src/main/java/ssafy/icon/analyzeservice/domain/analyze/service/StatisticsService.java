package ssafy.icon.analyzeservice.domain.analyze.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.dto.CryReasonCount;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsResponse;
import ssafy.icon.analyzeservice.domain.analyze.repository.AnalyzeRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class StatisticsService {


	private final AnalyzeRepository analyzeRepository;

	public StatisticsResponse getCryReasonStatistics() {
		List<CryReasonCount> counts = analyzeRepository.countByCryReason();
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
}
