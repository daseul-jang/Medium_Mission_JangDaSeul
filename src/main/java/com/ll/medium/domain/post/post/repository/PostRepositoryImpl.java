package com.ll.medium.domain.post.post.repository;

import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.entity.QPost;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;
    private final QPost post = QPost.post;

    @Override
    public List<Post> findPostsAfterCursor(Long cursor, Integer limit) {
        return queryFactory
                .selectFrom(post)
                .where(ltCursorId(cursor), post.isPublic.isTrue())
                .orderBy(post.id.desc())
                .limit(limit)
                .fetch();
    }

    @Override
    public List<Post> findMyAllPostsAfterCursor(Long memberId, Long cursor, Integer limit) {
        return queryFactory
                .selectFrom(post)
                .where(post.writer.id.eq(memberId), ltCursorId(cursor))
                .orderBy(post.id.desc())
                .limit(limit)
                .fetch();
    }

    @Override
    public List<Post> findMyPublicPostsAfterCursor(Long memberId, Long cursor, Integer limit) {
        return queryFactory
                .selectFrom(post)
                .where(post.writer.id.eq(memberId), ltCursorId(cursor), post.isPublic.isTrue())
                .orderBy(post.id.desc())
                .limit(limit)
                .fetch();
    }

    @Override
    public List<Post> findMyPrivatePostsAfterCursor(Long memberId, Long cursor, Integer limit) {
        return queryFactory
                .selectFrom(post)
                .where(post.writer.id.eq(memberId), ltCursorId(cursor), post.isPublic.isFalse())
                .orderBy(post.id.desc())
                .limit(limit)
                .fetch();
    }

    private BooleanExpression ltCursorId(Long cursor) {
        return cursor == null ? null : post.id.lt(cursor);
    }
}
