package com.backend.backend.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.logging.Logger;

import com.backend.backend.dto.TaskInfo;
import com.backend.backend.dto.MessageDetails;
import com.backend.backend.models.Task;
import com.backend.backend.models.Project;
import com.backend.backend.repositories.TaskRepository;
import com.backend.backend.repositories.ProjectRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @RequestMapping("/tasks")
public class TaskController {
    private static Logger logger = Logger.getLogger(TaskController.class.getName());
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    public Iterable<Task> getTasks() {
        Iterable<Task> tasks = taskRepository.findAll();
        return tasks;
    }

    @PostMapping("/tasks")
    public ResponseEntity<MessageDetails> addTask(@RequestBody TaskInfo taskInfo) {
        Task task = new Task(taskInfo.getId(), taskInfo.getTitle(), taskInfo.getDescription(), taskInfo.getDeadline(),
                taskInfo.isDone(), taskInfo.getProjectId());
        taskRepository.save(task);
        MessageDetails msg = new MessageDetails("The new task was inserted successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<MessageDetails> updateTask(@RequestBody Task task, @PathVariable("id") Integer id) {

        if (taskRepository.findById(id).isEmpty()) {
            MessageDetails msg = new MessageDetails("The task does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

        Task oldTask = taskRepository.findById(id).get();

        Task updatedTask = new Task(oldTask.getId(), task.getTitle(), task.getDescription(),
                task.getDeadline(), task.getIsDone(), task.getProjectId());
        taskRepository.save(updatedTask);

        MessageDetails msg = new MessageDetails("The task was updated successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<MessageDetails> removeTask(@PathVariable Integer id) {

        if (taskRepository.findById(id).isEmpty()) {
            MessageDetails msg = new MessageDetails("The task does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

        Task task = taskRepository.findById(id).get();
        // Get the project object

        taskRepository.deleteById(task.getId());
        MessageDetails msg = new MessageDetails("The task was removed successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @GetMapping("/tasks/range/{from}/{to}")
    public Iterable<Task> getTasksByRange(@PathVariable BigDecimal from, @PathVariable BigDecimal to) {
        return taskRepository.findByPriceRange(from, to);
    }

    @GetMapping("/tasks/project/{id}")
    public List<Task> getProjectTasksByProjectId(@PathVariable Integer id) {

        List<Task> tasks = taskRepository.findTasksByProjectId(id);

        return tasks;

    }

}

// curl -i -X POST localhost:8080/tasks -H 'Content-type:application/json' -d
// '{"isbn":"7777", "title":"Database", "price":56.7, "available":true }'
// curl -i -X PUT localhost:8080/tasks -H 'Content-type:application/json' -d
// '{"id":1, "isbn":"7777", "title":"Database", "price":99.99, "available":true
// }'
// curl -i -X PUT localhost:8080/tasks/price -H 'Content-type:application/json'
// -d '{"id":1, "price":10.00 }'
// curl -i -X DELETE localhost:8080/tasks/1
// curl localhost:8080/tasks/range/50/100