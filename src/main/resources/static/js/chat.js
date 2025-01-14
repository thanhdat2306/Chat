var stompClient = null;
var username = null;

// Hàm được gọi khi người dùng kết nối với cuộc trò chuyện
function connect() {
    username = $("#username").val(); // Lưu tên người dùng
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {
        $("#usernameForm").hide();
        $("#chatRoom").show();
        stompClient.subscribe('/topic/public', function(chatMessage) {
            showMessage(JSON.parse(chatMessage.body));
        });
    });

    // Thêm trình xử lý sự kiện quan trọng vào trường nhập tin nhắn
    $("#message").on("keyup", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessage();
        }
    });
}

// Hàm được gọi khi người dùng gửi tin nhắn
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

// Chức năng hiển thị tin nhắn chat mới trên màn hình
function showMessage(message) {
    var isOwnMessage = message.username === username;
    var messageElement = $("<li>").addClass(isOwnMessage ? "own-message" : "other-message");

    var messageWrapper = $("<div>").addClass("message-wrapper");
    messageWrapper.append("<strong>" + message.username + ":</strong> " + message.content);

    messageElement.append(messageWrapper);
    $("#messages").append(messageElement);
}
