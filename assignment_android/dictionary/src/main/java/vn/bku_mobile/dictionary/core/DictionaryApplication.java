package vn.bku_mobile.dictionary.core;

import android.app.Application;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import vn.bku_mobile.dictionary.database.FavoriteList;

public class DictionaryApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Realm.init(getApplicationContext());
        RealmConfiguration config = new RealmConfiguration.Builder().build();
        Realm.setDefaultConfiguration(config);
    }
}
