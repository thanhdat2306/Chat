# Real-Time Multi-User Chat Application

This project builds a real-time multi-user chat application using Spring Boot, Thymeleaf, MySQL, Lombok, and WebSocket. Users can join chat rooms to send and receive messages, and all messages are stored in the database.

## Key Features

- Real-time communication using WebSocket
- Multi-user chat rooms
- Storing chat messages in MySQL database
- Styling with Bootstrap
- Differentiation between sent and received messages

## Technologies Used

- JAVA
- Spring Boot
- Thymeleaf
- MySQL
- Lombok
- WebSocket
- Bootstrap
- JavaScript (jQuery, SockJS, STOMP)

## Installation Instructions

1. **Clone the Repository**
    ```bash
    git clone https://github.com/thanhdat2306/Chat.git
    cd your-repository
    ```

2. **Configure MySQL Database**
    - Create a database named chat_db.
    - Update the database settings in the src/main/resources/application.properties file.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/chat_db
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    ```

3. **Build and Run the Application**
    ```bash
    ./gradlew bootRun
    ```

4. **Open the Application in a Browser**
    ```
    http://localhost:8080/chat
    ```

## Usage Instructions

1. Enter a name and join the chat.
2. Input a message in the message field and press Enter or click the Send button to send the message.
3. View other users' messages in real-time.

## 프로젝트 구조

- `src/main/java/com/example/chat` - Main application source code
- `src/main/resources/templates` - Thymeleaf templates
- `src/main/resources/static/css` - CSS files
- `src/main/resources/static/js` - JavaScript files




