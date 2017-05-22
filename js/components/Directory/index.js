import React, { Component } from 'react';
import { Image, Dimensions, ListView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { setIndex } from '../../actions/list';
import { setUser } from '../../actions/user';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const {
  reset,
  pushRoute,
} = actions;

const ic_location = require('../../../images/ic_location.png');

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const listData = [
  { name: 'Hopistal', status: '2.8 km' },
  { name: 'Apple Store', status: '10 km' },
  { name: 'Factory', status: '3 km' },
  { name: 'Company', status: '4 km' },
];

class Directory extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    setIndex: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataSource: ds.cloneWithRows(listData),
    };
  }

  setUser(name) {
    this.props.setUser(name);
  }
  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }
  onAcitonChat() {
    Actions.chat();
  }
  renderRowCustom(rowData) {
    return (
    <TouchableOpacity onPress={() => this.onAcitonChat()} >
      <View style={{ width: w, height: 60, backgroundColor: 'white' }}>
        <Text style={{ marginLeft: 70, marginTop: 10, color: 'black', fontFamily: 'Avenir-Medium', fontSize: 16 }} >{rowData.name}</Text>
        <Text style={{ marginLeft: 70, color: '#c9c9c9', fontFamily: 'Avenir-Medium', fontSize: 14 }} >{rowData.status}</Text>
        <Image
          style={{ position: 'absolute', top: 10, left: 15, width: 40, height: 40, borderRadius: 20, borderColor: '#f8f8f8', borderWidth: 1 }}
          source={ic_location}
        />
        <View style={{ position: 'absolute', top: 59, left: 70, backgroundColor: '#c9c9c9', height: 1, width: w - 70 }} />
      </View>
    </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ width: w, height: 60, backgroundColor: '#f8f8f8' }}>
          <Text style={{ marginTop: 20, textAlign: 'center', color: 'black', fontFamily: 'Avenir-Medium', fontSize: 18 }} >Directory</Text>
        </View>
        <View style={{ backgroundColor: '#b2b2b2', width: w, height: 1 }} />
        <View style={{ width: w, height: h - 60 }}>
          <View style={{ width: w - 20, marginTop: 10, marginLeft: 10, borderRadius: 5, height: 30, backgroundColor: '#ededed' }}>
            <Text style={{ color: '#8e8e90', marginTop: 8, marginLeft: 5, fontSize: 12 }}> Search for Directory..</Text>
          </View>
          <ListView
            automaticallyAdjustContentInsets={false}
            style={{ flex: 1 }}
            dataSource={this.state.dataSource}
            renderRow={rowData => this.renderRowCustom(rowData)}
          />
        </View>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  user: state.user,
});

export default connect(mapStateToProps, bindActions)(Directory);
