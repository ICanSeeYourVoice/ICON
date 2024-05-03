package ssafy.icon.analyzeservice.domain.analyze.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import reactor.core.publisher.Mono;
import ssafy.icon.analyzeservice.domain.analyze.document.BabyStatus;

public interface AnalyzeRepository extends ReactiveMongoRepository<BabyStatus, String> {

	Mono<BabyStatus> findByMemberId(Integer memberId);
}
