package vn.bku_mobile.dictionary.utils;

import android.content.Context;
import android.media.MediaPlayer;

/**
 * Created by TQN on 5/21/2018.
 */

public class MusicPlay {
    public static MediaPlayer player;
    public static void SoundPlayer(Context ctx, int raw_id){
        player = MediaPlayer.create(ctx, raw_id);
        player.setLooping(true); // Set looping
        player.setVolume(1.0f, 1.0f);
        //player.release();
        player.start();
    }
}

