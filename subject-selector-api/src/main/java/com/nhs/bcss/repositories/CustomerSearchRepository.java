package com.nhs.bcss.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.nhs.bcss.pojos.CustomerSearchPO;

//
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface CustomerSearchRepository {
//
////	@PersistenceContext
////	EntityManager entityManager;
//
////	@Query ("select new com.nhs.bcss.pojos.CustomerSearchPO (  \r\n " + " s.subject_nhs_number as NHS_NUMBER,\r\n"
////			+ "    (c.person_family_name|| ', ' || c.person_given_name) as NAME,\r\n"
////			+ "    TRUNC(months_between(sysdate,c.date_of_birth)/12) as AGE,\r\n"
////			+ "    hub.org_code as HUB,		\r\n" + "    sc.org_code as SCREENING_CENTRE,		\r\n"
////			+ "    to_char(ep.episode_start_date,'DD/MM/YYYY') as EPISODE_START_DATE,\r\n"
////			+ "    to_char(ep.episode_end_date,'DD/MM/YYYY') as EPISODE_END_DATE,\r\n"
////			+ "    vv1.allowed_value as LATEST_EVENT_STATUS    ) " + "FROM screening_subject_t s		\r\n"
////			+ "join sd_contact_t c on s.subject_nhs_number=c.nhs_number 		\r\n"
////			+ "join gp_practice_current_links gplink on c.gp_practice_id=gplink.gp_practice_id		\r\n"
////			+ "left join org gp on gplink.gp_practice_id=gp.ORG_ID		\r\n"
////			+ "join org hub on gplink.hub_id=hub.ORG_ID		\r\n" + "join org sc on gplink.sc_id=sc.ORG_ID		\r\n"
////			+ "left join (select screening_subject_id,max(subject_epis_id) as latest_episode_id from ep_subject_episode_t group by screening_subject_id) latest_episode on s.screening_subject_id=latest_episode.screening_subject_id	\r\n"
////			+ "left join ep_subject_episode_t ep on ep.subject_epis_id=latest_episode.latest_episode_id		\r\n"
////			+ "left join valid_values vv1 on ep.latest_event_status_id=vv1.valid_value_id		\r\n"
////			+ "where TRUNC(months_between(sysdate,c.date_of_birth)/12) => :minAge and TRUNC(months_between(sysdate,c.date_of_birth)/12) <= :maxAge"
////			+ "order by NHS_NUMBER asc")
////	Iterable<CustomerSearchPO> findAllCustomerByBetweenAges(@Param("minAge") String minAge,
////			@Param("maxAge") String maxAge);
//
//	@Query(value = "SELECT DISTINCT 		\r\n" + "    s.subject_nhs_number as NHS_NUMBER,\r\n"
//			+ "    (c.person_family_name|| ', ' || c.person_given_name) as NAME,\r\n"
//			+ "    TRUNC(months_between(sysdate,c.date_of_birth)/12) as AGE,\r\n"
//			+ "    hub.org_code as HUB,		\r\n" + "    sc.org_code as SCREENING_CENTRE,		\r\n"
//			+ "    to_char(ep.episode_start_date,'DD/MM/YYYY') as EPISODE_START_DATE,\r\n"
//			+ "    to_char(ep.episode_end_date,'DD/MM/YYYY') as EPISODE_END_DATE,\r\n"
//			+ "    vv1.allowed_value as LATEST_EVENT_STATUS    \r\n" + "FROM screening_subject_t s		\r\n"
//			+ "join sd_contact_t c on s.subject_nhs_number=c.nhs_number 		\r\n"
//			+ "join gp_practice_current_links gplink on c.gp_practice_id=gplink.gp_practice_id		\r\n"
//			+ "left join org gp on gplink.gp_practice_id=gp.ORG_ID		\r\n"
//			+ "join org hub on gplink.hub_id=hub.ORG_ID		\r\n" + "join org sc on gplink.sc_id=sc.ORG_ID		\r\n"
//			+ "left join (select screening_subject_id,max(subject_epis_id) as latest_episode_id from ep_subject_episode_t group by screening_subject_id) latest_episode on s.screening_subject_id=latest_episode.screening_subject_id	\r\n"
//			+ "left join ep_subject_episode_t ep on ep.subject_epis_id=latest_episode.latest_episode_id		\r\n"
//			+ "left join valid_values vv1 on ep.latest_event_status_id=vv1.valid_value_id		\r\n"
//			+ "where TRUNC(months_between(sysdate,c.date_of_birth)/12) >= 50 and TRUNC(months_between(sysdate,c.date_of_birth)/12) <= 60\r\n"
//			+ "order by NHS_NUMBER asc", nativeQuery = true)
//	Object getAllCustomers();
//
//}

@Repository
public class CustomerSearchRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	// thanks Java 8, look the custom RowMapper
	public List<CustomerSearchPO> findAll() {

		List<CustomerSearchPO> result = jdbcTemplate.query("SELECT DISTINCT 		\r\n"
				+ "    s.subject_nhs_number as NHS_NUMBER,\r\n"
				+ "    (c.person_family_name|| ', ' || c.person_given_name) as NAME,\r\n"
				+ "    TRUNC(months_between(sysdate,c.date_of_birth)/12) as AGE,\r\n"
				+ "    hub.org_code as HUB,		\r\n" + "    sc.org_code as SCREENING_CENTRE,		\r\n"
				+ "    to_char(ep.episode_start_date,'DD/MM/YYYY') as EPISODE_START_DATE,\r\n"
				+ "    to_char(ep.episode_end_date,'DD/MM/YYYY') as EPISODE_END_DATE,\r\n"
				+ "    vv1.allowed_value as LATEST_EVENT_STATUS    \r\n" + "FROM screening_subject_t s		\r\n"
				+ "join sd_contact_t c on s.subject_nhs_number=c.nhs_number 		\r\n"
				+ "join gp_practice_current_links gplink on c.gp_practice_id=gplink.gp_practice_id		\r\n"
				+ "left join org gp on gplink.gp_practice_id=gp.ORG_ID		\r\n"
				+ "join org hub on gplink.hub_id=hub.ORG_ID		\r\n"
				+ "join org sc on gplink.sc_id=sc.ORG_ID		\r\n"
				+ "left join (select screening_subject_id,max(subject_epis_id) as latest_episode_id from ep_subject_episode_t group by screening_subject_id) latest_episode on s.screening_subject_id=latest_episode.screening_subject_id	\r\n"
				+ "left join ep_subject_episode_t ep on ep.subject_epis_id=latest_episode.latest_episode_id		\r\n"
				+ "left join valid_values vv1 on ep.latest_event_status_id=vv1.valid_value_id		\r\n"
				+ "where TRUNC(months_between(sysdate,c.date_of_birth)/12) >= 50 and TRUNC(months_between(sysdate,c.date_of_birth)/12) <= 60\r\n"
				+ "order by NHS_NUMBER asc",
				(rs, rowNum) -> new CustomerSearchPO(rs.getString("NHS_NUMBER"), rs.getString("NAME"),
						rs.getShort("AGE"), rs.getString("HUB"), rs.getString("SCREENING_CENTRE"),
						rs.getString("EPISODE_START_DATE"), rs.getString("EPISODE_END_DATE"),
						rs.getString("LATEST_EVENT_STATUS")));

		return result;

	}

}
