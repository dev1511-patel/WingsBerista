package com.wingsberista.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wingsberista.backend.entity.Menu;

@Repository
public interface MenuRepo extends JpaRepository<Menu, Long>{

}
