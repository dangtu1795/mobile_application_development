package com.example.truongdang.ex3.base;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.data.CoreManager;
import com.example.truongdang.ex3.data.constants.ExtraKeys;
import com.example.truongdang.ex3.interfaces.IPermissionCallback;
import com.example.truongdang.ex3.utils.KeyboardUtils;

/**
 * Created by TQN on 1/19/2018.
 */

public abstract class BaseActivity<T extends BasePresenter> extends AppCompatActivity {
    protected View mainView;
    private RelativeLayout mainContent;
    private T presenter;
    private IPermissionCallback permissionCallback;
    private ProgressDialog ringProgressDialog;


    protected abstract int getLayoutResource();

    protected abstract String getScreenTitle();

    protected abstract T onCreatePresenter();

    protected abstract void initialView();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        CoreManager.getInstance().setCurrentActivity(this);
        setContentView(R.layout.activity_base);

        String title = getScreenTitle();
        if (title != null) {
            setTitle(getScreenTitle());
            findViewById(R.id.headerLeftBtn).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onToolbarLeftButtonClick();
                }
            });
        } else {
            hideHeader();
        }

        mainView = getLayoutInflater().inflate(getLayoutResource(), null);
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
        mainView.setLayoutParams(layoutParams);

        mainContent = findViewById(R.id.mainContent);
        mainContent.addView(mainView);

        if (getPresenter() != null) {
            getPresenter().attachView((BaseMvpView) this);
        }
        initialView();
    }

    protected void setTitle(String title) {
        ((TextView) findViewById(R.id.headerTitle)).setText(title);
    }

    protected void onToolbarLeftButtonClick() {
        setResult(RESULT_CANCELED);
        finish();
    }

    protected void setLeftHeaderIcon(int resourceId) {
        ((ImageView) mainView.findViewById(R.id.headerLeftBtn)).setImageResource(resourceId);
    }

    private void hideHeader() {
        ((ViewGroup) findViewById(R.id.root)).removeView(findViewById(R.id.header));
        ((ViewGroup) findViewById(R.id.root)).removeView(findViewById(R.id.headerShadow));
    }

    public T getPresenter() {
        if (presenter == null) {
            presenter = onCreatePresenter();
        }

        return presenter;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        KeyboardUtils.hideKeyboard(this);
        if (getPresenter() != null) {
            getPresenter().detachView();
        }
    }

    protected void result() {
        setResult(RESULT_OK);
        finish();
    }

    protected <T> void result(T data) {
        Bundle bundle = new Bundle();
        if (data instanceof Boolean) {
            bundle.putBoolean(ExtraKeys.DATA, (Boolean) data);
        } else if (data instanceof String) {
            bundle.putString(ExtraKeys.DATA, (String) data);
        } else if (data instanceof Long) {
            bundle.putLong(ExtraKeys.DATA, (Long) data);
        } else if (data instanceof Integer) {
            bundle.putInt(ExtraKeys.DATA, (Integer) data);
        }

        Intent intent = new Intent();
        intent.putExtras(bundle);
        setResult(RESULT_OK, intent);
        finish();
    }

    @Override
    protected void onResume() {
        super.onResume();
        CoreManager.getInstance().setCurrentActivity(this);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (permissionCallback != null) {
            permissionCallback.onRequest(requestCode, grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED);
        }

        permissionCallback = null;
    }

    public void setPermissionCallback(IPermissionCallback permissionCallback) {
        this.permissionCallback = permissionCallback;
    }

    public void showLoading() {
        showLoading(getString(R.string.loading_data));
    }

    public void showLoading(String msg) {
        if (ringProgressDialog == null) {
            ringProgressDialog = ProgressDialog.show(this, "", msg, true);
            ringProgressDialog.setCancelable(false);
            ringProgressDialog.setCanceledOnTouchOutside(false);
        }
    }

    public void hideLoading() {
        if (ringProgressDialog != null && ringProgressDialog.isShowing()) {
            ringProgressDialog.dismiss();
            ringProgressDialog = null;
        }
    }
}
