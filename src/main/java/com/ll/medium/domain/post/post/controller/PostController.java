package com.ll.medium.domain.post.post.controller;

import com.ll.medium.domain.member.exception.UserNotFoundException;
import com.ll.medium.domain.member.member.dto.MemberDto;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.service.MemberService;
import com.ll.medium.domain.post.comment.entity.Comment;
import com.ll.medium.domain.post.comment.service.CommentService;
import com.ll.medium.domain.post.exception.NoAccessException;
import com.ll.medium.domain.post.post.dto.ModifyRequestDto;
import com.ll.medium.domain.post.post.dto.PostDto;
import com.ll.medium.domain.post.post.dto.WriteRequestDto;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.service.PostService;
import com.ll.medium.global.dto.PageDto;
import com.ll.medium.global.dto.ResponseDto;
import com.ll.medium.global.security.authentication.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class PostController {
    private final PostService postService;
    private final MemberService memberService;
    private final CommentService commentService;

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> postDelete(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @PathVariable("id") Long id) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        Post postEntity = postService.getPost(id);
        postService.deletePost(postEntity, memberEntity.getUsername());

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "성공적으로 삭제되었습니다.",
                        null
                )
        );
    }

    @PutMapping("/{id}/modify")
    public ResponseEntity<?> postModify(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @PathVariable("id") Long id,
                                        @RequestBody ModifyRequestDto modifyDto) {
        Post postEntity = postService.getPost(id);

        postEntity = postEntity.toBuilder()
                .title(modifyDto.getTitle())
                .subtitle(modifyDto.getSubtitle())
                .content(modifyDto.getContent())
                .isPublic(modifyDto.isPublic())
                .isPaid(modifyDto.isPaid())
                .build();

        postEntity = postService.modifyPost(postEntity, userPrincipal.getUsername());

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "내 글 수정 성공",
                        new PostDto(postEntity)
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> postDetail(@PathVariable("id") Long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Member memberEntity = null;

        if (principal instanceof UserPrincipal) {
            memberEntity = memberService.getMember(((UserPrincipal) principal).getUsername());
        }

        Post postEntity = postService.findPost(id, memberEntity);

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "상세 글 조회 성공",
                        new PostDto(postEntity)
                )
        );
    }

    @GetMapping("/b/{username}/{postId}")
    public ResponseEntity<?> userPostDetail(@PathVariable("username") String username,
                                            @PathVariable("postId") Long postId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Member memberEntity = null;

        if (principal instanceof UserPrincipal) {
            memberEntity = memberService.getMember(((UserPrincipal) principal).getUsername());
        }

        Post postEntity = postService.findPost(username, postId, memberEntity);

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "상세 글 조회 성공",
                        new PostDto(postEntity)
                )
        );
    }

    @GetMapping("/b/{username}/mobile")
    public ResponseEntity<?> userPublicPosts(@PathVariable("username") String username,
                                             @RequestParam(value = "cursor", required = false) Long cursor,
                                             @RequestParam(value = "limit", defaultValue = "5") Integer limit) {
        Member memberEntity = memberService.getMember(username);

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        List<Post> myPostEntities = postService.findByMemberIdPublicPosts(memberEntity.getId(), cursor, limit);

        return myPostsResponseEntity(myPostEntities, username + "의 공개 글 목록 조회 성공 (mobile)");
    }

    @GetMapping("/b/{username}/pc")
    public ResponseEntity<?> userPublicPosts(@PathVariable("username") String username,
                                             Pageable pageable) {
        Member memberEntity = memberService.getMember(username);

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        Page<Post> postEntities = postService.findByMemberIdPublicPosts(memberEntity.getId(), pageable);

        return myPostsResponseEntity(pageable, postEntities, username + "의 공개 글 목록 조회 성공 (pc)");
    }

    /**
     * 커서 기반 페이지네이션(no-offset)이 적용된 나의 글 목록 (mobile)
     * 각각 위에서부터 비공개/공개/전체
     */
    @GetMapping("/myList/private/mobile")
    public ResponseEntity<?> myPrivatePosts(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                            @RequestParam(value = "cursor", required = false) Long cursor,
                                            @RequestParam(value = "limit", defaultValue = "5") Integer limit) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        List<Post> myPostEntities = postService.findByMemberIdPrivatePosts(memberEntity.getId(), cursor, limit);

        return myPostsResponseEntity(myPostEntities, "나의 비공개 글 목록 조회 성공");
    }

    @GetMapping("/myList/public/mobile")
    public ResponseEntity<?> myPublicPosts(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                           @RequestParam(value = "cursor", required = false) Long cursor,
                                           @RequestParam(value = "limit", defaultValue = "5") Integer limit) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        List<Post> myPostEntities = postService.findByMemberIdPublicPosts(memberEntity.getId(), cursor, limit);

        return myPostsResponseEntity(myPostEntities, "나의 공개 글 목록 조회 성공");
    }

    @GetMapping("/myList/all/mobile")
    public ResponseEntity<?> myAllPosts(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @RequestParam(value = "cursor", required = false) Long cursor,
                                        @RequestParam(value = "limit", defaultValue = "5") Integer limit) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        List<Post> myPostEntities = postService.findByMemberIdAllPosts(memberEntity.getId(), cursor, limit);

        return myPostsResponseEntity(myPostEntities, "나의 전체 글 목록 조회 성공");
    }

    private ResponseEntity<?> myPostsResponseEntity(List<Post> myPostEntities, String message) {
        if (myPostEntities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<PostDto> myPostDtos = myPostEntities.stream().map(PostDto::new).toList();

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        message,
                        myPostDtos
                )
        );
    }

    /**
     * 페이지네이션(offset)이 적용된 나의 글 목록 (pc)
     * 각각 위에서부터 비공개/공개/전체
     */
    @GetMapping("/myList/private/pc")
    public ResponseEntity<?> myPrivatePosts(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                            Pageable pageable) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        Page<Post> postEntities = postService.findByMemberIdPrivatePosts(memberEntity.getId(), pageable);

        return myPostsResponseEntity(pageable, postEntities, "나의 비공개 글 목록 조회 성공");
    }

    @GetMapping("/myList/public/pc")
    public ResponseEntity<?> myPublicPosts(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                           Pageable pageable) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        Page<Post> postEntities = postService.findByMemberIdPublicPosts(memberEntity.getId(), pageable);

        return myPostsResponseEntity(pageable, postEntities, "나의 공개 글 목록 조회 성공");
    }

    @GetMapping("/myList/all/pc")
    public ResponseEntity<?> myAllPosts(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        Pageable pageable) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        Page<Post> postEntities = postService.findByMemberIdAllPosts(memberEntity.getId(), pageable);

        return myPostsResponseEntity(pageable, postEntities, "나의 글 목록 조회 성공");
    }

    private ResponseEntity<?> myPostsResponseEntity(Pageable pageable, Page<Post> postEntities, String message) {
        List<PostDto> postDtos = postEntities.stream().map(PostDto::new).toList();
        Page<PostDto> postPages = new PageImpl<>(postDtos, pageable, postEntities.getTotalElements());

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        message,
                        new PageDto<>(postPages)
                )
        );
    }

    /**
     * 최신 글 목록 (30개)
     */
    @GetMapping("/latest-list")
    public ResponseEntity<?> latestList() {
        Page<Post> postEntities = postService.findLatestPosts();
        List<PostDto> postDtos = postEntities.stream().map(PostDto::new).toList();

        Page<PostDto> pagePosts = new PageImpl<>(
                postDtos,
                postEntities.getPageable(),
                postEntities.getTotalElements());

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "최신 글 30개 조회 성공",
                        pagePosts
                )
        );
    }

    /**
     * 페이지네이션(offset)을 적용한 전체 공개 글 목록
     */
    @GetMapping("/list")
    public ResponseEntity<?> list(Pageable pageable) {
        Page<Post> postEntities = postService.findPageList(pageable);
        List<PostDto> postDtos = postEntities.stream().map(PostDto::new).toList();
        Page<PostDto> pagePosts = new PageImpl<>(postDtos, pageable, postEntities.getTotalElements());

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "전체 글 목록 조회 성공",
                        pagePosts
                )
        );
    }

    /**
     * 커서 기반 페이지네이션(no-offset) 전체 공개 글 목록 (무한 스크롤)
     */
    @GetMapping("/infinite-list")
    public ResponseEntity<?> infiniteList(@RequestParam(value = "cursor", required = false) Long cursor,
                                          @RequestParam(value = "limit", defaultValue = "20") Integer limit) {
        List<Post> postEntities = postService.findInfiniteList(cursor, limit);

        if (postEntities.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<PostDto> postDtos = postEntities.stream().map(PostDto::new).toList();

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "글 조회 성공",
                        postDtos
                )
        );
    }

    @PostMapping("/write")
    public ResponseEntity<?> write(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                   @Valid @RequestBody WriteRequestDto reqDto) {
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        if (memberEntity == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요.");
        }

        Post post = PostDto.toEntity(new PostDto(reqDto, memberEntity));
        post = post.toBuilder().writer(memberEntity).build();

        log.info("post username: {}", post.getWriter().getUsername());

        Post postEntity = postService.write(post);

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.CREATED.value(),
                        "글 작성 성공",
                        new PostDto(postEntity)
                )
        );
    }
}
