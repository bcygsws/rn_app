// 注意：在RN中组件名称后缀名不要使用jsx，会报错，使用.js后缀
import React, { Component } from 'react';
import { View, Text } from 'react-native';
export default class MyHomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View>
				<Text>这是我自己设置的主页</Text>
			</View>
		);
	}
}
