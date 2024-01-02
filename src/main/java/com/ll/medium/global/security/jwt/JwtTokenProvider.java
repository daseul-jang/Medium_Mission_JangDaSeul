package com.ll.medium.global.security.jwt;

import com.ll.medium.global.security.authentication.UserDetailsServiceImpl;
import com.ll.medium.global.security.authentication.UserPrincipal;
import com.ll.medium.global.security.entity.JwtRefreshToken;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-msec}")
    private long accessTokenExpirationMsec;

    @Value("${jwt.refresh-token-expiration-msec}")
    private long refreshTokenExpirationMsec;

    private final UserDetailsServiceImpl userDetailsService;

    public SecretKey createKey(String tokenSecret) {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(tokenSecret));
    }

    public Map<String, Object> createAccessToken(Authentication authentication) {
        String token = createToken(authentication, accessTokenExpirationMsec);
        Date expiryDate = createExpiryDate(accessTokenExpirationMsec);

        log.info("token provider exp: {}", expiryDate.getTime());

        return Map.of(
                "accessToken", token,
                "accessTokenExp", expiryDate.getTime()
        );
    }

    public JwtRefreshToken createRefreshToken(Authentication authentication) {
        log.info("리프레시 토큰 생성하는 곳");
        String token = createToken(authentication, refreshTokenExpirationMsec);
        return JwtRefreshToken.builder()
                .token(token)
                .expiryDate(createExpiryDate(refreshTokenExpirationMsec).toInstant())
                .build();
    }

    public String createToken(Authentication authentication, long tokenExpiryDate) {
        return Jwts.builder()
                .claim("username", authentication.getName())
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(createExpiryDate(tokenExpiryDate))
                .signWith(createKey(secretKey))
                .compact();
    }

    public Date createExpiryDate(long tokenExpiryDate) {
        return new Date(new Date().getTime() + tokenExpiryDate);
    }

    // 토큰에서 사용자 이름(username) 추출
    public String getUsernameFromToken(String token) {
        return Jwts.parser().verifyWith(createKey(secretKey)).build().parseSignedClaims(token).getPayload().getSubject();
    }

    // 토큰에서 사용자 이름을 추출한 후 해당 사용자 조회
    public Authentication getAuthentication(String token) {
        UserPrincipal userPrincipal = (UserPrincipal) userDetailsService.loadUserByUsername(getUsernameFromToken(token));
        return new UsernamePasswordAuthenticationToken(userPrincipal, "", userPrincipal.getAuthorities());
    }

    public boolean validateToken(String token) {
        log.info("validateToken");
        log.info(token);
        try {
            Jwts.parser().verifyWith(createKey(secretKey)).build().parseSignedClaims(token);
            return true;
        } catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException |
                 IllegalArgumentException e) {
            log.error("Token validation failed", e);
            return false;
        }
    }

    /*public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(createKey(secretKey)).build().parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            throw new JwtException("잘못된 서명입니다.", e.getCause());
        } catch (MalformedJwtException e) {
            throw new JwtException("올바른 토큰 형식이 아닙니다.", e.getCause());
        } catch (ExpiredJwtException e) {
            throw new JwtException("만료된 토큰입니다.", e.getCause());
        } catch (UnsupportedJwtException e) {
            throw new JwtException("지원하지 않는 토큰 형식입니다.", e.getCause());
        } catch (IllegalArgumentException e) {
            throw new JwtException("토큰이 존재하지 않습니다.", e.getCause());
        }
    }*/
}
