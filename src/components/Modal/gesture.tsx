import React, { memo } from 'react';
import { PanGestureHandler, PanGestureHandlerProps, gestureHandlerRootHOC } from 'react-native-gesture-handler';

const GestureHandler = gestureHandlerRootHOC(
  ( { children, onGestureEvent } : PanGestureHandlerProps ) => (
    <PanGestureHandler onGestureEvent={onGestureEvent}>{children}</PanGestureHandler>
  ),
);

export default memo( GestureHandler );
