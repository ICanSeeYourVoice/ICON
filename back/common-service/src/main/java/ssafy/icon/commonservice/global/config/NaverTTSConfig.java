package ssafy.icon.commonservice.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class NaverTTSConfig {

	@Value("${naver-tts.api-key-id}")
	private String apiKeyId;

	@Value("${naver-tts.api-key}")
	private String apiKey;

}
