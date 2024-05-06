package ssafy.icon.commonservice.domain.diary.repository;

import java.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.icon.commonservice.domain.diary.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

	boolean existsByMemberIdAndDate(Integer memberId, LocalDate date);
}
