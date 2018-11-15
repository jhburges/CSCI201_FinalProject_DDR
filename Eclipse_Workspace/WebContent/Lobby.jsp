<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta name="google-signin-client_id" content="659907662496-ddkhc97cd666st24hfmb7dd634sv14ef.apps.googleusercontent.com">
		<link rel="stylesheet" href="Lobby.css">
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script>
		var socket;
		var color = 0;

			function connectToServer(){
				socket = new WebSocket("ws://192.168.43.41:8080/PleaseWork/ss");
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
				var name = sessionStorage.getItem("username");
				socket.send(name + ": " + document.chatform.message.value);
				return false;
			}
		</script>
	</head>
	<body onload="connectToServer()" background="images/ddr.jpg">
		<div id="lobby">
			<div class="g-signin2" onclick="signOut()"></div>
			<script>
			  function signOut() {
			    var auth2 = gapi.auth2.getAuthInstance();
			    auth2.signOut().then(function () {
			      console.log('User signed out.');
			    });
			    auth2.disconnect();
			    window.location = "SignIn.html";
			  }
			</script>
			<img src="https://fontmeme.com/permalink/181114/c904406541ad742a0e010979f19fa227.png" alt="pixel-fonts" border="0" class = "blah">
			<div style="text-align: center; padding: 10px">
				<a href="index.html"><img src="https://fontmeme.com/permalink/181115/69f02ef361c935b7d2d33b166c24b2bf.png" alt="pixel-fonts" border="0" hspace="40"></a>
				<a href="Highscores.jsp"><img src="https://fontmeme.com/permalink/181115/cb7d76c6bc240a755c611543d66f5cec.png" alt="pixel-fonts" border="0"></a>
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
