package ssafy.icon.alarmservice.domain.alarm.client.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GetMemberApiRes {

	private Integer id;
	private String uid;
	private String name;
	private String webToken;
	private String appToken;
}
