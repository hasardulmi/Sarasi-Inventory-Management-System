package net.javaguides.ims_backend.service;

import net.javaguides.ims_backend.dto.LoginDto;
import net.javaguides.ims_backend.dto.UserRegistrationDto;
import net.javaguides.ims_backend.entity.User;
import net.javaguides.ims_backend.entity.UserType;
import net.javaguides.ims_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;


    public String registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.findByUsername(registrationDto.getUsername()) != null) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        user.setUserType(registrationDto.getUserType());
        user.setAddress(registrationDto.getAddress());
        user.setPhone(registrationDto.getPhone());
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword())); // Encode the password


        userRepository.save(user);
        return "User registered successfully";
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public String updateUser(Long id, UserRegistrationDto registrationDto) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(registrationDto.getUsername());
            user.setUserType(registrationDto.getUserType());
            user.setEmail(registrationDto.getEmail());
            user.setPhone(registrationDto.getPhone());
            user.setAddress(registrationDto.getAddress());
            user.setFirstName(registrationDto.getFirstName());
            user.setLastName(registrationDto.getLastName());
            user.setPassword(passwordEncoder.encode(registrationDto.getPassword())); // Encode the password


            userRepository.save(user);
            return "User updated successfully";
        } else {
            return "User not found";
        }
    }

    public String deleteUser(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.delete(optionalUser.get());
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }





    public String loginUser(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername());
        if (user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) { // Use passwordEncoder to match the password
            return "Login successful";
        } else {
            return "Invalid credentials";
        }
    }
}