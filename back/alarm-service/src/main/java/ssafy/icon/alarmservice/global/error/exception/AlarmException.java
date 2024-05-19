package ssafy.icon.alarmservice.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AlarmException extends RuntimeException {

	private final HttpStatus httpStatus;
	private final String message;

	public AlarmException(HttpStatus httpStatus, String message) {
		super(message);
		this.httpStatus = httpStatus;
		this.message = message;
	}
}