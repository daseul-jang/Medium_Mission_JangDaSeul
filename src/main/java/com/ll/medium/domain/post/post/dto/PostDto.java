package com.ll.medium.domain.post.post.dto;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.post.post.entity.Post;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private boolean isPublic;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private Member writer;

    public PostDto(final WriteRequestDto dto, final Member member) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.isPublic = dto.isPublic();
        this.writer = member;
    }

    public PostDto(final Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.isPublic = post.getIsPublic();
        this.createDate = post.getCreateDate();
        this.modifyDate = post.getModifyDate();
        this.writer = post.getWriter();
    }

    public static Post toEntity(final PostDto dto) {
        return Post.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .isPublic(dto.isPublic())
                .createDate(dto.getCreateDate())
                .modifyDate(dto.getModifyDate())
                .writer(dto.getWriter())
                .build();
    }
}
