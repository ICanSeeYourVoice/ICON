package ssafy.icon.alarmservice.domain.alarm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import ssafy.icon.alarmservice.domain.alarm.service.AlarmService;

@RequiredArgsConstructor
@RequestMapping("/alarms")
@RestController
public class AlarmController {

	private final AlarmService alarmService;

	@PostMapping("/cry")
	public ResponseEntity<Void> sendCry(@RequestHeader("X-Authorization-Id") Integer memberId) {
		alarmService.sendCryMessage(memberId,"CRY");
		return ResponseEntity.ok().build();
	}

}
