package com.ll.medium.domain.member.member.dto;

import com.ll.medium.domain.member.member.entity.Member;
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
    private LocalDateTime createDate;
    private LocalDateTime modifyDate;
    private List<Post> posts;

    public MemberDto(final Member member) {
        this.id = member.getId();
        this.username = member.getUsername();
        this.password = member.getPassword();
        this.createDate = member.getCreateDate();
        this.modifyDate = member.getModifyDate();
        this.posts = member.getPosts();
    }

    public Member toEntity(final MemberDto dto) {
        return Member.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .createDate(dto.getCreateDate())
                .modifyDate(dto.getModifyDate())
                .posts(dto.posts)
                .build();
    }
}
