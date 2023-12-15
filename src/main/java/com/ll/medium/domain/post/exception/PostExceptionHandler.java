package com.ll.medium.domain.post.exception;

import com.ll.medium.global.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class PostExceptionHandler {
    private final GlobalExceptionHandler globalExceptionHandler;

    /**
     * 커스텀 예외 처리
     * 게시글 데이터가 없을 시 예외 처리
     */
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<?> handleDataNotFoundExceptions(DataNotFoundException ex) {
        return ResponseEntity.internalServerError()
                .body(globalExceptionHandler.commonException(
                                HttpStatus.NOT_FOUND.value(),
                                ex.getMessage(),
                                ex.getClass().getName()
                        )
                );
    }
}
