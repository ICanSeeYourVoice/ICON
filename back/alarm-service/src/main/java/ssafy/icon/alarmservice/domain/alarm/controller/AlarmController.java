package ssafy.icon.alarmservice.domain.alarm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import ssafy.icon.alarmservice.domain.alarm.client.dto.KafkaProducerDto;
import ssafy.icon.alarmservice.domain.alarm.dto.PostAlarmDto;
import ssafy.icon.alarmservice.domain.alarm.service.AlarmService;
import ssafy.icon.alarmservice.global.kafka.KafkaBabyCryProducer;

@RequiredArgsConstructor
@RequestMapping("/alarms")
@RestController
public class AlarmController {

	private final AlarmService alarmService;

	@PostMapping()
	public ResponseEntity<String> sendCry(@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody PostAlarmDto req) {
		alarmService.addKafkaBabyCry(memberId, req.getType());
		if(alarmService.sendCryMessage(memberId,req.getType()))
			return ResponseEntity.ok().build();
		else
			return ResponseEntity.ok("App 토큰이 만료되었습니다.");
	}

}
