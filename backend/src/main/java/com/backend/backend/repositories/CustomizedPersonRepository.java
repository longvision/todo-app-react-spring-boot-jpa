package com.backend.backend.repositories;

import java.util.*;

import com.backend.backend.models.Person;

interface CustomizedPersonRepository {

    List<Person> findPersonsByProjectId(Integer id);

}
