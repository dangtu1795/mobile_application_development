package com.example.truongdang.ex3.data.exceptions;

import com.example.truongdang.ex3.data.constants.ServerResponseCodes;
import com.example.truongdang.ex3.data.models.responses.BaseResponse;

/**
 * Created by TQN on 1/19/2018.
 */

public class ServerResponseThrowable extends Throwable {
    private BaseResponse errorResponse;

    public ServerResponseThrowable(BaseResponse errorResponse){
        this.errorResponse = errorResponse;
    }

    public String getErrorMessage(){
        return errorResponse.getMessage();
    }

    public boolean isUnauthorized() {
        int code = errorResponse.getCode();
        return code == ServerResponseCodes.ACCESS_DENIED;
    }
}
