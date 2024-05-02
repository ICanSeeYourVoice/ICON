package ssafy.icon.commonservice.domain.smartthings.service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.domain.smartthings.client.SmartthingsApiClient;
import ssafy.icon.commonservice.domain.smartthings.client.dto.GetDevicesApiResponse;
import ssafy.icon.commonservice.domain.smartthings.client.dto.GetScenesApiResponse;
import ssafy.icon.commonservice.domain.smartthings.dto.RegisterRoutineRequest;
import ssafy.icon.commonservice.domain.smartthings.dto.RoutineInfo;
import ssafy.icon.commonservice.domain.smartthings.dto.SceneInfo;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsRoutine;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsToken;
import ssafy.icon.commonservice.domain.smartthings.repository.SmartthingsRoutineRepository;
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
	private final SmartthingsRoutineRepository smartthingsRoutineRepository;

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

	public List<SceneInfo> getRoutines(Integer memberId) {

		SmartthingsToken smartthingsToken = smartthingsTokenRepository.findByMemberId(memberId)
			.orElseThrow(() -> new SmartThingsException(BAD_REQUEST, "스마트싱스 토큰이 없습니다."));

		GetScenesApiResponse scenes = smartthingsApiClient.getScenes(
			"Bearer " + smartthingsToken.getToken());

		return SceneInfo.ofList(scenes);
	}

	@Transactional
	public void registerRoutine(RegisterRoutineRequest request, Integer memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않는 회원입니다."));

		Optional<SmartthingsRoutine> optionalRoutine =
			smartthingsRoutineRepository.findByTriggerTypeAndMemberId(request.trigger(), memberId);

		if (optionalRoutine.isEmpty()) {
			SmartthingsRoutine routine = new SmartthingsRoutine(member,
				request.trigger(), request.sceneId());

			smartthingsRoutineRepository.save(routine);
		} else {
			optionalRoutine.get().changeScene(request.sceneId());
		}
	}

	@Transactional
	public List<RoutineInfo> getRegisterRoutines(Integer memberId) {

		List<SceneInfo> routines = getRoutines(memberId);

		List<SmartthingsRoutine> registerRoutines =
			smartthingsRoutineRepository.findAllByMemberId(memberId);

		ArrayList<RoutineInfo> result = new ArrayList<>();

		// 없는 것은 제거
		registerRoutines.forEach(routine -> {
			boolean isExists = false;
			SceneInfo tempScene = null;
			for (SceneInfo scene : routines) {
				if (routine.getSceneId().equals(scene.getSceneId())) {
					isExists = true;
					result.add(new RoutineInfo(scene.getName(), routine.getSceneId(),
						routine.getTriggerType()));
					break;
				}
			}

			if (!isExists) {
				smartthingsRoutineRepository.delete(routine);
			}
		});

		return result;
	}

}
