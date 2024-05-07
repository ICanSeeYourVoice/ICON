package ssafy.icon.alarmservice.global.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ssafy.icon.alarmservice.domain.alarm.client.dto.KafkaProducerDto;

@Slf4j
@RequiredArgsConstructor
@Component
public class KafkaBabyCryProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;
	private final ObjectMapper objectMapper;

	public void send(String topic, KafkaProducerDto data) {
		log.info("kafka producer baby-cry add : {}", data.toString());
		try {
			String jsonString = objectMapper.writeValueAsString(data);
			kafkaTemplate.send(topic, jsonString);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

}
