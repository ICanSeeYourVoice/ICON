package com.ssafy.icon.domain.user.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class UserException extends RuntimeException {
	private final UserErrorCode errorCode;

	public UserException(UserErrorCode e) {
		super(e.getMessage());
		this.errorCode = e;
	}
}
