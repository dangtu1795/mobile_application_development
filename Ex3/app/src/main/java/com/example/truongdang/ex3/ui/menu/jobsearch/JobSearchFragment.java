package com.example.truongdang.ex3.ui.menu.jobsearch;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.adapter.FullJobListAdapter;
import com.example.truongdang.ex3.base.BaseFragment;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.data.models.JobInfo;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;
import com.example.truongdang.ex3.ui.jobdetail.JobDetailActivity;
import com.example.truongdang.ex3.ui.main.MainActivity;

import java.util.ArrayList;

public class JobSearchFragment extends BaseFragment<JobSearchPresenter> implements JobSearchMvpView, IAdapterDataCallback, AdapterView.OnItemSelectedListener {
    private Spinner spinner;

    enum SearchType {
        CATEGORY, NAME
    }

    private TextView searchResult;
    private EditText searchInput;
    private SearchType currentSearchType = SearchType.CATEGORY;
    private FullJobListAdapter jobAdapter;

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
        searchResult = mainView.findViewById(R.id.searchResult);
        spinner = mainView.findViewById(R.id.spinner);
        searchInput = mainView.findViewById(R.id.searchInput);

        getPresenter().updateSearchBar(searchInput, ((MainActivity) getCurrentActivity()).getJobList());

        // Create an ArrayAdapter using the string array and a default spinner layout
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(getCurrentActivity(),
                R.array.search_type, android.R.layout.simple_spinner_item);
        // Specify the layout to use when the list of choices appears
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        // Apply the adapter to the spinner
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(this);
        spinner.setSelection(0);

        RecyclerView recyclerView = mainView.findViewById(R.id.recycler);
        recyclerView.setLayoutManager(new LinearLayoutManager(getCurrentActivity()));
        recyclerView.setAdapter(jobAdapter = new FullJobListAdapter(getCurrentActivity(), new ArrayList<JobInfo>(), this));
    }

    @Override
    public void onSearchJobDone(ArrayList<JobInfo> result) {
        jobAdapter.update(result);
        jobAdapter.notifyDataSetChanged();
        searchResult.setText(String.format(getString(R.string.searchResult), result.size(), searchInput.getText()));
    }

    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        currentSearchType = (position == 0) ? SearchType.CATEGORY : SearchType.NAME;
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {
        spinner.setSelection(spinner.getSelectedItemPosition());
    }

    @Override
    public SearchType getCurrentSearchType() {
        return currentSearchType;
    }

    @Override
    public void onItemClick(int position) {
        Intent intent = new Intent(getCurrentActivity(), JobDetailActivity.class);
        intent.putExtra(ExtraKeys.JOB_DETAIL, jobAdapter.getMainList().get(position));
        startActivity(intent);
    }
}
