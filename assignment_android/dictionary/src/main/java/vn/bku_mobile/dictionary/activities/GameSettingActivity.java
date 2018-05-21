package vn.bku_mobile.dictionary.activities;

import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Switch;

import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.utils.MusicPlay;

import static vn.bku_mobile.dictionary.core.constants.AppConstants.PREFERENCE_CHECK_MUSIC;
import static vn.bku_mobile.dictionary.core.constants.AppConstants.PREFERENCE_MUSIC;

public class GameSettingActivity extends AppCompatActivity implements View.OnClickListener {
    private SharedPreferences prefs;
    private Boolean musicEnabled;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game_setting);

        prefs = getSharedPreferences(PREFERENCE_MUSIC, MODE_PRIVATE);
        musicEnabled = prefs.getBoolean(PREFERENCE_CHECK_MUSIC, false);
        Switch turnMusic = findViewById(R.id.switch1);
        turnMusic.setChecked(musicEnabled);
        turnMusic.setOnClickListener(this);
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.switch1: {
                musicEnabled = !musicEnabled;
                SharedPreferences.Editor editor = prefs.edit();
                editor.putBoolean(PREFERENCE_CHECK_MUSIC, musicEnabled);
                editor.apply();


                if (musicEnabled) {
                    MusicPlay.SoundPlayer(getBaseContext(), R.raw.nova);
                } else {
                    MusicPlay.player.stop();
                }
            }
        }
    }
}
