package vn.bku_mobile.dictionary.objectJson;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class TranslatedDataContent {
    @SerializedName("text")
    @Expose
    private List<String> translated = null;

    public String getTranslated() {
        return translated.get(0);
    }
}
