package com.ll.medium.domain.post.post.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
public class WriteRequestDto {
    @NotBlank(message = "제목을 입력해 주세요.")
    private String title;
    private String subtitle;
    private String content;
    private boolean isPublic;
    private boolean isPaid;
}
