package com.ll.medium.domain.member.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.global.entity.BaseEntity;
import com.ll.medium.global.security.entity.JwtRefreshToken;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {
    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private boolean isPaid = false;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @JsonIgnore
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private JwtRefreshToken refreshToken;

    @JsonIgnore
    @OneToMany(mappedBy = "writer", cascade = CascadeType.ALL)
    private List<Post> posts;
}
