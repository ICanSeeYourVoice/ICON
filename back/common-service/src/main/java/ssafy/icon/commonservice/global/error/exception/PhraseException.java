package ssafy.icon.commonservice.global.error.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class PhraseException extends RuntimeException {

	private final HttpStatus httpStatus;
	private final String message;

	public PhraseException(HttpStatus httpStatus, String message) {
		super(message);
		this.httpStatus = httpStatus;
		this.message = message;
	}
}
