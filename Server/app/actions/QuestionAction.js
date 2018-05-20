import alt from '../alt';
// import FormData from 'form-data';

class QuestionAction {
    constructor() {
        this.generateActions(

            'updateId',
            'updateImage',
            'updateTraloi',
            'updateType',
            'updateDapanA',
            'updateTextA',
            'updateA_id',
            'updateDapanB',
            'updateTextB',
            'updateB_id',
            'updateDapanC',
            'updateTextC',
            'updateC_id',
            'updateDapanD',
            'updateTextD',
            'updateD_id',

            'getAllQuestionsSuccess',
            'getAllQuestionsFail',

            'getQuestionSuccess',
            'getQuestionFail',

            'deleteQuestionSuccess',
            'deleteQuestionFail',

            'searchWordSuccess',
            'searchWordFail',

            'addQuestionSuccess',
            'addQuestionFail',

            'updateQuestionSuccess',
            'updateQuestionFail'
        );
    }


    getAllQuestions(){
        $.ajax({
            url: '/question/getAllQuestion',
            type: 'GET',

        })
            .done((data) => {
                this.getAllQuestionsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getAllQuestionsFail(jqXhr.responseJSON);
            });
    }

    getDetail(id){
        $.ajax({
            url: '/question/'+id,
            type: 'GET',

        })
            .done((data) => {
                this.getQuestionSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getQuestionFail(jqXhr.responseJSON);
            });
    }

    deleteQuestion(id){
        $.ajax({
            url: '/question/'+id,
            type: 'DELETE',
        })
            .done((data) => {
                this.deleteQuestionSuccess(data);
            })
            .fail((jqXhr) => {
                this.deleteQuestionFail(jqXhr.responseJSON);
            });
    }

    searchWord(payload){
        $.ajax({
            url: '/word/searchWordByText/'+payload.text,
            type: 'GET',

        })
            .done((data) => {
                this.searchWordSuccess({data: data, letter: payload.letter});
            })
            .fail((jqXhr) => {
                this.searchWordFail(jqXhr.responseJSON);
            });
    }

    // function add question
    addQuestion(payload){
        console.log('--- call action add question ---');
        //prepare data
        var xxx = new FormData();
        xxx.append('file', payload.image);
        xxx.append('answer', payload.answer);
        xxx.append('type', payload.type);
        xxx.append('answerA', payload.answerA);
        xxx.append('a_id', payload.a_id);
        xxx.append('answerB', payload.answerB);
        xxx.append('b_id', payload.b_id);
        xxx.append('answerC', payload.answerC);
        xxx.append('c_id', payload.c_id);
        xxx.append('answerD', payload.answerD);
        xxx.append('d_id', payload.d_id);
        // console.log(xxx.getAll('file'));
        $.ajax({
            url: '/question/addQuestion',
            type: 'POST',
            data: xxx,
            cache : false,
            processData: false,
            contentType: false,
        })
            .done((data) => {
                this.addQuestionSuccess(data);
            })
            .fail((jqXhr) => {
                this.addQuestionFail(jqXhr.responseJSON);
            });
    }

    // function update question
    updateQuestion(payload){
        console.log('--- call action update question ---');
        //prepare data
        var dt = new FormData();
        dt.append('id', payload.id);
        dt.append('file', payload.image);
        dt.append('answer', payload.answer);
        dt.append('type', payload.type);
        dt.append('answerA', payload.answerA);
        dt.append('a_id', payload.a_id);
        dt.append('answerB', payload.answerB);
        dt.append('b_id', payload.b_id);
        dt.append('answerC', payload.answerC);
        dt.append('c_id', payload.c_id);
        dt.append('answerD', payload.answerD);
        dt.append('d_id', payload.d_id);

        $.ajax({
            url: '/question/'+payload.id,
            type: 'PUT',
            data: dt,
            cache : false,
            processData: false,
            contentType: false,
        })
            .done((data) => {
                this.updateQuestionSuccess(data);
            })
            .fail((jqXhr) => {
                this.updateQuestionFail(jqXhr.responseJSON);
            });
    }
}

export default alt.createActions(QuestionAction);