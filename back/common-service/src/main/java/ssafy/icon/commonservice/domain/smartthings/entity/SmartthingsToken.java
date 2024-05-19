package ssafy.icon.commonservice.domain.smartthings.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.databind.ser.Serializers.Base;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.global.entity.BaseEntity;

@NoArgsConstructor(access = PROTECTED)
@Getter
@Entity
public class SmartthingsToken extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "smartthings_token_id")
	@Id
	private Integer id;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(nullable = false , unique = true, name = "member_id")
	private Member member;

	@Column(nullable = false, unique = true)
	private String token;

	public SmartthingsToken(Member member, String token) {
		this.member = member;
		this.token = token;
	}

	public void changeToken(String token) {
		this.token = token;
	}

}
