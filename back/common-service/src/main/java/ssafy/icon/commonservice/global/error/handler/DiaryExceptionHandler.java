package ssafy.icon.commonservice.global.error.handler;

import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.icon.commonservice.global.error.exception.DiaryException;
import ssafy.icon.commonservice.global.error.exception.SmartThingsException;

@RestControllerAdvice
public class DiaryExceptionHandler {

	@ExceptionHandler(DiaryException.class)
	public ErrorResponse diaryExceptionHandler(DiaryException e) {
		return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
	}
}
