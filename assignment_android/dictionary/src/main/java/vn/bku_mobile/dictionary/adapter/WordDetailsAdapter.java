package vn.bku_mobile.dictionary.adapter;

import android.app.Activity;
import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import java.util.List;

import io.realm.Realm;
import io.realm.RealmList;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.database.FavoriteList;
import vn.bku_mobile.dictionary.database.RealmController;
import vn.bku_mobile.dictionary.database.WordDetailObject;
import vn.bku_mobile.dictionary.objectJson.WordDetails;
import vn.bku_mobile.dictionary.utils.GeneralUtils;

public class WordDetailsAdapter extends RecyclerView.Adapter<WordDetailsAdapter.WordDetailsViewHolder> {
    private int numberOfItems;
    private List<WordDetails> listOfContents;
    private RealmList<WordDetailObject> listOfContentsFromLocal;
    private Context baseContext;
    private Activity baseActivity;

    public WordDetailsAdapter() {
    }

    //Constructor add a list of contents and get its size for numberOfItems
    //FROM LOCAL DB
    public WordDetailsAdapter(RealmList<WordDetailObject> contentsList, Activity baseActivity) {
        this.listOfContentsFromLocal = contentsList;
        this.numberOfItems = contentsList.size();
        this.baseActivity = baseActivity;
        this.listOfContents = null;
    }

    //Constructor add a list of contents and get its size for numberOfItems
    public WordDetailsAdapter(List<WordDetails> contentsList, Activity baseActivity) {
        this.listOfContents = contentsList;
        this.numberOfItems = contentsList.size();
        this.baseActivity = baseActivity;
    }

    @Override
    public WordDetailsAdapter.WordDetailsViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        baseContext = parent.getContext();
        int wordItemLayout = R.layout.word_detail_content;
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());

        View mView = inflater.inflate(wordItemLayout, parent, false);
        return new WordDetailsViewHolder(mView);
    }

    //Display the holder and a specify position
    @Override
    public void onBindViewHolder(WordDetailsAdapter.WordDetailsViewHolder holder, int position) {
        if (this.listOfContentsFromLocal != null)
            holder.setWordDetailsContentFromLOCAL(position);
        else {
            holder.setWordDetailsContentFromAPI(position);
        }
    }

    @Override
    public int getItemCount() {
        return this.numberOfItems;
    }

    //Holder for each item in RecyclerView
    class WordDetailsViewHolder extends RecyclerView.ViewHolder {
        TextView wordText;
        TextView wordForm;
        TextView pronunciation;
        ImageButton britishSound;
        ImageButton americanSound;
        TextView wordContentWebView;
        //Url to play word pronunciation
        String britishUrl;
        String americanUrl;

        WordDetailsViewHolder(View view) {
            super(view);
            wordText = view.findViewById(R.id.word_text);
            wordForm = view.findViewById(R.id.word_form);
            pronunciation = view.findViewById(R.id.pronunciation);
            britishSound = view.findViewById(R.id.british_sound);
            americanSound = view.findViewById(R.id.american_sound);
            wordContentWebView = view.findViewById(R.id.web_word_contents);
        }

        //Using the list from API return to set content then add the content to local database
        void setWordDetailsContentFromAPI(int itemIndex) {
            //get data for each element of the item view
            WordDetails wordItem = listOfContents.get(itemIndex);
            saveItemFromAPIToLocal(listOfContents, wordItem.getWordId());
            setUpUiWordContent(wordItem.getText(), wordItem.getWordForm(), wordItem.getSpell(), wordItem.getAmericanSoundUrl(), wordItem.getBritishSoundUrl(), wordItem.getContent());
        }

        private void saveItemFromAPIToLocal(List<WordDetails> apiList, int wordID) {
            Realm realm = RealmController.with(baseActivity).getRealm();
            //Get the word from DB
            FavoriteList localItem = RealmController.with(baseActivity).getItemFavorite(wordID);

            realm.beginTransaction();
            for (int index = 0; index < apiList.size(); index++) {
                //Create a new record in the WordDetailObject Table
                WordDetailObject newItem = realm.createObject(WordDetailObject.class);
                WordDetails wordDetails = apiList.get(index);

                //Init the record
                newItem.setId(wordDetails.getId());
                newItem.setText(wordDetails.getText());
                newItem.setSpell(wordDetails.getSpell());
                newItem.setWordForm(wordDetails.getWordForm());
                newItem.setBritishSoundUrl(wordDetails.getBritishSoundUrl());
                newItem.setAmericanSoundUrl(wordDetails.getAmericanSoundUrl());
                newItem.setContent(wordDetails.getContent());

                //Add the content to the ListContent of the Word
                localItem.getWordDetails().add(newItem);
            }
            //Update local database
            realm.copyToRealmOrUpdate(localItem);
            realm.commitTransaction();
        }

        //Using the list from local database to set content
        void setWordDetailsContentFromLOCAL(int itemIndex) {
            //get data for each element of the item view
            WordDetailObject wordItem = listOfContentsFromLocal.get(itemIndex);
            setUpUiWordContent(wordItem.getText(), wordItem.getWordForm(), wordItem.getSpell(), wordItem.getAmericanSoundUrl(), wordItem.getBritishSoundUrl(), wordItem.getContent());

        }

        //Play sound
        void playSound(String soundUrl) {
            if (GeneralUtils.isNetworkOnline(baseContext)) {
                if (soundUrl != null && !soundUrl.trim().isEmpty()) {
                    MediaPlayer.create(baseContext, Uri.parse(soundUrl)).start();
                } else
                    Toast.makeText(baseContext, "Sound is not available now", Toast.LENGTH_SHORT)
                            .show();
            } else Toast.makeText(baseContext, "No Internet Connection", Toast.LENGTH_SHORT)
                    .show();
        }

        private void setUpUiWordContent(String word, String wordForm, String wordSpell, String soundAmerican, String soundEnglish, String wordContent) {
            wordText.setText(word);
            this.wordForm.setText(wordForm);
            pronunciation.setText(wordSpell);

            //Set URL to play pronunciation sound
            if (soundEnglish != null) {
                britishUrl = soundEnglish;
            } else {
                britishUrl = null;
            }
            if (soundAmerican != null) {
                americanUrl = soundAmerican;
            } else {
                americanUrl = null;
            }

            wordContentWebView.setText(wordContent);

            britishSound.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    playSound(britishUrl);
                }
            });
            americanSound.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    playSound(americanUrl);
                }
            });
        }
    }

    public int getNumberOfItems() {
        return numberOfItems;
    }

    public void setNumberOfItems(int numberOfItems) {
        this.numberOfItems = numberOfItems;
    }

    public List<WordDetails> getListOfContents() {
        return listOfContents;
    }

    public void setListOfContents(List<WordDetails> listOfContents) {
        this.listOfContents = listOfContents;
    }
}
