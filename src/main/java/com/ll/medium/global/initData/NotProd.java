package com.ll.medium.global.initData;

import com.ll.medium.domain.member.member.entity.Member;
import com.ll.medium.domain.member.member.repository.MemberRepository;
import com.ll.medium.domain.member.member.service.AuthService;
import com.ll.medium.domain.post.post.entity.Post;
import com.ll.medium.domain.post.post.repository.PostRepository;
import com.ll.medium.domain.post.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.stream.IntStream;

@Component
@RequiredArgsConstructor
@Profile("dev")
public class NotProd implements ApplicationRunner {
    private final AuthService authService;
    private final PostService postService;
    private final MemberRepository memberRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (memberRepository.count() == 0) {
            IntStream.rangeClosed(1, 20).forEach(i -> {
                Member testMember = Member.builder()
                        .username("test" + i)
                        .password("test" + i)
                        .isPaid(i % 2 == 0)
                        .build();

                Member resultMember = authService.join(testMember);

                IntStream.rangeClosed(1, 25).forEach(j -> {
                    Post post = Post.builder()
                            .title("Title " + j)
                            .content("Content " + j)
                            .writer(resultMember)
                            .isPublic(true)
                            .isPaid(i % 3 == 0)
                            .build();

                    postService.write(post);
                });

                IntStream.rangeClosed(26, 50).forEach(j -> {
                    Post post = Post.builder()
                            .title("Title " + j)
                            .content("Content " + j)
                            .writer(resultMember)
                            .isPublic(false)
                            .isPaid(i % 3 == 0)
                            .build();

                    postService.write(post);
                });
            });
        }
    }
}