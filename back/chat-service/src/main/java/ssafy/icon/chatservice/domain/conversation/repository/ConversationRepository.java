package ssafy.icon.chatservice.domain.conversation.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;
import ssafy.icon.chatservice.domain.conversation.document.Conversation;

public interface ConversationRepository extends ReactiveMongoRepository<Conversation, String> {

	Mono<Conversation> findByMemberId(Integer memberId);
}
