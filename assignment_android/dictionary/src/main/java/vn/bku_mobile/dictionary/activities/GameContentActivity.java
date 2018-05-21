package vn.bku_mobile.dictionary.activities;

import android.annotation.SuppressLint;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.CountDownTimer;
import android.support.annotation.IdRes;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewParent;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.core.constants.AppConstants;
import vn.bku_mobile.dictionary.core.network.APIInterface;
import vn.bku_mobile.dictionary.core.network.RetrofitManager;
import vn.bku_mobile.dictionary.interfaces.ICallRetrofit;
import vn.bku_mobile.dictionary.interfaces.ModelResponse;
import vn.bku_mobile.dictionary.objectJson.ListQuestionGame;
import vn.bku_mobile.dictionary.objectJson.Question;
import vn.bku_mobile.dictionary.utils.GeneralUtils;
import vn.bku_mobile.dictionary.utils.MusicPlay;

import static vn.bku_mobile.dictionary.R.drawable.answer_detail_icon;
import static vn.bku_mobile.dictionary.R.drawable.check_border;
import static vn.bku_mobile.dictionary.activities.GameContentActivity.typeAnswer.A;
import static vn.bku_mobile.dictionary.activities.GameContentActivity.typeAnswer.B;
import static vn.bku_mobile.dictionary.activities.GameContentActivity.typeAnswer.C;
import static vn.bku_mobile.dictionary.activities.GameContentActivity.typeAnswer.D;
import static vn.bku_mobile.dictionary.activities.GameContentActivity.typeAnswer.E;
import static vn.bku_mobile.dictionary.core.constants.AppConstants.PREFERENCE_MUSIC;
import static vn.bku_mobile.dictionary.core.constants.AppConstants.PREFERENCE_POINT;
import static vn.bku_mobile.dictionary.core.network.APIConstants.BASE_URL;

@SuppressLint("SetTextI18n")
public class GameContentActivity extends AppCompatActivity implements View.OnClickListener {

    private int cur_question = 0;
    List<Question> list;
    private RadioButton answer_A;
    private RadioButton answer_B;
    private RadioButton answer_C;
    private RadioButton answer_D;
    private RadioButton cur_radio;
    Button modifyButton;
    private int point = 0;
    private TextView tv_point;
    private TextView tv_time;
    private typeAnswer cur_answer = E;
    private countDown curCountDown;
    private ImageView img_question;

    public enum typeAnswer {
        A, B, C, D, E
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game_content);

        tv_point = findViewById(R.id.tv_point);
        tv_time = findViewById(R.id.tv_count_down_time);
        img_question = findViewById(R.id.image_question);
        answer_A = findViewById(R.id.FirstRadio);
        answer_B = findViewById(R.id.SecondRadio);
        answer_C = findViewById(R.id.ThirdRadio);
        answer_D = findViewById(R.id.FourthRadio);
        modifyButton = findViewById(R.id.btn_modify_game);

        findViewById(R.id.btn_cancel_game).setOnClickListener(this);
        findViewById(R.id.img_btn_setting).setOnClickListener(this);
        modifyButton.setOnClickListener(this);

        tv_point.setText("POINT " + point);

        //Set Music
        SharedPreferences prefs = getSharedPreferences(PREFERENCE_MUSIC, MODE_PRIVATE);
        final Boolean restoredBoolean = prefs.getBoolean("check_music", false);
        if (restoredBoolean) {
            if (MusicPlay.player == null) {
                MusicPlay.SoundPlayer(getBaseContext(), R.raw.nova);
            } else {
                MusicPlay.player.start();
            }
        }

