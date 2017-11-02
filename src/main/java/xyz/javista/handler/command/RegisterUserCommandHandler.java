package xyz.javista.handler.command;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import xyz.javista.command.RegisterUserCommand;
import xyz.javista.core.domain.User;
import xyz.javista.mapper.UserMapper;
import xyz.javista.repository.UserRepository;

@Component
public class RegisterUserCommandHandler {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public void registerUser(RegisterUserCommand userDTO) {
        User entity = userMapper.toEntity(userDTO);
        entity.setPassword(bCryptPasswordEncoder.encode(entity.getPassword()));
        userRepository.saveAndFlush(entity);
    }
}
