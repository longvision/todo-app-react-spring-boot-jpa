package com.backend.backend.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.logging.Logger;

// import com.backend.backend.dto.PersonInfo;
import com.backend.backend.dto.MessageDetails;
import com.backend.backend.models.Person;
import com.backend.backend.models.Task;
import com.backend.backend.models.Project;
import com.backend.backend.repositories.PersonRepository;
import com.backend.backend.repositories.PersonRepository;
import com.backend.backend.repositories.ProjectRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class PersonController {
    private static Logger logger = Logger.getLogger(PersonController.class.getName());
    private final PersonRepository personRepository;

    public PersonController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping("/people")
    public Iterable<Person> getPeople() {
        Iterable<Person> persons = personRepository.findAll();
        return persons;
    }

    @GetMapping("/person/{id}")
    public Person getPerson(@PathVariable("id") Integer id) {

        Person oldPerson = personRepository.findById(id).get();

        return oldPerson;
    }

    @PostMapping("/person")
    public ResponseEntity<MessageDetails> addPerson(@RequestBody Person person) {

        personRepository.save(person);

        MessageDetails msg = new MessageDetails("The new person was inserted successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @PutMapping("/person/{id}")
    public ResponseEntity<MessageDetails> updatePerson(@RequestBody Person person, @PathVariable("id") Integer id) {

        if (personRepository.findById(id).isEmpty()) {
            MessageDetails msg = new MessageDetails("The person does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

        Person oldPerson = personRepository.findById(id).get();

        Person updatedPerson = new Person(oldPerson.getId(), person.getName(), person.getImageUrl(),
                person.getUsername());
        personRepository.save(updatedPerson);

        MessageDetails msg = new MessageDetails("The person was updated successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

    @DeleteMapping("/person/{id}")
    public ResponseEntity<MessageDetails> removePerson(@PathVariable Integer id) {

        if (personRepository.findById(id).isEmpty()) {
            MessageDetails msg = new MessageDetails("The person does not exist.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(msg);
        }

        Person person = personRepository.findById(id).get();
        // Get the project object

        personRepository.deleteById(person.getId());
        MessageDetails msg = new MessageDetails("The person was removed successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(msg);
    }

}

// curl -i -X POST localhost:8080/persons -H 'Content-type:application/json' -d
// '{"isbn":"7777", "title":"Database", "price":56.7, "available":true }'
// curl -i -X PUT localhost:8080/persons -H 'Content-type:application/json' -d
// '{"id":1, "isbn":"7777", "title":"Database", "price":99.99, "available":true
// }'
// curl -i -X PUT localhost:8080/persons/price -H
// 'Content-type:application/json'
// -d '{"id":1, "price":10.00 }'
// curl -i -X DELETE localhost:8080/persons/1
// curl localhost:8080/persons/range/50/100
