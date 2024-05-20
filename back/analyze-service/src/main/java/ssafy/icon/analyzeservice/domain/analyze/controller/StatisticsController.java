package ssafy.icon.analyzeservice.domain.analyze.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsDetailResponse;
import ssafy.icon.analyzeservice.domain.analyze.dto.StatisticsResponse;
import ssafy.icon.analyzeservice.domain.analyze.service.StatisticsService;

import java.time.LocalDate;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/statistics")
public class StatisticsController {
	private final StatisticsService statisticsService;

	@GetMapping
	public ResponseEntity<StatisticsResponse> getStatistics(
			@RequestHeader("X-Authorization-Id") Integer memberId,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate statisticsDate
	) {
		return ResponseEntity.ok(statisticsService.getCryReasonStatistics(memberId, statisticsDate));
	}

	 @GetMapping("/details")
	 public ResponseEntity<StatisticsDetailResponse> getStatisticsDetail(
			 @RequestHeader("X-Authorization-Id") Integer memberId,
			 @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate statisticsDate
	 ) {
		 return ResponseEntity.ok(statisticsService.getCryReasonStatisticsWithTimeline(memberId, statisticsDate));
	 }
}
