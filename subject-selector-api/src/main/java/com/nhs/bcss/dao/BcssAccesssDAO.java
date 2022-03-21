package com.nhs.bcss.dao;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nhs.bcss.exception.SearchCriteriaException;
import com.nhs.bcss.pojos.SubjectSearchPO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.Vector;

import javax.sql.DataSource;

import org.apache.catalina.core.ApplicationContext;

public class BcssAccesssDAO {

	private static final Logger Logger = (Logger) LogManager.getLogger(BcssAccesssDAO.class);

	private ApplicationContext applicationContext;
	private DataSource dataSource;
	
	private Connection conn;
	private PreparedStatement subjectCriteria = null;
	
	public void prepareStatements() throws SearchCriteriaException {
		// Make a connection to the database
		try {
			Logger.debug("Connecting do database");
			
			conn = dataSource.getConnection();
			//Make sure auto commit is enabled
			
			
			conn.setAutoCommit(true);
			//Prepare some SQL for use agains this connection
			subjectCriteria = this.conn.prepareStatement("\r\n"
					+ "select 'dddd' as NHS_NUMBER,\r\n"
					+ "    'Osvaldo' as NAME,\r\n"
					+ "    35 as AGE,\r\n"
					+ "    'fff' as HUB,		\r\n"
					+ "    'eeee' as SCREENING_CENTRE,		\r\n"
					+ "    '15-12-2002' as EPISODE_START_DATE,\r\n"
					+ "    '15-12-2002' as EPISODE_END_DATE,\r\n"
					+ "     'ee' as LATEST_EVENT_STATUS    \r\n"
					+ "from dual;");
		}catch(Exception e) {
			throw new SearchCriteriaException("Failed to connect to database: " + e.getMessage());
		}
		
	}
	
	
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

/**
 * Retrieve a vector of SubjectSearch beans representing Search for Age
 * 
 * 
 * @return vector of SubjectSearchPO entries
 * @throws SearchCriteriaException
 */
	public Vector<SubjectSearchPO> getCustomer() {
		Vector<SubjectSearchPO> v = new Vector<SubjectSearchPO>(); 
		
		return v;
	}
}
