<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
	<html>
	<head>
		<meta charset="ISO-8859-1">
		<title>High Scores</title>
		<link rel="stylesheet" href="HighScores.css">
		<style>
			table, th, td {
			    border: 1px solid;
			    border-color: white;
			    text-align: center;
			    color: #4acbef;
			}
			h1{
				color: white;
			}
			
		</style>
		<%
			// Pull usernames and scores from the db
			java.util.ArrayList<javafx.util.Pair<String, Integer> > scores = new java.util.ArrayList();
			scores = DanceDanceRevolution.JDBCDriver.getUserHighScores();
			
			// sort the scores
			scores = DanceDanceRevolution.DDR.sortUserScores(scores);
		%>
	</head>
	<body background="images/ddr.jpg">
			<a href="Lobby.jsp"><img src="https://fontmeme.com/permalink/181115/cb7d76c6bc240a755c611543d66f5cec.png" alt="pixel-fonts" border="0"></a>
			<br><br>
			<table style="width:100%">
			  <tr>
			    <th>Username</th> 
			    <th>High Score</th>
			  </tr>
			  <%
			  for(javafx.util.Pair<String, Integer> score : scores){
			  %>
			      <tr>
			      <td><%= score.getKey() %></td>
			      <td><%= score.getValue() %></td>
			      </tr>
			  <%
			  }
			  %>
			  
			</table>
	</body>
</html>
