package ssafy.icon.commonservice.domain.phrase.entity;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.global.entity.BaseEntity;

@NoArgsConstructor(access = PROTECTED)
@Getter
@Entity
@ToString
public class Phrase extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "phrase_id")
	@Id
	private Integer id;

	@Column(nullable = false, length = 30)
	private String text;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(nullable = false, name = "member_id")
	private Member member;

	@Builder
	public Phrase(String text, Member member){
		this.text = text;
		this.member = member;
	}

}
