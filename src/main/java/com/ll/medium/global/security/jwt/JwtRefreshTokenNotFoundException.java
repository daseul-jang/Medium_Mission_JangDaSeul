package com.ll.medium.global.security.jwt;

public class JwtRefreshTokenNotFoundException extends RuntimeException {
    public JwtRefreshTokenNotFoundException(String message) {
        super(message);
    }
}
