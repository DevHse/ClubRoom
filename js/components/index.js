import React, { Component } from 'react';
import { Image,Dimensions, View, Text, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { setUser } from '../../actions/user';
import styles from './styles';
const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const {
  replaceAt,
} = actions;

const background = require('../../../images/bgChat.png');
const avatar = require('../../../images/avatarDefault.jpg');
const img1 = require('../../../images/1.png');
const img2 = require('../../../images/2.png');
const img3 = require('../../../images/3.png');
const img4 = require('../../../images/4.png');
const img5 = require('../../../images/5.png');
const img6 = require('../../../images/6.png');
const img7 = require('../../../images/7.png');
const img8 = require('../../../images/8.png');
const img9 = require('../../../images/9.png');
const listImage = [img1,img2,img3,img4,img5,img6,img7,img8,img9];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class Profile extends Component {

  static propTypes = {
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dataSource: ds.cloneWithRows([1,2,3]),
    };
  }
  getImage(index) {
  	return require(`../../../images/${index}.png`);
  }
  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }
  renderRowCustom(rowData, sectionID, rowID) {
  	let h_Cell = w/3;
  	let w_Cell = h_Cell;
  	let indexImg1 = listImage[rowID * 3];
  	let indexImg2 = listImage[rowID * 3 + 1];
  	let indexImg3 = listImage[rowID * 3 + 2];
  	return (
  		<View style={{width:w, height: h_Cell, flex:1, flexDirection:'row'}}>
  			<TouchableOpacity>
  				<Image source={indexImg1} style={{width:w_Cell,height:h_Cell}} />
  			</TouchableOpacity>
  			<TouchableOpacity>
  				<Image source={indexImg2} style={{width:w_Cell,height:h_Cell}} />
  			</TouchableOpacity>
  			<TouchableOpacity>
  			 	<Image source={indexImg3} style={{width:w_Cell,height:h_Cell}} />
  			 </TouchableOpacity>
  		</View>
  	);
  }
  render() {
  	const topOfImg = ((h*40)/100)/2 - 50;
    return (
      <View style={{flex:1,backgroundColor:'white'}}>
          <View style={{width:w, height: (h*40)/100}}>
          	<Image source={img2} style={{width: w, height: (h*40)/100}} />
          	<View style={{backgroundColor:'#B1CEF9',opacity:0.8, width: w, height: (h*40)/100,position:'absolute',top:0,left:0}}></View>
            <Image source={avatar} style={{position:'absolute',
	          	left:20,top: (h*40)/100 - 100 ,
	          	borderRadius:40,
	          	borderWidth:4,
	           	borderColor:'#CDD3DC',
	          	backgroundColor:'white',
	           	width:80,height:80}} />
           	<Text style={{width:w, color:'white', backgroundColor:'transparent', fontSize:18, position:'absolute', left: 110, top: (h*40)/100 - 80 }}>John Nguyen</Text>
           	<Text style={{width:w, color:'white', backgroundColor:'transparent',fontSize:14, position:'absolute',left: 110, top: (h*40)/100 - 55  }}>@tpnguyen</Text>
          </View>
          <View style={{backgroundColor:'#CDD3DC',width:w, height:1}} />
          <View style={{width:w, height: (h*60)/100}}>
          	<ListView 
          	automaticallyAdjustContentInsets={false}
          	style={{flex:1}}
          	dataSource={this.state.dataSource}
          	renderRow={this.renderRowCustom.bind(this)}
          	/>
          </View>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setUser: name => dispatch(setUser(name)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Profile);
