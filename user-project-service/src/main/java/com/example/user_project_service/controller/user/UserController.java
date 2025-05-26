package com.example.user_project_service.controller.user;


import com.example.user_project_service.dao.entity.User;
import com.example.user_project_service.dao.repository.UserRepository;
import com.example.user_project_service.dto.LoginRequest;
import com.example.user_project_service.exception.UserNotFoundException;
import com.example.user_project_service.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;

    /*@GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.findUserById(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/create")
    public ResponseEntity<Boolean> createUser(@RequestBody  User user){
        User u=userService.createUser(user);

        return ResponseEntity.ok(u!=null);

    }
    @PutMapping("/update/{userId}")
    public ResponseEntity<Boolean> updateUser(@PathVariable Long userId, @RequestBody User user){
        User u = userService.updateUser(userId, user);
        if (u != null) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

    @PostMapping("/{userId}/target/{targetId}")
    public ResponseEntity<Boolean> followUser(
            @PathVariable("userId") long userId,
            @PathVariable("targetId") long targetId) {

        boolean result = userService.follow(userId, targetId);  // Call the service method

        if (result) {
            return ResponseEntity.ok(Boolean.TRUE);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Boolean.FALSE);
        }
    }
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> delete(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("deleted");
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody  LoginRequest loginRequest){
        User user= userService.login(loginRequest.getEmail(),loginRequest.getPassword());
        if(user!=null){
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.noContent().build();
        }
    }

    /*@PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }*/

    /*@PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setName(userDetails.getName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setEmail(userDetails.getEmail());
        user.setPasswordHash(userDetails.getPasswordHash());
        //user.setLog(userDetails.getLog());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }*/


    /*@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }*/
    @GetMapping("/test")
    public ResponseEntity<?> routeToProjectDiscoveryTest() {
        try {
            return ResponseEntity.ok("test");

        } catch (RestClientException e) {
            System.err.println("Connection error with user service: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to connect to user service");
            errorResponse.put("details", e.getMessage());


            return ResponseEntity.status(502).body(errorResponse);
        } catch (Exception e) {
            System.err.println("Unexpected error in gateway: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal gateway error");
            errorResponse.put("details", e.getMessage());

            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
