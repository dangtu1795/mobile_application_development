package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by TruongDzuy on 5/20/2018.
 */

public class ListQuestionGame {
    @SerializedName("data")
    @Expose
    private List<Question> list_question;
    public List<Question> getList_question() {
        return list_question;
    }

    public static ListQuestionGame instance;
    public static void setListQuestionGame(ListQuestionGame list){
        instance = list;
    }
}
