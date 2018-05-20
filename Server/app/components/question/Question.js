/**
 * Created by techlove on 6/30/17.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DocumentTitle from "react-document-title";

import QuestionAction from '../../actions/QuestionAction';
import QuestionStore from '../../stores/QuestionStore';

class Question extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {state1: QuestionStore.getState(), modalIsOpenDelete: false, idDel: ''};
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        QuestionStore.listen(this.onChange);
        QuestionAction.getAllQuestions();
    }

    componentWillUnmount() {
        QuestionStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState({state1: QuestionStore.getState(), modalIsOpenDelete: false, idDel: ''});
    }
    openModal(id){
        this.setState({modalIsOpenDelete: true, idDel: id});
    }
    closeModal(e){
        this.setState({modalIsOpenDelete: false, idDel: ''});

    }
    deleteQuestion(e){
        e.preventDefault();
        console.log(this.state.idDel);
        QuestionAction.deleteQuestion(this.state.idDel);
    }

    buttonFormatterView(data, cell) {
        return <a href={"/question/detail/" + cell} className="" style={{color: "#00ff00", cursor: "pointer"}} ><i className="fa fa-eye" aria-hidden="true"></i></a>;
    }
    buttonFormatterDel(data, cell) {
        return <a className="" style={{color: "#ff0000", cursor: "pointer"}} onClick={this.openModal.bind(this, cell)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>;
    }

    render() {

        const options = {
            hideSizePerPage: true,
            sizePerPage: 50,
            defaultSortName: 'id',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
        };

        return (
            <DocumentTitle title={'Question | Dictionary'}>
                <div className="body-content animated fadeIn">
                    <div className="container">
                        <div className="row">
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li className="active">List words</li>
                            </ol>
                            <div className="col-sm-12" style={{"marginBottom": "5px"}}>
                                <Link to="/add-question" className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Add</Link>
                            </div>
                            <div className="col-md-12 table-responsive">
                                <BootstrapTable data={this.state.state1.questions} striped={true} hover={true} options={ options } pagination>
                                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} dataFormat={questionFormatter} >Hình ảnh</TableHeaderColumn>
                                    <TableHeaderColumn dataField="type" dataSort={true}>Độ khó</TableHeaderColumn>
                                    <TableHeaderColumn dataField="answer" dataSort={true}>câu trả lời</TableHeaderColumn>
                                    <TableHeaderColumn dataField="id" dataFormat={this.buttonFormatterView.bind(this, 'id')} width='65'>Xem</TableHeaderColumn>
                                    <TableHeaderColumn dataField="id" dataFormat={this.buttonFormatterDel.bind(this, 'id')} width='70'>Xóa</TableHeaderColumn>
                                </BootstrapTable>
                            </div>


                            {/* modal xoa item va con cua no */}
                            <Modal show={this.state.modalIsOpenDelete} onHide ={this.closeModal.bind(this)}>
                                <Modal.Header>
                                    <Modal.Title>
                                        Xóa
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Bạn có chắc muốn xóa?</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button
                                        className="btn btn-warning"
                                        onClick={this.closeModal.bind(this)}><i className="fa fa-times"> Hủy bỏ</i> </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={this.deleteQuestion.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                                </Modal.Footer>
                            </Modal>



                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

function questionFormatter(cell, row) {
    return <img className="img-responsive img-thumbnail" src={row.image}/>;
}

export default Question;