package com.example.truongdang.ex3.data;

import android.app.Activity;

import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.data.constants.FormatConstants;
import com.example.truongdang.ex3.data.database.RealmController;
import com.example.truongdang.ex3.data.models.JobInfo;
import com.example.truongdang.ex3.utils.PreferenceUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;

/**
 * Created by TQN on 1/19/2018.
 */

public class CoreManager {
    private static CoreManager _instance;
    private Activity currentActivity;
    private Gson gson, commonGson;
    private ArrayList<JobInfo> favoriteJobs = new ArrayList<>();

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

    public ArrayList<JobInfo> getFavoriteJobs() {
        favoriteJobs = PreferenceUtils.getFavoriteJobsPref(currentActivity, ExtraKeys.FAVORITE);
        return favoriteJobs == null ? new ArrayList<JobInfo>() : favoriteJobs;
    }

    public void removeFavoriteJobs(JobInfo job) {
        if (favoriteJobs != null) {
            favoriteJobs = new ArrayList<JobInfo>();
            favoriteJobs.remove(job);
            PreferenceUtils.saveFavoriteJobsPref(ExtraKeys.FAVORITE, favoriteJobs);
        }
    }

    public void addFavoriteJobs(JobInfo job) {
        if (favoriteJobs == null) {
            favoriteJobs = new ArrayList<JobInfo>();
        }
        favoriteJobs.add(job);
        PreferenceUtils.saveFavoriteJobsPref(ExtraKeys.FAVORITE, favoriteJobs);
    }
}
