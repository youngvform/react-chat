import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MainPage, ChatRoomPage } from 'pages';


class App extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/chatroom/:id/:userId" component={ChatRoomPage}/>
          </Switch>
        </div>
    );
}
}

export default App;
