package com.ll.medium.domain.post.post.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ll.medium.domain.member.member.dto.MemberDto;
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
    private String subtitle;
    private String content;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private MemberDto writer;

    public PostDto(final WriteRequestDto dto, final Member member) {
        this.title = dto.getTitle();
        this.subtitle = dto.getSubtitle();
        this.content = dto.getContent();
        this.isPublic = dto.isPublic();
        this.writer = new MemberDto(member);
    }

    public PostDto(final ModifyRequestDto dto, final Member member) {
        this.title = dto.getTitle();
        this.subtitle = dto.getSubtitle();
        this.content = dto.getContent();
        this.isPublic = dto.isPublic();
        this.writer = new MemberDto(member);
    }

    public PostDto(final Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.subtitle = post.getSubtitle();
        this.content = post.getContent();
        this.isPublic = post.getIsPublic();
        this.createDate = post.getCreateDate();
        this.modifyDate = post.getModifyDate();
        this.writer = new MemberDto(post.getWriter());
    }

    public static Post toEntity(final PostDto dto) {
        return Post.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .content(dto.getContent())
                .isPublic(dto.isPublic())
                .createDate(dto.getCreateDate())
                .modifyDate(dto.getModifyDate())
                .writer(MemberDto.toEntity(dto.getWriter()))
                .build();
    }
}
