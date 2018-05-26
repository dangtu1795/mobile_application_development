package com.example.truongdang.ex3.utils;

import android.support.v4.app.Fragment;

import com.example.truongdang.ex3.R;
import com.example.truongdang.ex3.data.models.MenuItemModel;
import com.example.truongdang.ex3.ui.menu.favoritejob.FavoriteJobFragment;
import com.example.truongdang.ex3.ui.menu.jobsearch.JobSearchFragment;
import com.example.truongdang.ex3.ui.menu.jobtypelist.JobListFragment;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by TQN on 1/20/2018.
 */

public class InstantiateUtils {
    public static List<MenuItemModel> generateMenuItems() {
        List<MenuItemModel> menuItems = new ArrayList<MenuItemModel>();
        menuItems.add(new MenuItemModel(R.drawable.ic_list, "Jobs By Types"));
        menuItems.add(new MenuItemModel(R.drawable.ic_search, "Search Jobs"));
        menuItems.add(new MenuItemModel(R.drawable.ic_heartabc, "Favorite"));
        return menuItems;
    }

    public static ArrayList<Fragment> generateMenuFragments() {
        ArrayList<Fragment> fragmentList = new ArrayList<Fragment>();
        fragmentList.add(new JobListFragment());
        fragmentList.add(new JobSearchFragment());
        fragmentList.add(new FavoriteJobFragment());

        return fragmentList;
    }
}
