package ssafy.icon.commonservice.domain.member.controller;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import ssafy.icon.commonservice.domain.member.dto.AddGuardianReq;
import ssafy.icon.commonservice.domain.member.dto.GetGuardiansDto;
import ssafy.icon.commonservice.domain.member.dto.GetGuardiansWithTokenDto;
import ssafy.icon.commonservice.domain.member.dto.PostTTSReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
import ssafy.icon.commonservice.domain.member.entity.Guardian;
import ssafy.icon.commonservice.domain.member.service.MemberService;
import ssafy.icon.commonservice.domain.smartthings.dto.GetMemberDto;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
@Slf4j
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

	@PostMapping(value = "/tts", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<byte[]> postTTS(
		@RequestBody @Valid PostTTSReq request
	) {

		byte[] mp3 = memberService.postTTS(request);
		if (mp3 != null) {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM); // MP3 파일의 Content-Type 설정
			headers.setContentDispositionFormData("filename", "output.mp3"); // 다운로드되는 파일의 이름 설정

			return new ResponseEntity<>(mp3, headers, HttpStatus.OK);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping("/guardian")
	public ResponseEntity<Void> addGuardian(@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody AddGuardianReq req) {
		memberService.addGuardian(memberId, req);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/guardian/{guardianId}")
	public ResponseEntity<Void> deleteGuardian(@RequestHeader("X-Authorization-Id") Integer memberId,
		@PathVariable Integer guardianId) {
		memberService.deleteGuardian(memberId, guardianId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/guardian")
	public ResponseEntity<List<GetGuardiansDto>> getGuardian(@RequestHeader("X-Authorization-Id") Integer memberId) {
		List<GetGuardiansDto> guardians = memberService.getGuardian(memberId);
		return ResponseEntity.ok(guardians);
	}

	@GetMapping("/guardian/token")
	public ResponseEntity<List<GetGuardiansWithTokenDto>> getGuardianWithToken(@RequestHeader("X-Authorization-Id") Integer memberId) {
		List<GetGuardiansWithTokenDto> guardians = memberService.getGuardianWithToken(memberId);
		return ResponseEntity.ok(guardians);
	}
}
