package ssafy.icon.analyzeservice.global.error.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AnalyzeException extends RuntimeException {

	private final HttpStatus httpStatus;
	private final String message;

	public AnalyzeException(HttpStatus httpStatus, String message) {
		super(message);
		this.httpStatus = httpStatus;
		this.message = message;
	}
}
