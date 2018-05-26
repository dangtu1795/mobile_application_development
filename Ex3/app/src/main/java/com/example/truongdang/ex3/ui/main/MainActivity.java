package com.example.truongdang.ex3.ui.main;

import android.support.v4.view.ViewPager;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.adapter.PagerAdapter;
import com.example.truongdang.ex3.base.BaseActivity;
import com.example.truongdang.ex3.data.models.Job;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;
import com.example.truongdang.ex3.ui.menu.favoritejob.FavoriteJobFragment;
import com.example.truongdang.ex3.utils.InstantiateUtils;
import com.example.truongdang.ex3.utils.MenuManager;
import com.example.truongdang.ex3.utils.Utils;

import java.util.ArrayList;

import static com.example.truongdang.ex3.data.constants.AppConstants.MENU_FAVORITE;

public class MainActivity extends BaseActivity<MainPresenter> implements MainMvpView, View.OnClickListener, IAdapterDataCallback {
    private ArrayList<Job> jobList;
    private PagerAdapter adapter;
    private ViewPager pager;
    private MenuManager menuManager;

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
        showLoading();
        jobList = new ArrayList<>(Utils.readJson(this));

        pager = mainView.findViewById(R.id.pager);

        ImageView menuBtn = (ImageView) mainView.findViewById(R.id.headerLeftBtn);
        menuBtn.setImageResource(R.drawable.ic_menu);
        menuBtn.setOnClickListener(this);
        ((TextView) mainView.findViewById(R.id.headerTitle)).setText("Job Market");
        menuManager = new MenuManager(this, mainView, this);

        pager.setAdapter(adapter = new PagerAdapter(getSupportFragmentManager(), InstantiateUtils.generateMenuFragments()));
        pager.setOffscreenPageLimit(adapter.getCount() - 1);

        hideLoading();
    }

    public ArrayList<Job> getJobList() {
        return jobList;
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.headerLeftBtn: {
                menuManager.openMenu();
                break;
            }
        }
    }

    @Override
    public void onItemClick(int position) {
        switch (position){
            case MENU_FAVORITE: {
                ((FavoriteJobFragment) adapter.getItem(MENU_FAVORITE)).updateJobList();
            }
        }
        pager.setCurrentItem(position);
    }
}
