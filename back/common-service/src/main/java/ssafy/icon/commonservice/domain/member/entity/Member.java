package ssafy.icon.commonservice.domain.member.entity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.global.entity.BaseEntity;


@NoArgsConstructor(access = PROTECTED)
@Getter
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


	@Column(name = "web_token", length = 255)
	private String webToken;

	@Column(name = "app_token", length = 255)
	private String appToken;


	@Builder
	public Member(String uid, String pw, String name, String webToken, String appToken) {
		this.uid = uid;
		this.pw = pw;
		this.name = name;
		this.webToken = webToken;
		this.appToken = appToken;
	}

	public void updateToken(String token, boolean isApp){
		if(isApp)
			this.appToken = token;
		else
			this.webToken = token;
	}
}
