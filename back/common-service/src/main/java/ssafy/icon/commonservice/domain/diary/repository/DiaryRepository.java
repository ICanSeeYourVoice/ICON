package ssafy.icon.commonservice.domain.diary.repository;

import jakarta.persistence.criteria.CriteriaBuilder.In;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.icon.commonservice.domain.diary.entity.Diary;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

	boolean existsByMemberIdAndDate(Integer memberId, LocalDate date);

	Optional<Diary> findByMemberIdAndDate(Integer memberId, LocalDate date);

	@Query("select distinct d from Diary d join fetch d.images where d.id = :id")
	Optional<Diary> findByIdWithImages(@Param("id") Long id);

	@Query("select distinct d from Diary d join fetch d.images where d.member.id = :memberId and d.date between :start and :end")
	List<Diary> findAllByPeriod(@Param("memberId") Integer memberId, @Param("start") LocalDate start,
		@Param("end") LocalDate end);
}
