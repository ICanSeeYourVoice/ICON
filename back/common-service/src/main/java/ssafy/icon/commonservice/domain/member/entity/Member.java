package ssafy.icon.commonservice.domain.member.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.global.entity.BaseEntity;


@NoArgsConstructor(access = PROTECTED)
@Entity
public class Member extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "member_id")
	@Id
	private Integer id;

	@Column(nullable = false, length = 12, unique = true)
	private String uid;

	@Column(nullable = false)
	private String pw;

	@Column(nullable = false, length = 20)
	private String name;

	@Builder
	public Member(String uid, String pw, String name) {
		this.uid = uid;
		this.pw = pw;
		this.name = name;
	}
}
