package com.example.truongdang.ex3.ui.menu.jobsearch;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseFragment;

public class JobSearchFragment extends BaseFragment<JobSearchPresenter> implements  JobSearchMvpView {
    @Override
    protected int getLayoutResource() {
        return R.layout.fragment_job_search;
    }

    @Override
    protected JobSearchPresenter onCreatePresenter() {
        return new JobSearchPresenter();
    }

    @Override
    protected void initialView() {

    }
}
