package ssafy.icon.commonservice.domain.diary.entity;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.icon.commonservice.global.entity.BaseEntity;

@NoArgsConstructor(access = PROTECTED)
@Getter
@Entity
public class DiaryImage extends BaseEntity {

	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "diary_image_id")
	@Id
	private Long id;

	@ManyToOne(fetch = LAZY, optional = false)
	@JoinColumn(name = "diary_id")
	private Diary diary;

	@Column
	private String url;

	public DiaryImage(String url) {
		this.url = url;
	}

	@Builder
	public DiaryImage(Long id, Diary diary, String url) {
		this.id = id;
		this.diary = diary;
		this.url = url;
	}

	public void connectDiary(Diary diary) {
		this.diary = diary;
	}
}
