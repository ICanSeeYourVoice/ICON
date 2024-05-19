package ssafy.icon.alarmservice.domain.alarm.client.dto;

public record KafkaProducerDto(
	Integer memberId,
	String cryReason
) {
}
