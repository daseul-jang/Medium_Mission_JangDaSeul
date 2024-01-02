package com.ll.medium.global.security.repository;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.global.security.entity.JwtRefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JwtRefreshTokenRepository extends JpaRepository<JwtRefreshToken, Long> {
    Optional<JwtRefreshToken> findByMember(Member authenticateUser);

    Optional<JwtRefreshToken> findByMember_Id(Long id);
}
