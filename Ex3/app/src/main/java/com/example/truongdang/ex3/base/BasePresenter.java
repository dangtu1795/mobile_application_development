package com.example.truongdang.ex3.base;

import android.app.Activity;
import android.content.Context;
import android.widget.Toast;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.data.network.RetrofitManager;
import com.example.truongdang.ex3.interfaces.ITask;
import com.example.truongdang.ex3.utils.KeyboardUtils;
import com.example.truongdang.ex3.utils.Utils;

import io.reactivex.Observable;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;
/**
 * Created by TQN on 1/19/2018.
 */

public class BasePresenter <T extends BaseMvpView> implements Presenter<T> {
    protected Context mContext;
    private T mMvpView;
    private CompositeDisposable compositeDisposable;

    @Override
    public void attachView(T mvpView) {
        mMvpView = mvpView;

        if (mvpView instanceof BaseActivity) {
            mContext = (BaseActivity) mvpView;
        } else if (mvpView instanceof BaseFragment) {
            mContext = ((BaseFragment) mvpView).getCurrentActivity();
        }
    }

    @Override
    public void detachView() {
        mMvpView = null;
    }

    public T getMvpView() {
        return mMvpView;
    }

    public void addDisposable(Disposable disposable) {
        if (compositeDisposable == null) {
            compositeDisposable = new CompositeDisposable();
        }
        compositeDisposable.add(disposable);
    }

    public <E> void callApi(Observable<E> observable, ITask<E> task) {
        callApi(observable, task, true);
    }

    public <E> void callApi(Observable<E> observable, ITask<E> task, boolean hideKeyboard) {
        if (!isOnline()) {
            return;
        }
        if (hideKeyboard) {
            KeyboardUtils.hideKeyboard((Activity) mContext);
        }
        compositeDisposable.add(RetrofitManager.getInstance().callApi((BaseActivity) mContext, observable, task));
    }

    private boolean isOnline() {
        if (!Utils.isNetworkOnline(mContext)) {
            Toast.makeText(mContext, "No Internet Connection", Toast.LENGTH_SHORT).show();
//            ((BaseActivity) mContext).hideLoading();
            return false;
        }

        return true;
    }


}
