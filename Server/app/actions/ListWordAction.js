import alt from '../alt';

class ListWordAction {
    constructor() {
        this.generateActions(

            'openMoDDeleteKhoa',
            'closeModalDelete',

            'getAllWordsSuccess',
            'getAllWordsFail',

            'deleteWordSuccess',
            'deleteWordFail',
        );
    }


    getAllWords(){
        $.ajax({
            url: '/word/getAllWords',
            type: 'GET',

        })
            .done((data) => {
                this.getAllWordsSuccess(data);
            })
            .fail((jqXhr) => {
                this.actions.getAllWordsFail(jqXhr.responseJSON);
            });
    }

    deleteWord(id){
        $.ajax({
            url: '/word/deleteWord',
            type: 'DELETE',
            data: {id: id},
        })
            .done((data) => {
                this.deleteWordSuccess(data);
            })
            .fail((jqXhr) => {
                this.deleteWordFail(jqXhr.responseJSON);
            });
    }
}

export default alt.createActions(ListWordAction);