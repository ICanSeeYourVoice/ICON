package ssafy.icon.alarmservice.domain.alarm.client.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GetGuardianApiRes {
	private Integer id;
	private Integer guestId;
	private String token;
}
