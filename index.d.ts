import React from 'react';

declare module 'react-native-swipeout' {
    export interface SwipeoutButtonProperties {
        backgroundColor?: string;
        color?: string;
        component?: React.Element;
        onPress?(): void;
        text?: string;
        type?: "default", "delete", "primary", "secondary";
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
        scroll?(): void;
        style?: Object;
        sensitivity?: number;
        buttonWidth?: number;
    }

    export default class Swipeout extends React.Compoennt<SwipeoutProperties,any> {}
}
