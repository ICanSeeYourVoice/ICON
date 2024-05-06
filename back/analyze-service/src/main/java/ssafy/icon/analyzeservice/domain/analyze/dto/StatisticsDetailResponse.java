package ssafy.icon.analyzeservice.domain.analyze.dto;

import java.util.List;

public record StatisticsDetailResponse(
	StatisticsResponse statisticsResponse,
	List<StatisticsTimeline> timeline
) {
}
