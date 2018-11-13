package DanceDanceRevolution;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javafx.util.Pair;

/**
 * Servlet implementation class DDR
 */
@WebServlet("/DDR")
public class DDR extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DDR() {
        super();
        // TODO Auto-generated constructor stub
    }
    
    public void init(ServletConfig config) throws ServletException {
		System.out.println("In DDR init");
	}
	
	/**
	 * @see HttpServlet#service(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("In DDR service method");
		
		String score = request.getParameter("score");
		String username = request.getParameter("username");
		
		System.out.println("Score: " + score + "\nUsername: " + username);
		
		JDBCDriver.updateHighScore(username, Integer.valueOf(score));
	}
	
	public static ArrayList<Pair<String, Integer> > sortUserScores(ArrayList<Pair<String, Integer> > scores){
		
		Collections.sort(scores, new Comparator<Pair<String, Integer> >() {
			@Override
			public int compare(Pair<String, Integer> p1, Pair<String, Integer> p2) {
				return p2.getValue().compareTo(p1.getValue());
			}
		});
		
		return scores;
		
	}

}
