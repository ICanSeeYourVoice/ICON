package ssafy.icon.commonservice.domain.phrase.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class AddPhraseReq {
	@NotBlank
	@Size(max = 30, message = "문구는 30자 이내여야 합니다.")
	@Pattern(regexp = "^(?=.*[가-힣\\s0-9])(?!.*([ㄱ-ㅎㅏ-ㅣ])).*$")
	private String text;
}
