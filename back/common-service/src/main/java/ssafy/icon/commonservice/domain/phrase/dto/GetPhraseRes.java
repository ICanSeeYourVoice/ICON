package ssafy.icon.commonservice.domain.phrase.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class GetPhraseRes {
	@NotBlank
	private Integer id;

	private String text;

}
