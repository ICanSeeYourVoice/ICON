package ssafy.icon.commonservice.domain.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ssafy.icon.commonservice.domain.member.dto.AddTokenReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
import ssafy.icon.commonservice.domain.member.service.MemberService;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

	private final MemberService memberService;

	@PostMapping
	public ResponseEntity<Void> addMember(@RequestBody @Valid SignUpForm form) {
		memberService.addMember(form);
		return ResponseEntity.ok().build();
	}

	@PatchMapping("/fcmtoken")
	public ResponseEntity<Void> addToken(@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody @Valid AddTokenReq token) {
		memberService.addToken(memberId, token);
		return ResponseEntity.ok().build();
	}
}
