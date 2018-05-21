package vn.bku_mobile.dictionary.database;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class FavoriteList extends RealmObject {
    @PrimaryKey
    private int id;
    private String text;
    private int frequency;
    private boolean favorite;
    private RealmList<WordDetailObject> wordDetails;

    public FavoriteList() {
    }

    public FavoriteList(int id, String text, int frequency, boolean favorite, RealmList<WordDetailObject> wordDetails) {
        this.id = id;
        this.text = text;
        this.frequency = frequency;
        this.favorite = favorite;
        this.wordDetails = wordDetails;
    }

    public RealmList<WordDetailObject> getWordDetails() {
        return wordDetails;
    }

    public void setWordDetails(RealmList<WordDetailObject> listWordDetails) {
        this.wordDetails = listWordDetails;
    }

    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public int getFrequency() {
        return frequency;
    }

    public boolean getFavorite() {
        return favorite;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

}
