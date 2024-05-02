package com.ssafy.icon.domain.user.exception;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Slf4j
public class MemberException extends RuntimeException {
	private final MemberErrorCode errorCode;

	public MemberException(MemberErrorCode e) {
		super(e.getMessage());
		this.errorCode = e;
	}
}
