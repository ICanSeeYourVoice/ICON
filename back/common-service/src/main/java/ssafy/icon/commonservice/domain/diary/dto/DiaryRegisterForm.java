package ssafy.icon.commonservice.domain.diary.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@JsonNaming(SnakeCaseStrategy.class)
public record DiaryRegisterForm(
	@NotBlank
	String content,
	LocalDate date,
	@Size(min = 1, max = 6, message = "사진은 최소 1장에서 최대 6장까지 등록 가능합니다.")
	List<String> imageUrls
) {

}
