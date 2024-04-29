package ssafy.icon.chatservice.domain.conversation.service;

import static org.springframework.ai.chat.messages.MessageType.SYSTEM;
import static org.springframework.ai.chat.messages.MessageType.USER;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatResponse;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.MessageType;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatClient;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import ssafy.icon.chatservice.domain.conversation.document.ChatMessage;
import ssafy.icon.chatservice.domain.conversation.document.Conversation;
import ssafy.icon.chatservice.domain.conversation.repository.ConversationRepository;

@RequiredArgsConstructor
@Service
public class ConversationService {

	private final ConversationRepository conversationRepository;
	private final OpenAiChatClient openAiChatClient;

	public ChatMessage ask(Integer memberId, String message) {
		// 기존 대화 컨텍스트 불러오기
		Conversation conversation = conversationRepository.findByMemberId(memberId)
			.switchIfEmpty(Mono.defer(() -> conversationRepository.save(new Conversation(memberId))))
			.block();

		conversation.addMessage(new ChatMessage(USER, message));

		List<Message> chatMessages = new ArrayList<>();
		chatMessages.add(new ChatMessage(SYSTEM, "You are a specialist in infant health and childcare.\n"
			+ "You do not answer questions that are not related to infant health and childcare.\n"
			+ "The answer is in Korean.\n"
			+ "Please deliver accurate information professionally and respond as friendly as a woman in her 20s.\n"
			+ " Please use a contextual emoji too.\n"
			+ "Please write it in 2 paragraphs."));

		chatMessages.addAll(conversation.getChatMessages());

		Prompt prompt = new Prompt(chatMessages);

		ChatResponse call = openAiChatClient.call(prompt);

		ChatMessage resultMessage = new ChatMessage(MessageType.ASSISTANT, call.getResult().getOutput().getContent());

		conversation.addMessage(resultMessage);

		conversationRepository.save(conversation).subscribe();

		return resultMessage;
	}

	public void reset(Integer memberId) {
		Conversation conversation = conversationRepository.findByMemberId(memberId)
			.switchIfEmpty(Mono.defer(() -> conversationRepository.save(new Conversation(memberId))))
			.block();

		conversation.getChatMessages().clear();

		conversationRepository.save(conversation).block();
	}

	public List<ChatMessage> getMessages(Integer memberId) {
		Conversation conversation = conversationRepository.findByMemberId(memberId)
			.switchIfEmpty(Mono.defer(() -> conversationRepository.save(new Conversation(memberId))))
			.block();
		return conversation.getChatMessages();
	}

}
