<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" href="Lobby.css">
		<script>
		var socket;
		var color = 0;

			function connectToServer(){
				socket = new WebSocket("ws://localhost:8080/CSCI201_WebSocket/ss");
				var buffer;
				socket.onopen = function(event){
					//document.getElementById("messages").innerHTML += "Connected!<br />";
					//toggle(color);
					var bgc; //grey
					if(color == 0)
					{
						bgc = "#D3D3D3";
						color = 1;
					}
					else
					{
					    bgc = "#A9A9A9";
					    color = 0;
					}
					
					buffer += "<div class=\"bubble1\" style = \"background-color: " + bgc + "\";>";
					buffer += "<p style=\"font-size:10px;margin-left:10px;\">";
					buffer += "<div id=\"mychat\">Connected!</div></p>";
					buffer += "</div>";
					document.getElementById("messages").innerHTML = buffer;					
					
				}
				
				socket.onmessage = function(event){
					//document.getElementById("messages").innerHTML += event.data + "<br />";
										var bgc; //grey
					if(color == 0)
					{
						bgc = "#D3D3D3";
						color = 1;
					}
					else
					{
					    bgc = "#A9A9A9";
					    color = 0;
					}
					
					buffer += "<div class=\"bubble1\" style = \"background-color: " + bgc + "\";>";
					buffer += "<p style=\"font-size:10px;margin-left:10px;\">"
					buffer += "<div id=\"mychat\">" + event.data + "!</div></p>";
					buffer += "</div>";
					document.getElementById("messages").innerHTML = buffer;
				}
				socket.onclose = function(event){
					var bgc; //grey
					if(color == 0)
					{
						bgc = "#D3D3D3";
						color = 1;
					}
					else
					{
					    bgc = "#A9A9A9";
					    color = 0;
					}
					
					//document.getElementById("messages").innerHTML += "Disconnected!<br />";
					buffer += "<div class=\"bubble1\" style = \"background-color: " + bgc + "\";>";
					buffer += "<p style=\"font-size:10px;margin-left:10px;\">"
					buffer += "<div id=\"mychat\">Disconnected!</div></p>";
					buffer += "</div>";
					document.getElementById("messages").innerHTML = buffer;
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
				<span style=" font-size: 40px; color:white;" onClick="location.href='index.html'">Play</span>
				<span style=" font-size: 40px; margin-left:60px;color:white;" onClick="location.href='Highscores.jsp'">High Scores</span>
			</div>

			<br />
			<div id="messages"> </div>
			
			
			<div id="footer">		<form name="chatform" onsubmit="return sendMessage();">
		<input id="messageInput" type="text" name="message" value="Type Here" />
		<input type="submit" name="submit" value="Send Message" />
		</form></div>
		</div>
	</body>
</html>