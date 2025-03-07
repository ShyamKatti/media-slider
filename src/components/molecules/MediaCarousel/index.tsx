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


import React, {FC, useState, useRef, MutableRefObject, useEffect} from 'react';
import {View, useWindowDimensions, ScrollView, Pressable, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import ImageSlide from "../../atoms/ImageSlide";
import ProgressBar from "../../atoms/ProgressBar";

interface MediaCollectionProps {
    uri: string;
    type: string;
    slideIndex?: number;
}

interface MediaCarouselProps {
    assets: MediaCollectionProps[];
    onMediaSliderCompleteCb?: Function;
}

interface CarouselSliderProps {
    sliderRefs: MutableRefObject<any>[];
    containerWidth: number;
    onSliderCompleteCb?: (index?: number) => void;
}

interface ProgressBarRefProps {
    clearAnimation: () => void;
    markComplete: () => void;
    startAnimation: () => void;
}

const CarouselSliders: FC<CarouselSliderProps> = ({
                                                      sliderRefs,
                                                      containerWidth,
                                                      onSliderCompleteCb,
                                                  }) => {
    const sliderWidth = Math.floor(containerWidth / sliderRefs.length);

    return (
        <View style={{
            flexDirection: "row",
        }}>
            {
                sliderRefs.map((currRef: MutableRefObject<any>, index: number) => {
                    return (
                        <ProgressBar
                            autoStart={ index === 0}
                            key={index}
                            ref={currRef}
                            sliderIndex={index}
                            onCompleteCb={onSliderCompleteCb}
                            containerOverrides={{
                                width: sliderWidth - 20
                            }}
                        />
                    )
                })
            }
        </View>
    )
}

const MediaSlide: FC<MediaCollectionProps> = (
    {uri, type, slideIndex}) => {

    if (type === "image") {
        return (
            <View style={{flex: 1}}>
                <ImageSlide uri={uri} />
            </View>
        )
    } else {
        return null; // Return null for unsupported types
    }
}

const MediaCarousel: FC<MediaCarouselProps> = (
    {assets, onMediaSliderCompleteCb}) => {

    // FIX: Use useRef for the refs array, not useState
    const sliderRefs = useRef<MutableRefObject<ProgressBarRefProps | null>[]>(
        Array.from({ length: assets.length }, () => React.createRef<ProgressBarRefProps>())
    ).current;

    const [currentSliderPos, setCurrentSliderPos] = useState(0);
    const listRef = useRef<FlashList<MediaCollectionProps>>(null);
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    const [slideOffsets, setSlideOffsets] = useState<Record<number, number>>({});

    const onRenderItemFn = ({item, index}: {item: MediaCollectionProps, index: number}) => {
        return <MediaSlide
            uri={item.uri} type={item.type}
            key={index} slideIndex={index}
        />
    }

    const loadSlideOffsets = () => {
        let holder: { [key: number]: number } = {};
        assets.forEach((_, index) => {
            holder[screenWidth * index] = index;
        });
        setSlideOffsets(holder);
    }

    const _handleScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (slideOffsets.hasOwnProperty(event.nativeEvent.contentOffset.x)) {
            const scrollCurrSlide: number = slideOffsets[event.nativeEvent.contentOffset.x]
            if (scrollCurrSlide < currentSliderPos) {
                sliderRefs[currentSliderPos]?.current?.clearAnimation();
            } else if (scrollCurrSlide > currentSliderPos) {
                sliderRefs[currentSliderPos]?.current?.markComplete();
            }
            setCurrentSliderPos(scrollCurrSlide);
        }
    }

    useEffect(() => {
        sliderRefs[currentSliderPos]?.current?.startAnimation();
        listRef.current?.scrollToIndex({
            animated: true,
            index: currentSliderPos
        });
    }, [currentSliderPos]);

    const onSliderRenderCompleteCb = (sliderPosition?: number) => {
        if (sliderPosition !== undefined && sliderPosition < sliderRefs.length - 1) {
            setCurrentSliderPos((prevState) => prevState + 1);
        }

        if (currentSliderPos === assets.length - 1) {
            if (onMediaSliderCompleteCb) {
                onMediaSliderCompleteCb()
            }
        }
    }

    useEffect(() => {
        if (assets && assets.length > 0) {
            loadSlideOffsets();
        }
    }, [assets]);

    return (
        <ScrollView style={{
            width: screenWidth,
            height: screenHeight
        }}>
            <CarouselSliders
                sliderRefs={sliderRefs}
                containerWidth={screenWidth}
                onSliderCompleteCb={onSliderRenderCompleteCb}
            />
            <FlashList data={assets}
                       renderItem={onRenderItemFn}
                       estimatedItemSize={10}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       showsVerticalScrollIndicator={false}
                       initialScrollIndex={0}
                       snapToAlignment={"end"}
                       snapToInterval={screenWidth}
                       decelerationRate={"fast"}
                       onScroll={_handleScrollEvent}
                       ref={listRef}
            />
        </ScrollView>
    )
}

export default MediaCarousel;