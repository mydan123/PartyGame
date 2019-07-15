var username_box = document.getElementById("username_box")
var comment_box = document.getElementById("comment_box")

comment_box.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
	if (comment_box.value!==""){
		socket.emit('post_comment', {username:username_box.value, message:comment_box.value});
		comment_box.value="";
	}
}


/*
Keeps scroll box scrolled to the bottom
*/
var chat_log_div = document.getElementById("chat_log_div");
function updateScroll(){
    chat_log_div.scrollTop = chat_log_div.scrollHeight;
}

var chat_log = document.getElementById("chat_log");
socket.on('new_comment', function(comment_data){
	var shouldScroll = false;
	if (chat_log_div.offsetHeight+chat_log_div.scrollTop+1 >= chat_log_div.scrollHeight){
		shouldScroll = true;
	}
	console.log(chat_log_div.offsetHeight+chat_log_div.scrollTop)
	console.log(chat_log_div.scrollHeight)
	
	new_chat_row = document.createElement("tr");
	new_chat = document.createElement("td");
	username = document.createElement("span");
	username.className = "Username"
	separator = document.createElement("span");
	separator.className = "Separator"
	message = document.createElement("span");
	message.className = "Message"
	if (comment_data["username"]!==""){
		username.innerText=comment_data["username"];
	} else {
		username.innerText="Anonymous";
	}
	separator.innerText=": ";
	message.innerText=comment_data["message"];
	new_chat.appendChild(username);
	new_chat.appendChild(separator);
	new_chat.appendChild(message);
	new_chat_row.appendChild(new_chat);
	chat_log.appendChild(new_chat_row);
	
	if (shouldScroll) {
		updateScroll();
	}
});


