import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default class MovieItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>这是MovieItem选项:{this.props.data[0].name}</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 100
	}
});
