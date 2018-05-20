import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <footer>
                <div className='container'>
                    <div className='row'>
                        <div className="col-sm-12">
                            <p>Dictionary - &copy; 2017</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;