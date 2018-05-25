package com.example.truongdang.ex3.data;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class JobInfo {
    private String name;
    private String company;
    private String salary;
    private String location;
    private String deadline;

    public Date getDeadline() {
        DateFormat formate = new SimpleDateFormat("d/M/yyyy");
        Date dl;
        try {
            dl = formate.parse(deadline);
            return dl;
        }
        catch(ParseException ex)
        {
            ex.printStackTrace();
        }
        return null;
    }

    public String getName() {
        return name;
    }

    public String getCompany() {
        return company;
    }

    public String getSalary() {
        return salary;
    }

    public String getLocation() {
        return location;
    }
}