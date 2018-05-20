import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import {Modal} from 'react-bootstrap';
import DocumentTitle from "react-document-title";

class Login extends React.Component {
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

    render(){
        return(
            <DocumentTitle title="Login | Dictionary">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                {"Login to Dictionary Portal"}
                            </div>
                            <div className="panel-body">
                                <form className="form-login form-horizontal" onSubmit="" >
                                    <div className="">
                                        <input type="email" required="required" ref="email" className="form-control"
                                               placeholder="Email"/>
                                    </div>
                                    <div className="">
                                        <input type="password" required="required" ref="password" className="form-control"
                                               placeholder="Password" />
                                    </div>
                                    <div className="">
                                        <div className="checkbox checkbox-left">
                                            <label>
                                                <input type="checkbox" value="" onChange=""/> Remember me
                                            </label>
                                            <Link to={"/forgot-password"} className="forgot-password-link pull-right">Forgot password?</Link>
                                        </div>
                                    </div>
                                    <div className="">
                                        <button type="submit" disabled="" className="btn btn-primary btn-submit">
                                            Login
                                        </button>
                                    </div>
                                    <p className="text-info"></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}
export default Login;