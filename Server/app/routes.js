import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import ListWord from './components/word/ListWord';
import EditWord from './components/word/EditWord';
import AddWord from './components/word/AddWord';
import ViewWord from './components/word/ViewWord';

import Question from './components/question/Question';
import AddQuestion from './components/question/AddQuestion';
import Detail from './components/question/Detail';

import Login from './components/user/Login';

export default (
    <Route>
            <Route path='/login' component={Login}/>
            <Route component={App}>
                <Route path='/' component={Home} />
                <Route path='/list-word' component={ListWord} />
                <Route path="/edit-word/:id" components={EditWord}/>
                <Route path='/add-word' component={AddWord} />
                <Route path='viewWord/:id' component={ViewWord}/>
                <Route path='question' component={Question}/>
                <Route path='add-question' component={AddQuestion}/>
                <Route path='question/detail/:id' component={Detail}/>
            </Route>
    </Route>
);