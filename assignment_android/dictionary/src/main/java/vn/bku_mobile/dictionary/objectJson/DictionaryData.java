package vn.bku_mobile.dictionary.objectJson;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.lang.reflect.Array;
import java.util.List;

public class DictionaryData {
    @SerializedName("code")
    @Expose
    private int code;
    @SerializedName("message")
    @Expose
    private String message;
    @SerializedName("data")
    @Expose
    private List<DataInfo> datainfo;

    public int getCode(){
        return code;
    }
    public void setCode(int code){
        this.code = code;
    }
    public String getMessage(){
        return message;
    }
    public void setMessage(String message){
        this.message = message;
    }
    public List<DataInfo> getDatainfo() {
        return datainfo;
    }
    public void setDatainfo(List<DataInfo> datainfo) {
        this.datainfo = datainfo;
    }
}
