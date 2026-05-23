package com.wingsberista.backend.service;

import com.wingsberista.backend.dto.AuthResponse;
import com.wingsberista.backend.dto.LoginRequest;
import com.wingsberista.backend.dto.SignupRequest;

public interface AuthService {
	
	AuthResponse signup(SignupRequest request);
	AuthResponse login(LoginRequest request);

}
