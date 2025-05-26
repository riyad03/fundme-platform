package com.example.user_project_service.service.user;

import com.example.user_project_service.dao.entity.User;

import java.util.Optional;


public interface UserService {
    User findUserById(Long id);
    public boolean follow(long me, long target);
    User createUser(User user);
    User updateUser(Long id,User user);
    void deleteUser(Long id);
    User login(String email,String password);
}
