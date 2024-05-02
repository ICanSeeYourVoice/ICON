package ssafy.icon.analyzeservice.domain.analyze.dto;

public record KafkaAlarm(
	Integer MEMBERID,
	String CRYREASON
) {
	public KafkaAlarm(Integer MEMBERID, String CRYREASON) {
		this.MEMBERID = MEMBERID;
		this.CRYREASON = CRYREASON.toLowerCase();
	}
}
