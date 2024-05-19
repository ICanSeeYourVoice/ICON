package ssafy.icon.analyzeservice.domain.analyze.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import ssafy.icon.analyzeservice.domain.analyze.document.BabyStatus;
import ssafy.icon.analyzeservice.domain.analyze.dto.CryReasonCount;

public interface AnalyzeRepository extends MongoRepository<BabyStatus, String> {
	@Aggregation(pipeline = {
			"{ $match: { memberId: ?0, createdAt: { $gte: ?1, $lt: ?2 } } }",
			"{ $group: { _id: '$cryReason', count: { $sum: 1 } } }"
	})
	List<CryReasonCount> countByCryReason(Integer memberId, LocalDateTime start, LocalDateTime end);

	@Aggregation(pipeline = {
			"{ $match: { memberId: ?0, createdAt: { $gte: ?1, $lt: ?2 } } }",
			"{ $sort: { createdAt: -1 } }"
	})
	List<BabyStatus> findAllByDate(Integer memberId, LocalDateTime start, LocalDateTime end);
}
