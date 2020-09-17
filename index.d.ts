import * as React from 'react';

declare module 'react-native-swipeout' {
    export interface SwipeoutButtonProperties {
        backgroundColor?: string;
        color?: string;
        component?: JSX.Element;
        onPress?(): void;
        text?: React.ReactNode;
        type?: 'default'|'delete'|'primary'|'secondary';
        underlayColor?: string;
        disabled?: boolean;
    }

    export interface SwipeoutProperties {
        autoClose?: boolean;
        backgroundColor?: string;
        close?: boolean;
        disabled?: boolean;
        left?: SwipeoutButtonProperties[];
        onOpen?(sectionId: number, rowId: number, direction: string): void;
        onClose?(sectionId: number, rowId: number, direction: string): void;
        right?: SwipeoutButtonProperties[];
        scroll?(scrollEnabled: boolean): void;
        style?: Object;
        sensitivity?: number;
        buttonWidth?: number;
        rowID?: number;
        sectionId?: number;
        openRight?: boolean;
        openLeft?: boolean;
    }

    export default class Swipeout extends React.Component<SwipeoutProperties,any> {}
}
