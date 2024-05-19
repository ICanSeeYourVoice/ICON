package ssafy.icon.commonservice.domain.smartthings.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import ssafy.icon.commonservice.domain.smartthings.enums.RoutineTrigger;

@JsonNaming(SnakeCaseStrategy.class)
public record RegisterRoutineRequest(
	String sceneId,
	RoutineTrigger trigger
){

}
