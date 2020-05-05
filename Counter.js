import React from 'react'
import {StyleSheet, Text, View, Button, Vibration} from 'react-native'
// import {Vibr} from 'expo'
import styles from './App'

export default class Counter extends React.Component {
    WORK = "work"
    WORK_SECS = 4
    BREAK = "break"
    BREAK_SECS = 2

    state = {
        currentSec: this.WORK_SECS,
        currentTimerType: this.WORK,
        workSecs: this.WORK_SECS,
        breakSecs: this.BREAK_SECS,
    }
    

    componentDidUpdate() {
        if (this.state.currentSec == 0) {
            clearInterval(this.startTimerInterval)
            this.completedTimer()
            this.toggleTimerType()
            this.startTimer()
        }
    }

    completedTimer = () => {
        console.log("HURRAYYYYY!!!!")
        Vibration.vibrate(200)
    }

    toggleTimerType = () => {
        if (this.state.currentTimerType == this.WORK) {
            this.setState({
                currentTimerType: this.BREAK,
                currentSec: this.state.breakSecs
            })
        } else {
            this.setState({
                currentTimerType: this.WORK,
                currentSec: this.state.workSecs
            })
        }
    }

    startTimer=() => {
        console.log("Start timer!")
        this.startTimerInterval = setInterval(() => this.setState((prevState) => ({
            currentSec: prevState.currentSec - 1
        })),1000);
        
    }

    resetTimer = () => {
        console.log("Reset!!!")
        clearInterval(this.startTimerInterval)
        this.setState({
            currentSec: this.state.currentTimerType === this.WORK ? this.state.workSecs : this.state.breakSecs
        })
    }

    render() {
        return(
            <View>
                <Text style={styless.timer}> {this.state.currentSec}</Text>
                <Text style={styless.timer}> {this.state.currentTimerType}</Text>

                <Button title="Start" onPress={this.startTimer}></Button>
                <Button title="Reset" onPress={this.resetTimer}></Button>
                <Button title="Change Type" onPress={this.toggleTimerType}></Button>

            </View>
        )
    }
}

const styless = StyleSheet.create({
    timer: {
        fontSize: 40,
    },
});
