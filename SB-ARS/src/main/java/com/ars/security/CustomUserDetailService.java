package com.ars.security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService; // MUST BE THIS IMPORT
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ars.entity.User;
import com.ars.message.ApplicationMessages;
import com.ars.repo.UserRepo;

@Service
public class CustomUserDetailService implements UserDetailsService { // <--- MUST IMPLEMENT THIS

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ApplicationMessages messages;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        messages.get("app.message.security.user-not-found-email", email)));

     // Inside loadUserByUsername method:
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}