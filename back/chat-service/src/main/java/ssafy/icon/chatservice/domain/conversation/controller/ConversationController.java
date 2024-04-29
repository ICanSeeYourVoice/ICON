package ssafy.icon.chatservice.domain.conversation.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.icon.chatservice.domain.conversation.document.ChatMessage;
import ssafy.icon.chatservice.domain.conversation.dto.AskQuestionRequest;
import ssafy.icon.chatservice.domain.conversation.service.ConversationService;

@RequiredArgsConstructor
@RequestMapping("/conversations")
@RestController
public class ConversationController {

	private final ConversationService conversationService;



	@PostMapping
	public ResponseEntity<ChatMessage> ask(
		@RequestHeader("X-Authorization-Id") Integer memberId,
		@RequestBody AskQuestionRequest request
	) {
		return ResponseEntity.ok(conversationService.ask(memberId, request.message()));
	}

	@DeleteMapping
	public ResponseEntity<ChatMessage> reset(
		@RequestHeader("X-Authorization-Id") Integer memberId
	) {
		conversationService.reset(memberId);
		return ResponseEntity.ok().build();
	}

	@GetMapping
	public ResponseEntity<List<ChatMessage>> getMessages(
		@RequestHeader("X-Authorization-Id") Integer memberId
	) {
		return ResponseEntity.ok(conversationService.getMessages(memberId));
	}
}
