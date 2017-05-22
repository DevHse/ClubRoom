
import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Screen, Title, Divider, Spinner, Button, Text, TextInput } from '@shoutem/ui';
import { setUserName, login } from '../../actions/chat';
import { setIndex } from '../../actions/list';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';
import styles from './styles';

const VIDEO = require('../../../images/welcome.mp4');

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;




class Login extends Component {

  state={
    name: '',
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  onLogin() {
    this.props.login();
    Actions.home();
  }

  onText(text) {
    this.setState({
      name: text,
    });
    this.props.setUserName(text);
  }


  render() {
    const { name } = this.state;
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Video
          repeat
          resizeMode="cover"
          source={VIDEO}
          style={styles.backgroundVideo}
        />
        <Divider />
        <TextInput
          placeholder="Your name here"
          placeholderTextColor="black"
          value={name}
          onChangeText={text => this.onText(text)}
          style={{ color: 'black', width: w - 20, marginLeft: 10 }}
        />
        <Divider />
        <Button styleName="dark" onPress={() => this.onLogin()}>
          <Text>Start Chatting</Text>
        </Button>
      </Screen>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    setUserName: name => dispatch(setUserName(name)),
    login: () => dispatch(login()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  authorizing: state.user.authorizing,
});

export default connect(mapStateToProps, bindAction)(Login);
