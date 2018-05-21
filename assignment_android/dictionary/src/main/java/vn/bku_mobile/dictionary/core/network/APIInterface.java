package vn.bku_mobile.dictionary.core.network;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;
import vn.bku_mobile.dictionary.objectJson.DictionaryData;
import vn.bku_mobile.dictionary.objectJson.PostGoogleTranslate;
import vn.bku_mobile.dictionary.objectJson.WordData;

public interface APIInterface {
    //Dictionary word list
    @GET("/word/getListWords")
    Call<DictionaryData> getDictionData();

    //Google Translate
    @POST("/language/translate/v2")
    Call<PostGoogleTranslate> postInputText(
            @Body PostGoogleTranslate rawData,
            @Query("key") String key
    );
    //Dictionary word details
    @GET("/word/getDetail/{id}")
    Call<WordData> getWordDetail(
            @Path("id") int id
    );
}
