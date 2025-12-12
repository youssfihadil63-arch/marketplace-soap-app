package com.marketplace.soap.service;

import com.marketplace.soap.User;
import com.marketplace.soap.model.UserEntity;
import com.marketplace.soap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Vérifier si l'utilisateur existe déjà
        if (userRepository.findByUsername(user.getUsername()).isPresent() ||
            userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null; // Utilisateur existe déjà
        }

        UserEntity entity = convertToEntity(user);
        UserEntity saved = userRepository.save(entity);
        return convertToSoapUser(saved);
    }

    public User loginUser(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password)
                .map(this::convertToSoapUser)
                .orElse(null);
    }

    public User getUserById(long userId) {
        return userRepository.findById(userId)
                .map(this::convertToSoapUser)
                .orElse(null);
    }

    private User convertToSoapUser(UserEntity entity) {
        User user = new User();
        user.setId(entity.getId());
        user.setUsername(entity.getUsername());
        user.setPassword(entity.getPassword()); // Note: En production, ne pas renvoyer le mot de passe
        user.setEmail(entity.getEmail());
        user.setFirstName(entity.getFirstName());
        user.setLastName(entity.getLastName());
        return user;
    }

    private UserEntity convertToEntity(User soapUser) {
        UserEntity entity = new UserEntity();
        entity.setUsername(soapUser.getUsername());
        entity.setPassword(soapUser.getPassword()); // Note: Devrait être hashé en production
        entity.setEmail(soapUser.getEmail());
        entity.setFirstName(soapUser.getFirstName());
        entity.setLastName(soapUser.getLastName());
        return entity;
    }
}