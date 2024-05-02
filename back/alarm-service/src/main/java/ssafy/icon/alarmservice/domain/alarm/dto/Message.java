package ssafy.icon.alarmservice.domain.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class Message {
	private String token;
	private String title;
	private String content;

	@Builder
	public Message(String token, String title, String content){
		this.token = token;
		this.title = title;
		this.content = content;
	}
}
