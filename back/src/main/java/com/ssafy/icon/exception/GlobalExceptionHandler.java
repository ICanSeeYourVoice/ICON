package com.ssafy.icon.exception;

import java.util.Arrays;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.icon.domain.user.exception.UserException;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(UserException.class)
	public ResponseEntity<Object> hintExceptionHandler(UserException e) {
		log.error(Arrays.toString(e.getStackTrace()));
		return ResponseEntity.status(e.getErrorCode().getHttpStatus())
			.body(e.getMessage());
	}
}

