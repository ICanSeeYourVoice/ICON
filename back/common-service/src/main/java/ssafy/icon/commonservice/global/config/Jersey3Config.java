package ssafy.icon.commonservice.global.config;

import com.netflix.discovery.AbstractDiscoveryClientOptionalArgs;
import com.netflix.discovery.Jersey3DiscoveryClientOptionalArgs;
import com.netflix.discovery.shared.transport.jersey.TransportClientFactories;
import com.netflix.discovery.shared.transport.jersey3.Jersey3TransportClientFactories;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Jersey3Config {

	@Bean
	@ConditionalOnMissingBean(AbstractDiscoveryClientOptionalArgs.class)
	public Jersey3DiscoveryClientOptionalArgs jersey3DiscoveryClientOptionalArgs() {
		return new Jersey3DiscoveryClientOptionalArgs();
	}

	@Bean
	@ConditionalOnMissingBean(TransportClientFactories.class)
	public Jersey3TransportClientFactories jersey3TransportClientFactories() {
		return Jersey3TransportClientFactories.getInstance();
	}

}
