package com.ll.medium.domain.post.post.controller;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.service.MemberService;
import com.ll.medium.domain.post.post.dto.PostDto;
import com.ll.medium.domain.post.post.dto.WriteRequestDto;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.service.PostService;
import com.ll.medium.global.dto.ResponseDto;
import com.ll.medium.global.security.authentication.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class PostController {
    private final PostService postService;
    private final MemberService memberService;

    /**
     * 페이지네이션이 적용된 나의 글 목록
     */
    @GetMapping("/myList")
    public ResponseEntity<?> myList(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                    Pageable pageable) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());
        Page<Post> postEntities = postService.findMyList(memberEntity.getId(), pageable);
        List<PostDto> postDtos = postEntities.stream().map(PostDto::new).toList();
        Page<PostDto> postPageList = new PageImpl<>(postDtos, pageable, postEntities.getTotalElements());

        return ResponseEntity.ok(new ResponseDto<>(
                HttpStatus.OK.value(),
                "나의 글 목록 조회 성공",
                postPageList));
    }

    /**
     * 최신 글 목록 (30개)
     */
    @GetMapping("/latest-list")
    public ResponseEntity<?> latestList() {
        return ResponseEntity.ok(new ResponseDto<>(
                HttpStatus.OK.value(),
                "최신 글 30개 조회 성공",
                postService.findLatestPosts()));
    }

    /**
     * 페이지네이션을 적용한 전체 글 목록
     */
    @GetMapping("/list")
    public ResponseEntity<?> list(Pageable pageable) {
        Page<Post> postEntities = postService.findPageList(pageable);
        List<PostDto> postDtos = postEntities.stream().map(PostDto::new).toList();
        Page<PostDto> pagePosts = new PageImpl<>(postDtos, pageable, postEntities.getTotalElements());

        return ResponseEntity.ok(new ResponseDto<>(
                HttpStatus.OK.value(),
                "전체 글 목록 조회 성공",
                pagePosts));
    }

    @PostMapping("/write")
    public ResponseEntity<?> write(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                   @Valid @RequestBody WriteRequestDto reqDto) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());
        Post postEntity = postService.write(PostDto.toEntity(new PostDto(reqDto, memberEntity)));

        return ResponseEntity.ok(new ResponseDto<>(
                HttpStatus.CREATED.value(),
                "글 작성 성공",
                new PostDto(postEntity)));
    }
}
