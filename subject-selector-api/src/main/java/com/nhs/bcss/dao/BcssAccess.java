package com.nhs.bcss.dao;

/* BCSS
* 
* @author OsvaldoMartini
* @version 1.0
* 
*/

import java.sql.*;
import java.util.Vector;

import org.apache.logging.log4j.*;

import com.nhs.bcss.exception.SearchCriteriaException;
import com.nhs.bcss.pojos.CustomerSearchPO;

public class BcssAccess {
	/**
	 * Provides data access to the BCSS Customer tables for search criterias
	 * processing.
	 * 
	 * @author Osvaldo Martini
	 * @version 1.0
	 * 
	 */

	// Set up logging
	private static Logger logger = LogManager.getLogger(BcssAccess.class);

	private Connection conn;
	private PreparedStatement getCustomersEntries = null;

	/**
	 * Default constructor
	 */
	public BcssAccess() {

	}

	/**
	 * Make a connection to the ACBS database
	 * 
	 * @param jdbcUrl  fully qualified URL and SID for the ACBS database
	 * @param jdbcUser user id for access to the ACBS database
	 * @param jdbcPwd  password for access to the ACBS database
	 * @throws SearchCriteriaException
	 */
	public void connect(String jdbcUrl, String jdbcUser, String jdbcPwd) throws SearchCriteriaException {
		// Make a connection to the database
		try {
			logger.debug("Connecting to database at URL " + jdbcUrl);
			Class.forName("oracle.jdbc.OracleDriver");
			conn = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPwd);
			// Make sure auto commit is enabled
			conn.setAutoCommit(true);
			// Prepare some SQL for use against this connection
			getCustomersEntries = conn.prepareStatement("SELECT DISTINCT 		\r\n"
					+ "    s.subject_nhs_number as NHS_NUMBER,\r\n"
					+ "    (c.person_family_name|| ', ' || c.person_given_name) as NAME,\r\n"
					+ "    TRUNC(months_between(sysdate,c.date_of_birth)/12) as AGE,\r\n"
					+ "    hub.org_code as HUB,		\r\n"
					+ "    sc.org_code as SCREENING_CENTRE,		\r\n"
					+ "    to_char(ep.episode_start_date,'DD/MM/YYYY') as EPISODE_START_DATE,\r\n"
					+ "    to_char(ep.episode_end_date,'DD/MM/YYYY') as EPISODE_END_DATE,\r\n"
					+ "    vv1.allowed_value as LATEST_EVENT_STATUS    \r\n"
					+ "FROM screening_subject_t s		\r\n"
					+ "join sd_contact_t c on s.subject_nhs_number=c.nhs_number 		\r\n"
					+ "join gp_practice_current_links gplink on c.gp_practice_id=gplink.gp_practice_id		\r\n"
					+ "left join org gp on gplink.gp_practice_id=gp.ORG_ID		\r\n"
					+ "join org hub on gplink.hub_id=hub.ORG_ID		\r\n"
					+ "join org sc on gplink.sc_id=sc.ORG_ID		\r\n"
					+ "left join (select screening_subject_id,max(subject_epis_id) as latest_episode_id from ep_subject_episode_t group by screening_subject_id) latest_episode on s.screening_subject_id=latest_episode.screening_subject_id	\r\n"
					+ "left join ep_subject_episode_t ep on ep.subject_epis_id=latest_episode.latest_episode_id		\r\n"
					+ "left join valid_values vv1 on ep.latest_event_status_id=vv1.valid_value_id		\r\n"
					//+ "where TRUNC(months_between(sysdate,c.date_of_birth)/12) >= 50 and TRUNC(months_between(sysdate,c.date_of_birth)/12) <= 60\r\n"
					+ "order by NHS_NUMBER asc");

		} catch (Exception e) {
			throw new SearchCriteriaException(
					"Failed to connect to database at" + jdbcUrl + "with user" + jdbcUser + ": " + e.getMessage());
		}
	}

	/**
	 * Retrieve a vector os Customers entry beans representing searching subjects
	 * delivery items.
	 * 
	 * @return vector of Customers entries
	 * @throws SearchCriteriaException
	 */
	public Vector<CustomerSearchPO> getEntries() throws SearchCriteriaException {
		Vector<CustomerSearchPO> v = new Vector<CustomerSearchPO>();
		if (conn != null) {
			// Retrieve all customers
			try {
				ResultSet rset = getCustomersEntries.executeQuery();
				// Add a Customer entry bean to the vector for each result
				while (rset.next()) {
					v.add(new CustomerSearchPO(rset.getString("NHS_NUMBER"), rset.getString("NAME"),
							Short.parseShort(rset.getString("AGE")), rset.getString("HUB"),
							rset.getString("SCREENING_CENTRE"), rset.getString("EPISODE_START_DATE"),
							rset.getString("EPISODE_END_DATE"), rset.getString("LATEST_EVENT_STATUS")
					));
				}
				logger.debug(v.size() + " total entries retrieved from Customers");
				rset.close();
			} catch (SQLException e) {
				throw new SearchCriteriaException(
						"An SQL ocurred while retrieving Customers entries: " + e.getMessage());
			}
		} else {
			throw new SearchCriteriaException(" A database connection is required.");
		}
		return v;
	}

	/**
	 * Close the ACBS database connection
	 * 
	 * @throws SearchCriteriaException
	 */
	public void Close() throws SearchCriteriaException {
		try {
			conn.close();
		} catch (SQLException e) {
			throw new SearchCriteriaException("Failed to close database connection: " + e.getMessage());
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		BcssAccess pqma = new BcssAccess();
		try {
			pqma.connect("jdbc:oracle:thin:@fhd-acdb1:1522:OACBAD1", "bsdtadls", "loanall001");
			Vector<CustomerSearchPO> v = pqma.getEntries();
			for (int i = 0; i < v.size(); i++) {
				CustomerSearchPO p = v.get(i);
				System.out.println("NHS Number . .  . . : " + p.getNHS_NUMBER());
				System.out.println("Name . .  . . : " + p.getNAME());
				System.out.println("Age . .  . . : " + p.getAGE());
				System.out.println("HUB . .  . . : " + p.getHUB());
				System.out.println("Screening Centre . .  . . : " + p.getSCREENING_CENTRE());
				System.out.println("Episode start date . .  . . : " + p.getEPISODE_START_DATE());
				System.out.println("Episode end date . .  . . : " + p.getEPISODE_END_DATE());
				System.out.println("Last event Status . .  . . : " + p.getLATEST_EVENT_STATUS());
			}
			pqma.Close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
