package com.example.truongdang.ex3.adapter;

import android.content.Context;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.base.BaseRecyclerAdapter;
import com.example.truongdang.ex3.base.BaseViewHolder;
import com.example.truongdang.ex3.data.models.MenuItemModel;
import com.example.truongdang.ex3.interfaces.IAdapterDataCallback;

import java.util.List;

/**
 * Created by TQN on 1/19/2018.
 */

public class MenuAdapter extends BaseRecyclerAdapter<MenuItemModel, MenuAdapter.MenuItemViewHolder> {
    private IAdapterDataCallback callback;

    public MenuAdapter(Context context, List<MenuItemModel> list, IAdapterDataCallback callback) {
        super(context, list);
        this.callback = callback;
    }

    @Override
    protected MenuItemViewHolder getNewHolder(View convertView) {
        return new MenuItemViewHolder(convertView);
    }

    @Override
    protected int getItemLayoutResource() {
        return R.layout.item_menu;
    }

    @Override
    protected void handleItem(MenuItemViewHolder holder, final int position, MenuItemModel item) {
        MenuItemModel menuItem = mainList.get(position);

        holder.icon.setImageResource(menuItem.getIconResId());
        holder.name.setText(menuItem.getItemName());

        holder.wrapper.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callback.onItemClick(position);
            }
        });
    }

    class MenuItemViewHolder extends BaseViewHolder {
        private ImageView icon;
        private TextView name;
        private View wrapper;

        MenuItemViewHolder(View itemView) {
            super(itemView);
            icon = itemView.findViewById(R.id.menuItemIcon);
            name = itemView.findViewById(R.id.menuItemName);
            wrapper = itemView.findViewById(R.id.menuItemWrapper);
        }
    }
}
