package com.backend.backend.models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer projectId;
    private String projectName;

    // @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    // private Set<Task> tasks;

    public Project(String projectName) {
        this.projectName = projectName;
        // this.tasks = new HashSet<Task>();
    }

    public Project() {
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    // public Set<Task> getTasks() {
    // return tasks;
    // }

    // public void setTasks(HashSet<Task> tasks) {
    // this.tasks = tasks;
    // }

}
