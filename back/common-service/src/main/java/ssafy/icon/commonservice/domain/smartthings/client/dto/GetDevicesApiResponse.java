package ssafy.icon.commonservice.domain.smartthings.client.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class GetDevicesApiResponse {
	private List<Item> items;

	@Getter
	static class Item {
		private String deviceId;
		private String name;
		private String label;
		private String manufacturerName;
		private String presentationId;
		private String locationId;
		private String ownerId;
		private String roomId;
		private List<Component> components;
		private String createTime;
		private Profile profile;
		private String type;
		private int restrictionTier;
		private List<String> allowed;
		private String executionContext;

		@Getter
		static class Component {

			private String id;
			private String label;
			private List<Capability> capabilities;
			private List<Category> categories;

			@Getter
			static class Category {

				private String name;
				private String categoryType;

			}

			@Getter
			static class Capability {

				private String id;
				private int version;
			}
		}

		@Getter
		static class Profile {
			private String id;
		}
	}
}
