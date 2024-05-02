package ssafy.icon.alarmservice.domain.alarm.service;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.alarmservice.domain.alarm.client.AlarmApiClient;
import ssafy.icon.alarmservice.domain.alarm.client.dto.GetMemberApiRes;

@RequiredArgsConstructor
@Service
@Slf4j
public class AlarmService {

	private final FirebaseMessaging firebaseMessaging;
	private final AlarmApiClient alarmApiClient;

	public void sendCryMessage(Integer memberId) {
		GetMemberApiRes member = alarmApiClient.getMember(memberId);
		log.info("GetMemberApiRes : {}", member.toString());
		Notification noti = Notification.builder()
			.setTitle("아기가 울고 있어요!")
			.setBody("아기가 울고 있어요엉엉엉엉")
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
