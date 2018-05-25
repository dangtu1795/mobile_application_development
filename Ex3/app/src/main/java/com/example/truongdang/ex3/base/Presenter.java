package com.example.truongdang.ex3.base;

/**
 * Created by TQN on 1/19/2018.
 */

public interface Presenter<V extends BaseMvpView> {

    void attachView(V mvpView);

    void detachView();
}
