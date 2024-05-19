package ssafy.icon.analyzeservice.global.error.handler;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorResponse methodArgumentNotValidException(MethodArgumentNotValidException e) {

		return ErrorResponse.builder(e, BAD_REQUEST, e.getFieldError().getDefaultMessage()).build();
	}
}
