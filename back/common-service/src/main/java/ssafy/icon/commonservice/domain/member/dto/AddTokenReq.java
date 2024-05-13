package ssafy.icon.commonservice.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class AddTokenReq {
	private String token;
	private boolean isApp;
}