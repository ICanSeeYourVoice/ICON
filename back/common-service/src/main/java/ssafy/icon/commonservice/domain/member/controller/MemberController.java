package ssafy.icon.commonservice.domain.member.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ssafy.icon.commonservice.domain.member.dto.AddTokenReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.service.MemberService;
import ssafy.icon.commonservice.domain.smartthings.dto.GetMemberDto;

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


	@GetMapping
	public GetMemberDto getMember(@RequestHeader("X-Authorization-Id") Integer memberId) {
		GetMemberDto dto = memberService.getMember(memberId); 
		return dto;
	}
}
