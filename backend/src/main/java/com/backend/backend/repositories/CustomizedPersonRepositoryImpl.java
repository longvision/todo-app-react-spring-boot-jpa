package com.backend.backend.repositories;

import java.time.LocalDateTime;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

// import com.backend.backend.dto.PersonInfo;
import com.backend.backend.models.Project;
import com.backend.backend.models.Person;

public class CustomizedPersonRepositoryImpl implements CustomizedPersonRepository {
    private final JdbcTemplate jdbc;

    public CustomizedPersonRepositoryImpl(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Person> findPersonsByProjectId(Integer projectId) {
        String sql = "SELECT * FROM person JOIN project ON project.id =  person.project_id WHERE project.id = ?";

        RowMapper<Person> rowMapper = (r, i) -> {

            Person person = new Person();
            Project project = new Project();
            person.setId(r.getInt("id"));
            person.setFullName(r.getString("name"));
            person.setImageUrl(r.getString("image_url"));
            person.setUsername(r.getString("username"));
            return person;
        };
        return jdbc.query(sql, rowMapper, projectId.intValue());
    }

    public List<Person> findPersonsByProject() {
        String sql = "SELECT * FROM person JOIN project ON project.id = person.project_id";

        RowMapper<Person> rowMapper = (r, i) -> {

            Person person = new Person();
            person.setId(r.getInt("id"));
            person.setFullName(r.getString("name"));
            person.setImageUrl(r.getString("image_url"));
            person.setUsername(r.getString("username"));
            return person;
        };
        return jdbc.query(sql, rowMapper);
    }

    // public List<Person> findPersonByProjectId(Integer id) {
    // String sql = "SELECT * FROM person JOIN project ON project.id =
    // person.project_id
    // WHERE project.id = ?";

    // RowMapper<Person> rowMapper = (r, i) -> {

    // Person person = new Person();
    // person.setId(r.getInt("id"));
    // person.setDescription(r.getString("description"));
    // person.setTitle(r.getString("title"));
    // person.setDeadline(r.getDate("deadline"));
    // person.setIsDone(r.getBoolean("is_done"));
    // return person;
    // };
    // return jdbc.query(sql, rowMapper, id.intValue());

    // }

}
