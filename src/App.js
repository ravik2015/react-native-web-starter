import React from "react";
import { connect } from "react-redux";
import { View, Text, Animated, StyleSheet, StatusBar } from "react-native";
import { exampleAction } from "./redux/actions/exampleAction";

export class App extends React.Component {
    constructor(props) {
        super(props);

        this.imageAnimation = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.imageAnimation, {
                toValue: 1,
                duration: 1005
            })
        ).start();

        StatusBar.setBarStyle("light-content");
    }

    Home = rotationStyle => {
        return (
            <View style={{ alignItems: "center", flex: 3 }}>
                <Link to={"/one"} component={TouchableOpacity}>
                    <Text style={styles.appIntro}>To get started, edit src/App.js and save to reload.</Text>
                </Link>
            </View>
        );
    };

    render() {
        const rotationStyle = {
            transform: [
                {
                    rotate: this.imageAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "360deg"]
                    })
                }
            ]
        };

        return (
            <View style={styles.app}>
                <View style={styles.appHeader}>
                    <Animated.Image
                        style={[styles.headerImage, rotationStyle]}
                        resizeMode={"contain"}
                        source={require("./assets/react-logo.png")}
                    />
                    <Text style={styles.appTitle}>Welcome to React Native Web️</Text>
                </View>
                <Text>Redux edition</Text>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    example: state.example
});

const bindActions = dispatch => ({
    exampleAction: () => dispatch(exampleAction())
});

export default connect(mapStateToProps, bindActions)(App);

const styles = StyleSheet.create({
    app: {
        flex: 1
    },
    appHeader: {
        flex: 1,
        backgroundColor: "#222",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    headerImage: {
        width: 200,
        height: 200,
        flex: 3
    },
    appTitle: {
        flex: 1,
        fontSize: 16,
        color: "white"
    },
    appIntro: {
        flex: 3,
        fontSize: 30,
        textAlign: "center"
    }
});
