package com.example.truongdang.ex3.ui.menu.jobsearch;

import com.example.truongdang.ex3.base.BaseMvpView;
import com.example.truongdang.ex3.data.models.JobInfo;

import java.util.ArrayList;

public interface JobSearchMvpView extends BaseMvpView {
    JobSearchFragment.SearchType getCurrentSearchType();
    void onSearchJobDone(ArrayList<JobInfo> result);
}
