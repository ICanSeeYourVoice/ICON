package ssafy.icon.commonservice.global.error.handler;

import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.icon.commonservice.global.error.exception.MemberException;

@RestControllerAdvice
public class MemberExceptionHandler {

	@ExceptionHandler(MemberException.class)
	public ErrorResponse memberExceptionHandler(MemberException e) {
		return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
	}
}
