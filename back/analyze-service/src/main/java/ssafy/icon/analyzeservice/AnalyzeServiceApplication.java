package ssafy.icon.analyzeservice;

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
		SpringApplication.run(AnalyzeServiceApplication.class, args);
	}

}
