Eclipse_Workspace

1. Download zip of final project repository. Unzip repository and import only 'Eclipse_Workspace' folder into Eclipse.

2. Be sure that the jar file 'mysql-connector-java-8.0.12.jar' is added to your build path and deployment path.

3. Make sure youre sql server is running on your computer. Add 'DDR_TABLES.sql' to your MYSQLWorkbench and run it.

4. In src/DanceDanceRevolution/JDBCDriver.java be sure that 'sqlUsername' and 'sqlPassword' variables match the server 
   you are running from.

5. Within Eclipse run 'SignIn.html' on your TomCat swerver.

TODO:

1. Add functions to JDBCDriver to increase number of data structures used
2. Add links on highScores.jsp --> 'Play Game', 'Lobby'
3. Add links on index.html --> 'Lobby' 'Highscores'
4. Add links on Lobby.jsp --> Google button for sign out.
4. Put background on index.html ?
5. make pages prettier
6. Game --> dont let people go below 0, or have them fail the song when they reach 0
