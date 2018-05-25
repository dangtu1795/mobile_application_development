package com.example.truongdang.ex3.interfaces;

/**
 * Created by TQN on 1/19/2018.
 */

public interface ITask<T> {
    void onPreTask();

    void onDone(T result);

    void onPostTask();
}
