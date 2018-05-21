package vn.bku_mobile.dictionary.objectJson;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TranslatedDataContent {
    @SerializedName("translations")
    @Expose
    private List<TranslationContent> translated = null;

    public TranslationContent getTranslated() {
        return translated.get(0);
    }

    public void setTranslations(List<TranslationContent> translations) {
        this.translated = translations;
    }

    public TranslatedDataContent withTranslations(List<TranslationContent> translations) {
        this.translated = translations;
        return this;
    }
}
