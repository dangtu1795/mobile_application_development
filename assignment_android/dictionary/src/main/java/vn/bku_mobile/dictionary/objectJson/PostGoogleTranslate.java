package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

import vn.bku_mobile.dictionary.core.network.APIConstants;

public class PostGoogleTranslate {
    private String inputText;
    private String translateDirection;

    public PostGoogleTranslate(String inputText, String translateDirection) {
        this.inputText = inputText;
        this.translateDirection = translateDirection;
    }

    public String getInputText() {
        return this.inputText;
    }

    public void setInputText(String input) {
        this.inputText = input;
    }

    public String gettranslateDirection() {
        return this.translateDirection;

    }

    public void setSourceLanguage(String translateDirection) {
        this.translateDirection = translateDirection;
    }

}
