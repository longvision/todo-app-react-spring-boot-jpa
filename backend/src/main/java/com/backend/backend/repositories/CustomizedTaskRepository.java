package com.backend.backend.repositories;

import java.util.*;

import com.backend.backend.models.Task;

interface CustomizedTaskRepository {
    List<Task> findTaskList();

    List<Task> findTasksByProjectId(Integer projectId);

}
