package com.example.truongdang.ex3.ui.fulljoblist;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.adapter.FullJobListAdapter;
import com.example.truongdang.ex3.adapter.JobListAdapter;
import com.example.truongdang.ex3.base.BaseActivity;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.data.models.Job;
import com.example.truongdang.ex3.data.models.JobInfo;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;
import com.example.truongdang.ex3.ui.jobdetail.JobDetailActivity;

import java.util.ArrayList;
import java.util.List;

public class FullJobListActivity extends BaseActivity<FullJobListPresenter> implements FullJobListMvpView, IAdapterDataCallback {
    private RecyclerView recyclerView;
    private FullJobListAdapter adapter;
    private String jobGroup = "";
    private List<JobInfo> jobList;

    @Override
    protected int getLayoutResource() {
        return R.layout.fragment_job_list;
    }

    @Override
    protected String getScreenTitle() {
        return "";
    }

    @Override
    protected FullJobListPresenter onCreatePresenter() {
        return new FullJobListPresenter();
    }

    @Override
    protected void initialView() {
        showLoading();
        recyclerView = mainView.findViewById(R.id.recycler);
        Job job = (Job) getIntent().getSerializableExtra(ExtraKeys.JOB_LIST);
        jobGroup = job.getName();
        jobList = job.getJobs();
        setTitle(jobGroup);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(adapter = new FullJobListAdapter(this, jobList, this));
        hideLoading();
    }

    @Override
    public void onItemClick(int position) {
        Intent intent = new Intent(this, JobDetailActivity.class);
        intent.putExtra(ExtraKeys.JOB_DETAIL, adapter.getMainList().get(position));
        startActivity(intent);
    }
}
