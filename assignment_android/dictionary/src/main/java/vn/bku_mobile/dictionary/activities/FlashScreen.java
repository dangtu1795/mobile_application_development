package vn.bku_mobile.dictionary.activities;

import android.content.Intent;
import android.graphics.Color;
import android.os.CountDownTimer;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Window;

import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.core.constants.AppConstants;

public class FlashScreen extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_flash_screen);
        startCountDown(AppConstants.SPLASH_SCREEN_TIME);
    }
    private void startCountDown(int countDownTime){
        new CountDownTimer(countDownTime, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {}
            public void onFinish() {
                Intent intent = new Intent(getBaseContext(), MainActivity.class);
                startActivity(intent);
                finish();
            }
        }.start();
    }
}
