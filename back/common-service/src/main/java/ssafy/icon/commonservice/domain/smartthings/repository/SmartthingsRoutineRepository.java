package ssafy.icon.commonservice.domain.smartthings.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.icon.commonservice.domain.smartthings.entity.SmartthingsRoutine;
import ssafy.icon.commonservice.domain.smartthings.enums.RoutineTrigger;

public interface SmartthingsRoutineRepository extends JpaRepository<SmartthingsRoutine, Integer> {

	Optional<SmartthingsRoutine> findByTriggerTypeAndMemberId(RoutineTrigger triggerType,
		Integer memberId);

	List<SmartthingsRoutine> findAllByMemberId(Integer memberId);
}
