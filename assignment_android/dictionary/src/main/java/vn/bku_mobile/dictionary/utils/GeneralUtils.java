package vn.bku_mobile.dictionary.utils;

import android.content.Context;
import android.net.ConnectivityManager;

/**
 * Created by TQN on 5/16/17.
 */

public class GeneralUtils {
    public static boolean isNetworkOnline(Context context) {
        return ((ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE)).getActiveNetworkInfo() != null;
    }
}