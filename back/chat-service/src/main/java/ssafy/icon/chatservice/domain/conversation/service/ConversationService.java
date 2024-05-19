package ssafy.icon.chatservice.domain.conversation.service;

import static org.springframework.ai.chat.messages.MessageType.SYSTEM;
import static org.springframework.ai.chat.messages.MessageType.USER;

import java.time.LocalDateTime;
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
			.switchIfEmpty(
				Mono.defer(() -> conversationRepository.save(new Conversation(memberId))))
			.block();

		conversation.addMessage(new ChatMessage(USER, message, LocalDateTime.now()));

		List<Message> chatMessages = new ArrayList<>();
		chatMessages.add(
			new ChatMessage(SYSTEM, "You are a specialist in infant health and childcare.\n"
				+ "The answer should be in Korean, and the appropriate emoticon should be used. "
				+ "You should answer so that the user feels familiar.\n"
				+ "You never answer questions that don't fit my field.\n"
				+ "Please write it in 1 paragraphs.", LocalDateTime.now()));

		chatMessages.addAll(conversation.getLatestMessage());

		Prompt prompt = new Prompt(chatMessages);

		ChatResponse call = openAiChatClient.call(prompt);

		ChatMessage resultMessage = new ChatMessage(MessageType.ASSISTANT,
			call.getResult().getOutput().getContent(), LocalDateTime.now());

		conversation.addMessage(resultMessage);

		conversationRepository.save(conversation).subscribe();

		return resultMessage;
	}

	public void reset(Integer memberId) {
		Conversation conversation = conversationRepository.findByMemberId(memberId)
			.switchIfEmpty(
				Mono.defer(() -> conversationRepository.save(new Conversation(memberId))))
			.block();

		conversation.getChatMessages().clear();

		conversationRepository.save(conversation).block();
	}

	public List<ChatMessage> getMessages(Integer memberId) {
		Conversation conversation = conversationRepository.findByMemberId(memberId)
			.switchIfEmpty(
				Mono.defer(() -> conversationRepository.save(new Conversation(memberId))))
			.block();
		return conversation.getChatMessages();
	}

}
