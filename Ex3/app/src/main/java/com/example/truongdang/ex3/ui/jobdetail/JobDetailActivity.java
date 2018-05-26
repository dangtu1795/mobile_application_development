package com.example.truongdang.ex3.ui.jobdetail;

import android.graphics.Color;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseActivity;
import com.example.truongdang.ex3.data.CoreManager;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.data.database.RealmController;
import com.example.truongdang.ex3.data.models.JobInfo;

import io.realm.Realm;

public class JobDetailActivity extends BaseActivity<JobDetailPresenter> implements JobDetailMvpView, View.OnClickListener {
    private JobInfo jobInfo;
    private TextView button;
    private CoreManager coreManager = CoreManager.getInstance();

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
        jobInfo = ((JobInfo) getIntent().getSerializableExtra(ExtraKeys.JOB_DETAIL));
        ((TextView) mainView.findViewById(R.id.companyName)).setText(jobInfo.getCompany());
        ((TextView) mainView.findViewById(R.id.jobLocation)).setText(String.format(getString(R.string.location), jobInfo.getLocation()));
        ((TextView) mainView.findViewById(R.id.jobTitle)).setText(jobInfo.getName());
        ((TextView) mainView.findViewById(R.id.jobSalary)).setText(String.format(getString(R.string.salary), jobInfo.getSalary()));
        (button = mainView.findViewById(R.id.saveBtn)).setOnClickListener(this);

        if (coreManager.getFavoriteJobs().contains(jobInfo)) {
            button.setText("Saved");
            button.setBackground(getDrawable(R.drawable.white_button));
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.saveBtn: {
                if (button.getText() == "Saved") {
                    coreManager.removeFavoriteJobs(jobInfo);
                    button.setText("Save job");
                    button.setTextColor(Color.WHITE);
                    button.setBackground(getDrawable(R.drawable.button));
                } else {
                    coreManager.addFavoriteJobs(jobInfo);
                    button.setText("Saved");
                    button.setTextColor(ContextCompat.getColor(this, R.color.buttonBlue));
                    button.setBackground(getDrawable(R.drawable.white_button));
                }
                break;
            }
        }
    }
}
