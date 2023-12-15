package com.ll.medium.global.security.jwt;

import com.ll.medium.domain.member.member.entity.Member;
import lombok.*;

@ToString
@Getter
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
@AllArgsConstructor
public class JwtAuthResponseDto {
    private final String accessToken;
    private final String refreshToken;
    private final String tokenType = "Bearer";
    private Member member;
}
