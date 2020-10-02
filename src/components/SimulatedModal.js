import React from 'react';
import { View, Animated, Dimensions, TouchableOpacity, PanResponder, Keyboard } from 'react-native';
import { Colors } from 'styles';
import { isAndroid } from 'utils';

const screenHeight = Dimensions.get('screen').height;

class SwipeGesture extends React.PureComponent {

    componentWillMount = () => {

        let valueY;

        this.PanResponder = PanResponder.create({

            onPanResponderGrant: (evt, gestureState) => {
                valueY = gestureState.dy;
            },

            onPanResponderMove: (evt, gestureState) => {
                let panY = valueY + gestureState.dy;
                let x = gestureState.dx;
                let y = gestureState.dy;
                if (Math.abs(x) > Math.abs(y)) {
                    //aq ar vici ikneb vknat rame
                } else {
                    this.props.onSwipePerformed('moving', panY)
                }
                return true;
            },

            onPanResponderRelease: (evt, gestureState) => {
                let x = gestureState.dx;
                let y = gestureState.dy;
                if (Math.abs(x) > Math.abs(y)) {
                    if (x >= 0) {
                        this.props.onSwipePerformed('right')
                    } else {
                        this.props.onSwipePerformed('left')
                    }
                } else {
                    if (y >= 1) {
                        this.props.onSwipePerformed('down')
                    } else {
                        this.props.onSwipePerformed('up')
                    }
                }
                return true;
            },

            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },

        });
    };


    render() {
        return (
            <Animated.View {...this.PanResponder.panHandlers} style={this.props.gestureStyle}>
                <View>{this.props.children}</View>
            </Animated.View>
        )
    }
}

export default class SimulatedModal extends React.PureComponent {

    state = {
        animatedValue: new Animated.Value(0),
        visible: false,
        keyboardVisible: false,
        visibleHeight: 0
    }

    componentDidMount() {

        if (isAndroid()) {
            this.keyboardWillShowListener = Keyboard.addListener(
                'keyboardDidShow',
                () => this.setState({ keyboardVisible: true })
            )
            this.keyboardWillHideListener = Keyboard.addListener(
                'keyboardDidHide',
                () => this.setState({ keyboardVisible: false })
            )
        }
    }

    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove();
        }

        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove();
        }
    }


    open() {
        this.setState({ visible: true }, () => {
            this._show(true);
        })
    }

    close() {
        this._show(false, () => {
            this.setState({ visible: false })
        });
    }

    _show(show, onEnd) {
        Animated.timing(this.state.animatedValue, {
            toValue: show ? 1 : 0,
            duration: 250
        }).start(onEnd);
    }

    render() {

        const { animatedValue, visible } = this.state;
        const { height, children, hasFlatCorners, hidesDragView, setPosition = 'relative', fromBottom = 0 } = this.props;

        const backgroundColor = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', 'rgba(0,0,0,0.5)'],
            extrapolate: 'clamp'
        })

        const translateY = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [screenHeight, 0],
            extrapolate: 'clamp'
        })

        if (visible)
            return (
                <Animated.View
                    activeOpacity={1}
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        backgroundColor
                    }}>

                    <TouchableOpacity
                        onPress={this.close.bind(this)}
                        activeOpacity={1}
                        style={{ flex: this.state.keyboardVisible ? 0 : 1 }}>

                        <View style={{
                            flex: 1
                        }} />
                    </TouchableOpacity>

                    <Animated.View
                        onLayout={(event) => {
                            this.state.visibleHeight = event.nativeEvent.layout.height;
                        }}
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopLeftRadius: !hasFlatCorners ? 10 : 0,
                            borderTopRightRadius: !hasFlatCorners ? 10 : 0,
                            backgroundColor: 'white',
                            height,
                            position: String(setPosition),
                            bottom: Number(fromBottom),
                            zIndex: 200,
                            transform: [{
                                translateY
                            }]
                        }}>
                        <SwipeGesture
                            gestureStyle={{
                                width: '100%',
                                height: hidesDragView ? 0 : 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:"white",
                                borderRadius : 16
                            }}
                            onSwipePerformed={(action, y) => {
                                if (y) {
                                    this.state.animatedValue.setValue(1 - y / this.state.visibleHeight)
                                }

                                if (action === 'down' && !y)
                                    this.close();
                            }}>
                            <View style={{
                                backgroundColor: hidesDragView ? '#FFFFFF' : Colors.disabled,
                                width: 32,
                                height: 4,
                                borderRadius: 2
                            }} />
                        </SwipeGesture>
                        {children}
                    </Animated.View>
                </Animated.View>
            )

        return <View />
    }

}
