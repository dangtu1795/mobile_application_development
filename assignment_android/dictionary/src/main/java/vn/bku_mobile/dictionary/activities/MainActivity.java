package vn.bku_mobile.dictionary.activities;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Toast;


import com.facebook.FacebookSdk;

import java.util.ArrayList;
import java.util.List;

import io.realm.Realm;
import retrofit2.Call;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.core.network.APIInterface;
import vn.bku_mobile.dictionary.core.network.RetrofitManager;
import vn.bku_mobile.dictionary.database.FavoriteList;
import vn.bku_mobile.dictionary.database.RealmController;
import vn.bku_mobile.dictionary.fragments.GameFragment;
import vn.bku_mobile.dictionary.fragments.SearchFragment;
import vn.bku_mobile.dictionary.fragments.TranslateFragment;
import vn.bku_mobile.dictionary.interfaces.ICallRetrofit;
import vn.bku_mobile.dictionary.interfaces.ModelResponse;
import vn.bku_mobile.dictionary.objectJson.DataInfo;
import vn.bku_mobile.dictionary.objectJson.DictionaryData;

import static vn.bku_mobile.dictionary.core.constants.AppConstants.PREFERENCE_DATABASE;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, ViewPager.OnPageChangeListener {
    private View line_Search;
    private View line_Translate;
    private View line_Game;

    private SharedPreferences sharedpreferences;

    private Realm realm;
    private ProgressDialog mDialog;
    private android.support.v4.app.Fragment frag;

    private SearchFragment search_Fragment;
    private TranslateFragment translate_Fragment;
    private GameFragment game_Fragment;

    //View Pager
    private ViewPager mPager;
    private static final int NUM_PAGES = 3;

    private enum FRAGMENT_TYPE {
        SEARCH, TRANSLATE, GAME
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Init the facebookSDK to share screenshot
        FacebookSdk.sdkInitialize(getApplicationContext());

        setContentView(R.layout.activity_main);

        sharedpreferences = getSharedPreferences(PREFERENCE_DATABASE, Context.MODE_PRIVATE);

        realm = RealmController.with(this).getRealm();

        //Check if device downloaded the dictionary before
        Boolean hasDownloaded = sharedpreferences.getBoolean("check_download", false);

        //Set Fragment first time
        search_Fragment = new SearchFragment();
        translate_Fragment = new TranslateFragment();
        game_Fragment = new GameFragment();

        //If device hasn't downloaded the dictionary b4, call server to get data
        if (!hasDownloaded) {
            //Set waiting for load data
            mDialog = ProgressDialog.show(this, "", "Please wait", true);

            RetrofitManager.getInstance().callApi(this, new ICallRetrofit<DictionaryData>() {
                @Override
                public Call<DictionaryData> getCall(APIInterface apiInterface) {
                    return apiInterface.getDictionData();
                }
            }, new ModelResponse<DictionaryData>() {
                @Override
                public void onSuccess(DictionaryData result) {
                    mDialog.dismiss();

                    //Save data after
                    ArrayList<FavoriteList> items = new ArrayList<>();
                    if (result != null) {
                        List<DataInfo> listData = result.getDatainfo();
                        if (result.getCode() != 4001) {
                            for (DataInfo dictionaryData : listData) {
                                items.add(new FavoriteList(dictionaryData.getId(), dictionaryData.getText(), dictionaryData.getTansuat(), false, null));
                            }
                            //Save dictionary data to local memory
                            realm.beginTransaction();
                            realm.copyToRealm(items);
                            realm.commitTransaction();

                            search_Fragment.getmAdapter().notifyDataSetChanged();
                            frag = search_Fragment;
                            //Set check downloaded
                            SharedPreferences.Editor editor = sharedpreferences.edit();
                            editor.putBoolean("check_download", true);
                            editor.apply();
                        } else {
                            Toast.makeText(MainActivity.this, result.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    } else {
                        Toast.makeText(MainActivity.this, "Server Error", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }
        line_Search = findViewById(R.id.line_img_search);
        line_Translate = findViewById(R.id.line_img_translate);
        line_Game = findViewById(R.id.line_img_game);
        mPager = findViewById(R.id.pager);

        View navigationBar = findViewById(R.id.navigation);

        View searchBtn = navigationBar.findViewById(R.id.searchBtn);
        View googleBtn = navigationBar.findViewById(R.id.googleBtn);
        View gameBtn = navigationBar.findViewById(R.id.gameBtn);

        searchBtn.setOnClickListener(this);
        googleBtn.setOnClickListener(this);
        gameBtn.setOnClickListener(this);


        line_Search.setVisibility(View.VISIBLE);
        mPager.setAdapter(new ScreenSlidePagerAdapter(getSupportFragmentManager()));
        mPager.addOnPageChangeListener(this);
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    @Override
    public void onPageSelected(int position) {
        line_Search.setVisibility(View.INVISIBLE);
        line_Translate.setVisibility(View.INVISIBLE);
        line_Game.setVisibility(View.INVISIBLE);
        switch (position) {
            case 0:
                line_Search.setVisibility(View.VISIBLE);
                break;
            case 1:
                line_Translate.setVisibility(View.VISIBLE);
                break;
            case 2:
                line_Game.setVisibility(View.VISIBLE);
                break;
        }
    }

    @Override
    public void onPageScrollStateChanged(int state) {

    }

    private class ScreenSlidePagerAdapter extends FragmentStatePagerAdapter {
        //Call each fragment for each page

        ScreenSlidePagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            switch (position) {
                case 0:
                    frag = search_Fragment;
                    break;
                case 1:
                    frag = translate_Fragment;
                    break;
                case 2:
                    frag = game_Fragment;
                    break;
            }
            return frag;
        }

        @Override
        public int getCount() {
            return NUM_PAGES;
        }
    }

    private void changeFragment(FRAGMENT_TYPE typeFragment) {
        mPager.setCurrentItem(typeFragment.ordinal());
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.searchBtn:
                changeFragment(FRAGMENT_TYPE.SEARCH);
                break;
            case R.id.googleBtn:
                changeFragment(FRAGMENT_TYPE.TRANSLATE);
                break;
            case R.id.gameBtn:
                changeFragment(FRAGMENT_TYPE.GAME);
                break;
        }
    }
}
