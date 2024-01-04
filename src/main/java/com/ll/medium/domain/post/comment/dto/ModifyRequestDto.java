package com.ll.medium.domain.post.comment.dto;

import com.ll.medium.domain.post.post.dto.PostDto;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class ModifyRequestDto {
    private String content;
    private Long postId;
}
