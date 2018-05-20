import alt from '../alt';
import AddWordAction from '../actions/AddWordAction';

class AddWordStore {
    constructor() {
        this.bindActions(AddWordAction);

        this.text = '';
        this.tansuat = '';
        this.separation = '';
        this.spell = '';
        this.type = '';
        this.sound1 = '';
        this.sound2 = '';
        this.content = '';

        this.word = [{type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''}];

        this.helpBlockText = '';
        this.helpBlockSeparation = '';
        this.helpBlockSpell = '';
        this.helpBlockType = '';
        this.helpBlockContent = '';

        this.classValidate = '';
        this.validateTitle = '';

        this.err1 = '';
        this.err2 = '';
        this.err3 = '';
        this.err4 = '';
        this.err5 = '';

        this.mess = '';

        this.wordByText = '';

    }

    onUpdateText(e){
        this.text = e.target.value;
        this.mess = '';
    }
    onUpdateTanSuat(e){
        this.tansuat = e.target.value;
        this.mess = '';
    }

    //khung 1
    onUpdateSeparation1(e){
        this.word[0].separation = e.target.value;
    }
    onUpdateSpell1(e){
        this.word[0].spell = e.target.value;
    }
    onUpdateType1(e){
        this.word[0].type = e.target.value;
    }
    onUpdateSound11(file){
        this.word[0].sound1 = file;
    }
    onUpdateSound12(file){
        this.word[0].sound2 = file;
    }
    onUpdateContent1(e){
        this.word[0].content = e.target.value;
    }

    //khung 2
    onUpdateSeparation2(e){
        this.word[1].separation = e.target.value;
    }
    onUpdateSpell2(e){
        this.word[1].spell = e.target.value;
    }
    onUpdateType2(e){
        this.word[1].type = e.target.value;
    }
    onUpdateSound21(file){
        this.word[1].sound1 = file;
    }
    onUpdateSound22(file){
        this.word[1].sound2 = file;
    }
    onUpdateContent2(e){
        this.word[1].content = e.target.value;
    }

    //khung 3
    onUpdateSeparation3(e){
        this.word[2].separation = e.target.value;
    }
    onUpdateSpell3(e){
        this.word[2].spell = e.target.value;
    }
    onUpdateType3(e){
        this.word[2].type = e.target.value;
    }
    onUpdateSound31(file){
        this.word[2].sound1 = file;
    }
    onUpdateSound32(file){
        this.word[2].sound2 = file;
    }
    onUpdateContent3(e){
        this.word[2].content = e.target.value;
    }

    //khung 4
    onUpdateSeparation4(e){
        this.word[3].separation = e.target.value;
    }
    onUpdateSpell4(e){
        this.word[3].spell = e.target.value;
    }
    onUpdateType4(e){
        this.word[3].type = e.target.value;
    }
    onUpdateSound41(file){
        this.word[3].sound1 = file;
    }
    onUpdateSound42(file){
        this.word[3].sound2 = file;
    }
    onUpdateContent4(e){
        this.word[3].content = e.target.value;
    }

    //khung 5
    onUpdateSeparation5(e){
        this.word[4].separation = e.target.value;
    }
    onUpdateSpell5(e){
        this.word[4].spell = e.target.value;
    }
    onUpdateType5(e){
        this.word[4].type = e.target.value;
    }
    onUpdateSound51(file){
        this.word[4].sound1 = file;
    }
    onUpdateSound52(file){
        this.word[4].sound2 = file;
    }
    onUpdateContent5(e){
        this.word[4].content = e.target.value;
    }

    onAddNewWordSuccess(data){
        console.log('them tu moi');
        console.log(data);
        this.text = '';
        this.tansuat = '';

        this.word = [{type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''}];

        // this.separation = '';
        // this.spell = '';
        // this.type = '';
        // this.sound1 = '';
        // this.sound2 = '';
        // this.content = '';

        this.helpBlockText = '';
        this.helpBlockSeparation = '';
        this.helpBlockSpell = '';
        this.helpBlockType = '';
        this.helpBlockContent = '';

        this.classValidate = '';
        this.validateTitle = '';

        if(data.code==200){
            this.classValidate = 'text-success';
            this.mess = 'Thêm từ mới thành công!';
        } else {
            this.classValidate = 'text-danger';
            this.mess = data.message;
        }
    }
    onAddNewWordFail(data){
        console.log(data);
    }

    onGetWordSuccess(data){
        console.log('kq tim tu');
        console.log(data);
        this.wordByText = data.data;
    }

}

export default alt.createStore(AddWordStore);