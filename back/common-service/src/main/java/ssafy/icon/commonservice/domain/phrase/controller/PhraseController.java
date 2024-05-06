package ssafy.icon.commonservice.domain.phrase.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.commonservice.domain.phrase.dto.AddPhraseReq;
import ssafy.icon.commonservice.domain.phrase.dto.DelPhraseReq;
import ssafy.icon.commonservice.domain.phrase.dto.GetPhraseRes;
import ssafy.icon.commonservice.domain.phrase.service.PhraseService;

@RequiredArgsConstructor
@RequestMapping("/phrase")
@RestController
@Slf4j
public class PhraseController {
	private final PhraseService phraseService;

	@PostMapping
	public ResponseEntity<Void> addPhrase(@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody @Valid AddPhraseReq req){
		phraseService.postPhrase(memberId, req);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<List<GetPhraseRes>> addPhrase(@RequestHeader("X-Authorization-Id") Integer memberId ){
		List<GetPhraseRes> res = phraseService.getPhrase(memberId);
		return ResponseEntity.ok(res);
	}

	@DeleteMapping
	public ResponseEntity<Void> deletePhrase(@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody @Valid DelPhraseReq req){
		phraseService.deletePhrase(memberId, req);
		return ResponseEntity.ok().build();
	}
}
