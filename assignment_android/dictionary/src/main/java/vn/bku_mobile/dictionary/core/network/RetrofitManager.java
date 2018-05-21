package vn.bku_mobile.dictionary.core.network;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import vn.bku_mobile.dictionary.core.constants.AppConstants;
import vn.bku_mobile.dictionary.interfaces.ICallRetrofit;
import vn.bku_mobile.dictionary.interfaces.ModelResponse;
import vn.bku_mobile.dictionary.utils.GeneralUtils;

public class RetrofitManager {
    private static RetrofitManager retrofitManager;
    private APIInterface retrofit;
    private Gson gson;

    public RetrofitManager() {
        gson = new GsonBuilder()
                .setLenient()
                .excludeFieldsWithoutExposeAnnotation().create();
    }

    public static RetrofitManager getInstance() {
        if (retrofitManager == null) {
            retrofitManager = new RetrofitManager();
        }

        return retrofitManager;
    }

    public APIInterface getRetrofit() {
        if (retrofit == null) {
            retrofit = initialRetrofit(APIConstants.BASE_URL);
        }

        return retrofit;
    }

    public APIInterface getRetrofit(String customRootUrl) {
        return initialRetrofit(customRootUrl);
    }

    public APIInterface initialRetrofit(String customRootUrl) {
        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient httpClient = new OkHttpClient.Builder()
                .addInterceptor(interceptor)
                .connectTimeout(AppConstants.API_TIMEOUT, TimeUnit.SECONDS)
                .readTimeout(AppConstants.API_TIMEOUT, TimeUnit.SECONDS)
                .writeTimeout(AppConstants.API_TIMEOUT, TimeUnit.SECONDS)
                .build();

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(customRootUrl)
                .client(httpClient)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();

        return retrofit.create(APIInterface.class);
    }

    private boolean checkNetwork(Context context) {
        if (!GeneralUtils.isNetworkOnline(context)) {
            Toast.makeText(context, "Network Error", Toast.LENGTH_SHORT).show();
            return false;
        }

        return true;
    }

    public <T> void callApi(final Activity activity, final ICallRetrofit<T> iCall, final ModelResponse<T> callback) {
        callApi(activity,null,iCall,callback);
    }

    public <T> void callApi(final Activity activity, String customUrl, final ICallRetrofit<T> iCall, final ModelResponse<T> callback) {
        if (!checkNetwork(activity)) {
            return;
        }

        iCall.getCall(customUrl!=null?getRetrofit(customUrl):getRetrofit()).enqueue(new Callback<T>() {
            @Override
            public void onResponse(Call<T> call, final Response<T> response) {
                if (activity != null) {
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            T body = response.body();
                            if (response.code() == 200 && body != null && callback != null) {
                                callback.onSuccess(body);
                            }
                        }
                    });
                }
            }

            @Override
            public void onFailure(Call<T> call, Throwable t) {
                Log.e("onFailure", t.toString());
            }
        });
    }
}