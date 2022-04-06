package com.backend.backend.repositories;

import java.util.*;

import com.backend.backend.models.Project;

interface CustomizedProjectRepository {
    List<Project> findProjectList();

    List<Project> findAllProjects();

    Project findByName(String name);
}
