package ssafy.icon.analyzeservice.domain.analyze.dto;

public record KafkaAlarm(
	Integer memberId,
	String cryReason
) {
	public KafkaAlarm(Integer memberId, String cryReason) {
		this.memberId = memberId;
		this.cryReason = cryReason;
	}
}
