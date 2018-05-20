var code = require('./Code');


module.exports = {
    SuccessResponse: function (data) {
        if (typeof data !== "undefined") {
            this.data = data;
        }else{
            this.data = [];
        }
        return({code: code.success.code, message: code.success.message, data: this.data});
    },
    SuccessResponseLongFormat: function (mes, data) {
        if (typeof data !== "undefined") {
            this.data = data;
        }else{
            this.data = [];
        }
        return({code: code.success.code, message: mes, data: this.data});
    },
    FailResponse : function (code, message) {
        return({code: code, message: message});
    },
    FailResponseShortFormat: function (error) {
        return ({code: error.code, message: error.message});
    }
}
