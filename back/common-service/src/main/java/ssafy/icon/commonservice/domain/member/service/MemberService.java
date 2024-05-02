package ssafy.icon.commonservice.domain.member.service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ssafy.icon.commonservice.domain.member.dto.AddTokenReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.global.error.exception.MemberException;

@RequiredArgsConstructor
@Service
public class MemberService {

	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;

	public void addMember(SignUpForm form) {
		// 회원 아이디가 이미 있는지
		if (memberRepository.findByUid(form.uid()).isPresent()) {
			throw new MemberException(BAD_REQUEST, "사용중인 ID 입니다.");
		}

		memberRepository.save(Member.builder()
			.uid(form.uid())
			.pw(passwordEncoder.encode(form.pw()))
			.name(form.name())
			.build());
	}

	public void addToken(Integer memberId, AddTokenReq token) {
		// token의 id로 유저 정보 가져오기
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));

		// new token 저장
		member.updateToken(token.getToken(), token.isApp());

		memberRepository.save(member);
	}
}
