package ssafy.icon.analyzeservice.domain.analyze.controller;

import java.io.IOException;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.client.ColabApiClient;
import ssafy.icon.analyzeservice.domain.analyze.client.dto.AnalyzeResult;
import ssafy.icon.analyzeservice.domain.analyze.dto.AnalyzeResponse;
import ssafy.icon.analyzeservice.domain.analyze.service.AnalyzeService;
import ssafy.icon.analyzeservice.global.kafka.KafkaBabyStatusProducer;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/analyze")
public class CryAnalyzeController {

	private final AnalyzeService analyzeService;

	@PostMapping("/predict")
	public ResponseEntity<AnalyzeResponse> cryAnalyze(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody MultipartFile babyCryingAudio
	) {
		String cryReason = analyzeService.getCryReason(memberId, babyCryingAudio);
		AnalyzeResponse analyzeResponse = new AnalyzeResponse(cryReason);
		return ResponseEntity.ok(analyzeResponse);
	}
}
