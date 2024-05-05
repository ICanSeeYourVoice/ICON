package ssafy.icon.alarmservice.global.kafka;

import java.util.HashMap;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

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

	private final ObjectMapper objectMapper = new ObjectMapper();

	@KafkaListener(topics = "baby-status", groupId = "alarm")
	public void sendAlarmFromKafka(String message) {
		log.info("message from kafka : {}", message);
		try {
			Map<String, Object> map = objectMapper.readValue(message, new TypeReference<Map<String, Object>>() {
			});
			log.info("Processed map from Kafka message: {}", map);
		} catch (JsonProcessingException ex) {
			ex.printStackTrace();
		}
	}
}
