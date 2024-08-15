package org.example.chatting.controller;

import org.example.chatting.dto.ChatMessage;
import org.example.chatting.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        return chatService.saveMessage(chatMessage.getUsername(), chatMessage.getContent());
    }

    @GetMapping("/chat")
    public String chat(Model model) {
        return "chat";
    }
}
