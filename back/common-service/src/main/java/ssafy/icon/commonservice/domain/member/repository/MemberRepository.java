package ssafy.icon.commonservice.domain.member.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.icon.commonservice.domain.member.entity.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

	Optional<Member> findByUid(String uid);
}
