

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Authentication
 */
@WebServlet("/Authentication")
public class Authentication extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Authentication() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String fullName = request.getParameter("name");
		String email = request.getParameter("email");
		System.out.println("GIVEN NAME = " + fullName);
		System.out.println("EMAIL = " + email);
		
		if (checkEmail(email) == false) {
	        addUser(fullName, email);
	        System.out.println("ADDED USER");
        }
	}
	
	protected boolean checkEmail(String email) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/ddr?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("SELECT * FROM users u WHERE u.email='" + email + "'");
			rs = ps.executeQuery();
			if(rs.next() == true) {
				System.out.println("USER EXISTS ALREADY");
				return true;
			}
			else {
				return false;
			}
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
		} catch (ClassNotFoundException cnfe) {
			System.out.println("cnfe: " + cnfe.getMessage());
		}
		return false;
	}
	
	protected void addUser(String username, String email) {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost/ddr?user=root&password=root&useSSL=false");
			ps = conn.prepareStatement("INSERT INTO users (name, email) VALUES (?, ?)");
			ps.setString(1, username);
			ps.setString(2, email);
			ps.execute();
			conn.close();
		} catch (SQLException sqle) {
			System.out.println("sqle: " + sqle.getMessage());
		} catch (ClassNotFoundException cnfe) {
			System.out.println("cnfe: " + cnfe.getMessage());
		}
	}

}
