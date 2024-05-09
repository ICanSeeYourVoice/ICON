package ssafy.icon.commonservice.domain.diary.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.icon.commonservice.domain.diary.dto.DiaryDetailResponse;
import ssafy.icon.commonservice.domain.diary.dto.DiaryModifyForm;
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
		@RequestBody @Valid DiaryRegisterForm form
	) {
		diaryService.post(memberId, form);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{diaryId}")
	public ResponseEntity<Void> delete(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@PathVariable("diaryId") Long diaryId
	) {
		diaryService.delete(memberId, diaryId);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/{diaryId}")
	public ResponseEntity<Void> modify(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@PathVariable("diaryId") Long diaryId,
		@RequestBody @Valid DiaryModifyForm form
	) {
		diaryService.modify(memberId, diaryId, form);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<DiaryDetailResponse> queryDetail(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestParam("date") LocalDate date
	) {
		return ResponseEntity.ok(diaryService.queryDetail(memberId, date));
	}

	@GetMapping
	public ResponseEntity<List<DiaryDetailResponse>> queryPeriod(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestParam("start") LocalDate start,
		@RequestParam("end") LocalDate end
	) {
		return ResponseEntity.ok(diaryService.queryPeriod(memberId, start, end));
	}
}

