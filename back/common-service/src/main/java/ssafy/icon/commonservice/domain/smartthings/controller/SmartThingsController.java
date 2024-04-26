package ssafy.icon.commonservice.domain.smartthings.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.icon.commonservice.domain.smartthings.dto.RegisterTokenRequest;
import ssafy.icon.commonservice.domain.smartthings.service.SmartThingsService;

@RequiredArgsConstructor
@RequestMapping("/smart-things")
@RestController
public class SmartThingsController {

	private final SmartThingsService smartThingsService;

	@PostMapping("/token")
	public ResponseEntity<Void> registerToken(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody @Valid RegisterTokenRequest request
	) {
		smartThingsService.registerPersonalToken(request.token(), memberId);
		return ResponseEntity.ok().build();
	}

}
