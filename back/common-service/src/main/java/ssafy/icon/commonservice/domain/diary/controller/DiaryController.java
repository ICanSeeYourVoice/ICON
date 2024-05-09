package ssafy.icon.commonservice.domain.diary.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

	@DeleteMapping
	public ResponseEntity<Void> delete(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestParam("date") LocalDate date
	) {
		diaryService.delete(memberId, date);
		return ResponseEntity.ok().build();
	}

	@PutMapping
	public ResponseEntity<Void> modify(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestParam("date") LocalDate date,
		@RequestBody @Valid DiaryModifyForm form
	) {
		diaryService.modify(memberId, date, form);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<DiaryDetailResponse> queryDetail(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestParam("date") LocalDate date
	) {
		return ResponseEntity.ok(diaryService.queryDetail(memberId, date));
	}

	@GetMapping("/calendar")
	public ResponseEntity<List<DiaryDetailResponse>> queryPeriod(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestParam("start") LocalDate start,
		@RequestParam("end") LocalDate end
	) {
		return ResponseEntity.ok(diaryService.queryPeriod(memberId, start, end));
	}
}

