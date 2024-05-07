package ssafy.icon.commonservice.domain.diary.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.domain.diary.entity.Diary;
import ssafy.icon.commonservice.domain.diary.entity.DiaryImage;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@JsonNaming(SnakeCaseStrategy.class)
public class DiaryModifyForm {

	@NotBlank
	private String content;
	@NotNull
	private LocalDate date;
	@Size(min = 1, max = 6, message = "사진은 최소 1장에서 최대 6장까지 등록 가능합니다.")
	private List<String> imageUrls;
}
