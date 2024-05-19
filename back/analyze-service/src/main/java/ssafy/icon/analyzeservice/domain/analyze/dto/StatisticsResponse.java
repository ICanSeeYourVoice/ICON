package ssafy.icon.analyzeservice.domain.analyze.dto;

public record StatisticsResponse(
	Integer total,
	Integer HUNGRY,
	Integer TIRED,
	Integer PAIN,
	Integer DISCOMFORT
) {
}
