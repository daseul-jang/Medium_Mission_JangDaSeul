package com.ll.medium.domain.member.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.entity.MemberRole;
import com.ll.medium.domain.post.post.entity.Post;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberDto {
    private Long id;

    private String username;

    private String password;

    @JsonProperty("isPaid")
    private boolean isPaid;

    private MemberRole role;

    private LocalDateTime createDate;
    
    private LocalDateTime modifyDate;

    private List<Post> posts;

    public MemberDto(final Member member) {
        this.id = member.getId();
        this.username = member.getUsername();
        this.password = member.getPassword();
        this.isPaid = member.isPaid();
        this.role = member.getRole();
        this.createDate = member.getCreateDate();
        this.modifyDate = member.getModifyDate();
        this.posts = member.getPosts();
    }

    public static Member toEntity(final MemberDto dto) {
        return Member.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .isPaid(dto.isPaid())
                .role(dto.getRole())
                .createDate(dto.getCreateDate())
                .modifyDate(dto.getModifyDate())
                .posts(dto.getPosts())
                .build();
    }
}
