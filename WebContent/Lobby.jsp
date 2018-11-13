<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="ISO-8859-1">
		<link rel="stylesheet" href="lobby.css">
	</head>
	<body>
		<div id="lobby">
			<div id="header">
				Welcome to the Lobby!
			</div>
			<div style="text-align: center; padding: 10px">
				<span style=" font-size: 40px; color:white;" onClick="location.href='(menu/game).jsp'">Play</span>
				<span style=" font-size: 40px; margin-left:60px;color:white;" onClick="location.href='Highscores.jsp'">High Scores</span>
			</div>
			<div id="messages">
			<% 
				// when a new message comes in
				// <div class="bubble1"> or <div class="bubble2"> (alternate)
				// <p style="font-size:10px;margin-left:10px;"><username from db></p>
				  // <p><Message></p>
				  // <div class="time">System.currentTimeMillis()</div>
				// </div>
			%>
			<div id="footer"><input id="messageInput" type="text" placeholder="Type to chat..."><input type="submit" value="Send"></div>
		</div>
	</body>
</html>