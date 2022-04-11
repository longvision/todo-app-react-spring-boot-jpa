package com.backend.backend.repositories;

import java.math.BigDecimal;
import java.util.List;

// import com.backend.backend.dto.PersonInfo;
import com.backend.backend.models.Person;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called PersonRepository
// CRUD refers Create, Read, Update, Delete

public interface PersonRepository extends CrudRepository<Person, Integer>, CustomizedPersonRepository {

    @Query(value = "SELECT * FROM Person WHERE price BETWEEN :from AND :to", nativeQuery = true)
    Iterable<Person> findByPriceRange(BigDecimal from, BigDecimal to);

    // PersonInfo findPersonInfoById(Integer id);

    List<Person> findPersonsByProjectId(Integer projectId);
}
