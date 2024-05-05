package ssafy.icon.commonservice.domain.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record LoginForm(

	@NotBlank
	@Size(min = 5, max = 12, message = "ID는 5~12자 내여야 합니다.")
	@Pattern(regexp = "^[a-zA-Z0-9]*$", message = "알파벳 대소문자나 숫자만 입력 가능합니다.")
	String uid,

	@NotBlank
	@Size(min = 5, max = 12, message = "비밀번호는 5~12자 내여야 합니다.")
	@Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()]*$")
	String pw,

	@NotBlank
	String token,

	boolean isApp
	) {

}
