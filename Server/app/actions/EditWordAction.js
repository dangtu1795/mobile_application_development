import alt from '../alt';

class EditWordAction {
    constructor() {
        this.generateActions(

            'invalidText',
            'invalidSeparation',
            'invalidSpell',
            'invalidType',
            'invalidContent',

            'updateText',
            'updateTanSuat',

            'updateSeparation1',
            'updateSpell1',
            'updateType1',
            'updateSound11',
            'updateSound12',
            'updateContent1',

            'updateSeparation2',
            'updateSpell2',
            'updateType2',
            'updateSound21',
            'updateSound22',
            'updateContent2',

            'updateSeparation3',
            'updateSpell3',
            'updateType3',
            'updateSound31',
            'updateSound32',
            'updateContent3',

            'updateSeparation4',
            'updateSpell4',
            'updateType4',
            'updateSound41',
            'updateSound42',
            'updateContent4',

            'updateSeparation5',
            'updateSpell5',
            'updateType5',
            'updateSound51',
            'updateSound52',
            'updateContent5',

            'updateWordSuccess',
            'updateWordFail',

            'getDetailSuccess',
            'getDetailFail',

            'getViewDetailSuccess',
            'getViewDetailFail'

        );
    }

    getDetail(id){
        $.ajax({
            type: 'GET',
            url: '/word/getDetail/'+id

        })
            .done((data) => {
                this.getDetailSuccess(data);
            })
            .fail((jqXhr) => {
                this.getDetailFail(jqXhr.responseJSON);
            });
    }

    getViewDetail(id){
        $.ajax({
            type: 'GET',
            url: '/word/getDetail/'+id

        })
            .done((data) => {
                this.getViewDetailSuccess(data);
            })
            .fail((jqXhr) => {
                this.getViewDetailFail(jqXhr.responseJSON);
            });
    }

