import alt from '../alt';
import ListWordAction from '../actions/ListWordAction';

class ListWordStore {
    constructor() {
        this.bindActions(ListWordAction);

        this.listWords = [];
    }

    onGetAllWordsSuccess(data){
        console.log(data.data);
        this.listWords = data.data;
    }
    onGetAllWordsFail(data){
        console.log(data);
    }

    onDeleteWordSuccess(data){
        ListWordAction.getAllWords();
        console.log('delete thanh cong');

    }
    onDeleteKhoaFail(data){
        console.log('delete that bai');
    }
}

export default alt.createStore(ListWordStore);