package vn.bku_mobile.dictionary.database;

import io.realm.RealmObject;

public class WordDetailObject extends RealmObject {
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private String text;
    private String spell;
    private String wordForm;
    private String britishSoundUrl;
    private String americanSoundUrl;
    private String content;

    public WordDetailObject() {
    }

    public WordDetailObject(int id, String text, String spell, String wordForm, String britishSoundUrl, String americanSoundUrl, String content) {
        this.id = id;
        this.text = text;
        this.spell = spell;
        this.wordForm = wordForm;
        this.britishSoundUrl = britishSoundUrl;
        this.americanSoundUrl = americanSoundUrl;
        this.content = content;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSpell() {
        return spell;
    }

    public void setSpell(String spell) {
        this.spell = spell;
    }

    public String getWordForm() {
        return wordForm;
    }

    public void setWordForm(String wordForm) {
        this.wordForm = wordForm;
    }

    public String getBritishSoundUrl() {
        return britishSoundUrl;
    }

    public void setBritishSoundUrl(String britishSoundUrl) {
        this.britishSoundUrl = britishSoundUrl;
    }

    public String getAmericanSoundUrl() {
        return americanSoundUrl;
    }

    public void setAmericanSoundUrl(String americanSoundUrl) {
        this.americanSoundUrl = americanSoundUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
