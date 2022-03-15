import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class HomeView extends Component<{}> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				<Text>这是Home组件</Text>
			</View>
		);
	}
}
