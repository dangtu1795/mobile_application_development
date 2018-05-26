package com.example.truongdang.ex3.ui.menu.jobtypelist;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.adapter.JobListAdapter;
import com.example.truongdang.ex3.base.BaseFragment;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.data.models.Job;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;
import com.example.truongdang.ex3.ui.fulljoblist.FullJobListActivity;
import com.example.truongdang.ex3.ui.main.MainActivity;

public class JobListFragment extends BaseFragment<JobListPresenter> implements JobListMvpView, IAdapterDataCallback {
    private RecyclerView recyclerView;
    private JobListAdapter adapter;

    @Override
    protected int getLayoutResource() {
        return R.layout.fragment_job_list;
    }

    @Override
    protected JobListPresenter onCreatePresenter() {
        return new JobListPresenter();
    }

    @Override
    protected void initialView() {
        MainActivity currentActivity = (MainActivity) getCurrentActivity();
        recyclerView = mainView.findViewById(R.id.recycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(currentActivity));
        recyclerView.setAdapter(adapter = new JobListAdapter(currentActivity, currentActivity.getJobList(), this));
    }

    @Override
    public void onItemClick(int position) {
        Intent intent = new Intent(getCurrentActivity(), FullJobListActivity.class);
        intent.putExtra(ExtraKeys.JOB_LIST, adapter.getMainList().get(position));
        startActivity(intent);
    }
}
