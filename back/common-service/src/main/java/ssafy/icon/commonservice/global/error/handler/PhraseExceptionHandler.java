package ssafy.icon.commonservice.global.error.handler;

import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import ssafy.icon.commonservice.global.error.exception.MemberException;
import ssafy.icon.commonservice.global.error.exception.PhraseException;

@RestControllerAdvice
public class PhraseExceptionHandler {

	@ExceptionHandler(PhraseException.class)
	public ErrorResponse phraseExceptionHandler(PhraseException e) {
		return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
	}
}
