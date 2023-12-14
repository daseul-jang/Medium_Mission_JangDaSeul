package com.ll.medium.domain.member.member.service;

import com.ll.medium.domain.member.exception.InvalidTokenException;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.entity.MemberRole;
import com.ll.medium.domain.member.member.repository.MemberRepository;
import com.ll.medium.global.security.entity.JwtRefreshToken;
import com.ll.medium.global.security.jwt.JwtAuthResponseDto;
import com.ll.medium.global.security.jwt.JwtTokenProvider;
import com.ll.medium.global.security.repository.JwtRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtRefreshTokenRepository refreshTokenRepository;

    @Transactional
    public JwtAuthResponseDto authenticate(final Member member) {
        Authentication authentication = authenticateUser(member);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        JwtRefreshToken refreshToken = checkAndCreateRefreshToken(authentication);

        return new JwtAuthResponseDto(
                jwtTokenProvider.createAccessToken(authentication),
                refreshToken.getToken(),
                refreshToken.getMember()
        );
    }

    private Authentication authenticateUser(final Member member) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        member.getUsername(), member.getPassword()
                )
        );
    }

    @Transactional
    protected JwtRefreshToken checkAndCreateRefreshToken(Authentication authentication) {
        Member authenticateUser = memberService.getMember(authentication.getName());
        JwtRefreshToken refreshToken = refreshTokenRepository.findByMember(authenticateUser).orElse(null);

        if (refreshToken == null) {
            refreshToken = jwtTokenProvider.createRefreshToken(authentication);
            refreshToken = refreshToken.toBuilder().member(authenticateUser).build();
            refreshToken = refreshTokenRepository.save(refreshToken);
        }

        return refreshToken;
    }

    public JwtAuthResponseDto newAccessToken(String requestRefreshToken) {
        if (!jwtTokenProvider.validateToken(requestRefreshToken)) {
            throw new InvalidTokenException("Refresh Token 검증 실패");
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(requestRefreshToken);
        Member member = memberService.getMember(authentication.getName());
        JwtRefreshToken refreshToken = refreshTokenRepository.findByMember(member).orElse(null);

        assert refreshToken != null;
        if (!refreshToken.getToken().equals(requestRefreshToken)) {
            throw new InvalidTokenException("토큰이 일치하지 않습니다.");
        }

        return new JwtAuthResponseDto(jwtTokenProvider.createAccessToken(authentication), refreshToken.getToken(), member);
    }

    @Transactional
    public Member join(final Member member) {
        if (memberRepository.existsByUsername(member.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 존재하는 회원입니다.");
        }

        Member encodingMember = Member.builder()
                .username(member.getUsername())
                .password(passwordEncoder.encode(member.getPassword()))
                .role(MemberRole.USER)
                .build();

        return memberRepository.save(encodingMember);
    }
}
