import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import DocumentTitle from "react-document-title";

import ListWordAction from '../../actions/ListWordAction';
import ListWordStore from '../../stores/ListWordStore';

class ListWord extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {state1: ListWordStore.getState(), modalIsOpenDelete: false, idDel: ''};
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        ListWordStore.listen(this.onChange);
        ListWordAction.getAllWords();
    }

    componentWillUnmount() {
        ListWordStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState({state1: ListWordStore.getState(), modalIsOpenDelete: false, idDel: ''});
    }

    onToggleDropDown(onToggleDropDown){
        // do your stuff here
        console.log('toggle dropdown');
        onToggleDropDown();
    }

    renderSizePerPageDropDown(props){
        return (
            <SizePerPageDropDown
                className='my-size-per-page'
                btnContextual='btn-warning'
                variation='dropup'
                onClick={ () => this.onToggleDropDown(props.onToggleDropDown) } />
        );
    }
    buttonFormatterView(data, cell) {
        return <a href={"/viewWord/" + cell} target="_blank" className="" style={{color: "#00ff00", cursor: "pointer"}} ><i className="fa fa-eye" aria-hidden="true"></i></a>;
    }
    buttonFormatterDel(data, cell) {
        return <a className="" style={{color: "#ff0000", cursor: "pointer"}} onClick={this.openModal.bind(this, cell)}><i className="fa fa-trash-o" aria-hidden="true"></i></a>;
    }

    openModal(id){
        this.setState({modalIsOpenDelete: true, idDel: id});
    }
    closeModal(e){
        this.setState({modalIsOpenDelete: false});

    }
    deleteWord(e){
        e.preventDefault();
        console.log(this.state.idDel);
        ListWordAction.deleteWord(this.state.idDel);
    }

    render() {

        const options = {
            // sizePerPageList: [ {
            //     text: '10', value: 10
            // }, {
            //     text: '25', value: 25
            // }, {
            //     text: 'All', value: this.state.state1.listWords.length
            // } ],
            hideSizePerPage: true,
            sizePerPage: 50,
            defaultSortName: 'tansuat',  // default sort column name
            defaultSortOrder: 'desc'  // default sort order
        };

        return (
            <DocumentTitle title={'List words | Dictionary'}>
                <div className="body-content animated fadeIn">
                    <div className="container">
                        <div className="row">
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li className="active">List words</li>
                            </ol>
                            {/*hien thi danh sach menu item*/}
                            <div className="col-md-12 table-responsive">
                                <BootstrapTable data={this.state.state1.listWords} striped={true} hover={true} options={ options } pagination>
                                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} dataFormat={wordFormatter} >Từ</TableHeaderColumn>
                                    {/*<TableHeaderColumn dataField="separation" >Tách âm</TableHeaderColumn>*/}
                                    {/*<TableHeaderColumn dataField="spell">Phiên âm</TableHeaderColumn>*/}
                                    <TableHeaderColumn dataField="type" dataSort={true}>Loại từ</TableHeaderColumn>
                                    <TableHeaderColumn dataField="tansuat" dataSort={true}>Tần suất sử dụng</TableHeaderColumn>
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
                                        onClick={this.deleteWord.bind(this)}><i className="fa fa-check"> Xóa</i> </button>
                                </Modal.Footer>
                            </Modal>



                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

function wordFormatter(cell, row) {
    return <Link to={"/edit-word/"+cell}>{row.text}</Link>;
}

export default ListWord;