import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class MeView extends Component<{}> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				<Text>这是Me组件</Text>
			</View>
		);
	}
}
