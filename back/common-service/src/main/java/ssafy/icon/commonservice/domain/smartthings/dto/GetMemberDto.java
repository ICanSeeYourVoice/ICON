package ssafy.icon.commonservice.domain.smartthings.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@Getter
@Builder
@ToString
public class GetMemberDto {
	private Integer id;
	private String uid;
	private String name;
	private String webToken;
	private String appToken;
}
