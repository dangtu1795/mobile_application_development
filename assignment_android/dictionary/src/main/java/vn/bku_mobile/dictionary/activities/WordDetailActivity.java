package vn.bku_mobile.dictionary.activities;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.List;

import io.realm.RealmList;
import retrofit2.Call;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.adapter.WordDetailsAdapter;
import vn.bku_mobile.dictionary.core.network.APIInterface;
import vn.bku_mobile.dictionary.core.network.RetrofitManager;
import vn.bku_mobile.dictionary.database.FavoriteList;
import vn.bku_mobile.dictionary.database.RealmController;
import vn.bku_mobile.dictionary.database.WordDetailObject;
import vn.bku_mobile.dictionary.interfaces.ICallRetrofit;
import vn.bku_mobile.dictionary.interfaces.ModelResponse;
import vn.bku_mobile.dictionary.objectJson.WordData;
import vn.bku_mobile.dictionary.objectJson.WordDetails;

public class WordDetailActivity extends AppCompatActivity {
    private WordDetailsAdapter wordDetailsAdapter;
    private TextView layoutTitle;
    private int wordId;
    private String wordTxt;
    private RecyclerView mRecyclerView;
    private List<WordDetails> listWordDetails;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_word_detail);

        findViewById(R.id.detail_btn_back).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        layoutTitle = findViewById(R.id.word_detail_title);
        mRecyclerView = findViewById(R.id.word_result);


        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(layoutManager);
        mRecyclerView.setHasFixedSize(true);

        getWordId(getIntent());
        getWordData(wordId, this);

    }

    //Use ID to access API to get data
    private void getWordData(final int wordId, final Activity baseActivity) {
        RealmList<WordDetailObject> listWordDetailsLocal = getContentsFromLocalDatabase(wordId);
        //If the detail list is empty in local DB get api
        if (listWordDetailsLocal == null || listWordDetailsLocal.size() == 0) {
            RetrofitManager.getInstance().callApi(this, new ICallRetrofit<WordData>() {
                @Override
                public Call<WordData> getCall(APIInterface apiInterface) {
                    return apiInterface.getWordDetail(wordId);
                }
            }, new ModelResponse<WordData>() {
                @Override
                public void onSuccess(WordData result) {
                    //Assign the returned result
                    listWordDetails = result.getWordDetailsList();
                    //Set word text on action bar
                    if (listWordDetails != null) {
                        wordTxt = listWordDetails.get(0).getText();
                        layoutTitle.setText(wordTxt);
                        //Add that list to Database
                        wordDetailsAdapter = new WordDetailsAdapter(listWordDetails, baseActivity);
                        mRecyclerView.setAdapter(wordDetailsAdapter);
                    }
                }
            });
        } else { //If there is a content list in local db, set that list to the adapter
            wordTxt = listWordDetailsLocal.get(0).getText();
            layoutTitle.setText(wordTxt);
            wordDetailsAdapter = new WordDetailsAdapter(listWordDetailsLocal, baseActivity);
            mRecyclerView.setAdapter(wordDetailsAdapter);
        }
    }

    private void getWordId(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            this.wordId = extras.getInt("id");
        }
    }

    //Check if there is detail of the word in local DB
    private RealmList<WordDetailObject> getContentsFromLocalDatabase(int wordId) {
        FavoriteList dbItem = RealmController.with(this).getItemFavorite(wordId);
        if (dbItem == null) {
            return null;
        } else {
            return dbItem.getWordDetails();
        }
    }

}
