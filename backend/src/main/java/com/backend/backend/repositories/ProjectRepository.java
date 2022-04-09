package com.backend.backend.repositories;

import java.util.List;

import com.backend.backend.models.Project;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Integer>, CustomizedProjectRepository {

    Project findByName(String name);

}
