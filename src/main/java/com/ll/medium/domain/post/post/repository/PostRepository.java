package com.ll.medium.domain.post.post.repository;

import com.ll.medium.domain.post.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {
    Page<Post> findByIsPublicTrue(Pageable pageable);

    Page<Post> findByIsPublicTrueOrderByCreateDateDesc(Pageable pageable);

    Page<Post> findByIsPublicTrueAndWriter_Id(Long id, Pageable pageable);

    Page<Post> findByWriter_Id(Long id, Pageable pageable);

    Page<Post> findByIsPublicFalseAndWriter_Id(Long memberId, Pageable sortedPageable);

    Post findTopByIdLessThanOrderByIdDesc(Long id);
}
