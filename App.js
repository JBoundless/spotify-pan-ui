import React, { Component } from "react";
import {
   View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default class AppleMusicUI extends React.Component {
  state = {
    isScrollEnabled: false
  }
  UNSAFE_componentWillMount() {
    this.scrollOffset = 0

    this.animation = new Animated.ValueXY({x: 0, y: SCREEN_HEIGHT - 90})

    this.panResponder = PanResponder.create({

      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant:(event, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove:(event, gestureState) => {
        this.animation.setValue({x:0, y:gestureState.dy})
      },
      onPanResponderRelease:(event, gestureState) => {
          if (gestureState.moveY > SCREEN_HEIGHT - 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.moveY < 120) {
          Animated.spring(this.animation.y, {
            toValue: 0,
            tension: 1
          }).start()
        }
        else if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true })

          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start()
        }
        else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false })
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start()
        }
      }
    })
  }

  render() {

    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    },

   animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [200, 32],
      extrapolate: "clamp"
    }),
    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    }),
    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_WIDTH/2 - 100, 10],
      extrapolate: "clamp"
    }),
    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 90],
      outputRange: [SCREEN_HEIGHT/2, 90],
      extrapolate: "clamp"
    }),
    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })

    return(
      <Animated.View style={{flex: 1, backgroundColor: '#191414'}}>
        <Animated.View {... this.panResponder.panHandlers} style={[animatedHeight, {position: 'absolute', left: 0, right: 0, zIndex: 10,backgroundColor: '#191414', height: SCREEN_HEIGHT}]}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled} scrollEventThrottle={16} onScroll={event=>{
          this.scrollOffset = event.nativeEvent.contentOffset.y
        }}>
          <Animated.View style={{height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor: '#191414', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
              <Animated.View style={{height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft}}>
              <Image style={{flex: 1, width: null, height: null}} source={{uri: 'https://sdlgbtn.com/sites/default/files/articles/images/main/DEAR.jpg'}}></Image>
              </Animated.View>
              <Animated.Text style={{opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10, color: 'white'}}>Waving Through a Window</Animated.Text>
            </View>
            <Animated.View style={{opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <AntDesign name="pause" size={32} color="white" />
              <FontAwesome name="play" size={32} color="white" />
            </Animated.View>
          </Animated.View>
        <Animated.View style={{height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <Text style={{fontWeight: 'bold', fontSize: '22', color: 'white'}}>Waving Through a Window</Text>
            <Text style={{fontSize: 18, color: '#1DB954'}}>Stephen Christopher Anthony, 2019 National Tour Cast of Dear Evan Hansen</Text>
          </View>
          <View
                                style={{
                                    height: 40,
                                    width: SCREEN_WIDTH,
                                    alignItems: 'center',
                                }}>
                                <Slider
                                    style={{ width: 300 }}
                                    step={1}
                                    minimumValue={18}
                                    maximumValue={71}
                                    value={18}
                                />
                            </View>
          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <AntDesign name="stepbackward" size={40} color="white" />
                <AntDesign name="pause" size={40} color="white" />
                <AntDesign name="stepforward" size={40} color="white" />
              </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20}}>
            <AntDesign name="plus" size={32} color="white" />
            <Feather name="more-vertical" size={32} color="white" />
          </View>
        </Animated.View>
        <View style={{ height: 1000 }} />
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}