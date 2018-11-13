<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" href="Lobby.css">
		<script>
		var socket;
			function connectToServer(){
				socket = new WebSocket("ws://localhost:8080/CSCI201_WebSocket/ss");
				socket.onopen = function(event){
					document.getElementById("mychat").innerHTML += "Connected!<br />";
				}
				
				socket.onmessage = function(event){
					document.getElementById("mychat").innerHTML += event.data + "<br />";
				}
				socket.onclose = function(event){
					document.getElementById("mychat").innerHTML += "Disconnected!<br />";
				}
			}
			
			function sendMessage(){
				socket.send("Miller: " + document.chatform.message.value);
				return false;
			}
		</script>
	</head>
	<body onload="connectToServer()">
		<div id="lobby">
			<div id="header">
				Welcome to the Lobby!
			</div>
			<div style="text-align: center; padding: 10px">
				<span style=" font-size: 40px; color:white;" onClick="location.href='(menu/game).jsp'">Play</span>
				<span style=" font-size: 40px; margin-left:60px;color:white;" onClick="location.href='Highscores.jsp'">High Scores</span>
			</div>

			<br />
			<div id="messages">
				<div class="bubble1">
				<p style="font-size:10px;margin-left:10px;"><div id="mychat"></div></p>
				</div>
			
			<% 
			    
				// when a new message comes in
				// <div class="bubble1"> or <div class="bubble2"> (alternate)
				// <p style="font-size:10px;margin-left:10px;"><username from db></p>
				  // <p><Message></p>
				  // <div class="time">System.currentTimeMillis()</div>
				// </div>
			%>
			</div>
			<div id="footer">		<form name="chatform" onsubmit="return sendMessage();">
		<input id="messageInput" type="text" name="message" value="Type Here" />
		<input type="submit" name="submit" value="Send Message" />
		</form></div>
		</div>
	</body>
</html>