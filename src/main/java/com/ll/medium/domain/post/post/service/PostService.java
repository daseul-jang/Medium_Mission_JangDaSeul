package com.ll.medium.domain.post.post.service;

import com.ll.medium.domain.post.exception.DataNotFoundException;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;

    @Transactional
    public void deletePost(final Post post, final String authUser) {
        if (!post.getWriter().getUsername().equals(authUser)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "삭제 권한이 없습니다.");
        }

        postRepository.deleteById(post.getId());
    }

    @Transactional
    public Post modifyPost(final Post post, final String authUser) {
        if (!post.getWriter().getUsername().equals(authUser)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "수정 권한이 없습니다.");
        }

        return postRepository.save(post);
    }

    public Post findPost(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 글을 찾을 수 없어요 😥"));
    }

    public List<Post> findByMemberIdPrivatePosts(Long memberId, Long cursor, Integer limit) {
        return postRepository.findMyPrivatePostsAfterCursor(memberId, cursor, limit);
    }

    public List<Post> findByMemberIdPublicPosts(Long memberId, Long cursor, Integer limit) {
        return postRepository.findMyPublicPostsAfterCursor(memberId, cursor, limit);
    }

    public List<Post> findByMemberIdAllPosts(Long memberId, Long cursor, Integer limit) {
        return postRepository.findMyAllPostsAfterCursor(memberId, cursor, limit);
    }

    /**
     * 페이지네이션이 적용된 나의 글 목록 (비공개)
     */
    public Page<Post> findByMemberIdPrivatePosts(Long memberId, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("id").descending());

        Page<Post> page = postRepository.findByIsPublicFalseAndWriter_Id(memberId, sortedPageable);

        return Optional.of(page)
                .filter(Slice::hasContent)
                .orElseThrow(() -> new DataNotFoundException("비공개 글이 없어요 🥲"));
    }

    /**
     * 페이지네이션이 적용된 나의 글 목록 (공개)
     */
    public Page<Post> findByMemberIdPublicPosts(Long memberId, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("id").descending());

        Page<Post> page = postRepository.findByIsPublicTrueAndWriter_Id(memberId, sortedPageable);

        return Optional.of(page)
                .filter(Slice::hasContent)
                .orElseThrow(() -> new DataNotFoundException("공개 글이 없어요 🥲"));
    }

    /**
     * 페이지네이션이 적용된 나의 글 목록 (전체)
     */
    public Page<Post> findByMemberIdAllPosts(Long memberId, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("id").descending());

        Page<Post> page = postRepository.findByWriter_Id(memberId, sortedPageable);

        return Optional.of(page)
                .filter(Slice::hasContent)
                .orElseThrow(() -> new DataNotFoundException("작성된 글이 없어요 🥲"));
    }

    /**
     * 최신글 30개 조회 및 정렬
     */
    public Page<Post> findLatestPosts() {
        Pageable pageable = PageRequest.of(0, 30, Sort.by(Sort.Direction.DESC, "createDate"));
        return postRepository.findByIsPublicTrueOrderByCreateDateDesc(pageable);
    }

    /**
     * 페이지네이션이 적용된 리스트
     */
    public Page<Post> findPageList(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("id").descending());

        Page<Post> page = postRepository.findByIsPublicTrue(sortedPageable);

        return Optional.of(page)
                .filter(Slice::hasContent)
                .orElseThrow(() -> new DataNotFoundException("작성된 글이 없어요 🥲"));
    }

    public List<Post> findInfiniteList(Long cursor, Integer limit) {
        return postRepository.findPostsAfterCursor(cursor, limit);
    }

    @Transactional
    public Post write(final Post post) {
        return postRepository.save(post);
    }
}
