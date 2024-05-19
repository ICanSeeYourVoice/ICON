package ssafy.icon.commonservice.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class SmartThingsException extends RuntimeException {

	private final HttpStatus httpStatus;
	private final String message;

	public SmartThingsException(HttpStatus httpStatus, String message) {
		super(message);
		this.httpStatus = httpStatus;
		this.message = message;
	}
}
