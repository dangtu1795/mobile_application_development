package com.example.truongdang.ex3.utils;

import android.support.v4.app.Fragment;

import java.util.ArrayList;
import java.util.List;

import vn.quankundeptrai.mvpcore.R;
import vn.quankundeptrai.mvpcore.data.models.menu.MenuItemModel;
import vn.quankundeptrai.mvpcore.ui.menufragments.map.MapFragment;

/**
 * Created by TQN on 1/20/2018.
 */

public class InstantiateUtils {
    public static List<MenuItemModel> generateMenuItems(){
        List<MenuItemModel> menuItems = new ArrayList<MenuItemModel>();
        menuItems.add(new MenuItemModel(R.drawable.ic_menu, "example"));
        //Add more Items here

        return menuItems;
    }

    public static ArrayList<Fragment> generateMenuFragments(){
        ArrayList<Fragment> fragmentList = new ArrayList<Fragment>();
        fragmentList.add(new MapFragment());
        //Add more fragments here

        return fragmentList;
    }
}
