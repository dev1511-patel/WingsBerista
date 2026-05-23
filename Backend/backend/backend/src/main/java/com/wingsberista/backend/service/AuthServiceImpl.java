package com.wingsberista.backend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.wingsberista.backend.dto.AuthResponse;
import com.wingsberista.backend.dto.LoginRequest;
import com.wingsberista.backend.dto.SignupRequest;
import com.wingsberista.backend.entity.User;
import com.wingsberista.backend.enums.Role;
import com.wingsberista.backend.exception.CustomException;
import com.wingsberista.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	
	private final UserRepository userRepository;
	
	private static final String ADMIN_SECRET = "WINGS2026ADMIN";
	
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public AuthResponse signup(SignupRequest request) {
		
		if(userRepository.existsByEmail(request.getEmail())) {
		  throw new CustomException("Email already registered.");
		}
		
		if(request.getRole()== Role.ADMIN && !ADMIN_SECRET.equals(request.getAdminSecretKey())) {
			 throw new CustomException("Invalid admin secret key");
		}
		
		User user =User.builder()
				.firstName(request.getFirstName())
				.lastName(request.getLastName())
				.email(request.getEmail())
				.phoneNumber(request.getPhoneNumber())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(request.getRole())
				.build();
		
		userRepository.save(user);
		
		 return AuthResponse.builder()
	                .id(user.getId())
	                .name(user.getFirstName() + " " + user.getLastName())
	                .email(user.getEmail())
	                .role(user.getRole())
	                .token("WB-" + System.currentTimeMillis())
	                .build();
	}

	@Override
	public AuthResponse login(LoginRequest request) {
		
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() ->  new CustomException("Invalid Email or Password"));
		
		  boolean matches = passwordEncoder.matches(
	                request.getPassword(),
	                user.getPassword()
	        );

	        if (!matches) {
	            throw new CustomException("Invalid email or password");
	        }
		return AuthResponse.builder()
				.id(user.getId())
				.name(user.getFirstName()+" "+user.getLastName())
				.email(user.getEmail())
				.role(user.getRole())
				.token("WB-"+System.currentTimeMillis())
				.build();
	}
}
