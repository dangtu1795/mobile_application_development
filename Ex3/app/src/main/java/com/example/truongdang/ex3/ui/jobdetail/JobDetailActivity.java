package com.example.truongdang.ex3.ui.jobdetail;

import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseActivity;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.data.models.JobInfo;

public class JobDetailActivity extends BaseActivity<JobDetailPresenter> implements JobDetailMvpView {
    @Override
    protected int getLayoutResource() {
        return R.layout.activity_job_detail;
    }

    @Override
    protected String getScreenTitle() {
        return null;
    }

    @Override
    protected JobDetailPresenter onCreatePresenter() {
        return new JobDetailPresenter();
    }

    @Override
    protected void initialView() {
        JobInfo jobInfo = ((JobInfo)getIntent().getSerializableExtra(ExtraKeys.JOB_DETAIL));
        ((TextView)mainView.findViewById(R.id.companyName)).setText(jobInfo.getCompany());
        ((TextView)mainView.findViewById(R.id.jobLocation)).setText(jobInfo.getLocation());
        ((TextView)mainView.findViewById(R.id.jobTitle)).setText(jobInfo.getName());
        ((TextView)mainView.findViewById(R.id.jobSalary)).setText(jobInfo.getSalary());

    }
}
