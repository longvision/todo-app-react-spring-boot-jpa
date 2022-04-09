package com.backend.backend.repositories;

import java.time.LocalDateTime;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.backend.backend.dto.TaskInfo;
import com.backend.backend.models.Project;
import com.backend.backend.models.Task;

public class CustomizedTaskRepositoryImpl implements CustomizedTaskRepository {
    private final JdbcTemplate jdbc;

    public CustomizedTaskRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // public List<TaskInfo> findTaskInfoList() {
    // String sql = "SELECT * FROM task";

    // RowMapper<TaskInfo> rowMapper = (r, i) -> {
    // TaskInfo task = new TaskInfo();
    // task.setId(r.getInt("id"));
    // task.setProjectId(r.getInt("project_id"));
    // task.setDescription(r.getString("description"));
    // task.setTitle(r.getString("title"));
    // task.setDeadline(r.getDate("deadline"));
    // task.setDone(r.getBoolean("is_done"));
    // return task;
    // };

    // return jdbc.query(sql, rowMapper);
    // }

    // public TaskInfo findTaskInfoById(Integer id) {
    // String sql = "SELECT * FROM task where id = ?";

    // RowMapper<TaskInfo> rowMapper = (r, i) -> {
    // TaskInfo task = new TaskInfo();
    // task.setId(r.getInt("id"));
    // task.setProjectId(r.getInt("project_id"));
    // task.setDescription(r.getString("description"));
    // task.setTitle(r.getString("title"));
    // task.setDeadline(r.getDate("deadline"));
    // task.setDone(r.getBoolean("is_done"));
    // return task;
    // };

    // return jdbc.query(sql, rowMapper, id.intValue()).get(0);
    // }

    public List<Task> findTasksByProjectId(Integer projectId) {
        String sql = "SELECT * FROM task JOIN project ON project.id =  task.project_id WHERE project.id = ?";

        RowMapper<Task> rowMapper = (r, i) -> {

            Task task = new Task();
            Project project = new Project();
            task.setId(r.getInt("id"));
            task.setDescription(r.getString("description"));
            task.setTitle(r.getString("title"));
            task.setDeadline(r.getDate("deadline"));
            task.setIsDone(r.getBoolean("is_done"));
            task.setProject(project);
            return task;
        };
        return jdbc.query(sql, rowMapper, projectId.intValue());
    }

    public List<Task> findTasksByProject() {
        String sql = "SELECT * FROM task JOIN project ON project.id = task.project_id";

        RowMapper<Task> rowMapper = (r, i) -> {

            Task task = new Task();
            task.setId(r.getInt("id"));
            task.setDescription(r.getString("description"));
            task.setTitle(r.getString("title"));
            task.setDeadline(r.getDate("deadline"));
            task.setIsDone(r.getBoolean("is_done"));
            return task;
        };
        return jdbc.query(sql, rowMapper);
    }

    // public List<Task> findTaskByProjectId(Integer id) {
    // String sql = "SELECT * FROM task JOIN project ON project.id = task.project_id
    // WHERE project.id = ?";

    // RowMapper<Task> rowMapper = (r, i) -> {

    // Task task = new Task();
    // task.setId(r.getInt("id"));
    // task.setDescription(r.getString("description"));
    // task.setTitle(r.getString("title"));
    // task.setDeadline(r.getDate("deadline"));
    // task.setIsDone(r.getBoolean("is_done"));
    // return task;
    // };
    // return jdbc.query(sql, rowMapper, id.intValue());

    // }

}
