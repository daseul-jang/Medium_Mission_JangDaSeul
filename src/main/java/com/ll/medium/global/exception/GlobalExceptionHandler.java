package com.ll.medium.global.exception;

import com.ll.medium.global.dto.ErrorResponseDto;
import com.ll.medium.global.dto.ResponseDto;
import org.springframework.beans.TypeMismatchException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 데이터베이스 관련 예외 처리
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolationExceptions(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(commonException(HttpStatus.CONFLICT.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 접근 권한이 없을 경우 예외 처리
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(AccessDeniedException ex) {
        return ResponseEntity.badRequest()
                .body(commonException(HttpStatus.FORBIDDEN.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 유효성 검증 예외 처리
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> validErrors = new HashMap<>();

        ex.getBindingResult().getAllErrors()
                .forEach(c -> validErrors.put(((FieldError) c).getField(), c.getDefaultMessage()));

        ErrorResponseDto error = ErrorResponseDto.builder()
                .status(ex.getStatusCode().value())
                .message(ex.getMessage())
                .valid(validErrors)
                .build();

        return ResponseEntity.badRequest()
                .body(new ResponseDto<>(error.getStatus(), error.getMessage(), error));
    }

    /**
     * 요청 본문을 서버가 읽을 수 없거나, 문법적으로 올바르지 않을 때 예외 처리
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest()
                .body(commonException(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 요청에서 필수 파라미터가 누락되었을 때 예외 처리
     */
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> handleRequestNotReadableExceptions(MissingServletRequestParameterException ex) {
        return ResponseEntity.badRequest()
                .body(commonException(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 요청 파라미터 타입이 메서드의 매개변수 타입과 불일치 시 예외 처리
     */
    @ExceptionHandler(TypeMismatchException.class)
    public ResponseEntity<?> handleMethodNotSupportedExceptions(TypeMismatchException ex) {
        return ResponseEntity.badRequest()
                .body(commonException(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 메소드에 부적절한 인자가 전달되었을 때 발생하는 예외 처리
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentExceptions(IllegalArgumentException ex) {
        return ResponseEntity.badRequest()
                .body(commonException(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 서버가 지원하지 않는 HTTP 메서드 요청에 대한 예외 처리
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<?> handleMethodNotSupportedExceptions(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body(commonException(HttpStatus.METHOD_NOT_ALLOWED.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * 서버 예외 처리
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAllExceptions(Exception ex) {
        return ResponseEntity.internalServerError()
                .body(commonException(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage(), ex.getClass().getName()));
    }

    /**
     * ResponseStatusException 관련 예외 처리
     */
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handleResponseStatusExceptions(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(commonException(ex.getStatusCode().value(), ex.getMessage(), ex.getClass().getName()));
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
