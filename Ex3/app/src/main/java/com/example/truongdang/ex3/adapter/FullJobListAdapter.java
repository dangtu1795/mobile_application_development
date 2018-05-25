package com.example.truongdang.ex3.adapter;

import android.content.Context;
import android.view.View;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseRecyclerAdapter;
import com.example.truongdang.ex3.base.BaseViewHolder;
import com.example.truongdang.ex3.data.models.JobInfo;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;

import java.util.List;

public class FullJobListAdapter extends BaseRecyclerAdapter<JobInfo, FullJobListAdapter.FullJobListViewHolder> {
    private IAdapterDataCallback callback;
    private Context context;

    public FullJobListAdapter(Context context, List<JobInfo> list, IAdapterDataCallback callback) {
        super(context, list);
        this.context = context;
        this.callback = callback;
    }

    @Override
    protected FullJobListViewHolder getNewHolder(View convertView) {
        return new FullJobListViewHolder(convertView);
    }

    @Override
    protected int getItemLayoutResource() {
        return R.layout.item_job_info;
    }

    @Override
    protected void handleItem(FullJobListViewHolder holder, final int position, JobInfo item) {
        holder.line.setVisibility((position == mainList.size() - 1) ? View.GONE : View.VISIBLE);
        holder.companyName.setText(item.getCompany());
        holder.jobLocation.setText(String.format(context.getString(R.string.location), item.getLocation()));
        holder.jobName.setText(item.getName());
        holder.jobSalary.setText(String.format(context.getString(R.string.salary), item.getSalary()));
        holder.wrapper.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.onItemClick(position);
            }
        });
    }

    class FullJobListViewHolder extends BaseViewHolder {
        private TextView jobName, jobSalary, jobLocation, companyName;
        private View line;
        private View wrapper;

        FullJobListViewHolder(View itemView) {
            super(itemView);
            line = itemView.findViewById(R.id.line);
            jobName = itemView.findViewById(R.id.jobTitle);
            jobSalary = itemView.findViewById(R.id.jobSalary);
            jobLocation = itemView.findViewById(R.id.jobLocation);
            companyName = itemView.findViewById(R.id.companyName);
            wrapper = itemView.findViewById(R.id.jobItemWrapper);
        }
    }
}
