package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;


public class DataInfo {
    @SerializedName("id")
    @Expose
    private int id;
    @SerializedName("text")
    @Expose
    private String text;
    @SerializedName("is_deleted")
    @Expose
    private Object is_deleted;
    @SerializedName("tansuat")
    @Expose
    private int tansuat;
    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public String getText(){
        return text;
    }
    public void setText(String text){
        this.text = text;
    }
    public Object getIs_deleted(){
        return is_deleted;
    }
    public void setIs_deleted(Object is_deleted){
        this.is_deleted =is_deleted;
    }
    public int getTansuat(){
        return tansuat;
    }
    public void setTansuat(int tansuat){
        this.tansuat = tansuat;
    }
}
