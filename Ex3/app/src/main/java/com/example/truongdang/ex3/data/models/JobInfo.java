package com.example.truongdang.ex3.data.models;

import android.os.Parcelable;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


public class JobInfo implements Serializable {
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
        } catch (ParseException ex) {
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

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof JobInfo)) {
            return false;
        }
        JobInfo other = (JobInfo) obj;
        return name.equals(other.getName()) && location.equals(other.getLocation()) && company.equals(other.getCompany()) && salary.equals(other.getSalary());
    }
}