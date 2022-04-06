package com.backend.backend.repositories;

import com.backend.backend.models.Project;

import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Integer>, CustomizedProjectRepository {

}
