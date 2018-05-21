package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class PostGoogleTranslate {
    @SerializedName("q")
    @Expose
    private String inputText;
    @SerializedName("source")
    @Expose
    private String sourceLanguage;
    @SerializedName("target")
    @Expose
    private String targetLanguage;
    @SerializedName("format")
    @Expose
    private String format;
    @SerializedName("data")
    @Expose
    private TranslatedDataContent translation;

    public PostGoogleTranslate(String inputText, String sourceLanguage, String targetLanguage){
        this.inputText=inputText;
        this.sourceLanguage=sourceLanguage;
        this.targetLanguage=targetLanguage;
        this.format="text";
    }

    public String getInputText(){
        return this.inputText;
    }
    public void setInputText(String input){
        this.inputText=input;
    }
    public String getSourceLanguage(){
        return this.sourceLanguage;

    }
    public void setSourceLanguage(String sourceLanguage){
        this.sourceLanguage=sourceLanguage;
    }
    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getTargetLanguage(){
        return this.targetLanguage;
    }
    public void setTargetLanguage(String targetLanguage){
        this.targetLanguage=targetLanguage;
    }

    public TranslatedDataContent getTranslation(){
        return this.translation;
    }

    public void setTranslation(TranslatedDataContent translation){
        this.translation = translation;
    }
}
