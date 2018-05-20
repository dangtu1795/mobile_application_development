import alt from '../alt';
import EditWordAction from '../actions/EditWordAction';

class EditWordStore {
    constructor() {
        this.bindActions(EditWordAction);
        this.id = '';
        this.text = '';
        this.tansuat= 0;

        this.word = [{id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''}];

        this.helpBlockText = '';
        this.helpBlockSeparation = '';
        this.helpBlockSpell = '';
        this.helpBlockType = '';
        this.helpBlockContent = '';

        this.err1 = '';
        this.err2 = '';
        this.err3 = '';
        this.err4 = '';
        this.err5 = '';

        this.classValidate = '';
        this.validateTitle = '';

        this.mess = '';

    }

    onGetDetailSuccess(data){
        this.word = [{id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''}];
        if(data.data){
            this.id = data.data.id;
            this.text = data.data[0].text;
            this.tansuat = data.data[0].tansuat;

            for(var i=0; i< data.data.length; i++){
                this.word[i].id = data.data[i].id;
                this.word[i].type = data.data[i].type;
                this.word[i].separation = data.data[i].separation;
                this.word[i].spell = data.data[i].spell;
                this.word[i].content = data.data[i].content;
            }

            this.helpBlockText = '';
            this.helpBlockSeparation = '';
            this.helpBlockSpell = '';
            this.helpBlockType = '';
            this.helpBlockContent = '';

            this.classValidate = '';
            this.validateTitle = '';

            this.mess = '';
        }

    }

    onGetViewDetailSuccess(data){
        this.word = [{id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''},
            {id: '', type: '', separation: '', spell: '', sound1: '', sound2: '', content: ''}];
        if(data.data){
            this.id = data.data.id;
            this.text = data.data[0].text;
            this.tansuat = data.data[0].tansuat;

            for(var i=0; i< data.data.length; i++){
                this.word[i].id = data.data[i].id;
                this.word[i].type = data.data[i].type;
                this.word[i].separation = data.data[i].separation;
                this.word[i].spell = data.data[i].spell;
                this.word[i].sound1 = data.data[i].sound1;
                this.word[i].sound2 = data.data[i].sound2;
                this.word[i].content = data.data[i].content;
            }

            this.helpBlockText = '';
            this.helpBlockSeparation = '';
            this.helpBlockSpell = '';
            this.helpBlockType = '';
            this.helpBlockContent = '';

            this.classValidate = '';
            this.validateTitle = '';

            this.mess = '';
        }

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

    onUpdateWordSuccess(data){
        console.log(data);

        // this.text = '';
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
            this.mess = 'Cập nhật thành công!';
        } else {
            this.classValidate = 'text-danger';
            this.mess = data.mesage;
        }
    }
    onAddNewWordFail(data){
        console.log(data);
    }

}

export default alt.createStore(EditWordStore);