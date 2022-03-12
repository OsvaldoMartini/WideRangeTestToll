package com.nhs.bcss.pojos;

import java.util.ArrayList;
import java.util.List;

public class Users 
{
    private List<UserPO> userList;
    
    public List<UserPO> getUserList() {
        if(userList == null) {
        	userList = new ArrayList<>();
        }
        return userList;
    }
 
    public void setUserList(List<UserPO> employeeList) {
        this.userList = employeeList;
    }
}
