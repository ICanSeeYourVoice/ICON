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
	public ResponseEntity<Void> sendCry(@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody PostAlarmDto req) {
		alarmService.sendCryMessage(memberId,req.getType());
		alarmService.addKafkaBabyCry(memberId, req.getType());
		return ResponseEntity.ok().build();
	}

}
