package ssafy.icon.commonservice.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.icon.commonservice.domain.member.entity.Guardian;
import ssafy.icon.commonservice.domain.member.entity.Member;

public interface GuardianRepository extends JpaRepository<Guardian, Integer> {

	Optional<Guardian> findByUidAndMemberId(String uid, Integer memberId);
}
