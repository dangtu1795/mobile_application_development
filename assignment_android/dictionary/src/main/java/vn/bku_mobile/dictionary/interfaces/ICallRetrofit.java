package vn.bku_mobile.dictionary.interfaces;

import retrofit2.Call;
import vn.bku_mobile.dictionary.core.network.APIInterface;

public interface ICallRetrofit<T> {
    Call<T> getCall(APIInterface apiInterface);
}
