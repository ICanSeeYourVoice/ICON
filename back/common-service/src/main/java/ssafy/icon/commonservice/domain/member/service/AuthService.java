package ssafy.icon.commonservice.domain.member.service;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ssafy.icon.commonservice.domain.member.dto.LoginForm;
import ssafy.icon.commonservice.domain.member.dto.LoginResponse;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.global.error.exception.MemberException;
import ssafy.icon.commonservice.global.util.jwt.JwtTokenProvider;

@RequiredArgsConstructor
@Service
public class AuthService {

	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final JwtTokenProvider tokenProvider;

	public LoginResponse login(LoginForm form) {
		Member loginMember = memberRepository.findByUid(form.uid())
			.orElseThrow(() -> new MemberException(NOT_FOUND, "아이디나 비밀번호가 틀립니다."));

		if (!passwordEncoder.matches(form.pw(), loginMember.getPw())) {
			throw new MemberException(UNAUTHORIZED, "아이디나 비밀번호가 틀립니다.");
		}

		return LoginResponse.builder()
			.accessToken(tokenProvider.issueAccessToken(loginMember.getId()))
			.build();
	}
}
