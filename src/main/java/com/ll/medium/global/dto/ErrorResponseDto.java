package com.ll.medium.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
public class ErrorResponseDto {
    private int status;
    private String code;
    private String message;
    private String type;
    private Map<String, String> valid;

    public ErrorResponseDto(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
