import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import DocumentTitle from "react-document-title";
import HtmlToReact from 'html-to-react';

import EditWordAction from '../../actions/EditWordAction';
import EditWordStore from '../../stores/EditWordStore';

class ViewWord extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = EditWordStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        EditWordStore.listen(this.onChange);
        EditWordAction.getViewDetail(this.props.params.id);
    }

    componentWillUnmount() {
        EditWordStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
    play(e){
        var a = ReactDom.findDOMNode(this.refs[e]);
        a.play();
    }

    render() {
        let detail = this.state.word.map((w, index)=>{
            var htmlToReactParser = new HtmlToReact.Parser(React);
            var reactcontent = htmlToReactParser.parse(w.content);
            if(w.sound1) {
                var sound1 = (
                    <span>
                        <span className="play-sound" onClick={this.play.bind(this, (w.type+'1'))}> <i className="fa fa-volume-up" aria-hidden="true" style={{'color': '#fa6360'}}></i></span>
                        <audio id="player" ref={w.type+'1'} preload="true" className="player">
                            <source src={w.sound1}/>
                        </audio>
                    </span>
                );
            }
            if(w.sound2){
                var sound2 = (
                    <span>
                        <span className="play-sound" onClick={this.play.bind(this, (w.type+'2'))}> <i className="fa fa-volume-up" aria-hidden="true" style={{'color': '#4693db'}}></i></span>
                        <audio id="player" ref={w.type+'2'} preload="true" className="player">
                            <source src={w.sound2} />
                        </audio>
                    </span>
                );
            }
            return(
                <div key={index} className="detail-content">
                    <span className="separation">{w.separation + " "}</span>
                    <span className="spell">{w.spell}</span>
                    <span className="type">{w.type}</span>
                    {sound1}
                    {sound2}
                    <br/>
                    {reactcontent}
                </div>
            )   ;
        });



        return (
            <DocumentTitle title={'View word'}>
                <div className="body-content animated fadeIn">
                    <div className="container">
                        <div className="row">
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li className="active">{this.state.text}</li>
                            </ol>
                            {/*hien thi danh sach menu item*/}
                            <div className="col-md-12 table-responsive">
                                <h1>{this.state.text}</h1>
                                <div className="content">
                                    {detail}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default ViewWord;