package vn.bku_mobile.dictionary.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import vn.bku_mobile.dictionary.R;

import static vn.bku_mobile.dictionary.core.constants.AppConstants.PREFERENCE_POINT;

public class GameActivity extends AppCompatActivity {
    private TextView bestScoreTxt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        bestScoreTxt = findViewById(R.id.tv_best_score);
        Button btn_Start = findViewById(R.id.btn_start_game);
        btn_Start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getBaseContext(), GameContentActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        SharedPreferences prefs = getSharedPreferences(PREFERENCE_POINT, MODE_PRIVATE);
        int restoredPoint = prefs.getInt(PREFERENCE_POINT, 0);
        bestScoreTxt.setText(String.valueOf(restoredPoint));

    }
}
