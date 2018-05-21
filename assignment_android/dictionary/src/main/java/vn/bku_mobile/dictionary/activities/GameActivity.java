package vn.techlove.dictionary.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import vn.techlove.dictionary.R;

import static vn.techlove.dictionary.core.constants.AppConstants.PREFERENCE_POINT;

public class GameActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game);
        Button btn_Start = findViewById(R.id.btn_start_game);
        btn_Start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getBaseContext(), GameContentActivity.class);
                startActivity(intent);
                finish();
            }
        });
        SharedPreferences prefs = getSharedPreferences(PREFERENCE_POINT, MODE_PRIVATE);
        int restoredPoint = prefs.getInt("point", 0);
        ((TextView) findViewById(R.id.tv_best_score)).setText("" + restoredPoint);
    }

}
