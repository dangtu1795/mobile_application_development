package com.example.truongdang.ex3.data;

import android.app.Activity;

import com.example.truongdang.ex3.data.constants.FormatConstants;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by TQN on 1/19/2018.
 */

public class CoreManager {
    private static CoreManager _instance;

    private Activity currentActivity;
    private Gson gson, commonGson;

    private CoreManager() {
        gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        commonGson = new GsonBuilder()
                .setDateFormat(FormatConstants.SERVER_FORMAT)
                .excludeFieldsWithoutExposeAnnotation().create();
    }

    public static CoreManager getInstance() {
        if (_instance == null) {
            _instance = new CoreManager();
        }

        return _instance;
    }

    public Activity getCurrentActivity() {
        return currentActivity;
    }

    public void setCurrentActivity(Activity currentActivity) {
        this.currentActivity = currentActivity;
    }

}
