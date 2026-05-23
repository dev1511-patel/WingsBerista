package com.wingsberista.backend.dto;

import com.wingsberista.backend.enums.Role;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
	
		private Long id;
	    private String name;
	    private String email;
	    private Role role;
	    private String token;
		

}
