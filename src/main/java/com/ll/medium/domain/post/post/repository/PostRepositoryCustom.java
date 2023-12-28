package com.ll.medium.domain.post.post.repository;

import com.ll.medium.domain.post.post.entity.Post;

import java.util.List;

public interface PostRepositoryCustom {
    List<Post> findPostsAfterCursor(Long cursorId, int limit);
}
