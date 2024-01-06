package com.ll.medium.domain.member.member.entity;

import lombok.Getter;

@Getter
public enum MemberRole {
    PAID("ROLE_PAID"),
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    private final String value;

    MemberRole(String value) {
        this.value = value;
    }
}