    updateWord(payload){
        console.log('payload');
        console.log(payload);

        //prepare data
        var fd = new FormData();
        fd.append('text', payload.text);
        fd.append('tansuat', payload.tansuat);

        if(payload.w.length==1){

            fd.append('id1', payload.w[0].id);
            fd.append('separation1', payload.w[0].separation);
            fd.append('spell1', payload.w[0].spell);
            fd.append('type1', payload.w[0].type);
            fd.append( 'sound1', payload.w[0].sound1);
            fd.append('sound2', payload.w[0].sound2);
            fd.append('content1', payload.w[0].content);
        } else if(payload.w.length==2){

            fd.append('id1', payload.w[0].id);
            fd.append('separation1', payload.w[0].separation);
            fd.append('spell1', payload.w[0].spell);
            fd.append('type1', payload.w[0].type);
            fd.append( 'sound1', payload.w[0].sound1);
            fd.append('sound2', payload.w[0].sound2);
            fd.append('content1', payload.w[0].content);

            fd.append('id2', payload.w[1].id);
            fd.append('separation2', payload.w[1].separation);
            fd.append('spell2', payload.w[1].spell);
            fd.append('type2', payload.w[1].type);
            fd.append( 'sound3', payload.w[1].sound1);
            fd.append('sound4', payload.w[1].sound2);
            fd.append('content2', payload.w[1].content);
        } else if(payload.w.length==3){

            fd.append('id1', payload.w[0].id);
            fd.append('separation1', payload.w[0].separation);
            fd.append('spell1', payload.w[0].spell);
            fd.append('type1', payload.w[0].type);
            fd.append( 'sound1', payload.w[0].sound1);
            fd.append('sound2', payload.w[0].sound2);
            fd.append('content1', payload.w[0].content);

            fd.append('id2', payload.w[1].id);
            fd.append('separation2', payload.w[1].separation);
            fd.append('spell2', payload.w[1].spell);
            fd.append('type2', payload.w[1].type);
            fd.append( 'sound3', payload.w[1].sound1);
            fd.append('sound4', payload.w[1].sound2);
            fd.append('content2', payload.w[1].content);

            fd.append('id3', payload.w[2].id);
            fd.append('separation3', payload.w[2].separation);
            fd.append('spell3', payload.w[2].spell);
            fd.append('type3', payload.w[2].type);
            fd.append( 'sound5', payload.w[2].sound1);
            fd.append('sound6', payload.w[2].sound2);
            fd.append('content3', payload.w[2].content);
        } else if(payload.w.length==4){

            fd.append('id1', payload.w[0].id);
            fd.append('separation1', payload.w[0].separation);
            fd.append('spell1', payload.w[0].spell);
            fd.append('type1', payload.w[0].type);
            fd.append( 'sound1', payload.w[0].sound1);
            fd.append('sound2', payload.w[0].sound2);
            fd.append('content1', payload.w[0].content);

            fd.append('id2', payload.w[1].id);
            fd.append('separation2', payload.w[1].separation);
            fd.append('spell2', payload.w[1].spell);
            fd.append('type2', payload.w[1].type);
            fd.append( 'sound3', payload.w[1].sound1);
            fd.append('sound4', payload.w[1].sound2);
            fd.append('content2', payload.w[1].content);

            fd.append('id3', payload.w[2].id);
            fd.append('separation3', payload.w[2].separation);
            fd.append('spell3', payload.w[2].spell);
            fd.append('type3', payload.w[2].type);
            fd.append( 'sound5', payload.w[1].sound1);
            fd.append('sound6', payload.w[1].sound2);
            fd.append('content3', payload.w[2].content);

            fd.append('id4', payload.w[3].id);
            fd.append('separation4', payload.w[3].separation);
            fd.append('spell4', payload.w[3].spell);
            fd.append('type4', payload.w[3].type);
            fd.append( 'sound7', payload.w[3].sound1);
            fd.append('sound8', payload.w[3].sound2);
            fd.append('content4', payload.w[3].content);
        } else if(payload.w.length==5){

            fd.append('id1', payload.w[0].id);
            fd.append('separation1', payload.w[0].separation);
            fd.append('spell1', payload.w[0].spell);
            fd.append('type1', payload.w[0].type);
            fd.append( 'sound1', payload.w[0].sound1);
            fd.append('sound2', payload.w[0].sound2);
            fd.append('content1', payload.w[0].content);

            fd.append('id2', payload.w[1].id);
            fd.append('separation2', payload.w[1].separation);
            fd.append('spell2', payload.w[1].spell);
            fd.append('type2', payload.w[1].type);
            fd.append( 'sound3', payload.w[1].sound1);
            fd.append('sound4', payload.w[1].sound2);
            fd.append('content2', payload.w[1].content);

            fd.append('id3', payload.w[2].id);
            fd.append('separation3', payload.w[2].separation);
            fd.append('spell3', payload.w[2].spell);
            fd.append('type3', payload.w[2].type);
            fd.append( 'sound5', payload.w[2].sound1);
            fd.append('sound6', payload.w[2].sound2);
            fd.append('content3', payload.w[2].content);

            fd.append('id4', payload.w[3].id);
            fd.append('separation4', payload.w[3].separation);
            fd.append('spell4', payload.w[3].spell);
            fd.append('type4', payload.w[3].type);
            fd.append( 'sound7', payload.w[3].sound1);
            fd.append('sound8', payload.w[3].sound2);
            fd.append('content4', payload.w[3].content);

            fd.append('id5', payload.w[4].id);
            fd.append('separation5', payload.w[4].separation);
            fd.append('spell5', payload.w[4].spell);
            fd.append('type5', payload.w[4].type);
            fd.append( 'sound9', payload.w[4].sound1);
            fd.append('sound10', payload.w[4].sound2);
            fd.append('content5', payload.w[4].content);
        }

        $.ajax({
            url: '/word/updateWord/'+payload.id,
            type: 'PUT',
            data: fd,
            processData: false,
            contentType: false,
        })
            .done((data) => {
                this.updateWordSuccess(data);
            })
            .fail((jqXhr) => {
                this.updateWordFail(jqXhr.responseJSON);
            });

    }

}

export default alt.createActions(EditWordAction);