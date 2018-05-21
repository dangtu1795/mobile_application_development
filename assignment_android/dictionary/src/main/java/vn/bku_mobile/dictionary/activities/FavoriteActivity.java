package vn.bku_mobile.dictionary.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageButton;

import java.util.ArrayList;

import io.realm.RealmResults;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.adapter.FavoriteItemAdapter;
import vn.bku_mobile.dictionary.database.FavoriteList;
import vn.bku_mobile.dictionary.database.RealmController;

public class FavoriteActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_favorite);

        RecyclerView mNumbersList = findViewById(R.id.rv_numbers);

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        mNumbersList.setLayoutManager(layoutManager);

        FavoriteItemAdapter mAdapter = new FavoriteItemAdapter(this,"", FavoriteItemAdapter.ITEM.FAVORITE);
        mNumbersList.setAdapter(mAdapter);

        ImageButton btn_back = findViewById(R.id.favorite_btn_back);
        btn_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

    }
}
