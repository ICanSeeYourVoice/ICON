package ssafy.icon.commonservice.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class GetGuardiansDto {
	private Integer id;
	private Integer guestId;
	private String name;
}
