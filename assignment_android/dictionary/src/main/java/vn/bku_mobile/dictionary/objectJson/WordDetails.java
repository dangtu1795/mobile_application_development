package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class WordDetails {
    @SerializedName("id")
    @Expose
    private int id;
    @SerializedName("text")
    @Expose
    private String text;
    @SerializedName("is_deleted")
    @Expose
    private boolean isDeleted;
    @SerializedName("tansuat")
    @Expose
    private int frequency;
    @SerializedName("word_id")
    @Expose
    private int wordId;
    @SerializedName("separation")
    @Expose
    private String separation;
    @SerializedName("spell")
    @Expose
    private String spell;
    @SerializedName("type")
    @Expose
    private String wordForm;
    @SerializedName("sound1")
    @Expose
    private String britishSoundUrl;
    @SerializedName("sound2")
    @Expose
    private String americanSoundUrl;
    @SerializedName("content")
    @Expose
    private String content;


    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public int getWordId() {
        return wordId;
    }

    public void setWordId(int wordId) {
        this.wordId = wordId;
    }

    public String getSeparation() {
        return separation;
    }

    public void setSeparation(String separation) {
        this.separation = separation;
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
