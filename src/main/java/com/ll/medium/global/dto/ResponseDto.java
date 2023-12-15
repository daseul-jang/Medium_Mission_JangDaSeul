package com.ll.medium.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ResponseDto<T> {
    private boolean result;
    private int status;
    private String message;
    private T data;

    public ResponseDto(int status, String message, T data) {
        this.result = status >= 200 && status < 400;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
