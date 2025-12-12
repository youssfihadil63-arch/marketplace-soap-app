package com.marketplace.soap.controller;

import com.marketplace.soap.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import com.marketplace.soap.service.UserService;

@Endpoint
public class UserEndpoint {
    private static final String NAMESPACE_URI = "http://marketplace.com/soap";

    @Autowired
    private UserService userService;

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "registerUserRequest")
    @ResponsePayload
    public RegisterUserResponse registerUser(@RequestPayload RegisterUserRequest request) {
        RegisterUserResponse response = new RegisterUserResponse();
        User registeredUser = userService.registerUser(request.getUser());
        response.setUser(registeredUser);
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "loginUserRequest")
    @ResponsePayload
    public LoginUserResponse loginUser(@RequestPayload LoginUserRequest request) {
        LoginUserResponse response = new LoginUserResponse();
        User loggedInUser = userService.loginUser(request.getUsername(), request.getPassword());
        if (loggedInUser != null) {
            response.setUser(loggedInUser);
            // Optionnel: ajouter un token si nécessaire
            response.setToken("auth-token-" + loggedInUser.getId());
        }
        return response;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getUserByIdRequest")
    @ResponsePayload
    public GetUserByIdResponse getUserById(@RequestPayload GetUserByIdRequest request) {
        GetUserByIdResponse response = new GetUserByIdResponse();
        // Utilisez getId() au lieu de getUserId()
        User user = userService.getUserById(request.getId());
        if (user != null) {
            response.setUser(user);
        }
        return response;
    }
}