
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import { closeDrawer } from './actions/drawer';
import ChatUI from './components/ChatUI';
import Login from './components/login/';
import Home from './components/home/';
import BlankPage from './components/blankPage';
import Chat from './components/Chat';


const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    closeDrawer: React.PropTypes.func,
  }


  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }


  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'login':
        return <Login />;
      case 'home':
        return <Home />;
      case 'blankPage':
        return <BlankPage />;
      default :
        return <Login />;
    }
  }

  render() {
    return (
      <RouterWithRedux>
        <Scene key="root">
          <Scene key="login" component={Login} hideNavBar initial />
          <Scene key="home" component={Home} />
          <Scene key="blankPage" component={BlankPage} />
          <Scene key="chatUI" component={ChatUI} />
          <Scene key="chat" component={Chat} />
        </Scene>
      </RouterWithRedux>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
