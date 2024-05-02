package ssafy.icon.commonservice.domain.member.controller;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.nio.file.Files;
import java.nio.file.Path;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import ssafy.icon.commonservice.domain.member.dto.PostTTSReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
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
	public ResponseEntity<Resource> postTTS(
		@RequestHeader("X-NCP-APIGW-API-KEY-ID") String apiKeyId,
		@RequestHeader("X-NCP-APIGW-API-KEY") String apiKey,
		// @RequestHeader("Content-Type") String contentType,
		@RequestBody @Valid PostTTSReq request
	) throws IOException {

		File cc = memberService.postTTS(apiKeyId, apiKey, request);

		if (cc != null) {
			// 파일을 Resource로 변환
			Path path = cc.toPath();
			Resource resource = new InputStreamResource(Files.newInputStream(path));

			// 파일 다운로드를 위한 헤더 설정
			String mimeType = Files.probeContentType(path);
			mimeType = mimeType == null ? "application/octet-stream" : mimeType;

			return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(mimeType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + cc.getName() + "\"")
				.body(resource);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
