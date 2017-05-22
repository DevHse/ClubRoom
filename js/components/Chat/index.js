import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NavigationBar, Icon, Title, Button } from '@shoutem/ui';
import { connect } from 'react-redux';
import { GiftedChat, ActionsView, Bubble } from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import { sendMessage, loadHistory } from '../../actions/chat';


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


 // {
 //    _id: Math.round(Math.random() * 1000000),
 //    text: 'React Native lets you build mobile apps using only JavaScript',
 //    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
 //    user: {
 //      _id: 1,
 //      name: 'Developer',
 //    },
 //  },

 // '-KkjHvhwYR1Az93XWEY4':
 //   { author:
 //      { avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
 //        name: 'John Nguyen' },
 //     id: '-KkjHvhwYR1Az93XWEY4',
 //     text: 'abc',
 //     time: 1495442111483 } }

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    this.props.loadHistory().then(rs => {

      let arr = Object.values(rs).map(item => {
        let _user = {};
        if (item.author.name === this.props.user.name) {
            _user._id = 1;
            _user.name= item.author.name;
        }else {
          _user.id = 2;
          _user.name= item.author.name;
        }
        let temp = {
          _id: item.id,
          text: item.text,
          createdAt: new Date(item.time),
          user: _user,
        };
        return temp;
      });

      this.setState({
        messages: arr,
        loadEarlier: false,
        isLoadingEarlier: false,
      });
    });
  }

  onSend(messages = []) {
    this.props.sendMessage('abc', this.props.user);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <ActionsView
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={{flex:1}}>
        <NavigationBar
          leftComponent={(
            <Button onPress={() => Actions.pop()}>
              <Icon name="back" />
            </Button>
          )}
          centerComponent={<Title>Group Chat Demo</Title>}
        />
        <View style={{ marginTop: 80, width: w, height: h - 80 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            style={{ flex:1 }}
            user={{
              _id: 1, // sent messages should have same user._id
            }}
            renderActions={this.renderCustomActions}
            renderBubble={this.renderBubble}
            renderCustomView={this.renderCustomView}
            renderFooter={this.renderFooter}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});


function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    popRoute: key => dispatch(popRoute(key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    sendMessage: (text, user) => dispatch(sendMessage(text, user)),
    loadHistory: () => dispatch(loadHistory()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
  user: state.user,
});

export default connect(mapStateToProps, bindAction)(Chat);

