package ssafy.icon.chatservice.domain.conversation.document;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import java.util.Map;
import org.springframework.ai.chat.messages.Media;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.MessageType;

@JsonNaming(SnakeCaseStrategy.class)
public class ChatMessage implements Message {

	private MessageType messageType;
	private String message;


	public ChatMessage(MessageType messageType, String message) {
		this.messageType = messageType;
		this.message = message;
	}

	@Override
	public String getContent() {
		return message;
	}

	@Override
	public List<Media> getMedia() {
		return null;
	}

	@Override
	public Map<String, Object> getProperties() {
		return null;
	}

	@Override
	public MessageType getMessageType() {
		return this.messageType;
	}


}
