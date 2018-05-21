/*
 * Copyright (C) 2016 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package vn.bku_mobile.dictionary.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import java.util.ArrayList;

import io.realm.Realm;
import io.realm.RealmResults;
import vn.bku_mobile.dictionary.R;
import vn.bku_mobile.dictionary.activities.FavoriteActivity;
import vn.bku_mobile.dictionary.activities.MainActivity;
import vn.bku_mobile.dictionary.activities.WordDetailActivity;
import vn.bku_mobile.dictionary.database.FavoriteList;
import vn.bku_mobile.dictionary.database.RealmController;
import vn.bku_mobile.dictionary.objectJson.DataInfo;

import static android.R.attr.data;

public class FavoriteItemAdapter extends RecyclerView.Adapter<FavoriteItemAdapter.NumberViewHolder> {

    private ITEM type;
    private RealmResults<FavoriteList> result_FavoriteList;
    private Activity activity;

    public enum ITEM {
        FAVORITE,
        SEARCH_RESULT
    }

    public FavoriteItemAdapter(Activity activity, String queryString, ITEM type_item) {
        this.type = type_item;
        if (type_item.equals(ITEM.FAVORITE)) {
            this.result_FavoriteList = RealmController.with(activity).getFavoriteLists();
        } else if (type_item.equals(ITEM.SEARCH_RESULT)) {
            this.result_FavoriteList = RealmController.with(activity).querySubString(queryString);
        }
        this.activity = activity;
    }

    public RealmResults<FavoriteList> getResult_FavoriteList() {
        return result_FavoriteList;
    }

    public void setResult_FavoriteList(String queryString) {
        this.result_FavoriteList = RealmController.with(activity).querySubString(queryString);
    }

    @NonNull
    @Override
    public NumberViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        Context context = viewGroup.getContext();
        int layoutIdForListItem = R.layout.number_list_item;
        LayoutInflater inflater = LayoutInflater.from(context);

        View view = inflater.inflate(layoutIdForListItem, viewGroup, false);
        return new NumberViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull final NumberViewHolder holder, final int position) {
        holder.bind(position);

        holder.img_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Realm realm = RealmController.with(activity).getRealm();
                int id = result_FavoriteList.get(position).getId();
                FavoriteList curItem = RealmController.with(activity).getItemFavorite(id);

                //Update to data base depend on which typeItem
                realm.beginTransaction();
                if (type.equals(ITEM.SEARCH_RESULT)) {
                    if ((result_FavoriteList.get(position).getFavorite())) {
                        holder.img_btn.setImageResource(R.drawable.favorite_2x);
                        //Update favorite to database
                        curItem.setFavorite(false);
                    } else {
                        holder.img_btn.setImageResource(R.drawable.favorite_blue);
                        //Update favorite to database
                        curItem.setFavorite(true);
                    }
                } else if (type.equals(ITEM.FAVORITE)) {
                    //Remove that favorite item
                    curItem.setFavorite(false);
                }
                realm.copyToRealmOrUpdate(curItem);
                realm.commitTransaction();
                notifyDataSetChanged();
            }
        });

        //When click to text View each item
        holder.listItemNumberView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Show detail when click to text View
                int id = result_FavoriteList.get(position).getId();
                Intent myIntent = new Intent(activity, WordDetailActivity.class);
                myIntent.putExtra("id", id);
                activity.startActivity(myIntent);
            }
        });
    }


    @Override
    public int getItemCount() {
        return getResult_FavoriteList().size();
    }


    public class NumberViewHolder extends RecyclerView.ViewHolder {
        TextView listItemNumberView;
        ImageButton img_btn;
        Boolean check;

        private NumberViewHolder(View itemView) {
            super(itemView);
            img_btn = itemView.findViewById(R.id.img_btn_icon);
            listItemNumberView = itemView.findViewById(R.id.tv_item_number);
            check = false;
        }

        private void bind(int listIndex) {
            if (type.equals(ITEM.FAVORITE)) {
                listItemNumberView.setText(result_FavoriteList.get(listIndex).getText());
                img_btn.setImageResource(R.drawable.x_white_2x);
            } else if (type.equals(ITEM.SEARCH_RESULT)) {
                listItemNumberView.setText(result_FavoriteList.get(listIndex).getText());
                img_btn.setImageResource(result_FavoriteList.get(listIndex).getFavorite() ? R.drawable.favorite_blue : R.drawable.favorite_2x);
            }
        }

    }
}
