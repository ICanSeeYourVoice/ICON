package ssafy.icon.commonservice.domain.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.icon.commonservice.domain.member.dto.LoginForm;
import ssafy.icon.commonservice.domain.member.dto.LoginResponse;
import ssafy.icon.commonservice.domain.member.service.AuthService;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

	private final AuthService authService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginForm loginForm) {
		return ResponseEntity.ok(authService.login(loginForm));
	}
}
