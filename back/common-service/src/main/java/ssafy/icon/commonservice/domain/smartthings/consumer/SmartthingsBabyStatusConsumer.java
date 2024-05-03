package ssafy.icon.commonservice.domain.smartthings.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import ssafy.icon.commonservice.domain.smartthings.client.SmartthingsApiClient;
import ssafy.icon.commonservice.domain.smartthings.dto.BabyStatusInfo;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsRoutine;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsToken;
import ssafy.icon.commonservice.domain.smartthings.repository.SmartthingsRoutineRepository;
import ssafy.icon.commonservice.domain.smartthings.repository.SmartthingsTokenRepository;
import ssafy.icon.commonservice.global.error.exception.SmartThingsException;

@Slf4j
@RequiredArgsConstructor
@Component
public class SmartthingsBabyStatusConsumer {

	private final ObjectMapper objectMapper;
	private final SmartthingsApiClient smartthingsApiClient;
	private final SmartthingsRoutineRepository smartthingsRoutineRepository;
	private final SmartthingsTokenRepository smartthingsTokenRepository;
	private static final String BEARER = "Bearer ";
	
	@KafkaListener(topics = "baby-status", groupId = "smartthings-routine")
	public void activateBabyStatusRoutine(String message) {
		activateRoutine(message);
	}

	@KafkaListener(topics = "baby-cry", groupId = "smartthings-routine")
	public void activateCryRoutine(String message) {
		activateRoutine(message);
	}

	private void activateRoutine(String message) {
		try {
			BabyStatusInfo babyStatusInfo = objectMapper.readValue(message, BabyStatusInfo.class);

			List<SmartthingsRoutine> routines = smartthingsRoutineRepository.findAllByMemberId(
				babyStatusInfo.memberId());

			SmartthingsToken smartthingsToken = smartthingsTokenRepository.findByMemberId(
					babyStatusInfo.memberId())
				.orElseThrow(
					() -> new SmartThingsException(HttpStatus.BAD_REQUEST, "토큰이 존재하지 않습니다."));

			routines.stream().filter(
					routine -> routine.getTriggerType().name().equals(babyStatusInfo.cryReason()))
				.forEach(
					routine -> smartthingsApiClient.executeRoutine(routine.getSceneId(),
						BEARER + smartthingsToken.getToken()));
		} catch (JsonProcessingException e) {
			throw new SmartThingsException(HttpStatus.INTERNAL_SERVER_ERROR, "매핑 오류 발생");
		}
	}

}
