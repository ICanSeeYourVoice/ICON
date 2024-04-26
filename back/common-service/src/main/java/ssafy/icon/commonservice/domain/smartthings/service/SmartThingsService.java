package ssafy.icon.commonservice.domain.smartthings.service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.domain.smartthings.client.SmartthingsApiClient;
import ssafy.icon.commonservice.domain.smartthings.client.dto.GetDevicesApiResponse;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsToken;
import ssafy.icon.commonservice.domain.smartthings.repository.SmartthingsTokenRepository;
import ssafy.icon.commonservice.global.error.exception.MemberException;
import ssafy.icon.commonservice.global.error.exception.SmartThingsException;

@Slf4j
@RequiredArgsConstructor
@Service
public class SmartThingsService {

	private final SmartthingsTokenRepository smartthingsTokenRepository;
	private final SmartthingsApiClient smartthingsApiClient;
	private final MemberRepository memberRepository;

	@Transactional
	public void registerPersonalToken(String token, Integer memberId) {
		// 토큰 검증
		GetDevicesApiResponse devices =
			smartthingsApiClient.getDevices("Bearer " + token);

		if (smartthingsTokenRepository.existsByToken(token)) {
			throw new SmartThingsException(BAD_REQUEST, "이미 등록되어있는 토큰입니다.");
		}

		Optional<SmartthingsToken> optionalToken = smartthingsTokenRepository.findByMemberId(
			memberId);

		// 이미 등록된 토큰인지 체크
		if (optionalToken.isPresent()) {
			SmartthingsToken smartthingsToken = optionalToken.get();

			smartthingsToken.changeToken(token);
		} else {
			Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않는 회원입니다."));

			smartthingsTokenRepository.save(new SmartthingsToken(member, token));
		}

	}

}
