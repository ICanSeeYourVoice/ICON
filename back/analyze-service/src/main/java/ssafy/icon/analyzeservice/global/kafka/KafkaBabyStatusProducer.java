package ssafy.icon.analyzeservice.global.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.analyzeservice.domain.analyze.dto.KafkaAlarm;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class KafkaBabyStatusProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;
	private final ObjectMapper objectMapper;

	public void send(String topic, KafkaAlarm data) {
		ObjectMapper objectMapper = new ObjectMapper();
		// 객체를 JSON 문자열로 직렬화
		try {
			String jsonString = objectMapper.writeValueAsString(data);
			kafkaTemplate.send(topic, jsonString);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

}
