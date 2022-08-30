import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import type { ImageProgressPropsType, ImageProgressStateType } from './ImageProgressType';
import type { OnProgressEvent, OnLoadEvent, ImageStyle } from 'react-native-fast-image';
import styleSheet from './ImageProgressStyle';
import { getSourceKey } from './ImageProgressUtil';

const DefaultIndicator = ActivityIndicator;

export default function withImageProgress<T>(ImageComponent: React.ComponentType<T>) {
  class ImageProgress extends Component<ImageProgressPropsType, ImageProgressStateType> {
    static prefetch = Image.prefetch;

    static getSize = Image.getSize;
    thresholdTimer?: number;

    static defaultProps = {
      threshold: 50
    };

    static getDerivedStateFromProps(props: ImageProgressPropsType, state: ImageProgressStateType) {
      const sourceKey = getSourceKey(props.source);
      if (sourceKey !== state.sourceKey) {
        return {
          sourceKey,
          error: null,
          loading: false,
          progress: 0
        };
      }
      return null;
    }

    ref = null;

    constructor(props: ImageProgressPropsType) {
      super(props);
      this.state = {
        sourceKey: getSourceKey(props.source),
        error: null,
        loading: false,
        progress: 0,
        thresholdReached: !props.threshold
      };
    }

    componentDidMount() {
      const { threshold } = this.props;
      if (threshold) {
        this.thresholdTimer = setTimeout(() => {
          this.setState({ thresholdReached: true });
          this.thresholdTimer = undefined;
        }, threshold);
      }
    }

    componentWillUnmount() {
      if (this.thresholdTimer) {
        clearTimeout(this.thresholdTimer);
      }
    }

    //@ts-ignore
    setNativeProps(nativeProps) {
      if (this.ref) {
        //@ts-ignore
        this.ref.setNativeProps(nativeProps);
      }
    }

    //@ts-ignore
    handleRef = (ref) => {
      this.ref = ref;
    };

    handleLoadStart = () => {
      const { loading, progress } = this.state;
      if (!loading && progress !== 1) {
        this.setState({
          error: null,
          loading: true,
          progress: 0
        });
      }
      this.bubbleEvent('onLoadStart');
      this.bubbleEvent('onLoading', true);
    };

    handleProgress = (event: OnProgressEvent) => {
      const { progress } = this.state;
      const localProgress: number = event.nativeEvent.loaded / event.nativeEvent.total;
      if (localProgress !== progress && progress !== 1) {
        this.setState({
          loading: localProgress < 1,
          progress: localProgress
        });
      }
      this.bubbleEvent('onProgress', event);
      this.bubbleEvent('onLoading', localProgress < 1);
    };

    handleError = (event: unknown) => {
      this.setState({
        loading: false,
        //@ts-ignore
        error: event.nativeEvent
      });
      this.bubbleEvent('onError', event);
      this.bubbleEvent('onLoading', false);
    };

    handleLoad = (event: OnLoadEvent) => {
      const { progress } = this.state;
      if (progress !== 1) {
        this.setState({
          error: null,
          loading: false,
          progress: 1
        });
      }
      this.bubbleEvent('onLoad', event);
      this.bubbleEvent('onLoading', false);
    };

    handleLoadEnd = () => {
      this.setState({
        loading: false,
        progress: 1
      });
      this.bubbleEvent('onLoadEnd', undefined);
      this.bubbleEvent('onLoading', false);
    };

    //@ts-ignore
    measure(cb) {
      if (this.ref) {
        //@ts-ignore
        this.ref.measure(cb);
      }
    }

    bubbleEvent(propertyName: string, event?: boolean | unknown | OnLoadEvent | OnProgressEvent) {
      //@ts-ignore
      if (typeof this.props[propertyName] === 'function') {
        //@ts-ignore
        this.props[propertyName](event);
      }
    }

    render() {
      const {
        children,
        errorContainerStyle,
        indicator,
        indicatorContainerStyle,
        indicatorProps,
        renderError,
        renderIndicator,
        source,
        style,
        imageStyle,
        ...props
      } = this.props;

      if (!source || !source.uri) {
        // This is not a networked asset so fallback to regular image
        return (
          <View style={style} ref={this.handleRef}>
            {/*@ts-ignore*/}
            <ImageComponent
              {...props}
              source={source}
              style={StyleSheet.flatten<ImageStyle>([StyleSheet.absoluteFill, imageStyle])}
            />
            {children}
          </View>
        );
      }
      const { progress, sourceKey, thresholdReached, loading, error } = this.state;

      let indicatorElement;

      if (error) {
        if (renderError) {
          indicatorElement = (
            <View style={StyleSheet.flatten([styleSheet.centered, errorContainerStyle])}>{renderError(error)}</View>
          );
        }
      } else if ((loading || progress < 1) && thresholdReached) {
        if (renderIndicator) {
          indicatorElement = renderIndicator(progress, !loading || !progress);
        } else {
          const IndicatorComponent = typeof indicator === 'function' ? indicator : DefaultIndicator;
          indicatorElement = (
            //@ts-ignore
            <IndicatorComponent progress={progress} indeterminate={!loading || !progress} {...indicatorProps} />
          );
        }
        indicatorElement = (
          <View style={StyleSheet.flatten([styleSheet.centered, indicatorContainerStyle])}>{indicatorElement}</View>
        );
      }

      return (
        <View style={style} ref={this.handleRef}>
          {/*@ts-ignore*/}
          <ImageComponent
            {...props}
            key={sourceKey}
            source={source}
            style={StyleSheet.flatten<ImageStyle>([StyleSheet.absoluteFill, imageStyle])}
            onLoadStart={this.handleLoadStart}
            onProgress={this.handleProgress}
            onError={this.handleError}
            onLoad={this.handleLoad}
            onLoadEnd={this.handleLoadEnd}
          />
          {indicatorElement}
          {children}
        </View>
      );
    }
  }

  return ImageProgress;
}
