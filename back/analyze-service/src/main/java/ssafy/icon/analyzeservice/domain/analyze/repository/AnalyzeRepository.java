package ssafy.icon.analyzeservice.domain.analyze.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import ssafy.icon.analyzeservice.domain.analyze.document.BabyStatus;
import ssafy.icon.analyzeservice.domain.analyze.dto.CryReasonCount;

public interface AnalyzeRepository extends MongoRepository<BabyStatus, String> {
	@Aggregation(pipeline = {
		"{ $group: { _id: '$cryReason', count: { $sum: 1 } } }"
	})
	List<CryReasonCount> countByCryReason();
}
