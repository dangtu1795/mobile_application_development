import alt from '../alt';
import QuestionAction from '../actions/QuestionAction';

class QuestionStore {
    constructor() {
        this.bindActions(QuestionAction);

        this.questions = [];
        this.question = {};

        this.image = '';
        this.answer = '';
        this.type = '';
        this.dapanA = '';
        this.textA = '';
        this.A_id = '';
        this.listTextA = [];
        this.displayListTextA = 'none';
        this.dapanB = '';
        this.textB = '';
        this.B_id = '';
        this.listTextB = [];
        this.displayListTextB = 'none';
        this.dapanC = '';
        this.textC = '';
        this.C_id = '';
        this.listTextC = [];
        this.displayListTextC = 'none';
        this.dapanD = '';
        this.textD = '';
        this.D_id = '';
        this.listTextD = [];
        this.displayListTextD = 'none';

        //text validate
        this.invalidImage = '';
        this.invalidAnswer = '';
        this.invalidType = '';
        this.invalidDapanA = '';
        this.invalidA_id = '';
        this.invalidDapanB = '';
        this.invalidB_id = '';
        this.invalidDapanC = '';
        this.invalidC_id = '';
        this.invalidDapanD = '';
        this.invalidD_id = '';

        this.mess = '';

        // has detail
        this.hasDetail = false;
        this.previewImg = '';
    }

    onUpdateImage(dt){
        this.image = dt.file;
        console.log(this.image);
        this.previewImg = dt.img.target.result;
    }
    onUpdateTraloi(e){
        this.answer = e.target.value;
    }
    onUpdateType(e){
        this.type = e.target.value;
    }
    onUpdateDapanA(e){
        this.dapanA = e.target.value;
    }
    onUpdateDapanB(e){
        this.dapanB = e.target.value;
    }
    onUpdateDapanC(e){
        this.dapanC = e.target.value;
    }
    onUpdateDapanD(e){
        this.dapanD = e.target.value;
    }

    onGetAllQuestionsSuccess(data){
        console.log(data.data);
        this.questions = data.data;

        //reset state
        this.image = '';
        this.answer = '';
        this.type = '';
        this.dapanA = '';
        this.textA = '';
        this.A_id = '';
        this.listTextA = [];
        this.displayListTextA = 'none';
        this.dapanB = '';
        this.textB = '';
        this.B_id = '';
        this.listTextB = [];
        this.displayListTextB = 'none';
        this.dapanC = '';
        this.textC = '';
        this.C_id = '';
        this.listTextC = [];
        this.displayListTextC = 'none';
        this.dapanD = '';
        this.textD = '';
        this.D_id = '';
        this.listTextD = [];
        this.displayListTextD = 'none';

        this.previewImg = '';
        this.mess = '';
    }
    onGetAllQuestionsFail(data){
        console.log(data);
    }

    onDeleteQuestionSuccess(data){
        QuestionAction.getAllQuestions();
        console.log('delete thanh cong');

    }
    onDeleteQuestionFail(data){
        console.log('delete that bai');
    }

    //update text to search word
    onUpdateTextA(e){
        this.textA = e.target.value;
        QuestionAction.searchWord({text: this.textA, letter: 'A'});
        if(!this.textA){
            this.displayListTextA = 'none';
        }
    }
    onUpdateTextB(e){
        this.textB = e.target.value;
        QuestionAction.searchWord({text: this.textB, letter: 'B'});
        if(!this.textB){
            this.displayListTextB = 'none';
        }
    }
    onUpdateTextC(e){
        this.textC = e.target.value;
        QuestionAction.searchWord({text: this.textC, letter: 'C'});
        if(!this.textC){
            this.displayListTextC = 'none';
        }
    }
    onUpdateTextD(e){
        this.textD = e.target.value;
        QuestionAction.searchWord({text: this.textD, letter: 'D'});
        if(!this.textD){
            this.displayListTextD = 'none';
        }
    }

    onUpdateId(data){
        if(data.letter === 'A'){
            this.textA = data.text;
            this.A_id = data.id;
            this.displayListTextA = 'none';
        }
        else if(data.letter === 'B'){
            this.textB = data.text;
            this.B_id = data.id;
            this.displayListTextB = 'none';
        }
        else if(data.letter === 'C'){
            this.textC = data.text;
            this.C_id = data.id;
            this.displayListTextC = 'none';
        }
        else {
            this.textD = data.text;
            this.D_id = data.id;
            this.displayListTextD = 'none';
        }
    }

    onSearchWordSuccess(res){
        console.log(res);
        if(res.letter === 'A'){
            this.listTextA = res.data.data;
            this.displayListTextA = 'block';
        }
        else if(res.letter === 'B'){
            this.listTextB = res.data.data;
            this.displayListTextB = 'block';
        }
        else if(res.letter === 'C'){
            this.listTextC = res.data.data;
            this.displayListTextC = 'block';
        }
        else {
            this.listTextD = res.data.data;
            this.displayListTextD = 'block';
        }
    }

    //add question success
    onAddQuestionSuccess(data){
        if(data.code == 200){
            this.image = '';
            this.answer = '';
            this.type = '';
            this.dapanA = '';
            this.textA = '';
            this.A_id = '';
            this.listTextA = [];
            this.displayListTextA = 'none';
            this.dapanB = '';
            this.textB = '';
            this.B_id = '';
            this.listTextB = [];
            this.displayListTextB = 'none';
            this.dapanC = '';
            this.textC = '';
            this.C_id = '';
            this.listTextC = [];
            this.displayListTextC = 'none';
            this.dapanD = '';
            this.textD = '';
            this.D_id = '';
            this.listTextD = [];
            this.displayListTextD = 'none';

            this.previewImg = '';
        }
        this.mess = data.message;
    }

    onGetQuestionSuccess(data){
        console.log(data);

        if(data.data.length){
            this.hasDetail = true;

            this.image = data.data[0].image;
            this.previewImg = data.data[0].image;
            this.answer = data.data[0].answer;
            this.type = data.data[0].type;
            this.dapanA = data.data[0].a;
            this.textA = '';
            this.A_id = data.data[0].a_id;
            this.listTextA = [];
            this.displayListTextA = 'none';
            this.dapanB = data.data[0].b;
            this.textB = '';
            this.B_id = data.data[0].b_id;
            this.listTextB = [];
            this.displayListTextB = 'none';
            this.dapanC = data.data[0].c;
            this.textC = '';
            this.C_id = data.data[0].c_id;
            this.listTextC = [];
            this.displayListTextC = 'none';
            this.dapanD = data.data[0].d;
            this.textD = '';
            this.D_id = data.data[0].d_id;
            this.listTextD = [];
            this.displayListTextD = 'none';
        }

    }

    onUpdateQuestionSuccess(data){
        console.log(data);
        this.mess = data.message;
    }

}

export default alt.createStore(QuestionStore);