var stompClient = null;
var username = null;

// Function called when user connects to chat
function connect() {
    username = $("#username").val(); // 사용자 이름 저장
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        $("#usernameForm").hide();
        $("#chatRoom").show();
        stompClient.subscribe('/topic/public', function(chatMessage) {
            showMessage(JSON.parse(chatMessage.body));
        });
    });

    // add enter key to event listener to input field
    $("#message").on("keyup", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessage();
        }
    });
}

// Function called when user enter a message
function sendMessage() {
    var messageContent = $("#message").val();
    if(messageContent && stompClient) {
        var chatMessage = {
            username: username,
            content: messageContent
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        $("#message").val("");
    }
}

// Function to display new chat message 
function showMessage(message) {
    var isOwnMessage = message.username === username;
    var messageElement = $("<li>").addClass(isOwnMessage ? "own-message" : "other-message");

    var messageWrapper = $("<div>").addClass("message-wrapper");
    messageWrapper.append("<strong>" + message.username + ":</strong> " + message.content);

    messageElement.append(messageWrapper);
    $("#messages").append(messageElement);
}
