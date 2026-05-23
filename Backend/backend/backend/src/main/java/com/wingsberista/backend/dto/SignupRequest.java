package com.wingsberista.backend.dto;

import com.wingsberista.backend.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
	
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String password;
	private Role role;
    private String adminSecretKey;
	
	

}
