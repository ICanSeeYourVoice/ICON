package ssafy.icon.commonservice.domain.diary.service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.icon.commonservice.domain.diary.dto.DiaryRegisterForm;
import ssafy.icon.commonservice.domain.diary.entity.Diary;
import ssafy.icon.commonservice.domain.diary.entity.DiaryImage;
import ssafy.icon.commonservice.domain.diary.repository.DiaryRepository;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.global.error.exception.DiaryException;

@RequiredArgsConstructor
@Service
public class DiaryService {

	private final DiaryRepository diaryRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public void post(Integer memberId, DiaryRegisterForm diaryRegisterForm) {
		if (diaryRepository.existsByMemberIdAndDate(memberId, diaryRegisterForm.date())) {
			throw new DiaryException(BAD_REQUEST, "이미 일지를 작성한 날짜입니다.");
		}

		Member member = memberRepository.getReferenceById(memberId);

		List<DiaryImage> images = diaryRegisterForm.imageUrls().stream()
			.map(DiaryImage::new).toList();

		Diary diary = new Diary(member, diaryRegisterForm.content(), diaryRegisterForm.date());

		images.forEach(diary::addImage);

		diaryRepository.save(diary);
	}
}