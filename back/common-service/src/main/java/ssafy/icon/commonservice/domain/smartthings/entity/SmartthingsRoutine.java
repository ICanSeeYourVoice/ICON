package ssafy.icon.commonservice.domain.smartthings.entity;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.smartthings.enums.RoutineTrigger;
import ssafy.icon.commonservice.global.entity.BaseEntity;

@NoArgsConstructor(access = PROTECTED)
@Table(name = "smartthings_routine", uniqueConstraints = {
	@UniqueConstraint(
		name = "routine_uk",
		columnNames = {
			"member_id", "trigger_type"
		}
	)
})
@Getter
@Entity
public class SmartthingsRoutine extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "smartthings_routine_id")
	@Id
	private Integer id;

	@OneToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(nullable = false, name = "member_id")
	private Member member;

	@Enumerated(STRING)
	@Column(nullable = false)
	private RoutineTrigger triggerType;

	@Column(nullable = false, name = "scene_id")
	private String sceneId;


	public SmartthingsRoutine(Member member, RoutineTrigger triggerType, String sceneId) {
		this.member = member;
		this.triggerType = triggerType;
		this.sceneId = sceneId;
	}

	public void changeScene(String sceneId) {
		this.sceneId = sceneId;
	}

}
