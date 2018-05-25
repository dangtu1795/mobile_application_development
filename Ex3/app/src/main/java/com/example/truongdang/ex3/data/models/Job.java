package com.example.truongdang.ex3.data.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Job implements Serializable {
    private String name;
    private List<JobInfo> jobs = new ArrayList<>();
    private String handle;

    public String getName() {
        return name;
    }

    public List<JobInfo> getJobs() {
        return jobs;
    }

    public String getHandle() {
        return handle;
    }
}