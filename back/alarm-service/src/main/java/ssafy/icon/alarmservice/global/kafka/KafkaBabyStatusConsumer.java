package ssafy.icon.alarmservice.global.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaBabyStatusConsumer {

	// @KafkaListener(topics = "test", groupId = "con2")
	// public void test(String message) {
	// 	log.info("전달받은 메시지 : {}",message);
	//
	// }

	@KafkaListener(topics = "baby-status", groupId = "alarm")
	public void tesddt(String message) {
		log.info("전달받은 메시지 : {}",message);

	}
}
