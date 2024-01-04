package com.ll.medium.domain.post.comment.controller;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.service.MemberService;
import com.ll.medium.domain.post.comment.dto.CommentDto;
import com.ll.medium.domain.post.comment.entity.Comment;
import com.ll.medium.domain.post.comment.service.CommentService;
import com.ll.medium.domain.post.exception.DataNotFoundException;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.service.PostService;
import com.ll.medium.global.dto.ResponseDto;
import com.ll.medium.global.security.authentication.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post/{postId}/comment")
public class CommentController {
    private final PostService postService;
    private final MemberService memberService;
    private final CommentService commentService;

    @DeleteMapping("/{commentId}/delete")
    public ResponseEntity<?> commentDelete(@PathVariable("postId") Long postId,
                                           @PathVariable("commentId") Long commentId,
                                           @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Post postEntity = postService.getPost(postId);
        Comment commentEntity = commentService.getComment(commentId);

        checkCommentExistence(postEntity, commentEntity);

        Member memberEntity = memberService.getMember(userPrincipal.getUsername());
        commentService.deleteComment(commentEntity, memberEntity);

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "댓글 삭제 성공",
                        null
                )
        );
    }

    @PutMapping("/{commentId}/modify")
    public ResponseEntity<?> commentModify(@PathVariable("postId") Long postId,
                                           @PathVariable("commentId") Long commentId,
                                           @AuthenticationPrincipal UserPrincipal userPrincipal,
                                           @RequestBody String content) {
        Post postEntity = postService.getPost(postId);
        Comment commentEntity = commentService.getComment(commentId);

        checkCommentExistence(postEntity, commentEntity);

        Member memberEntity = memberService.getMember(userPrincipal.getUsername());
        Comment commentModifyResult = commentService.modifyComment(commentEntity, memberEntity, content);

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.OK.value(),
                        "댓글 수정 성공",
                        new CommentDto(commentModifyResult)
                )
        );
    }

    @PostMapping("/write")
    public ResponseEntity<?> commentWrite(@PathVariable("postId") Long postId,
                                          @AuthenticationPrincipal UserPrincipal userPrincipal,
                                          @RequestBody String content) {
        Post postEntity = postService.getPost(postId);
        Member memberEntity = memberService.getMember(userPrincipal.getUsername());

        Comment commentEntity = commentService.writeComment(postEntity, memberEntity, content);

        return ResponseEntity.ok(
                new ResponseDto<>(
                        HttpStatus.CREATED.value(),
                        "댓글 작성 성공",
                        new CommentDto(commentEntity)
                )
        );
    }

    private void checkCommentExistence(Post postEntity, Comment commentEntity) {
        Optional<Comment> filterComment = postEntity.getComments().stream()
                .filter(comment -> comment.equals(commentEntity)).findFirst();

        if (filterComment.isEmpty()) {
            throw new DataNotFoundException("해당 게시글에 존재하지 않는 댓글이에요.");
        }
    }
}
