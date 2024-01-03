package com.ll.medium.domain.member.member.service;

import com.ll.medium.domain.member.exception.InvalidTokenException;
import com.ll.medium.domain.member.exception.UserNotFoundException;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.entity.MemberRole;
import com.ll.medium.domain.member.member.repository.MemberRepository;
import com.ll.medium.global.security.entity.JwtRefreshToken;
import com.ll.medium.global.security.jwt.JwtAuthResponse;
import com.ll.medium.global.security.jwt.JwtRefreshTokenNotFoundException;
import com.ll.medium.global.security.jwt.JwtTokenProvider;
import com.ll.medium.global.security.repository.JwtRefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

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
    public JwtAuthResponse authenticate(final Member member) {
        Member findMember = memberRepository.findByUsername(member.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username : " + member.getUsername()));

        // 조회한 사용자 정보로 role 업데이트
        updateRoleBasedOnPaymentStatus(findMember);

        Authentication authentication = authenticateUser(member);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.info("getPrincipal?");
        log.info(authentication.getPrincipal());

        Map<String, Object> accessTokenMap = jwtTokenProvider.createAccessToken(authentication);
        JwtRefreshToken refreshToken = checkAndCreateRefreshToken(authentication);

        return new JwtAuthResponse(
                (String) accessTokenMap.get("accessToken"),
                ((Number) accessTokenMap.get("accessTokenExp")).longValue(),
                refreshToken.getToken(),
                refreshToken.getMember()
        );
    }

    private void updateRoleBasedOnPaymentStatus(final Member member) {
        MemberRole newRole = member.isPaid() ? MemberRole.PAID : MemberRole.USER;
        if (!newRole.equals(member.getRole())) {
            Member updateMember = member.toBuilder().role(newRole).build();

            // DB에 변경된 role 필드값을 반영
            memberRepository.save(updateMember);
        }
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

        if (authenticateUser == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        JwtRefreshToken refreshToken = refreshTokenRepository.findByMember_Id(authenticateUser.getId()).orElse(null);

        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken.getToken())) {
            log.info("유효하지 않을 때");
            refreshToken = jwtTokenProvider.createRefreshToken(authentication);
            refreshToken = refreshToken.toBuilder().member(authenticateUser).build();
            refreshToken = refreshTokenRepository.save(refreshToken);
        }

        return refreshToken;
    }

    public JwtAuthResponse newAccessToken(String requestRefreshToken) {
        if (!jwtTokenProvider.validateToken(requestRefreshToken)) {
            throw new InvalidTokenException("Refresh Token 검증 실패");
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(requestRefreshToken);
        Member member = memberService.getMember(authentication.getName());
        JwtRefreshToken refreshToken = refreshTokenRepository.findByMember_Id(member.getId())
                .orElseThrow(() -> new JwtRefreshTokenNotFoundException("리프레쉬 토큰을 찾을 수 없습니다."));

        assert refreshToken != null;
        if (!refreshToken.getToken().equals(requestRefreshToken)) {
            throw new InvalidTokenException("토큰이 일치하지 않습니다.");
        }

        Map<String, Object> accessTokenMap = jwtTokenProvider.createAccessToken(authentication);

        return new JwtAuthResponse(
                (String) accessTokenMap.get("accessToken"),
                ((Number) accessTokenMap.get("accessTokenExp")).longValue(),
                refreshToken.getToken(),
                member
        );
    }

    @Transactional
    public Member join(final Member member) {
        if (memberRepository.existsByUsername(member.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 존재하는 회원입니다.");
        }

        Member encodingMember = Member.builder()
                .username(member.getUsername())
                .password(passwordEncoder.encode(member.getPassword()))
                .isPaid(member.isPaid())
                .role(MemberRole.USER)
                .build();

        return memberRepository.save(encodingMember);
    }
}
