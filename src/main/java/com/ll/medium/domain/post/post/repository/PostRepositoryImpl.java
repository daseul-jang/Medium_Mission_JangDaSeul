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
    public List<Post> findPostsAfterCursor(Long cursorId, int limit) {
        /*if (cursorId == null) {
            cursorId = Long.MAX_VALUE;
        }

        Long validLastPostId = queryFactory
                .select(post.id.max())
                .from(post)
                .where(post.id.lt(cursorId))
                .fetchOne();

        if (validLastPostId != null) {
            cursorId = validLastPostId;
        }*/

        return queryFactory
                /*.selectFrom(post)
                .where(post.id.lt(cursorId))
                .orderBy(post.id.desc())
                .limit(limit)
                .fetch();*/
                .selectFrom(post)
                .where(ltCursorId(cursorId))
                .orderBy(post.id.desc())
                .limit(limit)
                .fetch();
    }

    private BooleanExpression ltCursorId(Long cursorId) {
        return cursorId == null ? null : post.id.lt(cursorId);
    }
}
