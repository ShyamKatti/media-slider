/**
 * Copyright (C) 2025 Shyam Katti
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


import { useImperativeHandle, useRef, useEffect, useState, forwardRef } from "react";
import { Animated, View, Easing, StyleSheet, ViewStyle } from "react-native";
import constants from "../../../utils/constants";
import styles from "./ProgressBar.styles";


interface ProgressBarProps {
    containerOverrides?: ViewStyle;
    autoStart?: boolean;
    onStartCb?: (index: number) => void;
    onCompleteCb?: (index: number) => void;
    sliderIndex: number;
    onPressCb?: (index?: number) => void;
}

interface ProgressBarRefProps {
    startAnimation: () => void;
    pauseAnimation: () => void;
    resetAnimation: () => void;
    clearAnimation: () => void;
    markComplete: () => void;
}

const NOOP: () => void = () => {};

const ProgressBar = forwardRef<ProgressBarRefProps, ProgressBarProps>(
    (props , ref) => {
    const animValue = useRef(new Animated.Value(0));
    const [progressBgColor, setProgressBgColor] = useState(constants.colors.sliderBgColor);
    const [duration, _] = useState(constants.videoConstants.defaultDuration);


    const _startAnimation = () => {
        animValue.current.setValue(0);
        setProgressBgColor(constants.colors.sliderBgColor);
        Animated.timing(animValue.current, {
            toValue: 10,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear
        }).start((animCb) => {
            if (animCb.finished) {
                if (props.onCompleteCb) {
                    props.onCompleteCb(props.sliderIndex);
                }
            }
        })
    }

    useImperativeHandle(ref, () => ({
        startAnimation: () => {
            _startAnimation();
        },
        pauseAnimation: () => {
            animValue.current.stopAnimation();
        },
        resetAnimation: () => {
            _startAnimation();
        },
        clearAnimation: () => {
            animValue.current.setValue(0);
        },
        markComplete: () => {
            animValue.current.setValue(10);
        }
    }));

    const onPressCb = () => {
        if (props.onPressCb) {
            props.onPressCb(props.sliderIndex);
        }
    }

    useEffect(() => {
        props.autoStart ? _startAnimation() : NOOP();
    }, [props.autoStart]);

    const scaleX = animValue.current.interpolate({
        inputRange: [0, 10],
        outputRange: [0, 1],
        extrapolate: "clamp"
    });

    return(
        <View style={[styles.defaultContainer, props.containerOverrides]}>
            <Animated.View style={
                ([StyleSheet.absoluteFill, {
                    backgroundColor: progressBgColor,
                    transform: [{ scaleX }],
                    transformOrigin: "left",
                    borderRadius: 10}])
            }></Animated.View>
        </View>
    )
});

export default ProgressBar;
