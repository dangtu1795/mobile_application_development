import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import DocumentTitle from 'react-document-title';

import AddWordAction from '../../actions/AddWordAction';
import AddWordStore from '../../stores/AddWordStore';

class AddWord extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = AddWordStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        AddWordStore.listen(this.onChange);

    }

    componentWillUnmount() {
        AddWordStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSound11(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound11).value = '';
            AddWordAction.updateSound11(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound12(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound12).value = '';
            AddWordAction.updateSound12(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound21(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound21).value = '';
            AddWordAction.updateSound21(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound22(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound22).value = '';
            AddWordAction.updateSound22(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound31(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound31).value = '';
            AddWordAction.updateSound31(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound32(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound32).value = '';
            AddWordAction.updateSound32(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound41(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound41).value = '';
            AddWordAction.updateSound41(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound42(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound42).value = '';
            AddWordAction.updateSound42(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound51(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound51).value = '';
            AddWordAction.updateSound51(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }
    handleSound52(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            // ReactDom.findDOMNode(this.refs.sound52).value = '';
            AddWordAction.updateSound52(file);
            // this.props.actions.updateImagefile(file);
        }.bind(this);
        reader.readAsDataURL(file);
    }

    addNewWord(e){
        e.preventDefault();
        // console.log(this.state.word);
        ReactDom.findDOMNode(this.refs.sound11).value = '';
        ReactDom.findDOMNode(this.refs.sound12).value = '';
        ReactDom.findDOMNode(this.refs.sound21).value = '';
        ReactDom.findDOMNode(this.refs.sound22).value = '';
        ReactDom.findDOMNode(this.refs.sound31).value = '';
        ReactDom.findDOMNode(this.refs.sound32).value = '';
        ReactDom.findDOMNode(this.refs.sound41).value = '';
        ReactDom.findDOMNode(this.refs.sound42).value = '';
        ReactDom.findDOMNode(this.refs.sound51).value = '';
        ReactDom.findDOMNode(this.refs.sound52).value = '';

        var text = this.state.text;
        var tansuat = this.state.tansuat;
        var word = this.state.word;

        var arrAdd = [];

        if(!text) {
            this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger'});
            AddWordAction.invalidText();
            this.refs.text.focus();
        } else if(!tansuat || tansuat <0){
            this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger'});
            AddWordAction.invalidTanSuat();
            this.refs.tansuat.focus();
        }
        else {
            for(var i=0; i<word.length; i++){
                if(!word[i].type && !word[i].separation && !word[i].spell && !word[i].content){
                    continue;
                } else if(word[i].type && word[i].separation && word[i].spell && word[i].content){
                    arrAdd.push(word[i]);
                } else {

                        if(!word[i].type || !word[i].separation || !word[i].spell || !word[i].content) {
                            if(i==0){
                                this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger', err1: 'Vui lòng nhập dữ liệu'});
                                return;
                            } else if(i==1){
                                this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger', err2: 'Vui lòng nhập dữ liệu'});
                                return;
                            } else if(i==2){
                                this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger', err3: 'Vui lòng nhập dữ liệu'});
                                return;
                            } else if(i==3){
                                this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger', err4: 'Vui lòng nhập dữ liệu'});
                                return;
                            } else if(i==4){
                                this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger', err5: 'Vui lòng nhập dữ liệu'});
                                return;
                            }
                        }

                }
            }
            if(!arrAdd.length){
                this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger'});
                console.log('k co phan tu nao dc add');
            } else {
                AddWordAction.addNewWord({text: text, tansuat: tansuat, w: arrAdd});
                // console.log('calll action');
                // console.log(arrAdd);
                // for(var i=0; i<arrAdd.length; i++){
                //     console.log(arrAdd[i]);
                //     // setTimeout((function() {
                //         AddWordAction.getWord(text);
                //         if(this.state.wordByText){
                //             AddWordAction.addWordDetail(this.state.wordByText);
                //         } else {
                //             AddWordAction.addNewWord({text: text, w: arrAdd[i]});
                //         }
                //     // }).bind(this), 10000);
                // }

            }
            // if(!word[0].type && !word[1].type && !word[2].type && !word[3].type && !word[4].type){
            //     this.refs.type1.focus();
            // } else {
            //     if(word[0].type){
            //         if(!word[0].separation){
            //             this.refs.separation1.focus();
            //         } else if(!word[0].spell){
            //             this.refs.spell1.focus();
            //         } else if(!word[0].content){
            //             this.refs.content1.focus();
            //         }
            //     }
            //     if(word[1].type){
            //         if(!word[1].separation){
            //             this.refs.separation2.focus();
            //         } else if(!word[1].spell){
            //             this.refs.spell2.focus();
            //         } else if(!word[1].content){
            //             this.refs.content2.focus();
            //         }
            //     }
            //     if(word[2].type){
            //         if(!word[2].separation){
            //             this.refs.separation3.focus();
            //         } else if(!word[2].spell){
            //             this.refs.spell3.focus();
            //         } else if(!word[2].content){
            //             this.refs.content3.focus();
            //         }
            //     }
            //     if(word[3].type){
            //         if(!word[3].separation){
            //             this.refs.separation4.focus();
            //         } else if(!word[3].spell){
            //             this.refs.spell4.focus();
            //         } else if(!word[3].content){
            //             this.refs.content4.focus();
            //         }
            //     }
            //     if(word[4].type){
            //         if(!word[4].separation){
            //             this.refs.separation5.focus();
            //         } else if(!word[4].spell){
            //             this.refs.spell5.focus();
            //         } else if(!word[4].content){
            //             this.refs.content5.focus();
            //         }
            //     }
            //
            //     console.log('call action');
            //     AddWordAction.addNewWord({text: text});
            //
            //
            // }
        }
        {/*var separation = this.state.separation;*/}
        {/*var spell = this.state.spell;*/}
        {/*var type = this.state.type;*/}
        {/*var sound1 = this.state.sound1;*/}
        {/*var sound2 = this.state.sound2;*/}
        {/*var content = this.state.content;*/}

        {/*if(!text){*/}
            {/*AddWordAction.invalidText();*/}
            {/*this.refs.text.focus();*/}
        {/*}*/}
        {/*else if(!separation){*/}
            {/*AddWordAction.invalidSeparation();*/}
            {/*this.refs.separation.focus();*/}
        // }
        // else if(!spell){
        //     AddWordAction.invalidSpell();
        //     this.refs.spell.focus();
        // }
        // else if(!type){
        //     AddWordAction.invalidType();
        //     this.refs.type.focus();
        // }
        // else if(!content){
        //     AddWordAction.invalidContent();
        //     this.refs.content.focus();
        // }
        // else {
        //     console.log('call action');
        //     AddWordAction.addNewWord({text: text, separation: separation, spell: spell, type: type, sound1: sound1,
        //         sound2: sound2, content: content});
        // }
    }

    render() {

        return (
            <DocumentTitle title={"Add new word"}>
                <div className="body-content animated fadeIn">
                    <div className="container">
                        <div className="row">
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li className="active">Add word</li>
                            </ol>
                            {/*hien thi danh sach menu item*/}
                            <div className="col-md-12 table-responsive">
                                <form className="form-horizontal" encType="multipart/form-data" onSubmit={this.addNewWord.bind(this)}>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="text">Từ <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" ref="text" id="text" placeholder="Nhập từ cần thêm"
                                                onChange={AddWordAction.updateText} value={this.state.text}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="tansuat">Tần suất sử dụng <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" ref="tansuat" id="tansuat" placeholder="Nhập tần suất sử dụng"
                                                   onChange={AddWordAction.updateTanSuat} value={this.state.tansuat}/>
                                        </div>
                                    </div>

                                    {/*khung 1*/}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <span className="text-danger">{this.state.err1}</span>
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="type1">Loại từ <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="type1" id="type1" placeholder="Nhập loại từ"
                                                           onChange={AddWordAction.updateType1} value={this.state.word[0].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation1">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation1" id="separation1" placeholder="Nhập tách âm"
                                                           onChange={AddWordAction.updateSeparation1} value={this.state.word[0].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell1">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell1" id="spell1" placeholder="Nhập phiên âm"
                                                           onChange={AddWordAction.updateSpell1} value={this.state.word[0].spell}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound11">Giọng đọc 1:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound11" id="sound11" placeholder="Enter email"
                                                           onChange={this.handleSound11.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound12">Giọng đọc 2:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound12" id="sound12" placeholder="Enter password"
                                                           onChange={this.handleSound12.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="content1">Nội dung chi tiết <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <textarea id="content1" ref="content1" className="form-control" rows="8" onChange={AddWordAction.updateContent1}
                                                              value={this.state.word[0].content}></textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*khung 2*/}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <span className="text-danger">{this.state.err2}</span>
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="type2">Loại từ <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="type2" id="type2" placeholder="Nhập loại từ"
                                                           onChange={AddWordAction.updateType2} value={this.state.word[1].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation2">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation2" id="separation2" placeholder="Nhập tách âm"
                                                           onChange={AddWordAction.updateSeparation2} value={this.state.word[1].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell2">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell2" id="spell2" placeholder="Nhập phiên âm"
                                                           onChange={AddWordAction.updateSpell2} value={this.state.word[1].spell}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound21">Giọng đọc 1:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound21" id="sound21" placeholder="Enter email"
                                                           onChange={this.handleSound21.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound22">Giọng đọc 2:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound22" id="sound22" placeholder="Enter password"
                                                           onChange={this.handleSound22.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="content2">Nội dung chi tiết <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <textarea id="content2" ref="content2" className="form-control" rows="8" onChange={AddWordAction.updateContent2}
                                                              value={this.state.word[1].content}></textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*khung 3*/}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <span className="text-danger">{this.state.err3}</span>
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="type3">Loại từ <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="type3" id="type3" placeholder="Nhập loại từ"
                                                           onChange={AddWordAction.updateType3} value={this.state.word[2].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation3">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation3" id="separation3" placeholder="Nhập tách âm"
                                                           onChange={AddWordAction.updateSeparation3} value={this.state.word[2].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell3">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell3" id="spell3" placeholder="Nhập phiên âm"
                                                           onChange={AddWordAction.updateSpell3} value={this.state.word[2].spell}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound31">Giọng đọc 1:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound31" id="sound31" placeholder="Enter email"
                                                           onChange={this.handleSound31.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound32">Giọng đọc 2:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound32" id="sound32" placeholder="Enter password"
                                                           onChange={this.handleSound32.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="content3">Nội dung chi tiết <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <textarea id="content3" ref="content3" className="form-control" rows="8" onChange={AddWordAction.updateContent3}
                                                              value={this.state.word[2].content}></textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*khung 4*/}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <span className="text-danger">{this.state.err4}</span>
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="type4">Loại từ <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="type4" id="type4" placeholder="Nhập loại từ"
                                                           onChange={AddWordAction.updateType4} value={this.state.word[3].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation4">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation4" id="separation4" placeholder="Nhập tách âm"
                                                           onChange={AddWordAction.updateSeparation4} value={this.state.word[3].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell4">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell4" id="spell4" placeholder="Nhập phiên âm"
                                                           onChange={AddWordAction.updateSpell4} value={this.state.word[3].spell}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound41">Giọng đọc 1:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound41" id="sound41" placeholder="Enter email"
                                                           onChange={this.handleSound41.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound42">Giọng đọc 2:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound42" id="sound42" placeholder="Enter password"
                                                           onChange={this.handleSound42.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="content4">Nội dung chi tiết <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <textarea id="content4" ref="content4" className="form-control" rows="8" onChange={AddWordAction.updateContent4}
                                                              value={this.state.word[3].content}></textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*khung 5*/}
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <span className="text-danger">{this.state.err5}</span>
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="type5">Loại từ <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="type5" id="type5" placeholder="Nhập loại từ"
                                                           onChange={AddWordAction.updateType5} value={this.state.word[4].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation5">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation5" id="separation5" placeholder="Nhập tách âm"
                                                           onChange={AddWordAction.updateSeparation5} value={this.state.word[4].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell5">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell5" id="spell5" placeholder="Nhập phiên âm"
                                                           onChange={AddWordAction.updateSpell5} value={this.state.word[4].spell}/>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound51">Giọng đọc 1:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound51" id="sound51" placeholder="Enter email"
                                                           onChange={this.handleSound51.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="sound52">Giọng đọc 2:</label>
                                                <div className="col-sm-10">
                                                    <input type="file" className="form-control" ref="sound52" id="sound52" placeholder="Enter password"
                                                           onChange={this.handleSound52.bind(this)} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="content5">Nội dung chi tiết <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <textarea id="content5" ref="content" className="form-control" rows="8" onChange={AddWordAction.updateContent5}
                                                              value={this.state.word[4].content}></textarea>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-sm-offset-2 col-sm-10">
                                            <button type="submit" className="btn btn-success">Submit</button>
                                            <span className={this.state.classValidate}>{" " + this.state.mess}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default AddWord;