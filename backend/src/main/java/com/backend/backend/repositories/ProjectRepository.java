package com.backend.backend.repositories;

import java.util.List;

import com.backend.backend.models.Project;
import com.backend.backend.models.Task;

import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Integer>, CustomizedProjectRepository {

    List<Project> findAllProjects();

    void findTasksByProjectId(Integer projectId);

    Project findByName(String name);

}
