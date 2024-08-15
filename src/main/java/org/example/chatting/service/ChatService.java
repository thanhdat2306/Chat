package org.example.chatting.service;

import org.example.chatting.dto.ChatMessage;
import org.example.chatting.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    public ChatMessage saveMessage(String username, String content) {
        ChatMessage message = new ChatMessage();
        message.setUsername(username);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return chatMessageRepository.save(message);
    }
}