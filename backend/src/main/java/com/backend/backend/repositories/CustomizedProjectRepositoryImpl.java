package com.backend.backend.repositories;

import java.util.*;

import com.backend.backend.models.Project;

import org.springframework.jdbc.core.JdbcTemplate;

public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {
    private final JdbcTemplate jdbc;

    public CustomizedProjectRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Project> findProjectList() {
        String sql = "SELECT project_id, project_name FROM project";

        List<Map<String, Object>> rows = jdbc.queryForList(sql);

        List<Project> names = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            Project pub = new Project();
            pub.setProjectId((Integer) (row.get("project_id")));
            pub.setProjectName((String) (row.get("project_name")));
            names.add(pub);
        }

        return names;
    }

}
