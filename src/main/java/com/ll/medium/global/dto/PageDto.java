package com.ll.medium.global.dto;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class PageDto<T> {
    private List<T> content;
    private int number;
    private int size;
    private int totalPages;
    private long totalElement;

    public PageDto(Page<T> page) {
        this.content = page.getContent();
        this.number = page.getNumber() + 1;
        this.size = page.getSize();
        this.totalPages = page.getTotalPages();
        this.totalElement = page.getTotalElements();
    }
}
