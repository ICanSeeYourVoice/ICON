package ssafy.icon.commonservice.global.util.jwt;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtProps(
	String accessKey,
	Duration accessExpiration
) {
}