Eclipse_Workspace

1. Download zip of final project repository. Unzip repository and import only 'Eclipse_Workspace' folder into Eclipse.

2. Be sure that the jar file 'mysql-connector-java-8.0.12.jar' is added to your build path and deployment path.

3. Make sure youre sql server is running on your computer. Add 'DDR_TABLES.sql' to your MYSQLWorkbench and run it.

4. In src/DanceDanceRevolution/JDBCDriver.java be sure that 'sqlUsername' and 'sqlPassword' variables match the server 
   you are running from.

5. Within Eclipse run 'SignIn.html' on your TomCat swerver.

WHAT WORKS:
 - The Sign In page display
 - Google sign in functionality
 - Play as Guest
 
 - The Logged In page display
 - The High Scores page (assuming mySQL was set up correctly)
 - The chat room (when connected to the same router who's IP is correctly placed in the code)
 - The play game button
 
 - The game menu: difficulty and song selection
 - Back to lobby button
 - The game itself: registering arrow inputs, outputting how accurate the user was, adding up points
 - Updating database once the game is finished
 
 WHAT DOESNT WORK:
 
 - The other sign in buttons on the home page
 - Updating the database on one player's computer after another player has finished playing
