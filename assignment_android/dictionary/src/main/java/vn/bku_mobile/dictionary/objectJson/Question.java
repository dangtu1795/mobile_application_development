package vn.techlove.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

/**
 * Created by TQN on 5/20/2018.
 */

public class Question {
    @SerializedName("id")
    @Expose
    private int id;

    @SerializedName("image")
    @Expose
    private String image;

    @SerializedName("answer")
    @Expose
    private String answer;

    @SerializedName("type")
    @Expose
    private String type;

    @SerializedName("a")
    @Expose
    private String a;

    @SerializedName("a_id")
    @Expose
    private int a_id;

    @SerializedName("b")
    @Expose
    private String b;

    @SerializedName("b_id")
    @Expose
    private int b_id;

    @SerializedName("c")
    @Expose
    private String c;

    @SerializedName("c_id")
    @Expose
    private int c_id;

    @SerializedName("d")
    @Expose
    private String d;

    @SerializedName("d_id")
    @Expose
    private int d_id;

    public String getA() {
        return a;
    }

    public String getB() {
        return b;
    }

    public String getC() {
        return c;
    }

    public String getD() {
        return d;
    }

    public int getA_id() {
        return a_id;
    }

    public int getB_id() {
        return b_id;
    }

    public int getC_id() {
        return c_id;
    }

    public int getD_id() {
        return d_id;
    }

    public int getId() {
        return id;
    }

    public String getAnswer() {
        return answer;
    }

    public String getImage() {
        return image;
    }

    public String getType() {
        return type;
    }
}
