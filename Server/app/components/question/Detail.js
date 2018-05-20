/**
 * Created by techlove on 6/30/17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import DocumentTitle from "react-document-title";

import QuestionAction from '../../actions/QuestionAction';
import QuestionStore from '../../stores/QuestionStore';

class Detail extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = QuestionStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        QuestionStore.listen(this.onChange);
        QuestionAction.getDetail(this.props.params.id);
    }

    componentWillUnmount() {
        QuestionStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleImage(e){
        var reader = new FileReader();
        var file = e.target.files[0];
        if (!file) return;
        reader.onload = function(img) {
            QuestionAction.updateImage({file: file, img: img});
        }.bind(this);
        reader.readAsDataURL(file);
    }

    itemWord(id, text, letter){
        QuestionAction.updateId({id: id, text: text, letter: letter});
    }

    updateQuestion(e){
        e.preventDefault();
        let id = this.props.params.id;
        var image = this.state.image;
        var answer = this.state.answer;
        var type = this.state.type;
        var answerA = this.state.dapanA;
        var a_id = this.state.A_id;
        var answerB = this.state.dapanB;
        var b_id = this.state.B_id;
        var answerC = this.state.dapanC;
        var c_id = this.state.C_id;
        var answerD = this.state.dapanD;
        var d_id = this.state.D_id;

        //validate field
        if(!image){
            this.setState({invalidImage: "Vui lòng chọn hình ảnh!"});
            return;
        }
        // if(['image/png', 'image/jpeg', 'image/gif', 'image/bmp'].indexOf(image.type)<0){
        //     this.setState({invalidImage: "Vui lòng chọn hình ảnh!"});
        //     return;
        // }
        if(!answer){
            this.setState({invalidAnswer: "Chọn câu trả lời"});
            return;
        }
        if(["A", "B", "C", "D"].indexOf(answer)<0){
            this.setState({invalidAnswer: "Chọn câu trả lời hợp lệ"});
            return;
        }
        if(!type || ["easy", "normal", "hard"].indexOf(type)<0){
            this.setState({invalidType: "Chọn độ khó"});
            return;
        }
        if(!answerA){
            this.setState({invalidDapanA: "Nhập đáp án A"});
            return;
        }
        if(!a_id){
            this.setState({invalidA_id: "Nhập A_id"});
            return;
        }
        if(!answerB){
            this.setState({invalidDapanB: "Nhập đáp án B"});
            return;
        }
        if(!b_id){
            this.setState({invalidB_id: "Nhập B_id"});
            return;
        }
        if(!answerC){
            this.setState({invalidDapanC: "Nhập đáp án C"});
            return;
        }
        if(!c_id){
            this.setState({invalidC_id: "Nhập C_id"});
            return;
        }
        if(!answerD){
            this.setState({invalidDapanD: "Nhập đáp án D"});
            return;
        }
        if(!d_id){
            this.setState({invalidD_id: "Nhập D_id"});
            return;
        }
        QuestionAction.updateQuestion({id: id, image: image, answer: answer, type: type, answerA: answerA, a_id: a_id, answerB: answerB,
            b_id: b_id, answerC: answerC, c_id: c_id, answerD: answerD, d_id: d_id});
        return true;
    }

    render() {
        let listTextA, listTextB, listTextC, listTextD;
        if(this.state.listTextA.length){
            listTextA = this.state.listTextA.map((word,index)=> {
                return (
                    <div className="item-word" key={index} onClick={this.itemWord.bind(this, word.id, word.text, 'A')}>{word.text}</div>
                ) ;
            });
        } else {
            listTextA = (
                <span>No result</span>
            );
        }
        if(this.state.listTextB.length){
            listTextB = this.state.listTextB.map((word,index)=> {
                return (
                    <div className="item-word" key={index} onClick={this.itemWord.bind(this, word.id, word.text, 'B')}>{word.text}</div>
                ) ;
            });
        } else {
            listTextB = (
                <span>No result</span>
            );
        }
        if(this.state.listTextC.length){
            listTextC = this.state.listTextC.map((word,index)=> {
                return (
                    <div className="item-word" key={index} onClick={this.itemWord.bind(this, word.id, word.text, 'C')}>{word.text}</div>
                ) ;
            });
        } else {
            listTextC = (
                <span>No result</span>
            );
        }
        if(this.state.listTextD.length){
            listTextD = this.state.listTextD.map((word,index)=> {
                return (
                    <div className="item-word" key={index} onClick={this.itemWord.bind(this, word.id, word.text, 'D')}>{word.text}</div>
                ) ;
            });
        } else {
            listTextD = (
                <span>No result</span>
            );
        }

        return (
            <DocumentTitle title={'View Question | Dictionary'}>
                <div className="body-content animated fadeIn">
                    <div className="container">
                        <div className="row">
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li className="active">Detail question</li>
                            </ol>
                            {/*hien thi danh sach menu item*/}
                            <div className="col-md-12 table-responsive">
                                <form className="form-horizontal" encType="multipart/form-data" onSubmit={this.updateQuestion.bind(this)}>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="image">Hình ảnh <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="file" className="form-control" ref="image" id="image" accept="image/*"
                                                   onChange={this.handleImage.bind(this)} />
                                            <img className="img-responsive img-thumbnail" src={this.state.previewImg} />
                                            <span className="text-danger">{this.state.invalidImage}</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="answer">Câu trả lời <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <select className="form-control" id="answer" ref="answer" value={this.state.answer} onChange={QuestionAction.updateTraloi}>
                                                <option value="">--Chọn--</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </select>
                                            <span className="text-danger">{this.state.invalidAnswer}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="type">Độ khó <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <select className="form-control" id="type" ref="type" value={this.state.type} onChange={QuestionAction.updateType}>
                                                <option value="">--Chọn--</option>
                                                <option value="easy">Easy</option>
                                                <option value="normal">Normal</option>
                                                <option value="hard">Hard</option>

                                            </select>
                                            <span className="text-danger">{this.state.invalidType}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="answerA">Đáp án A <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" ref="answerA" id="answerA" placeholder="Nhập đáp án A"
                                                   onChange={QuestionAction.updateDapanA} value={this.state.dapanA}/>
                                            <span className="text-danger">{this.state.invalidDapanA}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="textA">A_id <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="textA" id="textA" placeholder=""
                                                           onChange={QuestionAction.updateTextA} value={this.state.textA}/>
                                                    <div className="live-search" style={{'display':this.state.displayListTextA}}>
                                                        {listTextA}
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="A_id" id="A_id" placeholder=""
                                                           onChange="" value={this.state.A_id} readOnly="readOnly"/>
                                                </div>
                                            </div>
                                            <span className="text-danger">{this.state.invalidA_id}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="answerB">Đáp án B <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" ref="answerB" id="answerB" placeholder="Nhập đáp án B"
                                                   onChange={QuestionAction.updateDapanB} value={this.state.dapanB}/>
                                            <span className="text-danger">{this.state.invalidDapanB}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="textB">B_id <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="textB" id="textB" placeholder=""
                                                           onChange={QuestionAction.updateTextB} value={this.state.textB}/>
                                                    <div className="live-search" style={{'display':this.state.displayListTextB}}>
                                                        {listTextB}
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="B_id" id="B_id" placeholder=""
                                                           value={this.state.B_id} readOnly="readOnly"/>
                                                </div>
                                            </div>
                                            <span className="text-danger">{this.state.invalidB_id}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="answerC">Đáp án C <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" ref="answerC" id="answerC" placeholder="Nhập đáp án C"
                                                   onChange={QuestionAction.updateDapanC} value={this.state.dapanC}/>
                                            <span className="text-danger">{this.state.invalidDapanC}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="textC">C_id <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="textC" id="textC" placeholder=""
                                                           onChange={QuestionAction.updateTextC} value={this.state.textC}/>
                                                    <div className="live-search" style={{'display':this.state.displayListTextC}}>
                                                        {listTextC}
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="C_id" id="C_id" placeholder=""
                                                           onChange="" value={this.state.C_id} readOnly="readOnly"/>
                                                </div>
                                            </div>
                                            <span className="text-danger">{this.state.invalidC_id}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="answerD">Đáp án D <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" ref="answerD" id="answerD" placeholder="Nhập đáp án D"
                                                   onChange={QuestionAction.updateDapanD} value={this.state.dapanD}/>
                                            <span className="text-danger">{this.state.invalidDapanD}</span>

                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" htmlFor="textD">D_id <span className="text-danger">*</span>:</label>
                                        <div className="col-sm-10">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="textD" id="textD" placeholder=""
                                                           onChange={QuestionAction.updateTextD} value={this.state.textD}/>
                                                    <div className="live-search" style={{'display':this.state.displayListTextD}}>
                                                        {listTextD}
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control" ref="D_id" id="D_id" placeholder=""
                                                           value={this.state.D_id} readOnly="readOnly"/>
                                                </div>
                                            </div>
                                            <span className="text-danger">{this.state.invalidD_id}</span>

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
export default Detail;