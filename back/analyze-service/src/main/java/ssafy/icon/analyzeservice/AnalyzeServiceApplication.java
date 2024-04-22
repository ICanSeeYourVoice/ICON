package ssafy.icon.analyzeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AnalyzeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnalyzeServiceApplication.class, args);
	}

}
