package ssafy.icon.commonservice.domain.diary.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import ssafy.icon.commonservice.domain.diary.entity.Diary;
import ssafy.icon.commonservice.domain.diary.entity.DiaryImage;

@JsonNaming(SnakeCaseStrategy.class)
public record DiaryDetailResponse(
	Long diaryId,
	String content,
	LocalDate date,
	List<String> imageUrls
) {

	public static DiaryDetailResponse of(Diary diary) {
		return new DiaryDetailResponse(
			diary.getId(),
			diary.getContent(),
			diary.getDate(),
			diary.getImages().stream().map(DiaryImage::getUrl).toList()
		);
	}

}
