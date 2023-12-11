package com.ll.medium.domain.member.member.controller;

import com.ll.medium.domain.member.exception.PasswordNotMatchException;
import com.ll.medium.domain.member.member.dto.JoinRequestDto;
import com.ll.medium.domain.member.member.dto.MemberDto;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.service.MemberService;
import com.ll.medium.global.dto.ResponseDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/login")
    public ResponseEntity<?> login() {
        return ResponseEntity.ok("");
    }

    @PostMapping("/join")
    public ResponseEntity<?> join(@Valid @RequestBody JoinRequestDto joinDto) {
        log.info("join request dto : {}", joinDto.toString());
        if (!joinDto.isPasswordConfirm()) {
            throw new PasswordNotMatchException("비밀번호가 서로 일치하지 않습니다.");
        }

        Member member = memberService.join(Member.builder()
                .username(joinDto.getUsername())
                .password(joinDto.getPassword())
                .build());

        return ResponseEntity.ok(new ResponseDto<>(
                HttpStatus.CREATED.value(), "성공적으로 가입되었습니다!", new MemberDto(member)));
    }
}
