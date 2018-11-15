package DanceDanceRevolution;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javafx.util.Pair;

public class JDBCDriver {
	private static Connection conn = null;
	private static ResultSet rs = null;
	private static PreparedStatement ps = null;
	private static Statement st = null;
	
	private static String sqlUsername = "root";
	private static String sqlPassword = "root";
	private static String ipAddress = "localhost";
	
	public static void connect(){
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://" + ipAddress + ":3306/CSCI201_DDR?user=" + sqlUsername + "&password=" + sqlPassword + "&useSSL=false&allowPublicKeyRetrieval=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC");
		} catch (ClassNotFoundException e) {
			System.out.println("JDBCDriver.connect(): CNFE: "); 
			e.printStackTrace();
			
		} catch (SQLException e) {
			System.out.println("JDBCDriver.connect(): SQLE: "); 
			e.printStackTrace();
		}
	}
	
	public static void close(){
		try{
			if (rs!=null){
				rs.close();
				rs = null;
			}
			if(conn != null){
				conn.close();
				conn = null;
			}
			if(ps != null ){
				ps = null;
			}
		}catch(SQLException sqle){
			System.out.println("JDBCDriver.close(): SQLE: ");
			sqle.printStackTrace();
		}
	}
	
	protected static boolean checkEmail(String email) {
		connect();
		try {
			ps = conn.prepareStatement("SELECT * FROM User u WHERE u.email='" + email + "'");
			rs = ps.executeQuery();
			if(rs.next() == true) {
				System.out.println("USER EXISTS ALREADY");
				return true;
			}
			else {
				return false;
			}
		} catch (SQLException sqle) {
			System.out.println("JDBCDriver.checkEmail(): SQLE: " + sqle.getMessage());
		} finally {
			close();
		}
		return false;
	}
	
	protected static void addUser(String username, String email) {
		connect();
		try {
			ps = conn.prepareStatement("INSERT INTO User (username, email, highScore) VALUES (?, ?, ?)");
			ps.setString(1, username);
			ps.setString(2, email);
			ps.setString(3, "0");
			ps.execute();
		} catch (SQLException sqle) {
			System.out.println("JDBCDriver.addUser(): SQLE: " + sqle.getMessage());
		} finally {
			close();
		}
	}
	
	protected static boolean checkNewHighScore(String username, int score) {
		
		boolean result = false;
		connect();
		
		try {
			ps = conn.prepareStatement("SELECT highScore FROM User u WHERE u.username = '" + username + "';");
			rs = ps.executeQuery();
			if(!rs.isBeforeFirst()) {
				// response set empty ... thats no bueno .. add highscore
				result =  true;
			}
			else {
				rs.next();
				int old_score = rs.getInt("highScore");
				if(old_score < score) {
					result = true;
				}
			}
		} catch (SQLException sqle) {
			System.out.println("JDBCDriver.checkNewHighScore(): SQLE: " + sqle.getMessage());
		} finally {
			close();
		}
		
		return result;
		
	}
	
	protected static void updateHighScore(String username, int score) {
		if(checkNewHighScore(username, score)) {
			connect();
			try {
				ps = conn.prepareStatement("UPDATE User u SET highscore = ? WHERE u.username = ?");
				ps.setInt(1, score);
				ps.setString(2, username);
				ps.execute();
			} catch (SQLException sqle) {
				System.out.println("JDBCDriver.updateHighScore(): SQLE: " + sqle.getMessage());
			} finally {
				close();
			}
		}
	}
	
	public static ArrayList<Pair<String, Integer> >getUserHighScores(){
		connect();
				
		ArrayList<Pair<String, Integer> > scores = new ArrayList<Pair<String, Integer> >();
		
		try {
			ps = conn.prepareStatement("SELECT * FROM User;");
			rs = ps.executeQuery();
			while(rs.next()) {
				int score = rs.getInt("highScore");
				String username = rs.getString("username");
				
				Pair<String, Integer> userScore = new Pair<String, Integer>(username, score);
								
				scores.add(userScore);
			}
			
		} catch (SQLException sqle) {
			System.out.println("JDBCDriver.checkNewHighScore(): SQLE: " + sqle.getMessage());
		} finally {
			close();
		}
		
		return scores;
	}
}
