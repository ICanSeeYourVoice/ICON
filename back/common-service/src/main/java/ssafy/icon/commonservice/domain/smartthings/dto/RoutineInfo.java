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
import ssafy.icon.commonservice.domain.smartthings.enums.RoutineTrigger;

@JsonNaming(SnakeCaseStrategy.class)
@AllArgsConstructor
@Getter
@Builder
public class RoutineInfo {

	private String name;
	private String sceneId;
	private RoutineTrigger trigger;

}
