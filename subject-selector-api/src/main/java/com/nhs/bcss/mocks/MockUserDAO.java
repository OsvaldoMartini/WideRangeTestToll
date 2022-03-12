package com.nhs.bcss.mocks;

import org.springframework.stereotype.Repository;

import com.nhs.bcss.pojos.UserPO;
import com.nhs.bcss.pojos.Users;

@Repository
public class MockUserDAO 
{
    private static Users list = new Users();
    
    static 
    {
        list.getUserList().add(new UserPO(1, "Lokesh", "Gupta", "howtodoinjava@gmail.com"));
        list.getUserList().add(new UserPO(2, "Alex", "Kolenchiskey", "abc@gmail.com"));
        list.getUserList().add(new UserPO(3, "David", "Kameron", "titanic@gmail.com"));
    }
    
    public Users getAllUsers() 
    {
        return list;
    }
    
    public void addUser(UserPO userPO) {
        list.getUserList().add(userPO);
    }
}
