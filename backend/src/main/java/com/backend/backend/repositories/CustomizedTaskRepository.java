package com.backend.backend.repositories;

import java.util.*;

import com.backend.backend.models.Task;

interface CustomizedTaskRepository {

    List<Task> findTasksByProjectId(Integer id);

}
