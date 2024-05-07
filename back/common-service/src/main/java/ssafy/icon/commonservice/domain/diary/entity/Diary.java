package ssafy.icon.commonservice.domain.diary.entity;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.global.entity.BaseEntity;

@NoArgsConstructor(access = PROTECTED)
@Table(
	uniqueConstraints = @UniqueConstraint(
		name = "uk_date_member",
		columnNames = {"member_id", "date"}
	)
)
@Getter
@Entity
public class Diary extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "diary_id")
	@Id
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(length = 1000)
	private String content;

	@Column(nullable = false)
	private LocalDate date;

	@OneToMany(mappedBy = "diary", orphanRemoval = true, cascade = ALL)
	private List<DiaryImage> images = new ArrayList<>();

	@Builder
	public Diary(Member member, String content, LocalDate date) {
		this.member = member;
		this.content = content;
		this.date = date;
	}

	public void addImage(DiaryImage image) {
		this.images.add(image);
		image.connectDiary(this);
	}

	public void modify(String content, LocalDate date) {
		this.content = content;
		this.date = date;
	}

}
