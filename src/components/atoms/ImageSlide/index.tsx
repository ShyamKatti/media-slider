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

import {FC, useState} from 'react';
import {View, Image, StyleProp, ViewStyle, ImageStyle, ActivityIndicator, Text} from 'react-native';
import styles from "./ImageSlide.styles";


interface ImageSlideProps {
    uri: string;
    containerStyleOverrides?: StyleProp<ViewStyle>;
    imageStyleOverrides?: StyleProp<ImageStyle>;
}

const ImageSlide: FC<ImageSlideProps> = ({
        uri, containerStyleOverrides,
        imageStyleOverrides}) => {

    return (
        <View
            style={[styles.containerDefaults, containerStyleOverrides]}
        >
            <Image
                source={{uri: uri}}
                style={[styles.imageDefaults, imageStyleOverrides]}
                accessible={true}
                accessibilityRole={"image"}
                resizeMode={"cover"}
            />
        </View>
    );
}

export default ImageSlide;