package com.nhs.bcss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nhs.bcss.pojos.UserPO;

@Repository
public interface UserPORepository extends JpaRepository<UserPO, Long>{
}