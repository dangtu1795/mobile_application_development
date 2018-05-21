package vn.bku_mobile.dictionary.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;

import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.activities.FavoriteActivity;
import vn.bku_mobile.dictionary.adapter.FavoriteItemAdapter;

public class SearchFragment extends Fragment implements View.OnClickListener {
    private EditText searchField;
    private RecyclerView mRecyclerView;
    private FavoriteItemAdapter mAdapter;
    private ImageButton cancelBtn;

    public SearchFragment() { }

    public FavoriteItemAdapter getmAdapter(){
        return mAdapter;
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View searchView = inflater.inflate(R.layout.search_bar, container, false);
        ImageButton favoriteBtn = (ImageButton) searchView.findViewById(R.id.favorite_btn);
        searchField = (EditText) searchView.findViewById(R.id.search_field);
        favoriteBtn.setOnClickListener(this);

        //Change Recycler View when search
        mRecyclerView = (RecyclerView) searchView.findViewById(R.id.rv_search_result);
        LinearLayoutManager layoutManager = new LinearLayoutManager(searchView.getContext());
        mRecyclerView.setLayoutManager(layoutManager);

        //Create Adapter first time with empty string
        mAdapter = new FavoriteItemAdapter(getActivity(),"", FavoriteItemAdapter.ITEM.SEARCH_RESULT);
        mRecyclerView.setVisibility(View.VISIBLE);
        mRecyclerView.setAdapter(mAdapter);

        cancelBtn = (ImageButton) searchView.findViewById(R.id.cancel_btn);
        cancelBtn.setOnClickListener(this);

        searchField.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                mAdapter.setResult_FavoriteList(s.toString().toLowerCase());
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                cancelBtn.setVisibility(View.VISIBLE);
                if(!s.toString().isEmpty()){
                    //Update List when text change
                    mAdapter.setResult_FavoriteList(s.toString().toLowerCase());
                    mAdapter.notifyDataSetChanged();
                    mRecyclerView.setVisibility(View.VISIBLE);

                }
                else {
                    mRecyclerView = searchView.findViewById(R.id.rv_search_result);
                    mAdapter.setResult_FavoriteList("");
                    mAdapter.notifyDataSetChanged();
                    mRecyclerView.setVisibility(View.VISIBLE);
                    cancelBtn.setVisibility(View.INVISIBLE);
                }
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        });
        return searchView;
    }
    @Override
    public void onClick(View searchView) {

        switch (searchView.getId()) {
            case R.id.favorite_btn:
                startActivity(new Intent(getActivity(), FavoriteActivity.class));
                break;
            case R.id.cancel_btn:
                searchView.setVisibility(View.INVISIBLE);
                searchField.setText("");
                break;
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        //Reresh when back from another activity
        mAdapter.notifyDataSetChanged();
    }
}
