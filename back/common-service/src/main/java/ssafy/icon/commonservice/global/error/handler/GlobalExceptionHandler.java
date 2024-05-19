package ssafy.icon.commonservice.global.error.handler;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import feign.FeignException;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.icon.commonservice.global.error.exception.CommonException;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorResponse methodArgumentNotValidException(MethodArgumentNotValidException e) {

		return ErrorResponse.builder(e, BAD_REQUEST, e.getFieldError().getDefaultMessage()).build();
	}

	@ExceptionHandler(FeignException.Unauthorized.class)
	public ErrorResponse FeignUnauthorizedExceptionHandler(FeignException.Unauthorized e) {
		return ErrorResponse.builder(e, BAD_REQUEST, "권한이 없습니다.").build();
	}

	@ExceptionHandler(CommonException.class)
	public ErrorResponse CommonExceptionHandler(CommonException e) {
		return ErrorResponse.builder(e, e.getHttpStatus(), e.getMessage()).build();
	}

}
