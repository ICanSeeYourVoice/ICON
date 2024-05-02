package ssafy.icon.analyzeservice.domain.cry.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.icon.analyzeservice.global.kafka.KafkaBabyStatusProducer;

@RequiredArgsConstructor
@RestController
public class CryAnalyzeController {

	private final KafkaBabyStatusProducer kafkaBabyStatusProducer;

	@GetMapping("/test")
	public ResponseEntity<String> test() {

		kafkaBabyStatusProducer.send("test", "I feel good");

		return ResponseEntity.ok("good");
	}
}
