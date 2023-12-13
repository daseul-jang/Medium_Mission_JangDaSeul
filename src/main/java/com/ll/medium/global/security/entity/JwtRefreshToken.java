package com.ll.medium.global.security.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.Instant;

@Entity
@Getter
@SuperBuilder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "refresh_token_tb")
public class JwtRefreshToken extends BaseEntity {
    private String token;
    private Instant expiryDate;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;
}