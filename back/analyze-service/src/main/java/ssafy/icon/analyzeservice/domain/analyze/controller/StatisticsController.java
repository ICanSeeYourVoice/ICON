package ssafy.icon.analyzeservice.domain.analyze.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsResponse;
import ssafy.icon.analyzeservice.domain.analyze.service.StatisticsService;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/statistics")
public class StatisticsController {
	private final StatisticsService statisticsService;

	@GetMapping
	public ResponseEntity<StatisticsResponse> getStatistics() {
		return ResponseEntity.ok(statisticsService.getCryReasonStatistics());
	}

	// @GetMapping("/details")
	// public ResponseEntity<StatisticsResponse> getStatisticsDetail() {
	//
	// }
}
