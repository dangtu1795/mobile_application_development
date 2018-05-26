package com.example.truongdang.ex3.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.example.truongdang.ex3.data.CoreManager;
import com.example.truongdang.ex3.data.models.JobInfo;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;


/**
 * Created by TQN on 1/19/2018.
 */

public class PreferenceUtils {
    private static final String prefName = "BKU_JOB_MARKET"; //Change to your app name later

    /**
     * Save specific string to SharedPreferences
     *
     * @param context The context of the preferences whose values are wanted.
     * @param key     The name of the preference to modify.
     * @param value   The menu_new value for the preference.
     */
    private static void saveStringPref(Context context, String key,
                                       String value) {
        if (context == null) return;

        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString(key, value);
        editor.apply();
    }


    public static void saveFavoriteJobsPref(String key, ArrayList<JobInfo> value) {
        saveFavoriteJobsPref(CoreManager.getInstance().getCurrentActivity(), key, value);
    }

    public static void saveStringPref(String key, String value) {
        saveStringPref(CoreManager.getInstance().getCurrentActivity(), key, value);
    }

    /**
     * Save specific int to SharedPreferences
     *
     * @param context The context of the preferences whose values are wanted.
     * @param key     The name of the preference to modify.
     * @param value   The menu_new value for the preference.
     */
    public static void saveIntPref(Context context, String key,
                                   int value) {
        if (context == null) return;

        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.putInt(key, value);
        editor.apply();
    }

    public static void saveIntPref(String key, int value) {
        saveIntPref(CoreManager.getInstance().getCurrentActivity(), key, value);
    }

    /**
     * Save specific long to SharedPreferences
     *
     * @param context The context of the preferences whose values are wanted.
     * @param key     The name of the preference to modify.
     * @param value   The menu_new value for the preference.
     */
    public static void saveLongPref(Context context, String key,
                                    long value) {
        if (context == null) return;

        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.putLong(key, value);
        editor.apply();
    }

    private static void saveFavoriteJobsPref(Context context, String key, ArrayList<JobInfo> value) {
        if (context == null) {
            return;
        }
        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString(key, new Gson().toJson(value));
        editor.apply();
    }

    public static ArrayList<JobInfo> getFavoriteJobsPref(Context context, String key) {
        SharedPreferences sharedPrefs = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        Gson gson = new Gson();
        String json = sharedPrefs.getString(key, null);

        Type type = new TypeToken<ArrayList<JobInfo>>() {
        }.getType();
        return gson.fromJson(json, type);
    }

    public static void saveLongPref(String key, long value) {
        saveLongPref(CoreManager.getInstance().getCurrentActivity(), key, value);
    }

    public static void saveFloatPref(Context context, String key,
                                     float value) {
        if (context == null) return;

        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.putFloat(key, value);
        editor.apply();
    }

    public static void saveFloatPref(String key, float value) {
        saveFloatPref(CoreManager.getInstance().getCurrentActivity(), key, value);
    }

    /**
     * Save specific bool to SharedPreferences
     *
     * @param context The context of the preferences whose values are wanted.
     * @param key     The name of the preference to modify.
     * @param value   The menu_new value for the preference.
     */
    public static void saveBoolPref(Context context, String key,
                                    boolean value) {
        if (context == null) return;

        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.putBoolean(key, value);
        editor.apply();
    }

    public static void saveBoolPref(String key, boolean value) {
        saveBoolPref(CoreManager.getInstance().getCurrentActivity(), key, value);
    }

    /**
     * get specific bool from SharedPreferences
     *
     * @param context  The context of the preferences whose values are wanted.
     * @param key      The name of the preference to modify.
     * @param defValue The default value if reference not exist
     */
    public static boolean getBoolPref(Context context, String key, boolean defValue) {
        if (context == null) return defValue;

        SharedPreferences settings = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        return settings.getBoolean(key, defValue);
    }

    public static boolean getBoolPref(String key, boolean defValue) {
        return getBoolPref(CoreManager.getInstance().getCurrentActivity(), key, defValue);
    }

    /**
     * get specific int from SharedPreferences
     *
     * @param context  The context of the preferences whose values are wanted.
     * @param key      The name of the preference to modify.
     * @param defValue The default value if reference not exist
     */
    public static int getIntPref(Context context, String key, int defValue) {
        if (context == null) return defValue;

        SharedPreferences settings = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        return settings.getInt(key, defValue);
    }

    public static int getIntPref(String key, int defValue) {
        return getIntPref(CoreManager.getInstance().getCurrentActivity(), key, defValue);
    }

    /**
     * get specific string from SharedPreferences
     *
     * @param context  The context of the preferences whose values are wanted.
     * @param key      The name of the preference to modify.
     * @param defValue The default value if reference not exist
     */
    public static String getStringPref(Context context, String key, String defValue) {
        if (context == null) return defValue;
        String result = null;
        SharedPreferences settings = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        result = settings.getString(key, defValue);
        return result;
    }

    public static String getStringPref(String key, String defValue) {
        return getStringPref(CoreManager.getInstance().getCurrentActivity(), key, defValue);
    }

    /**
     * get specific long from SharedPreferences
     *
     * @param context  The context of the preferences whose values are wanted.
     * @param key      The name of the preference to modify.
     * @param defValue The default value if reference not exist
     */
    public static long getLongPref(Context context, String key, long defValue) {
        if (context == null) return defValue;

        SharedPreferences settings = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        return settings.getLong(key, defValue);

    }

    public static long getLongPref(String key, long defValue) {
        return getLongPref(CoreManager.getInstance().getCurrentActivity(), key, defValue);
    }

    public static float getFloatPref(Context context, String key, float defValue) {
        if (context == null) return defValue;

        SharedPreferences settings = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        return settings.getFloat(key, defValue);

    }

    public static float getFloatPref(String key, float defValue) {
        return getFloatPref(CoreManager.getInstance().getCurrentActivity(), key, defValue);
    }

    public static boolean isExist(Context context, String key) {
        if (context == null) {
            return false;
        }
        SharedPreferences settings = context.getSharedPreferences(prefName, /* MODE_PRIVATE */0);
        return settings.contains(key);
    }

    public static boolean isPreferenceItemExist(String key) {
        return isExist(CoreManager.getInstance().getCurrentActivity(), key);
    }

    public static void remove(Context context, String key) {
        if (context == null) return;
        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.remove(key);
        editor.apply();
    }

    public static void removeItemFromPreference(String key) {
        remove(CoreManager.getInstance().getCurrentActivity(), key);
    }

    public static void clearPreference(Context context) {
        if (context == null) return;
        SharedPreferences pref = context.getSharedPreferences(
                prefName, /* MODE_PRIVATE */0);
        SharedPreferences.Editor editor = pref.edit();
        editor.clear();
        editor.apply();
    }

}
