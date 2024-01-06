package com.ll.medium.domain.post.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ll.medium.domain.member.member.dto.MemberDto;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.post.comment.dto.CommentDto;
import com.ll.medium.domain.post.comment.entity.Comment;
import com.ll.medium.domain.post.post.entity.Post;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PostDto {
    private Long id;

    private String title;

    private String subtitle;

    private String content;

    @JsonProperty("isPublic")
    private boolean isPublic;

    @JsonProperty("isPaid")
    private boolean isPaid;

    private LocalDateTime createDate;

    private LocalDateTime modifyDate;

    private Long writerId;
    private String writerUsername;

    private List<CommentDto> comments;

    public PostDto(final WriteRequestDto reqDto, final Member memEntity) {
        this.title = reqDto.getTitle();
        this.subtitle = reqDto.getSubtitle();
        this.content = reqDto.getContent();
        this.isPublic = reqDto.isPublic();
        this.isPaid = reqDto.isPaid();
        this.writerId = memEntity.getId();
        this.writerUsername = memEntity.getUsername();
    }

    public PostDto(final ModifyRequestDto reqDto, final Member memEntity) {
        this.title = reqDto.getTitle();
        this.subtitle = reqDto.getSubtitle();
        this.content = reqDto.getContent();
        this.isPublic = reqDto.isPublic();
        this.isPaid = reqDto.isPaid();
        this.writerId = memEntity.getId();
        this.writerUsername = memEntity.getUsername();
    }

    public PostDto(final Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.subtitle = post.getSubtitle();
        this.content = post.getContent();
        this.isPublic = post.getIsPublic();
        this.isPaid = post.getIsPaid();
        this.createDate = post.getCreateDate();
        this.modifyDate = post.getModifyDate();
        this.writerId = post.getWriter().getId();
        this.writerUsername = post.getWriter().getUsername();
        this.comments = Optional.ofNullable(post.getComments())
                .orElseGet(Collections::emptyList)
                .stream()
                .map(CommentDto::new)
                .collect(Collectors.toList());
    }

    public static Post toEntity(final PostDto dto) {
        return Post.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .content(dto.getContent())
                .isPublic(dto.isPublic())
                .isPaid(dto.isPaid())
                .createDate(dto.getCreateDate())
                .modifyDate(dto.getModifyDate())
                .comments(Optional.ofNullable(dto.getComments())
                        .orElseGet(Collections::emptyList)
                        .stream()
                        .map(CommentDto::toEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
