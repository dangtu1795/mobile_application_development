package vn.bku_mobile.dictionary.objectJson;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class TranslationContent {
    @SerializedName("translatedText")
    @Expose
    private String translatedText;

    public String getTranslatedText() {
        return translatedText;
    }

    public void setTranslatedText(String translatedText) {
        this.translatedText = translatedText;
    }

    public TranslationContent withTranslatedText(String translatedText) {
        this.translatedText = translatedText;
        return this;
    }
}
