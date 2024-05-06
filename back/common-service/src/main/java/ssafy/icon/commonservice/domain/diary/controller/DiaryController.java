package ssafy.icon.commonservice.domain.diary.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.icon.commonservice.domain.diary.dto.DiaryRegisterForm;
import ssafy.icon.commonservice.domain.diary.service.DiaryService;

@RequiredArgsConstructor
@RequestMapping("/diaries")
@RestController
public class DiaryController {

	private final DiaryService diaryService;

	@PostMapping
	public ResponseEntity<Void> post(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody DiaryRegisterForm form
	) {
		diaryService.post(memberId, form);
		return ResponseEntity.ok().build();
	}

}

