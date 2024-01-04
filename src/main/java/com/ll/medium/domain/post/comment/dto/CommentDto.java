package com.ll.medium.domain.post.comment.dto;

import com.ll.medium.domain.member.member.dto.MemberDto;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.post.comment.entity.Comment;
import com.ll.medium.domain.post.post.dto.PostDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentDto {
    private Long id;
    private Long writerId;
    private String writerUsername;
    private String content;
    private Long postId;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;

    public CommentDto(final Comment entity) {
        this.id = entity.getId();
        this.writerId = entity.getWriter().getId();
        this.writerUsername = entity.getWriter().getUsername();
        this.content = entity.getContent();
        this.postId = entity.getPost().getId();
        this.createDate = entity.getCreateDate();
        this.modifyDate = entity.getModifyDate();
    }

    public CommentDto(final WriteRequestDto reqDto, final Member memEntity) {
        this.writerId = memEntity.getId();
        this.writerUsername = memEntity.getUsername();
        this.content = reqDto.getContent();
        this.postId = reqDto.getPostId();
    }

    public CommentDto(final ModifyRequestDto reqDto, final Member memEntity) {
        this.writerId = memEntity.getId();
        this.writerUsername = memEntity.getUsername();
        this.content = reqDto.getContent();
        this.postId = reqDto.getPostId();
    }

    public static Comment toEntity(final CommentDto dto) {
        return Comment.builder()
                .id(dto.getId())
                .content(dto.getContent())
                .createDate(dto.getCreateDate())
                .modifyDate(dto.getModifyDate())
                .build();
    }
}
