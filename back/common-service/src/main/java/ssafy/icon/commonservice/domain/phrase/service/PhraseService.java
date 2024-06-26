package ssafy.icon.commonservice.domain.phrase.service;

import static org.springframework.http.HttpStatus.*;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.domain.phrase.dto.AddPhraseReq;
import ssafy.icon.commonservice.domain.phrase.dto.GetPhraseRes;
import ssafy.icon.commonservice.domain.phrase.entity.Phrase;
import ssafy.icon.commonservice.domain.phrase.repository.PhraseRepository;
import ssafy.icon.commonservice.global.error.exception.MemberException;
import ssafy.icon.commonservice.global.error.exception.PhraseException;

@RequiredArgsConstructor
@Service
@Slf4j
public class PhraseService {

	private final PhraseRepository phraseRepository;
	private final MemberRepository memberRepository;

	public void postPhrase(Integer memberId, AddPhraseReq req) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		log.info("member : {}", member);

		// phrase가 3개인 경우 저장 x
		int existCount = phraseRepository.countByMemberId(memberId);
		if (existCount >= 3) {
			throw new PhraseException(BAD_REQUEST, "문구 등록은 3개까지 가능합니다.");
		}

		phraseRepository.save(Phrase.builder()
			.text(req.getText())
			.member(member).build());
	}

	public List<GetPhraseRes> getPhrase(Integer memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		log.info("member : {}", member);

		List<Phrase> phrases = phraseRepository.findByMemberId(memberId);

		List<GetPhraseRes> res = new ArrayList<>();
		for (Phrase phrase : phrases) {
			res.add(GetPhraseRes.builder()
				.id(phrase.getId())
				.text(phrase.getText())
				.build());
		}

		return res;
	}

	public void deletePhrase(Integer memberId, Integer phraseId) {
		Phrase phrase = phraseRepository.findById(phraseId).orElseThrow(
			() -> new PhraseException(BAD_REQUEST, "존재하지 않는 문구입니다."));
		log.info("phrase : {}", phrase);

		if(phrase.getMember().getId() != memberId){
			throw new PhraseException(BAD_REQUEST, "회원 ID가 일치하지 않습니다.");
		}

		phraseRepository.delete(phrase);
	}
}
