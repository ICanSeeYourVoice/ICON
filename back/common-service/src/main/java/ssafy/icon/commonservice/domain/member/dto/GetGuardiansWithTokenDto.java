package ssafy.icon.commonservice.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Builder
@ToString
public class GetGuardiansWithTokenDto {
	private Integer id;
	private Integer guestId;
	private String token;
}
