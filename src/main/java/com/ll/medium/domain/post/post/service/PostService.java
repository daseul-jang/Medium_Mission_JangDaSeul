package com.ll.medium.domain.post.post.service;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.entity.MemberRole;
import com.ll.medium.domain.post.exception.DataNotFoundException;
import com.ll.medium.domain.post.exception.NoAccessException;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Log4j2
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

    public Post findPost(final Long id, final Member member) {
        Post post = getPost(id);

        if (isPaidPostAccessible(post, member)) {
            throw new NoAccessException("이 글은 멤버십 회원만 볼 수 있어요 😉");
        }

        return post;
    }

    public Post findPost(final String username, final Long id, final Member member) {
        Post post = getUserPost(username, id);

        if (isPaidPostAccessible(post, member)) {
            throw new NoAccessException("이 글은 멤버십 회원만 볼 수 있어요 😉");
        }

        return post;
    }

    // 유료 게시글 조회 권한 판별
    private boolean isPaidPostAccessible(Post post, Member member) {
        return post.getIsPaid() && isNotWriter(member, post) && isUserOrGuest(member);
    }

    // 회원, 게스트 판별
    private boolean isUserOrGuest(Member member) {
        return member == null || member.getRole() == MemberRole.USER;
    }

    // 해당 글의 작성자인지 판별
    private boolean isNotWriter(Member member, Post post) {
        return !post.getWriter().getId().equals(member.getId());
    }

    //findUserPostDetail
    public Post getUserPost(String username, Long id) {
        return postRepository.findByWriter_UsernameAndId(username, id).orElseThrow(() -> new DataNotFoundException("해당 글을 찾을 수 없어요 😥"));
    }

    //findPostDetail
    public Post getPost(Long id) {
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
