package com.wingsberista.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wingsberista.backend.entity.Menu;
import com.wingsberista.backend.repository.MenuRepo;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin("*")
public class MenuController {
	@Autowired
	private MenuRepo menuRepo;
	
	@GetMapping
	public List<Menu>getAllMenu(){
		return menuRepo.findAll();
	}
	
	@PostMapping
	public Menu saveMenu(@RequestBody Menu menu) {
		return menuRepo.save(menu);
		
	}
}
