package com.ars.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ars.dto.LoginRequest;
import com.ars.dto.LoginResponse;
import com.ars.dto.RegisterRequest;
import com.ars.entity.Role; // <-- Make sure to import your Role Enum here!
import com.ars.entity.User;
import com.ars.message.ApplicationMessages;
import com.ars.repo.UserRepo;
import com.ars.security.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ApplicationMessages messages;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepo.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(messages.get("app.message.auth.email-already-in-use"));
        }

        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhone(registerRequest.getPhone());

        // CONVERT STRING TO ROLE ENUM HERE:
        try {
            Role userRole = Role.valueOf(registerRequest.getRole().toUpperCase());
            user.setRole(userRole);
        } catch (IllegalArgumentException | NullPointerException e) {
            // Default to CUSTOMER if null or invalid role provided
            user.setRole(Role.CUSTOMER); 
        }

        userRepo.save(user);

        return ResponseEntity.ok(messages.get("app.message.auth.registration-success"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateToken(authentication);

        User user = userRepo.findByEmail(loginRequest.getEmail()).get();

        // Convert user.getRole().name() to String for LoginResponse
        return ResponseEntity.ok(new LoginResponse(jwt, user.getUserId(), user.getEmail(), user.getRole().name()));
    }
}