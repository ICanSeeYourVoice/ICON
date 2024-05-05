package ssafy.icon.analyzeservice.domain.analyze.document;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Document(collection = "babyStatus")
public class BabyStatus {

	@Id
	private String statusId;

	private Integer memberId;

	private String cryReason;

	private LocalDateTime createdAt;

	public BabyStatus(Integer memberId, String cryReason, LocalDateTime createdAt) {
		this.memberId = memberId;
		this.cryReason = cryReason;
		this.createdAt = createdAt;

	}
}
