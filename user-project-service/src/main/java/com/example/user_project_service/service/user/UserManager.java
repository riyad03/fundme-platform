package com.example.user_project_service.service.user;

import com.example.user_project_service.dao.entity.User;
import com.example.user_project_service.dao.repository.UserRepository;
import com.example.user_project_service.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserManager implements UserService {

    @Autowired
    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    // Constructor injection
    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Only method: find user by id
    public User findUserById(Long id) {
        Optional<User> user=userRepository.findById(id);
        if(user.isEmpty())
            throw  new UserNotFoundException("User not found with id: " + id);
        return user.get();
    }



    @Override
    public boolean follow(long meId, long targetId) {
        User me=userRepository.findById(meId).get();
        User target=userRepository.findById(targetId).get();

        me.getFollowing().add(target);


        try {
            userRepository.save(me);

            return true;
        }catch (Exception e){
            System.err.println(e.getMessage());
            return false;
        }

    }
    public String encodePassword(String password){
        return passwordEncoder.encode(password);
    }

    @Override
    public User createUser(User user) {
        user.setPasswordHash(encodePassword(user.getPasswordHash()));
        userRepository.save(user);
        return user;
    }

    @Override
    public User updateUser(Long id, User user) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update only the fields you allow to change
                    existingUser.setName(user.getName());
                    if(user.getEmail().equals(existingUser.getEmail()))
                        existingUser.setEmail(user.getEmail());
                    existingUser.setDescription(user.getDescription());
                    existingUser.setPhoneNumber(user.getPhoneNumber());
                    // Password should be treated carefully (hashing, etc.)
                    existingUser.setPasswordHash(user.getPasswordHash());
                    return userRepository.save(existingUser);
                })
                .orElse(null);  // Return null if user doesn't exist
    }

    @Override
    public void deleteUser(Long id){
        userRepository.delete(userRepository.findById(id).get());

    }

    @Override
    public User login(String email, String password){
        User user=userRepository.findByEmail(email);
        if(user!=null && user.getPasswordHash().equals(passwordEncoder.encode(password))){
            return user;
        }
        else {
            return null;
        }
    }



}

