package ssafy.icon.commonservice.domain.member.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ssafy.icon.commonservice.domain.member.dto.GetGuardiansDto;
import ssafy.icon.commonservice.domain.member.dto.GetGuardiansWithTokenDto;
import ssafy.icon.commonservice.domain.member.entity.Guardian;

public interface GuardianRepository extends JpaRepository<Guardian, Integer> {

	Optional<Guardian> findByGuestIdAndHostId(Integer guestId, Integer hostId);
	Optional<Guardian> findByIdAndHostId(Integer guardianId, Integer hostId);

	@Query("SELECT new ssafy.icon.commonservice.domain.member.dto.GetGuardiansDto(g.id, g.guestId, m.uid, m.name) "
		+ "FROM Guardian g JOIN Member m on g.guestId= m.id WHERE g.hostId = :memberId")
	List<GetGuardiansDto> findGuardiansWithMemberName(@Param("memberId") Integer memberId);

	@Query("SELECT new ssafy.icon.commonservice.domain.member.dto.GetGuardiansWithTokenDto(g.id, g.guestId, m.webToken) "
		+ "FROM Guardian g JOIN Member m on g.guestId= m.id WHERE g.hostId = :memberId")
	List<GetGuardiansWithTokenDto> findGuardiansWithMemberToken(@Param("memberId") Integer memberId);


}
