import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class ShopView extends Component<{}> {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				<Text>这是shopping cart组件</Text>
			</View>
		);
	}
}
