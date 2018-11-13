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
			    border: 1px solid black;
			    text-align: center;
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
	<body>
			<h1>High Score</h1>
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