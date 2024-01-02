package com.ll.medium.domain.member.exception;

import com.ll.medium.global.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
@RequiredArgsConstructor
public class MemberExceptionHandler {
    private final GlobalExceptionHandler globalExceptionHandler;

    /**
     * 로그인 실패시 예외 처리
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(AuthenticationException ex) {
        Map<Class<?>, String> exceptionMessageMapping = Map.of(
                InternalAuthenticationServiceException.class, "존재하지 않는 회원입니다.",
                BadCredentialsException.class, "아이디 또는 비밀번호가 일치하지 않습니다."
        );

        String message = exceptionMessageMapping.getOrDefault(ex.getClass(), "예상치 못한 오류가 발생했어요 😱");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(globalExceptionHandler.commonException(
                                HttpStatus.UNAUTHORIZED.value(),
                                message,
                                ex.getClass().getName()
                        )
                );
    }

    /**
     * 커스텀 예외 처리
     * 회원가입 시 비밀번호 확인 란이 일치하지 않을 때 예외 처리
     */
    @ExceptionHandler(PasswordNotMatchException.class)
    public ResponseEntity<?> handlePasswordNotMatchExceptions(PasswordNotMatchException ex) {
        return ResponseEntity.badRequest()
                .body(globalExceptionHandler.commonException(
                                HttpStatus.BAD_REQUEST.value(),
                                ex.getMessage(),
                                ex.getClass().getName()
                        )
                );
    }
}
