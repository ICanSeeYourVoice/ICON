package ssafy.icon.commonservice.domain.smartthings.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import ssafy.icon.commonservice.domain.smartthings.client.dto.GetScenesApiResponse;

@JsonNaming(SnakeCaseStrategy.class)
@AllArgsConstructor
@Getter
@Builder
public class SceneInfo {

	private String name;
	private String sceneId;

	public static List<SceneInfo> ofList(GetScenesApiResponse scenes) {
		return scenes.getItems().stream().map(scene ->
			SceneInfo.builder()
				.name(scene.getSceneName())
				.sceneId(scene.getSceneId())
				.build()
		).toList();
	}

	private static LocalDateTime convertEpochTime(Long epochTime) {
		Instant instant = Instant.ofEpochMilli(epochTime);

		return LocalDateTime.ofInstant(instant, ZoneId.of("Asia/Seoul"));
	}
}
