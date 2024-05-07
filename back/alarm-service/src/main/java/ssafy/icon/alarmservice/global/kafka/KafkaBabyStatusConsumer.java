package ssafy.icon.alarmservice.global.kafka;

import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import ssafy.icon.alarmservice.domain.alarm.service.AlarmService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@Component
@Service
public class KafkaBabyStatusConsumer {
	@Autowired
	private AlarmService alarmService;
	private final ObjectMapper objectMapper = new ObjectMapper();


	@KafkaListener(topics = "baby-status", groupId = "alarm-consumer")
	public void sendAlarmFromKafka(String message) {

		log.info("message from kafka : {}", message);
		try {
			Map<String, Object> map = objectMapper.readValue(message, new TypeReference<Map<String, Object>>() {
			});
			log.info("Processed map from Kafka message: {}", map);
			alarmService.sendCryMessage((Integer)map.get("memberId"), map.get("cryReason").toString());
			log.info("메세지 전송 완료!");
		} catch (JsonProcessingException ex) {
			ex.printStackTrace();
		}
	}
}
