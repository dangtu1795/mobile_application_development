import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import DocumentTitle from "react-document-title";

import EditWordAction from '../../actions/EditWordAction';
import EditWordStore from '../../stores/EditWordStore';

class EditWord extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = EditWordStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        EditWordStore.listen(this.onChange);
        EditWordAction.getDetail(this.props.params.id);
    }

    componentWillUnmount() {
        EditWordStore.unlisten(this.onChange);
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
            EditWordAction.updateSound11(file);
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
            EditWordAction.updateSound12(file);
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
            EditWordAction.updateSound21(file);
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
            EditWordAction.updateSound22(file);
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
            EditWordAction.updateSound31(file);
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
            EditWordAction.updateSound32(file);
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
            EditWordAction.updateSound41(file);
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
            EditWordAction.updateSound42(file);
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
            EditWordAction.updateSound51(file);
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
            EditWordAction.updateSound52(file);
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
            EditWordAction.invalidText();
            this.refs.text.focus();
        } else if(!tansuat || tansuat <0){
            this.setState({mess: 'Thêm không thành công', classValidate: 'text-danger'});
            EditWordAction.invalidTanSuat();
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
                EditWordAction.updateWord({id: this.props.params.id, text: text, tansuat: tansuat, w: arrAdd});


            }

        }

    }

    render() {

        return (
            <DocumentTitle title={'Edit word'}>
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
                                                   onChange={EditWordAction.updateText} value={this.state.text}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="tansuat">Tần suất sử dụng <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" ref="tansuat" id="tansuat" placeholder="Nhập tần suất sử dụng"
                                                   onChange={EditWordAction.updateTanSuat} value={this.state.tansuat}/>
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
                                                           onChange={EditWordAction.updateType1} value={this.state.word[0].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation1">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation1" id="separation1" placeholder="Nhập tách âm"
                                                           onChange={EditWordAction.updateSeparation1} value={this.state.word[0].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell1">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell1" id="spell1" placeholder="Nhập phiên âm"
                                                           onChange={EditWordAction.updateSpell1} value={this.state.word[0].spell}/>
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
                                                <textarea id="content1" ref="content1" className="form-control" rows="8" onChange={EditWordAction.updateContent1}
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
                                                           onChange={EditWordAction.updateType2} value={this.state.word[1].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation2">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation2" id="separation2" placeholder="Nhập tách âm"
                                                           onChange={EditWordAction.updateSeparation2} value={this.state.word[1].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell2">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell2" id="spell2" placeholder="Nhập phiên âm"
                                                           onChange={EditWordAction.updateSpell2} value={this.state.word[1].spell}/>
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
                                                <textarea id="content2" ref="content2" className="form-control" rows="8" onChange={EditWordAction.updateContent2}
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
                                                           onChange={EditWordAction.updateType3} value={this.state.word[2].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation3">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation3" id="separation3" placeholder="Nhập tách âm"
                                                           onChange={EditWordAction.updateSeparation3} value={this.state.word[2].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell3">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell3" id="spell3" placeholder="Nhập phiên âm"
                                                           onChange={EditWordAction.updateSpell3} value={this.state.word[2].spell}/>
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
                                                <textarea id="content3" ref="content3" className="form-control" rows="8" onChange={EditWordAction.updateContent3}
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
                                                           onChange={EditWordAction.updateType4} value={this.state.word[3].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation4">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation4" id="separation4" placeholder="Nhập tách âm"
                                                           onChange={EditWordAction.updateSeparation4} value={this.state.word[3].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell4">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell4" id="spell4" placeholder="Nhập phiên âm"
                                                           onChange={EditWordAction.updateSpell4} value={this.state.word[3].spell}/>
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
                                                <textarea id="content4" ref="content4" className="form-control" rows="8" onChange={EditWordAction.updateContent4}
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
                                                           onChange={EditWordAction.updateType5} value={this.state.word[4].type}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="separation5">Tách âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="separation5" id="separation5" placeholder="Nhập tách âm"
                                                           onChange={EditWordAction.updateSeparation5} value={this.state.word[4].separation}/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2" htmlFor="spell5">Phiên âm <span className="text-danger">*</span>:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" ref="spell5" id="spell5" placeholder="Nhập phiên âm"
                                                           onChange={EditWordAction.updateSpell5} value={this.state.word[4].spell}/>
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
                                                <textarea id="content5" ref="content" className="form-control" rows="8" onChange={EditWordAction.updateContent5}
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

export default EditWord;