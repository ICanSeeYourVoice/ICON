package ssafy.icon.analyzeservice.domain.analyze.document;


import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;

@Getter
@Document(collection = "babyStatus")
public class BabyStatus {

	@Id
	private String statusId;

	private Integer memberId;

	private String cryReason;

	private String createdAt;

	public BabyStatus(Integer memberId, String cryReason, String createdAt) {
		this.memberId = memberId;
		this.cryReason = cryReason;
		this.createdAt = createdAt;
	}
}
