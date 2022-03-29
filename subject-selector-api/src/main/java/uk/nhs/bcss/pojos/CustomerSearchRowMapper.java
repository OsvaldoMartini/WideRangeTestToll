package uk.nhs.bcss.pojos;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CustomerSearchRowMapper implements RowMapper<CustomerSearchPO> {
	{

	}

	@Override
	public CustomerSearchPO mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new CustomerSearchPO(rs.getString("NHS_NUMBER"), rs.getString("NAME"), rs.getShort("AGE"),
				rs.getString("HUB"), rs.getString("SCREENING_CENTRE"), rs.getString("EPISODE_START_DATE"),
				rs.getString("EPISODE_END_DATE"), rs.getString("LATEST_EVENT_STATUS"));
	}

	// customer.setCreatedDate(rs.getTimestamp("created_date").toLocalDateTime());

}
