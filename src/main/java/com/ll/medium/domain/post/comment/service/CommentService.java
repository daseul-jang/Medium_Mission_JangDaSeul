package com.ll.medium.domain.post.comment.service;

import com.ll.medium.domain.member.exception.UserNotFoundException;
import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.post.comment.entity.Comment;
import com.ll.medium.domain.post.comment.repository.CommentRepository;
import com.ll.medium.domain.post.exception.DataNotFoundException;
import com.ll.medium.domain.post.post.entity.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;

    @Transactional
    public Comment writeComment(final Post post, final Member member, final String content) {
        if (member == null) {
            throw new UserNotFoundException("작성자 정보를 찾을 수 없어요 😥");
        }

        Comment comment = Comment.builder()
                .post(post)
                .writer(member)
                .content(content)
                .build();

        return commentRepository.save(comment);
    }

    public List<Comment> findCommentsByIds(final List<Long> commentIds) {
        return commentRepository.findAllById(commentIds);
    }

    public Comment getComment(final Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new DataNotFoundException("해당 댓글을 찾을 수 없어요 😥"));
    }

    @Transactional
    public Comment modifyComment(final Comment comment, final Member member, final String content) {
        if (member == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요..🥹");
        }

        if (!comment.getWriter().getUsername().equals(member.getUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        Comment newComment = comment.toBuilder().content(content).build();

        return commentRepository.save(newComment);
    }

    @Transactional
    public void deleteComment(final Comment comment, final Member member) {
        log.info("delete service comment id?: {}", comment.getId());
        if (member == null) {
            throw new UserNotFoundException("회원을 찾을 수 없어요..🥹");
        }

        if (!comment.getWriter().getUsername().equals(member.getUsername())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        commentRepository.delete(comment);
    }
}
