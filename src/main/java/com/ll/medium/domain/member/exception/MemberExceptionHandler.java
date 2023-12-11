package com.ll.medium.domain.member.exception;

import com.ll.medium.global.dto.ErrorResponseDto;
import com.ll.medium.global.dto.ResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class MemberExceptionHandler {
    /**
     * 로그인 실패시 예외 처리
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(AuthenticationException ex) {
        String message = getMessageForException(ex);

        if (!ex.getMessage().isEmpty()) {
            message = ex.getMessage();
        }

        ErrorResponseDto error = ErrorResponseDto.builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(message)
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ResponseDto<>(error.getStatus(), error.getMessage(), error));
    }

    private String getMessageForException(AuthenticationException ex) {
        Map<Class<?>, String> exceptionMessageMapping = Map.of(
                UserNotFoundException.class, "존재하지 않는 회원입니다.",
                BadCredentialsException.class, "아이디 또는 비밀번호가 일치하지 않습니다."
        );

        return exceptionMessageMapping.getOrDefault(ex.getClass(), "예상치 못한 오류가 발생했어요 😱");
    }

    /**
     * 커스텀 예외 처리
     * 회원가입 시 비밀번호 확인 란이 일치하지 않을 때 예외 처리
     */
    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<?> handlePasswordNotMatchExceptions(PasswordNotMatchException ex) {
        return ResponseEntity.badRequest()
                .body(commonException(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), ex.getClass().getName()));
    }

    public ResponseDto<ErrorResponseDto> commonException(int status, String message, String type) {
        ErrorResponseDto error = ErrorResponseDto.builder()
                .status(status)
                .message(message)
                .type(type)
                .build();

        return ResponseDto.<ErrorResponseDto>builder()
                .result(false)
                .status(error.getStatus())
                .data(error)
                .build();
    }
}
