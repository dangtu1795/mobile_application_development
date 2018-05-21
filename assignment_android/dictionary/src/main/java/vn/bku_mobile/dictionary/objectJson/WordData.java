package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

public class WordData {
    @SerializedName("code")
    @Expose
    private int code;
    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("data")
    @Expose
    private List<WordDetails> wordDetailsList;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<WordDetails> getWordDetailsList() {
        return wordDetailsList;
    }

    public void setWordDetailsList(List<WordDetails> wordDetailsList) {
        this.wordDetailsList = wordDetailsList;
    }
}
