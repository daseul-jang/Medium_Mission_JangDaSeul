package com.ll.medium.global.security.jwt;

import com.ll.medium.global.security.authentication.UserDetailsServiceImpl;
import com.ll.medium.global.security.authentication.UserPrincipal;
import com.ll.medium.global.security.entity.JwtRefreshToken;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

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

    public String createAccessToken(Authentication authentication) {
        return createToken(authentication, accessTokenExpirationMsec);
    }

    public JwtRefreshToken createRefreshToken(Authentication authentication) {
        String token = createToken(authentication, refreshTokenExpirationMsec);
        Date expiryDate = new Date(new Date().getTime() + refreshTokenExpirationMsec);
        return JwtRefreshToken.builder()
                .token(token)
                .expiryDate(expiryDate.toInstant())
                .build();
    }

    public String createToken(Authentication authentication, long tokenExpiryDate) {
        Date expiryDate = new Date(new Date().getTime() + tokenExpiryDate);
        return Jwts.builder()
                .claim("username", authentication.getName())
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(expiryDate)
                .signWith(createKey(secretKey))
                .compact();
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
    }
}
