package ssafy.icon.analyzeservice.domain.analyze.client.dto;

import java.util.Map;

public record AnalyzeResult(
	Map<String, Double> prediction
) {
}
