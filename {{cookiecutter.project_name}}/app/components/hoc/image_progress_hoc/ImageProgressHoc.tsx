import React, { Component } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import styleSheet from './ImageProgressStyles';

import { getSourceKey } from './ImageProgressUtils';

import type { ImageProgressPropsType, ImageProgressStateType } from './ImageProgressTypes';
import type { OnProgressEvent, OnLoadEvent, ImageStyle } from 'react-native-fast-image';

const DefaultIndicator = ActivityIndicator;

/**
 * It takes an Image component and returns a new component that wraps the Image component and adds
 * progress indicators
 * @param ImageComponent - React.ComponentType<T>
 * @returns {React.ReactElement} A React Element.
 */
export default function withImageProgress<T>(ImageComponent: React.ComponentType<T>) {
  /**
   * The ImageProgress class is a React component that renders an image and an indicator while the
   * image is loading
   */
  class ImageProgress extends Component<ImageProgressPropsType, ImageProgressStateType> {
    /**
     * Prefetch an image.
     * @param {string} url - the url of the image to prefetch
     * @returns None
     */
    static prefetch = Image.prefetch;

    /* A static method that is being assigned to the static method of the Image component. */
    static getSize = Image.getSize;
    thresholdTimer?: number;

    /* Setting the default value of the threshold prop to 50. */
    static defaultProps = {
      threshold: 50
    };

    /**
     * A React lifecycle method that is called when the component is updated.
     * @param {ImageProgressPropsType} props - the new props for the component
     * @param {ImageProgressStateType} state - the new state for the component
     * @returns None
     */
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

    /**
     * The constructor function is a special function that is called when a new instance of the class
     * is created
     * @param {ImageProgressPropsType} props - ImageProgressPropsType
     */
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

    /**
     * If the threshold prop is defined, set a timer to set the thresholdReached state to true after
     * the threshold time has passed
     */
    componentDidMount() {
      const { threshold } = this.props;
      if (threshold) {
        this.thresholdTimer = setTimeout(() => {
          this.setState({ thresholdReached: true });
          this.thresholdTimer = undefined;
        }, threshold);
      }
    }

    /**
     * Clears the threshold timer if it exists.
     */
    componentWillUnmount() {
      if (this.thresholdTimer) {
        clearTimeout(this.thresholdTimer);
      }
    }

    /**
     * Set the native props of the underlying native component.
     * @param {object} nativeProps - the native props to set
     * @returns None
     */
    setNativeProps(nativeProps: any) {
      if (this.ref) {
        //@ts-ignore
        this.ref.setNativeProps(nativeProps);
      }
    }

    /**
     * Handles the ref of the element.
     * @param {React.RefObject} ref - the ref of the element.
     * @returns None
     */
    //@ts-ignore
    handleRef = (ref) => {
      this.ref = ref;
    };

    /**
     * Handles the load start event.
     * @returns None
     */
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

    /**
     * Handles the progress of the loading of the page.
     * @param {OnProgressEvent} event - the progress event.
     * @returns None
     */
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

    /**
     * Calls the measure function on the ref object.
     * @param {Function} cb - the callback function to call when the measurement is complete.
     * @returns None
     */
    measure(cb: any) {
      if (this.ref) {
        //@ts-ignore
        this.ref.measure(cb);
      }
    }

    /**
     * Bubble an event to the parent component.
     * @param {string} propertyName - the name of the property to bubble the event to.
     * @param {boolean | unknown | OnLoadEvent | OnProgressEvent} [event] - the event to bubble.
     * @returns None
     */
    bubbleEvent(propertyName: string, event?: boolean | unknown | OnLoadEvent | OnProgressEvent) {
      //@ts-ignore
      if (typeof this.props[propertyName] === 'function') {
        //@ts-ignore
        this.props[propertyName](event);
      }
    }

    /**
     * If there is no source, then render the image component with the source and style. If there is an
     * error, then render the error component. If there is a loading or progress less than 1 and
     * thresholdReached, then render the indicator component. If there is no error or loading, then
     * render the image component with the source and style
     */
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
