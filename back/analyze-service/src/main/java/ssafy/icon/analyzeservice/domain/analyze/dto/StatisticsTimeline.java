package ssafy.icon.analyzeservice.domain.analyze.dto;

import java.time.LocalDateTime;

public record StatisticsTimeline(
		String type,
		LocalDateTime cryingDate
) {
}
