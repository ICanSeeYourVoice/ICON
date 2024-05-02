package ssafy.icon.commonservice.domain.smartthings.client;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import ssafy.icon.commonservice.domain.smartthings.client.dto.GetDevicesApiResponse;
import ssafy.icon.commonservice.domain.smartthings.client.dto.GetScenesApiResponse;

@FeignClient(name = "smartthings-api", url = "${external-api.smartthings.url}")
public interface SmartthingsApiClient {

	@GetMapping("/devices")
	GetDevicesApiResponse getDevices(
		@RequestHeader("Authorization") String smartthingsToken
	);

	@GetMapping("/scenes")
	GetScenesApiResponse getScenes(
		@RequestHeader("Authorization") String smartthingsToken
	);


}
