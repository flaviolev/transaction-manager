package com.zuehlke.financemanager.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @GetMapping("{username}")
    public Boolean existsByUsername(@PathVariable String username) {
        return userDetailsService.existsByUsername((username));
    }

    @GetMapping("/balance")
    public Long findBalanceByUsername() {
        return userDetailsService.findBalanceByUsername();
    }
}
