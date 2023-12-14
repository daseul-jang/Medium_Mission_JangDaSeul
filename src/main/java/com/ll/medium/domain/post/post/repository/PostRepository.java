package com.ll.medium.domain.post.post.repository;

import com.ll.medium.domain.post.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByIsPublicTrue(Pageable pageable);

    Page<Post> findByIsPublicTrueOrderByCreateDateDesc(Pageable pageable);

    Page<Post> findByIsPublicTrueAndWriter_IdOrderById(Long id, Pageable pageable);
}
