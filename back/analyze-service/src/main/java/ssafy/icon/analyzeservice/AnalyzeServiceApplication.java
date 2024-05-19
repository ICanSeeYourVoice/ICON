package ssafy.icon.analyzeservice;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import ssafy.icon.analyzeservice.domain.analyze.repository.AnalyzeRepository;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class AnalyzeServiceApplication {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(AnalyzeServiceApplication.class, args);
	}

}
