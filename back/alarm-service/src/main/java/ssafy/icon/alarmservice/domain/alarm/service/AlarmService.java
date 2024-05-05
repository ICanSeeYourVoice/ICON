package ssafy.icon.alarmservice.domain.alarm.service;

import static org.springframework.http.HttpStatus.*;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.alarmservice.domain.alarm.client.AlarmApiClient;
import ssafy.icon.alarmservice.domain.alarm.client.dto.GetMemberApiRes;
import ssafy.icon.alarmservice.global.error.exception.AlarmException;

@RequiredArgsConstructor
@Service
@Slf4j
public class AlarmService {

	private final FirebaseMessaging firebaseMessaging;
	private final AlarmApiClient alarmApiClient;

	public void sendCryMessage(Integer memberId) {
		GetMemberApiRes member = alarmApiClient.getMember(memberId);
		log.info("GetMemberApiRes : {}", member.toString());
		if(member.getWebToken().isEmpty()){
			throw new AlarmException(BAD_REQUEST, "회원의 fcm 토큰이 존재하지 않습니다.");
		}

		Notification noti = Notification.builder()
			.setTitle("울음 감지")
			.setBody("아기가 울고 있어요!")
			.build();

		Message msg = Message.builder()
			.setToken(member.getWebToken())
			.setNotification(noti)
			.build();

		try {
			firebaseMessaging.send(msg);
		} catch (FirebaseMessagingException e) {
			throw new RuntimeException(e);
		}

	}

	// 울음 종류 : CRY, TIRED, HUNGRY, DISCOMFORT, DANGER, PAIN
	public void sendAnalyzeMessage(Integer memberId, String type) {
		GetMemberApiRes member = alarmApiClient.getMember(memberId);
		log.info("GetMemberApiRes : {}", member.toString());
		if(member.getWebToken().isEmpty()){
			throw new AlarmException(BAD_REQUEST, "회원의 fcm 토큰이 존재하지 않습니다.");
		}

		Notification noti = Notification.builder()
			.setTitle("울음 분석 완료!")
			.setBody("아기가 울고 있어요!")
			.build();

		Message msg = Message.builder()
			.setToken(member.getWebToken())
			.setNotification(noti)
			.build();

		try {
			firebaseMessaging.send(msg);
		} catch (FirebaseMessagingException e) {
			throw new RuntimeException(e);
		}

	}
}
