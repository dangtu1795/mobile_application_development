package com.example.truongdang.ex3.ui.menu.jobsearch;

import android.text.Editable;
import android.text.TextWatcher;
import android.widget.EditText;
import android.widget.Toast;

import com.example.truongdang.ex3.base.BasePresenter;
import com.example.truongdang.ex3.data.models.Job;
import com.example.truongdang.ex3.data.models.JobInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.functions.Consumer;
import io.reactivex.schedulers.Schedulers;
import io.reactivex.subjects.PublishSubject;

public class JobSearchPresenter extends BasePresenter<JobSearchMvpView> {
    void updateSearchBar(final EditText searchBar, final ArrayList<Job> jobList) {
        addDisposable(getSearchBar(searchBar)
                .debounce(800, TimeUnit.MILLISECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe(new Consumer<String>() {
                    @Override
                    public void accept(String s) throws Exception {
                        searchJob(searchBar.getText().toString(), jobList, getMvpView().getCurrentSearchType());
                    }
                })
        );
    }

    private PublishSubject<String> getSearchBar(EditText searchBar) {
        final PublishSubject<String> publishSubject = PublishSubject.create();

        searchBar.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                publishSubject.onNext(s.toString());
            }
        });
        return publishSubject;
    }

    private void searchJob(String searchText, ArrayList<Job> jobList, JobSearchFragment.SearchType searchType) {
        if (searchText.trim().isEmpty()) {
            getMvpView().onSearchJobDone(new ArrayList<JobInfo>());
        }
        ArrayList<JobInfo> jobs = new ArrayList<>();
        switch (searchType) {
            case CATEGORY: {
                for (Job job : jobList) {
                    if (Pattern.compile(Pattern.quote(searchText), Pattern.CASE_INSENSITIVE).matcher(job.getName()).find()) {
                        List<JobInfo> jobInfoList = job.getJobs();
                        jobs.addAll(jobInfoList);
                    }
                }
                getMvpView().onSearchJobDone(jobs);
                break;
            }
            case NAME: {
                for (Job job : jobList) {
                    List<JobInfo> jobInfoList = job.getJobs();
                    for (JobInfo jobInfo : jobInfoList) {
                        if (Pattern.compile(Pattern.quote(searchText), Pattern.CASE_INSENSITIVE).matcher(jobInfo.getName()).find()) {
                            jobs.add(jobInfo);
                        }
                    }
                }
                getMvpView().onSearchJobDone(jobs);
                break;
            }
        }
    }
}
