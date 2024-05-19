package ssafy.icon.commonservice.domain.smartthings.client.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class GetScenesApiResponse {

	private List<Item> items;

	@Getter
	public static class Item {

		private String sceneId;
		private String sceneName;
		private String sceneIcon;
		private String locationId;
		private String createdBy;
		private Long createdDate;
		private Long lastUpdatedDate;
		private Long lastExecutedDate;
		private boolean editable;
		private String apiVersion;
	}

}
