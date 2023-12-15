package com.ll.medium.domain.post.post.service;

import com.ll.medium.domain.post.exception.DataNotFoundException;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;

    /**
     * 페이지네이션이 적용된 나의 글 목록
     */
    public Page<Post> findMyList(Long memberId, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(
                pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("id").descending());

        Page<Post> page = postRepository.findByIsPublicTrueAndWriter_IdOrderById(memberId, sortedPageable);

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

    @Transactional
    public Post write(final Post post) {
        return postRepository.save(post);
    }
}
