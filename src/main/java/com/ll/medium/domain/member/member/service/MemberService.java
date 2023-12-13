package com.ll.medium.domain.member.member.service;

import com.ll.medium.domain.member.exception.UserNotFoundException;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member getMember(final String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("회원을 찾을 수 없어요."));
    }
}
