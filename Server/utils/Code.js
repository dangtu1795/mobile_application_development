var Code = {
    error: {
        wrong_permission: {
            code: 10001,
            message: "Wrong permission"
        },
        unknow_error: {
            code: 999,
            message: 'Unknow error'
        },
        required_field: {
            code: -999,
            message: "Field is required"
        }

    },
    success: {
        code: 200,
        message: 'Success'
    }
}
module.exports = Code;