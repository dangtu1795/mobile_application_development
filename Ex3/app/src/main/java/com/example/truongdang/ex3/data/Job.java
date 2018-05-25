package com.example.truongdang.ex3.data;

import java.util.ArrayList;
import java.util.List;

public class Job {
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