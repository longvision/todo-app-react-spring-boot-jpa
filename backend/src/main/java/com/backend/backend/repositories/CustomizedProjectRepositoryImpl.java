package com.backend.backend.repositories;

import java.util.*;

import com.backend.backend.models.Project;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class CustomizedProjectRepositoryImpl implements CustomizedProjectRepository {
    private final JdbcTemplate jdbc;

    public CustomizedProjectRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Project> findProjectList() {
        String sql = "SELECT project_id, name FROM project";

        List<Map<String, Object>> rows = jdbc.queryForList(sql);

        List<Project> names = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            Project pub = new Project();
            pub.setProjectId((Integer) (row.get("projectId")));
            pub.setName((String) (row.get("name")));
            names.add(pub);
        }

        return names;
    }

    public Project findByName(String name) {
        String sql = "SELECT project_id, name FROM project WHERE name = ?";

        RowMapper<Project> rowMapper = (r, i) -> {
            Project pub = new Project();
            pub.setProjectId((Integer) (r.getInt("projectId")));
            pub.setName((String) (r.getString("name")));
            return pub;
        };

        return jdbc.query(sql, rowMapper, name).get(0);
    }

    @Override
    public List<Project> findAllProjects() {
        // TODO Auto-generated method stub
        return null;
    }

}
