package com.example.truongdang.ex3.ui.menu.favoritejob;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.adapter.FullJobListAdapter;
import com.example.truongdang.ex3.base.BaseFragment;
import com.example.truongdang.ex3.data.CoreManager;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;
import com.example.truongdang.ex3.ui.jobdetail.JobDetailActivity;

public class FavoriteJobFragment extends BaseFragment<FavoriteJobPresenter> implements FavoriteJobMvpView, IAdapterDataCallback {
    private FullJobListAdapter adapter;

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
        RecyclerView recyclerView = mainView.findViewById(R.id.recycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(getCurrentActivity()));
        recyclerView.setAdapter(adapter = new FullJobListAdapter(getCurrentActivity(), CoreManager.getInstance().getFavoriteJobs(), this));
    }

    public void updateJobList() {
        if (adapter != null) {
            adapter.update(CoreManager.getInstance().getFavoriteJobs());
            Log.e("eeeeee", ""+CoreManager.getInstance().getFavoriteJobs().size());
            adapter.notifyDataSetChanged();
        }
    }

    @Override
    public void onItemClick(int position) {
        Intent intent = new Intent(getContext(), JobDetailActivity.class);
        intent.putExtra(ExtraKeys.JOB_DETAIL, adapter.getMainList().get(position));
        startActivity(intent);
    }
}
