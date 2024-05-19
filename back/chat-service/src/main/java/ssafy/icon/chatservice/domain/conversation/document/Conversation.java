package ssafy.icon.chatservice.domain.conversation.document;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Document(collection = "conversations")
public class Conversation {

	@Id
	private String conversationId;

	private Integer memberId;

	private List<ChatMessage> chatMessages = new ArrayList<>();

	public Conversation(Integer memberId) {
		this.memberId = memberId;
	}

	public void addMessage(ChatMessage chatMessage) {
		this.chatMessages.add(chatMessage);
	}

	public List<ChatMessage> getLatestMessage() {

		ArrayList<ChatMessage> latestMessages = new ArrayList<>();

		int idx = chatMessages.size() >= 6 ? chatMessages.size() - 6 : 0;

		for (int i = idx; i < chatMessages.size(); i++) {
			latestMessages.add(this.getChatMessages().get(i));
		}

		return latestMessages;
	}

}
