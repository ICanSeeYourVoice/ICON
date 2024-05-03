package ssafy.icon.commonservice.domain.member.entity;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.icon.commonservice.global.entity.BaseEntity;

@NoArgsConstructor(access = PROTECTED)
@Getter
@Entity
@ToString
public class Guardian extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "guardian_id")
	@Id
	private Integer id;

	@Column(nullable = false, name = "guest_id")
	private Integer guestId;

	@Column(nullable = false, name = "host_id")
	private Integer hostId;

	@Builder
	public Guardian(Integer guestId, Integer hostId) {
		this.guestId = guestId;
		this.hostId = hostId;
	}
}