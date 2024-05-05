package ssafy.icon.commonservice.global.config;

import com.netflix.discovery.shared.transport.jersey3.Jersey3TransportClientFactories;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Jersey3Config {

	@Bean
	public Jersey3TransportClientFactories jersey3TransportClientFactories() {
		return new Jersey3TransportClientFactories();
	}


}
