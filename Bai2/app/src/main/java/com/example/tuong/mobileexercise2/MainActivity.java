package com.example.tuong.mobileexercise2;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.Collections;

public class MainActivity extends AppCompatActivity {

    public static final String USD = "USD";
    public static final String VND = "VND";
    public static float VND_USD = 21500;

    private String arr[] = {USD, VND};
    private ArrayList<String> money = new ArrayList<>();
    private Spinner sLeft, sRight;
    private EditText tLeft,tRight;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Collections.addAll(money, arr);

        bindingView();
        bindingEvent();

    }

    private void bindingEvent() {
        sRight.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                tRight.setText("");
                tRight.setHint(money.get(position));

            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
        sLeft.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                tLeft.setText("");
                tLeft.setHint(money.get(position));
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        tLeft.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                if(s.toString().equals("")) {
                    tRight.setText("");
                    return;
                }
                switch (sLeft.getSelectedItem().toString()){
                    case USD:
                        sRight.setSelection(money.indexOf(VND),true);
                        tRight.setText(String.valueOf(Integer.valueOf(s.toString())*VND_USD));
                        break;
                    case VND:
                        sRight.setSelection(money.indexOf(USD),true);
                        tRight.setText(String.valueOf(Integer.valueOf(s.toString())/VND_USD));
                        break;

                }
            }
        });
    }

    private void bindingView() {
        sLeft = findViewById(R.id.spinerL);
        sRight = findViewById(R.id.spinerR);
        tLeft = findViewById(R.id.etLeft);
        tRight = findViewById(R.id.etRight);
        sLeft.setAdapter(new ArrayAdapter<>(getApplicationContext(),R.layout.support_simple_spinner_dropdown_item,money));
        sRight.setAdapter(new ArrayAdapter<>(getApplicationContext(),R.layout.support_simple_spinner_dropdown_item,money));

    }
}
