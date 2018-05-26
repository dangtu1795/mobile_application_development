package com.example.truongdang.ex3.data.database;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class FavoriteJob extends RealmObject {
    @PrimaryKey
    private int id;
    private String name;
    private String company;
    private String salary;
    private String location;

    public FavoriteJob() {
    }

    public FavoriteJob(int id, String name, String company, String salary, String location) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.salary = salary;
        this.location = location;
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
