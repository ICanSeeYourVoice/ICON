package ssafy.icon.commonservice.global.error.handler;

import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.icon.commonservice.global.error.exception.MemberException;
import ssafy.icon.commonservice.global.error.exception.SmartThingsException;

@RestControllerAdvice
public class SmartthingsExceptionHandler {

	@ExceptionHandler(SmartThingsException.class)
	public ErrorResponse smartthingsExceptionHandler(SmartThingsException e) {
		return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
	}
}
