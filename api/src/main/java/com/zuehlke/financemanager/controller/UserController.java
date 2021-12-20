package com.zuehlke.financemanager.controller;

import com.zuehlke.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;


    @GetMapping("{username}")
    public Boolean existsByUsername(@PathVariable String username) {
        return userRepository.existsByUsername((username));

    }


}
