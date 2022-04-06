package com.backend.backend.controllers;

import java.util.List;

import com.backend.backend.dto.MessageDetails;
// import com.backend.backend.dto.ProjectInfo;
import com.backend.backend.models.Project;
import com.backend.backend.models.Task;
import com.backend.backend.repositories.ProjectRepository;
import com.backend.backend.repositories.TaskRepository;

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
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public ProjectController(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping("/projects")
    public Iterable<Project> getProjects() {
        return projectRepository.findAll();
    }

    @PostMapping("/project")
    public ResponseEntity<MessageDetails> addProject(@RequestBody Project project) {
        projectRepository.save(project);
        MessageDetails msg = new MessageDetails("The new project was inserted successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @PutMapping("/project/{id}")
    public ResponseEntity<MessageDetails> updateProject(@RequestBody Project project, @PathVariable("id") Integer id) {
        if (projectRepository.findById(id).isEmpty()) {
            MessageDetails msg = new MessageDetails("The project does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

        Project updatedProject = projectRepository.findById(id).get();
        updatedProject.setProjectName(project.getProjectName());
        projectRepository.save(updatedProject);
        MessageDetails msg = new MessageDetails("The new project was updated successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @DeleteMapping("/project/{id}")
    public ResponseEntity<MessageDetails> removeTask(@PathVariable Integer id) {

        if (projectRepository.findById(id).isEmpty()) {
            MessageDetails msg = new MessageDetails("The project does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

        List<Task> task = taskRepository.findTasksByProjectId(id);

        if (task.size() > 0) {
            MessageDetails msg = new MessageDetails(
                    "The project has tasks associated with it. Please remove the tasks first.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        } else if (task.isEmpty()) {
            projectRepository.deleteById(id);
            MessageDetails msg = new MessageDetails(
                    "The project was deleted successfully.");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
        } else {
            MessageDetails msg = new MessageDetails("Could not delete the project. Unkwnown error.");
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(msg);
        }
    }
    // @GetMapping("/projects/names")
    // public List<ProjectInfo> gProjectNames() {
    // return projectRepository.findProjectList();
    // }
}

// curl -i -X POST localhost:8080/projects -H 'Content-type:application/json'
// -d '{"projectName":"PWS"}'
// curl -i -X POST localhost:8080/projects -H 'Content-type:application/json'
// -d '{"projectName":"MSFT"}'
// curl -i -X POST localhost:8080/projects -H 'Content-type:application/json'
// -d '{"projectName":"SAMS"}'