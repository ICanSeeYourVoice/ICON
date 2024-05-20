package ssafy.icon.analyzeservice.domain.analyze.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import ssafy.icon.analyzeservice.domain.analyze.client.dto.AnalyzeResult;

@FeignClient(name = "colab-api", url = "${external-api.colab.url}")
public interface ColabApiClient {

	@PostMapping(value = "/predict", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	AnalyzeResult getAnalyze(@RequestPart(value = "data") MultipartFile data);
}
