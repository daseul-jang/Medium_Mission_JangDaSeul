package com.ll.medium.global.security.authentication;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.entity.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UserPrincipal implements UserDetails {
    private Member member;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserPrincipal create(Member member) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(
                        new SimpleGrantedAuthority(
                                "admin".equals(member.getUsername()) ?
                                        MemberRole.ADMIN.getValue() : (
                                        member.isPaid() ?
                                                MemberRole.PAID.getValue() : MemberRole.USER.getValue()
                                )
                        )
                );

        return UserPrincipal.builder()
                .member(member)
                .authorities(authorities)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public String getUsername() {
        return member.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
