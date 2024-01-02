package com.ll.medium.domain.post.post.repository;

import com.ll.medium.domain.post.post.entity.Post;

import java.util.List;

public interface PostRepositoryCustom {
    List<Post> findPostsAfterCursor(Long cursor, Integer limit);

    List<Post> findMyAllPostsAfterCursor(Long memberId, Long cursor, Integer limit);

    List<Post> findMyPublicPostsAfterCursor(Long memberId, Long cursor, Integer limit);

    List<Post> findMyPrivatePostsAfterCursor(Long memberId, Long cursor, Integer limit);
}
