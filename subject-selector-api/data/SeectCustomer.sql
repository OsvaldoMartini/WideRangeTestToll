SELECT DISTINCT 		
    s.subject_nhs_number as NHS_NUMBER,
    (c.person_family_name|| ', ' || c.person_given_name) as NAME,
    TRUNC(months_between(sysdate,c.date_of_birth)/12) as AGE,
    hub.org_code as HUB,		
    sc.org_code as SCREENING_CENTRE,		
    to_char(ep.episode_start_date,'DD/MM/YYYY') as EPISODE_START_DATE,
    to_char(ep.episode_end_date,'DD/MM/YYYY') as EPISODE_END_DATE,
    vv1.allowed_value as LATEST_EVENT_STATUS    
FROM screening_subject_t s		
join sd_contact_t c on s.subject_nhs_number=c.nhs_number 		
join gp_practice_current_links gplink on c.gp_practice_id=gplink.gp_practice_id		
left join org gp on gplink.gp_practice_id=gp.ORG_ID		
join org hub on gplink.hub_id=hub.ORG_ID		
join org sc on gplink.sc_id=sc.ORG_ID		
left join (select screening_subject_id,max(subject_epis_id) as latest_episode_id from ep_subject_episode_t group by screening_subject_id) latest_episode on s.screening_subject_id=latest_episode.screening_subject_id	
left join ep_subject_episode_t ep on ep.subject_epis_id=latest_episode.latest_episode_id		
left join valid_values vv1 on ep.latest_event_status_id=vv1.valid_value_id		
order by NHS_NUMBER asc;



SELECT DISTINCT 		
    s.subject_nhs_number as NHS_NUMBER,
    "Osvaldo" as NAME,
    35 as AGE,
    "fff" as HUB,		
    "eeee" as SCREENING_CENTRE,		
    '15-12-2002' as EPISODE_START_DATE,
    '15-12-2002' as EPISODE_END_DATE,
     "ee" as LATEST_EVENT_STATUS    
FROM screening_subject_t s		
join sd_contact_t c on s.subject_nhs_number=c.nhs_number 		
join gp_practice_current_links gplink on c.gp_practice_id=gplink.gp_practice_id		
left join org gp on gplink.gp_practice_id=gp.ORG_ID		
join org hub on gplink.hub_id=hub.ORG_ID		
join org sc on gplink.sc_id=sc.ORG_ID		
left join (select screening_subject_id,max(subject_epis_id) as latest_episode_id from ep_subject_episode_t group by screening_subject_id) latest_episode on s.screening_subject_id=latest_episode.screening_subject_id	
left join ep_subject_episode_t ep on ep.subject_epis_id=latest_episode.latest_episode_id		
left join valid_values vv1 on ep.latest_event_status_id=vv1.valid_value_id		
order by NHS_NUMBER asc;