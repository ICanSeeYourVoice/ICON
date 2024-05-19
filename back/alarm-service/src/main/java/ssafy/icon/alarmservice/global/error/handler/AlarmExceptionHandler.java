package ssafy.icon.alarmservice.global.error.handler;

import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import ssafy.icon.alarmservice.global.error.exception.AlarmException;

@RestControllerAdvice
public class AlarmExceptionHandler {

	@ExceptionHandler(AlarmException.class)
	public ErrorResponse memberExceptionHandler(AlarmException e) {
		return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
	}

}
