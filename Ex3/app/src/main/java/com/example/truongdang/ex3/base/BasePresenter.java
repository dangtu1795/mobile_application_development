package com.example.truongdang.ex3.base;

import android.app.Activity;
import android.content.Context;
import android.widget.Toast;

import io.reactivex.Observable;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.disposables.Disposable;
import vn.quankundeptrai.mvpcore.R;
import vn.quankundeptrai.mvpcore.data.network.RetrofitManager;
import vn.quankundeptrai.mvpcore.interfaces.ITask;
import vn.quankundeptrai.mvpcore.utils.GeneralUtils;
import vn.quankundeptrai.mvpcore.utils.KeyboardUtils;

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
        if (!GeneralUtils.isNetworkOnline(mContext)) {
            Toast.makeText(mContext, mContext.getResources().getString(R.string.noNetwork), Toast.LENGTH_SHORT).show();
//            ((BaseActivity) mContext).hideLoading();
            return false;
        }

        return true;
    }


}
