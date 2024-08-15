var stompClient = null;
var username = null;

// 사용자가 채팅에 연결할 때 호출되는 함수
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

    // 메시지 입력 필드에 엔터키 이벤트 리스너 추가
    $("#message").on("keyup", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessage();
        }
    });
}

// 사용자가 메시지를 전송할 때 호출되는 함수
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

// 새로운 채팅 메시지를 화면에 표시하는 함수
function showMessage(message) {
    var isOwnMessage = message.username === username;
    var messageElement = $("<li>").addClass(isOwnMessage ? "own-message" : "other-message");

    var messageWrapper = $("<div>").addClass("message-wrapper");
    messageWrapper.append("<strong>" + message.username + ":</strong> " + message.content);

    messageElement.append(messageWrapper);
    $("#messages").append(messageElement);
}
