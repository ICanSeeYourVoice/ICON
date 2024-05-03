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

	@Column(nullable = false, length = 12)
	private String uid;

	// Member와의 연관관계 설정
	@ManyToOne(fetch = FetchType.LAZY) // 관계 설정은 LAZY 로딩으로
	@JoinColumn(name = "member_id") // 외래키는 member_id
	private Member member;

	@Builder
	public Guardian(String uid, Member member) {
		this.uid = uid;
		this.member = member;
	}
}