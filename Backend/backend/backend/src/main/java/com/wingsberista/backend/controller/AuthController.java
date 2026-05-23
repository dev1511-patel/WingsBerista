package com.wingsberista.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wingsberista.backend.dto.AuthResponse;
import com.wingsberista.backend.dto.ForgotPasswordRequestDTO;
import com.wingsberista.backend.dto.LoginRequest;
import com.wingsberista.backend.dto.ResetPasswordRequestDTO;
import com.wingsberista.backend.dto.SignupRequest;
import com.wingsberista.backend.service.AuthService;
import com.wingsberista.backend.service.AuthServiceClass;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
	
	  private final AuthService authService;
	  
	  private final AuthServiceClass authServiceClass;

	
	  @PostMapping("/forgot-password")
	  public ResponseEntity<?>forgotPassword(@RequestBody ForgotPasswordRequestDTO dto){
		  return ResponseEntity.ok(authServiceClass.forgotPassword(dto));	  
	  }
	  
	  @PostMapping("/reset-password")
	  public ResponseEntity<?>resetPassword(@RequestBody ResetPasswordRequestDTO dto){
		  return ResponseEntity.ok(authServiceClass.resetPassword(dto));
	  }
	
	@PostMapping("/login")
	public AuthResponse login(@RequestBody LoginRequest request) {
		return authService.login(request);
		}
	
	@PostMapping("/signup")
	public AuthResponse signup(@RequestBody SignupRequest request) {
		return authService.signup(request);
	}

}
