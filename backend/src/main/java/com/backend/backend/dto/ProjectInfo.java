package com.backend.backend.dto;

public class ProjectInfo {
    private Integer projectId;
    private String name;
    private String description;

    public Integer getId() {
        return projectId;
    }

    public void setId(Integer projectId) {
        this.projectId = projectId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
