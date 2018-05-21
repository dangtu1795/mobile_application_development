package vn.bku_mobile.dictionary.fragments;


import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import retrofit2.Call;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.core.network.APIConstants;
import vn.bku_mobile.dictionary.core.network.APIInterface;
import vn.bku_mobile.dictionary.core.network.RetrofitManager;
import vn.bku_mobile.dictionary.interfaces.ICallRetrofit;
import vn.bku_mobile.dictionary.interfaces.ModelResponse;
import vn.bku_mobile.dictionary.objectJson.PostGoogleTranslate;
import com.facebook.share.model.SharePhoto;
import com.facebook.share.model.SharePhotoContent;
import com.facebook.share.widget.ShareDialog;


import com.google.cloud.translate.Translate;
import com.google.cloud.translate.Translate.TranslateOption;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;


public class TranslateFragment extends Fragment implements View.OnClickListener{
    private Button translateBtn;
    private Button changeBtn;
    private ImageButton shareInputBtn;
    private ImageButton shareResultBtn;
    private TextView inputLanguage;
    private TextView resultLanguage;
    private EditText translateInput;
    private EditText translateResult;
    private PostGoogleTranslate translatedData;
    private String sourceLanguage;
    private String targetLanguage;
    private ImageButton facebookShareButton;
    private enum shareType {INPUT , RESULT};

    public TranslateFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(final LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View googleTranslate = inflater.inflate(R.layout.google_translate_fragment, container, false);

        translateBtn = googleTranslate.findViewById(R.id.translate_btn);
        changeBtn = googleTranslate.findViewById(R.id.change_btn);
        shareInputBtn = googleTranslate.findViewById(R.id.translate_input_copy);
        shareResultBtn = googleTranslate.findViewById(R.id.translate_result_copy);
        facebookShareButton = googleTranslate.findViewById(R.id.facebook_button);
        inputLanguage = googleTranslate.findViewById(R.id.input_language);
        resultLanguage = googleTranslate.findViewById(R.id.result_language);
        translateInput = googleTranslate.findViewById(R.id.translate_input);
        translateResult =  googleTranslate.findViewById(R.id.translate_result);

        //Set source language and target language for google translate
        if(inputLanguage.getText().toString().equals("English")){
            sourceLanguage = "en";
            targetLanguage = "vi";
        }
        else{
            sourceLanguage = "vi";
            targetLanguage = "en";
        }

        //Get input , input language and translate, then get result and set it in the result box.
        translateBtn.setOnClickListener(this);

        //Change language
        changeBtn.setOnClickListener(this);

        //Copy to clipboard
        shareInputBtn.setOnClickListener(this);
        shareResultBtn.setOnClickListener(this);

        //Share to Facebook
        facebookShareButton.setOnClickListener(this);
        return googleTranslate;
    }
    @Override
    public void onClick(View view) {
        switch(view.getId()){
            case R.id.translate_input_copy:
                shareToOtherApps(shareType.INPUT);
                break;
            case R.id.translate_result_copy:
                shareToOtherApps(shareType.RESULT);
                break;
            case R.id.change_btn:
                //Disable the change Button until it finished translating new input
                changeBtn.setClickable(false);
                changeInput();
                changeBtn.setClickable(true);
                break;
            case R.id.facebook_button:
                facebookShareButton.setClickable(false);
                shareToFacebook(takeScreenShot(view));
                facebookShareButton.setClickable(true);
                break;
            case R.id.translate_btn:
                if(translateInput.getText().toString().equals("")) ///if input is empty, show toast
                    Toast.makeText(getActivity(), "Please enter something in the input field", Toast.LENGTH_SHORT)
                            .show();
                else {//if input is not empty create raw data and pass it to translate()
                    translateBtn.setClickable(false);

                    PostGoogleTranslate rawData = new PostGoogleTranslate(translateInput.getText().toString(), sourceLanguage, targetLanguage);
                    translate(rawData);
                    translateBtn.setClickable(true);
                }
                break;
            default:
                break;
        }
    }

    private String translate(String input){

         Translate translate = createTranslateService();
            Translation translation = translate.translate(sourceText);
            out.printf("Source Text:\n\t%s\n", sourceText);
            out.printf("Translated Text:\n\t%s\n", translation.getTranslatedText());
        }


    }

    private void shareToFacebook(Bitmap screenShot){
        ShareDialog shareDialog = new ShareDialog(getActivity());
        SharePhoto photo = new SharePhoto.Builder()
                .setBitmap(screenShot)
                .build();
        SharePhotoContent content = new SharePhotoContent.Builder()
                .addPhoto(photo)
                .build();
        //If device has FB app, open FB app
        if (shareDialog.canShow(content))
            shareDialog.show(content);
        else
            Toast.makeText(getActivity(), "Your device doesn't have Facebook app", Toast.LENGTH_SHORT)
                    .show();
        screenShot.recycle();
    }

    private Bitmap takeScreenShot(View view){
        View screenView = view.getRootView();
        screenView.setDrawingCacheEnabled(true);
        Bitmap bitmap = Bitmap.createBitmap(screenView.getDrawingCache());
        screenView.setDrawingCacheEnabled(false);
        return bitmap;
    }

    private void changeInput(){
        //switch
        String temp = sourceLanguage;
        sourceLanguage = targetLanguage;
        targetLanguage = temp;
        //Switch language
        if(sourceLanguage.equals("en")) {
            inputLanguage.setText(R.string.english);
            resultLanguage.setText(R.string.vietnamese);
        }
        else{
            inputLanguage.setText(R.string.vietnamese);
            resultLanguage.setText(R.string.english);
        }
        //Set text from result to input field
        translateInput.setText(translateResult.getText());
        //Clear translate result box
        translateResult.setText("");
        //re-translate
        if(!translateInput.getText().toString().equals(""))
            translateBtn.performClick();
    }

    private void shareToOtherApps(shareType type){
        String data ="";
        if(type == shareType.INPUT)
            data = translateInput.getText().toString();
        else if(type == shareType.RESULT)
            data = translateResult.getText().toString();
        //Share translate text contents to other apps
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, data);
        sendIntent.setType("text/plain");
        startActivity(Intent.createChooser(sendIntent, data));
    }

    private void translate(final PostGoogleTranslate rawData){
        RetrofitManager.getInstance().callApi(getActivity(), APIConstants.GOOGLE_TRANSLATE_URL, new ICallRetrofit<PostGoogleTranslate>() {
            @Override
            public Call<PostGoogleTranslate> getCall(APIInterface apiInterface) {
                return apiInterface.postInputText(rawData, APIConstants.GOOGLE_API_KEY);
            }
        }, new ModelResponse<PostGoogleTranslate>() {
            @Override
            public void onSuccess(PostGoogleTranslate result) {
                //Assign the returned result to translatedData
                translatedData = result;
                String output = translatedData.getTranslation().getTranslated().getTranslatedText();
                translateResult.setText(output);
            }
        });
    }


}
