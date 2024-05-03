package ssafy.icon.commonservice.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ssafy.icon.commonservice.domain.member.dto.GetGuardiansDto;
import ssafy.icon.commonservice.domain.member.entity.Guardian;

public interface GuardianRepository extends JpaRepository<Guardian, Integer> {

	Optional<Guardian> findByGuestIdAndHostId(Integer guestId, Integer hostId);

	// @Query("SELECT new ssafy.icon.commonservice.domain.member.dto.GetGuardiansDto(g.id, g.uid, m.name) "
	// 	+ "FROM Guardian g right JOIN g.member m WHERE m.id = :memberId")
	// List<GetGuardiansDto> findGuardiansWithMemberName(@Param("memberId") Integer memberId);
}
