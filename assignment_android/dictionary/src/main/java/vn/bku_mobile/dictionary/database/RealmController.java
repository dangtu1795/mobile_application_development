package vn.bku_mobile.dictionary.database;

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
        realm.delete(FavoriteList.class);
        realm.commitTransaction();
    }

    //find all objects in the FavoriteList.class
    public RealmResults<FavoriteList> getFavoriteLists() {

        return realm.where(FavoriteList.class).equalTo("favorite", true).findAllSorted("frequency", Sort.DESCENDING);
    }

    //query a single item with the given id
    public FavoriteList getItemFavorite(int id) {
        return realm.where(FavoriteList.class).equalTo("id", id).findFirst();
    }


    //check if FavoriteList.class is empty
    public boolean isEmpty_FavoriteList() {
        return realm.where(FavoriteList.class).findAll().isEmpty();
    }

    //Refresh the realm istance
    public void refresh() {
        realm.refresh();
    }

    //query example
    public RealmResults<FavoriteList> querySubString(String substring) {
        return realm.where(FavoriteList.class)
                .contains("text", substring)
                .findAllSorted("frequency", Sort.DESCENDING);

    }

    public RealmResults<FavoriteList> queryFavorite() {
        return realm.where(FavoriteList.class)
                .equalTo("favorite", true).findAll();
    }
}
