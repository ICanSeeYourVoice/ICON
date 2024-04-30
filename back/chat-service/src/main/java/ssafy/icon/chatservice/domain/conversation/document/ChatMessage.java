package ssafy.icon.chatservice.domain.conversation.document;

import com.fasterxml.jackson.databind.PropertyNamingStrategies.SnakeCaseStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import org.springframework.ai.chat.messages.Media;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.MessageType;

@JsonNaming(SnakeCaseStrategy.class)
@Getter
public class ChatMessage implements Message {

	private final MessageType messageType;
	private final String message;
	private final LocalDateTime timestamp;


	public ChatMessage(MessageType messageType, String message, LocalDateTime timestamp) {
		this.messageType = messageType;
		this.message = message;
		this.timestamp = timestamp;
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
