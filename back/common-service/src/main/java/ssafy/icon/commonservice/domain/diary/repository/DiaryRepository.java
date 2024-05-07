package ssafy.icon.commonservice.domain.diary.repository;

import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.icon.commonservice.domain.diary.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

	boolean existsByMemberIdAndDate(Integer memberId, LocalDate date);

	@Query("select distinct d from Diary d join fetch d.images where d.member.id = :memberId and d.date = :date")
	Optional<Diary> findByMemberIdAndDate(Integer memberId, LocalDate date);
}
