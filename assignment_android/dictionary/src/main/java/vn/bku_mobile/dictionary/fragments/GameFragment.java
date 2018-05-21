package vn.bku_mobile.dictionary.fragments;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.GridView;

import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.adapter.ImageAdapter;


public class GameFragment extends Fragment {
    public GameFragment() {
        // Required empty public constructor
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_game, container, false);

        //Next version
        // Inflate the layout for this fragment
        final String[] MOBILE_OS = new String[] {
                "Word Game"};
        GridView gridView;
        gridView = view.findViewById(R.id.gridView1);

        gridView.setAdapter(new ImageAdapter(getContext(), MOBILE_OS));
        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				startActivity(new Intent(getActivity(), GameActivity.class));
            }
        });
        return view;
    }
}
