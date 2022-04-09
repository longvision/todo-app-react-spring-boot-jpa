package com.backend.backend.dto;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDateTime;

public class TaskInfo {
    private Integer id;
    private String description;
    private String title;
    private Date deadline;
    private Boolean isDone;
    private Integer projectId;
    public LocalDateTime publishedAt;
    private String category;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPublishedAt(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

    public LocalDateTime getPublishedAt() {
        return publishedAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Boolean getIsDone() {
        return isDone;
    }

    public void setIsDone(Boolean b) {
        this.isDone = b;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

}
