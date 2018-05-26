package com.example.truongdang.ex3.adapter;

import android.content.Context;
import android.view.View;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseRecyclerAdapter;
import com.example.truongdang.ex3.base.BaseViewHolder;
import com.example.truongdang.ex3.data.models.Job;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;

import java.util.List;

public class JobListAdapter extends BaseRecyclerAdapter<Job, JobListAdapter.JobListViewHolder> {
    private IAdapterDataCallback callback;
    private Context context;

    public JobListAdapter(Context context, List<Job> list, IAdapterDataCallback callback) {
        super(context, list);
        this.context = context;
        this.callback = callback;
    }

    @Override
    protected JobListViewHolder getNewHolder(View convertView) {
        return new JobListViewHolder(convertView);
    }

    @Override
    protected int getItemLayoutResource() {
        return R.layout.item_job;
    }

    @Override
    protected void handleItem(JobListViewHolder holder, final int position, Job item) {
        holder.title.setText(item.getName());
        holder.line.setVisibility((position == mainList.size() - 1) ? View.GONE : View.VISIBLE);
        holder.wrapper.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.onItemClick(position);
            }
        });
    }

    class JobListViewHolder extends BaseViewHolder {
        private TextView title;
        private View line;
        private View wrapper;

        JobListViewHolder(View itemView) {
            super(itemView);
            line = itemView.findViewById(R.id.line);
            title = itemView.findViewById(R.id.jobTitle);
            wrapper = itemView.findViewById(R.id.jobItemWrapper);
        }
    }
}
