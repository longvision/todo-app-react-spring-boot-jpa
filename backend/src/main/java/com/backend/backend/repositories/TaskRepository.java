package com.backend.backend.repositories;

import java.math.BigDecimal;
import java.util.List;

import com.backend.backend.dto.TaskInfo;
import com.backend.backend.models.Task;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called taskRepository
// CRUD refers Create, Read, Update, Delete

public interface TaskRepository extends CrudRepository<Task, Integer>, CustomizedTaskRepository {

    @Query(value = "SELECT * FROM task WHERE price BETWEEN :from AND :to", nativeQuery = true)
    Iterable<Task> findByPriceRange(BigDecimal from, BigDecimal to);

    TaskInfo findTaskInfoById(Integer id);

    List<Task> findTasksByProjectId(Integer projectId);
}
