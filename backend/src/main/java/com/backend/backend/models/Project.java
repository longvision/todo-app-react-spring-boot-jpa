package com.backend.backend.models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    private String name;
    private String description;

    @OneToMany(mappedBy = "project", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Task> tasks;

    public Project(Integer id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tasks = new HashSet<Task>();
    }

    public Project() {
    }

    public Integer getProjectId() {
        return id;
    }

    public void setProjectId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(HashSet<Task> hashSet) {
        this.tasks = (Set<Task>) hashSet;
    }

    public void addTask(Task task) {
        tasks.add(task);
        task.setProject(this);

    }

    public void removeTask(Task task) {
        tasks.remove(task);
        task.setProject(null);
    }

}
