package ssafy.icon.commonservice.domain.smartthings.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsToken;

public interface SmartthingsTokenRepository extends JpaRepository<SmartthingsToken, Integer> {

	Optional<SmartthingsToken> findByMemberId(Integer memberId);

	boolean existsByToken(String token);
}
