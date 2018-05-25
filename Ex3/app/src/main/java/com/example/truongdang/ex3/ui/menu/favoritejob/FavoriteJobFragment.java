package com.example.truongdang.ex3.ui.menu.favoritejob;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseFragment;

public class FavoriteJobFragment extends BaseFragment<FavoriteJobPresenter> implements FavoriteJobMvpView {
    @Override
    protected int getLayoutResource() {
        return R.layout.fragment_favorite_job;
    }

    @Override
    protected FavoriteJobPresenter onCreatePresenter() {
        return new FavoriteJobPresenter();
    }

    @Override
    protected void initialView() {

    }
}
