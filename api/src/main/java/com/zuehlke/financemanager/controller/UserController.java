package com.zuehlke.financemanager.controller;

import com.zuehlke.financemanager.repository.UserRepository;
import com.zuehlke.financemanager.security.services.UserDetailsServiceImpl;
import com.zuehlke.financemanager.security.services.UserService;
import com.zuehlke.financemanager.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserDetailsServiceImpl userDetailsService;


    @GetMapping("{username}")
    public Boolean existsByUsername(@PathVariable String username) {
        return userRepository.existsByUsername((username));

    }

    @GetMapping("/balance")
    public Long findBalanceByUsername() {
        return userDetailsService.findBalanceByUsername();

    }


}
