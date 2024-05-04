package ssafy.icon.commonservice.domain.phrase.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ssafy.icon.commonservice.domain.phrase.entity.Phrase;

public interface PhraseRepository extends JpaRepository<Phrase, Integer> {
	int countByMemberId(Integer memberId);

}
