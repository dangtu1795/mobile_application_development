package com.example.truongdang.ex3.data.database;

import android.app.Activity;
import android.app.Application;
import android.app.Fragment;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.Sort;

public class RealmController {
    private static RealmController instance;
    private final Realm realm;

    public RealmController(Application application) {
        realm = Realm.getDefaultInstance();
    }

    public static RealmController with(Fragment fragment) {

        if (instance == null) {
            instance = new RealmController(fragment.getActivity().getApplication());
        }
        return instance;
    }

    public static RealmController with(Activity activity) {

        if (instance == null) {
            instance = new RealmController(activity.getApplication());
        }
        return instance;
    }

    public static RealmController getInstance() {
        return instance;
    }

    public Realm getRealm() {
        return realm;
    }

    //clear all objects from Favorite.class
    public void clearAll() {
        realm.beginTransaction();
        realm.delete(FavoriteJob.class);
        realm.commitTransaction();
    }

    //find all objects in the FavoriteList.class
    public RealmResults<FavoriteJob> getFavoriteLists() {

        return realm.where(FavoriteJob.class).findAll();
    }

    //check if FavoriteList.class is empty
    public boolean isEmpty_FavoriteList() {
        return realm.where(FavoriteJob.class).findAll().isEmpty();
    }

    //Refresh the realm istance
    public void refresh() {
        realm.refresh();
    }
}
