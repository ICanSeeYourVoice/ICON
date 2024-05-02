package com.ssafy.icon.domain.user.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberErrorCode {

	MEMBER_NOT_FOUND("사용자를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);

	private final String message;
	private final HttpStatus httpStatus;
}