        ///Get Game data from server
        final ProgressDialog mDialog = ProgressDialog.show(this, "", "Please wait", true);
        if (GeneralUtils.isNetworkOnline(this)) {
            //Retrofit get question data
            RetrofitManager.getInstance().callApi(this, new ICallRetrofit<ListQuestionGame>() {
                @Override
                public Call<ListQuestionGame> getCall(APIInterface apiInterface) {
                    return apiInterface.getQuestionGame();
                }
            }, new ModelResponse<ListQuestionGame>() {
                @Override
                public void onSuccess(ListQuestionGame result) {
                    ListQuestionGame.setListQuestionGame(result);
                    list = result.getList_question();

                    Picasso.with(GameContentActivity.this).load(BASE_URL + list.get(cur_question).getImage()).into(img_question);

                    answer_A.setText(list.get(cur_question).getA());
                    answer_B.setText(list.get(cur_question).getB());
                    answer_C.setText(list.get(cur_question).getC());
                    answer_D.setText(list.get(cur_question).getD());
                    curCountDown = new countDown();
                    curCountDown.start();
                    mDialog.dismiss();
                }
            });

        } else {
            Toast.makeText(this, "No Internet Connection", Toast.LENGTH_SHORT)
                    .show();
            mDialog.dismiss();
            finish();
        }

    }


    private class countDown extends CountDownTimer {
        countDown() {
            super(AppConstants.GAME_COUNT_DOWN_TIME, 1000);
        }

        @Override
        public void onTick(long millisUntilFinished) {
            if (millisUntilFinished / 1000 > 9)
                tv_time.setText("00:" + millisUntilFinished / 1000);
            else
                tv_time.setText("00:0" + millisUntilFinished / 1000);
        }

        @Override
        public void onFinish() {
            tv_time.setText("00:00");
            modifyButton.performClick();
        }
    }

    public typeAnswer getType(String type) {
        switch (type) {
            case "A":
                return A;
            case "B":
                return B;
            case "C":
                return C;
            default:
                return D;
        }
    }


    @Override
    public void onBackPressed() {
        super.onBackPressed();
        if (MusicPlay.player != null) {
            MusicPlay.player.stop();
            MusicPlay.player = null;
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_cancel_game: {

                AlertDialog.Builder builder1 = new AlertDialog.Builder(GameContentActivity.this);
                builder1.setMessage("Do you want to exit game?");
                builder1.setCancelable(true);
                builder1.setPositiveButton(
                        "Yes",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                if (MusicPlay.player != null) {
                                    MusicPlay.player.stop();
                                    MusicPlay.player = null;
                                }
                                finish();
                            }
                        });
                builder1.setNegativeButton(
                        "No",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.cancel();
                            }
                        });
                AlertDialog alertDialog = builder1.create();
                alertDialog.show();
                alertDialog.getButton(DialogInterface.BUTTON_POSITIVE).setTextColor(Color.BLACK);
                alertDialog.getButton(DialogInterface.BUTTON_NEGATIVE).setTextColor(Color.BLACK);
                break;
            }
            case R.id.btn_modify_game: {

                if (((Button) v).getText().equals("Submit")) {
                    //Show detail
                    findViewById(R.id.btn_FirstRadio).setVisibility(View.VISIBLE);
                    findViewById(R.id.btn_SecondRadio).setVisibility(View.VISIBLE);
                    findViewById(R.id.btn_ThirdRadio).setVisibility(View.VISIBLE);
                    findViewById(R.id.btn_FourthRadio).setVisibility(View.VISIBLE);

                    //Set unable for not checking radio button
                    answer_A.setEnabled(false);
                    answer_B.setEnabled(false);
                    answer_C.setEnabled(false);
                    answer_D.setEnabled(false);
                    curCountDown.cancel();

                    if (getType(list.get(cur_question).getAnswer()) == cur_answer) { //Correct answer
                        setBackgroundRadioButton(cur_radio, R.drawable.check_true_border, true);
                        point += 1;
                        ((Button) v).setText(R.string.next);
                    } else { ///Wrong answer
                        //Show the right answer
                        switch (getType(list.get(cur_question).getAnswer())) {
                            case A:
                                setBackgroundRadioButton(answer_A, R.drawable.check_true_border, true);
                                break;
                            case B:
                                setBackgroundRadioButton(answer_B, R.drawable.check_true_border, true);
                                break;
                            case C:
                                setBackgroundRadioButton(answer_C, R.drawable.check_true_border, true);
                                break;
                            case D:
                                setBackgroundRadioButton(answer_D, R.drawable.check_true_border, true);
                                break;
                        }

                        //Show the wrong answer
                        if (!cur_answer.equals(E))
                            setBackgroundRadioButton(cur_radio, R.drawable.check_false_border, false);
                    }
                    //Update point
                    tv_point.setText("POINT " + point);
                } else if (((Button) v).getText().equals("Next")) {
                    ((LinearLayout) answer_A.getParent()).clearAnimation();
                    ((LinearLayout) answer_B.getParent()).clearAnimation();
                    ((LinearLayout) answer_C.getParent()).clearAnimation();
                    ((LinearLayout) answer_D.getParent()).clearAnimation();
                    //Update new question
                    if (cur_question < list.size() - 1) {
                        cur_question += 1;

                        //Hide detail
                        findViewById(R.id.btn_FirstRadio).setVisibility(View.GONE);
                        findViewById(R.id.btn_SecondRadio).setVisibility(View.GONE);
                        findViewById(R.id.btn_ThirdRadio).setVisibility(View.GONE);
                        findViewById(R.id.btn_FourthRadio).setVisibility(View.GONE);

                        setBackgroundRadioButton(answer_A, R.drawable.uncheck_border, false);
                        setBackgroundRadioButton(answer_B, R.drawable.uncheck_border, false);
                        setBackgroundRadioButton(answer_C, R.drawable.uncheck_border, false);
                        setBackgroundRadioButton(answer_D, R.drawable.uncheck_border, false);

                        answer_A.setText(list.get(cur_question).getA());//.first_text);
                        answer_B.setText(list.get(cur_question).getB());//.second_text);
                        answer_C.setText(list.get(cur_question).getC());//.third_text);
                        answer_D.setText(list.get(cur_question).getD());//.fourth_text);

                        answer_A.setChecked(false);
                        answer_B.setChecked(false);
                        answer_C.setChecked(false);
                        answer_D.setChecked(false);

                        answer_A.setEnabled(true);
                        answer_B.setEnabled(true);
                        answer_C.setEnabled(true);
                        answer_D.setEnabled(true);

                        Picasso.with(this).load(BASE_URL + list.get(cur_question).getImage()).into(img_question);
                        cur_answer = E;
                        ((Button) v).setText(R.string.submit);
                        curCountDown = new countDown();
                        curCountDown.start();
                    } else {
                        //End Question
                        ((Button) v).setText(R.string.end);
                    }

                } else if (((Button) v).getText().equals("End")) {
                    if (MusicPlay.player != null) {
                        MusicPlay.player.stop();
                        MusicPlay.player = null;
                    }
                    finish();

                }
                break;
            }
            case R.id.img_btn_setting: {
                startActivity(new Intent(getBaseContext(), GameSettingActivity.class));
            }
        }
    }

    public void onImgBtnClicked(View v) {
        if (!modifyButton.getText().equals("Submit")) {
            int id = 150;
            switch (v.getId()) {
                case R.id.btn_FirstRadio:
                    id = list.get(cur_question).getA_id();
                    break;
                case R.id.btn_SecondRadio:
                    id = list.get(cur_question).getB_id();
                    break;
                case R.id.btn_ThirdRadio:
                    id = list.get(cur_question).getC_id();
                    break;
                case R.id.btn_FourthRadio:
                    id = list.get(cur_question).getD_id();
                    break;
            }
            Intent myIntent = new Intent(this, WordDetailActivity.class);
            myIntent.putExtra("id", id);
            startActivity(myIntent);
        }
    }

    public void onRadioButtonClicked(View view) {

        if (((RadioButton) view).isEnabled()) {
            switch (cur_answer) {
                case A:
                    answer_A.setChecked(false);
                    answer_A.setEnabled(true);
                    setBackgroundRadioButton(answer_A, R.drawable.uncheck_border, false);
                    break;
                case B:
                    answer_B.setChecked(false);
                    answer_B.setEnabled(true);
                    setBackgroundRadioButton(answer_B, R.drawable.uncheck_border, false);
                case C:
                    answer_C.setChecked(false);
                    answer_C.setEnabled(true);
                    setBackgroundRadioButton(answer_C, R.drawable.uncheck_border, false);
                    break;
                case D:
                    answer_D.setChecked(false);
                    answer_D.setEnabled(true);
                    setBackgroundRadioButton(answer_D, R.drawable.uncheck_border, false);
                    break;
            }
            ((RadioButton) view).setChecked(true);
            setBackgroundRadioButton((RadioButton) view, R.drawable.check_border, false);
            boolean checked = ((RadioButton) view).isChecked();
            // Check which radio button was clicked
            cur_radio = (RadioButton) view;
            switch (view.getId()) {
                case R.id.FirstRadio:
                    if (checked)
                        cur_answer = A;
                    break;
                case R.id.SecondRadio:
                    if (checked)
                        cur_answer = B;
                    break;
                case R.id.ThirdRadio:
                    if (checked)
                        cur_answer = C;
                    break;
                case R.id.FourthRadio:
                    if (checked)
                        cur_answer = D;
                    break;
            }
        }
    }

    public void setBackgroundRadioButton(RadioButton rad, int idbackgournd, boolean haveAnimation) {
        ((LinearLayout) rad.getParent()).setBackground(ContextCompat.getDrawable(getBaseContext(), idbackgournd));
        if (haveAnimation) {
            AlphaAnimation blinkAnimation = new AlphaAnimation(1, 0); // Change alpha from fully visible to invisible
            blinkAnimation.setDuration(300); // duration
            blinkAnimation.setInterpolator(new LinearInterpolator()); // do not alter animation rate
            blinkAnimation.setRepeatCount(3); // Repeat animation infinitely
            blinkAnimation.setRepeatMode(Animation.REVERSE);
            ((LinearLayout) rad.getParent()).setAnimation(blinkAnimation);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        int point = Integer.parseInt(tv_point.getText().toString().split(" ").clone()[1]);

        SharedPreferences prefs = getSharedPreferences(PREFERENCE_POINT, MODE_PRIVATE);
        int restoredPoint = prefs.getInt(PREFERENCE_POINT, 0);
        if (point > restoredPoint) {
            SharedPreferences.Editor editor = getSharedPreferences(PREFERENCE_POINT, MODE_PRIVATE).edit();
            editor.putInt(PREFERENCE_POINT, point);
            editor.apply();
        }
    }
}
