package com.example.truongdang.ex3;

import android.content.Context;
import android.util.Log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

public class Utils {
    public static List<Job> ReadJson(Context context)
    {
        String json = null;
        try {
            InputStream is = context.getAssets().open("jobs.json");

            int size = is.available();

            byte[] buffer = new byte[size];

            is.read(buffer);

            is.close();

            json = new String(buffer, "UTF-8");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        GsonBuilder builder = new GsonBuilder();
        Gson gson = builder.create();

        Job[] jobs = gson.fromJson(json, Job[].class);
        List<Job> joblist = Arrays.asList(jobs);
        Log.d("mess",joblist.get(0).jobs.get(0).deadline);
        Log.d("mess",joblist.get(0).jobs.get(0).getDeadline().toString());
        return joblist;
    }
}
