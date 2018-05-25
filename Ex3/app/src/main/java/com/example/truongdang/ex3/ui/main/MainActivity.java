package com.example.truongdang.ex3.ui.main;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseActivity;
import com.example.truongdang.ex3.utils.Utils;

public class MainActivity extends BaseActivity<MainPresenter> implements MainMvpView {

    @Override
    protected int getLayoutResource() {
        return R.layout.activity_main;
    }

    @Override
    protected String getScreenTitle() {
        return null;
    }

    @Override
    protected MainPresenter onCreatePresenter() {
        return new MainPresenter();
    }

    @Override
    protected void initialView() {
        Utils.readJson(this);

    }
}
