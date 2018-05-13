package com.example.truongdang.ex3;

import android.util.Log;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


class JobInfo {
    public String name;
    public String company;
    public String salary;
    public String location;
    public String deadline;

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
}

class Job {
    public String name;
    public List<JobInfo> jobs = new ArrayList<>();
    public String handle;
}

public class Jobs {
    public List<Job> joblist = new ArrayList<>();
}