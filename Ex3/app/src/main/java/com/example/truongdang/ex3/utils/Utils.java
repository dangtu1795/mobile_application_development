package com.example.truongdang.ex3.utils;

import android.content.Context;
import android.util.Log;

import com.example.truongdang.ex3.data.Job;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

public class Utils {
    public static List<Job> readJson(Context context) {
        String json = null;
        try {
            InputStream is = context.getAssets().open("jobs.json");

            int size = is.available();

            byte[] buffer = new byte[size];

            is.read(buffer);

            is.close();

            json = new String(buffer, "UTF-8");
            return Arrays.asList(new GsonBuilder().create().fromJson(json, Job[].class));
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
