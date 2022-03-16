import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
export default class MovieList extends Component<{}> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				<Text>这是MovieList组件</Text>
			</View>
		);
	}
}
