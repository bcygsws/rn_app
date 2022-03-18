import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
export default class MovieItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.ig} source={{ uri: this.props.cover }} />
				<View style={styles.box}>
					<Text>
						<Text style={styles.s_txt}>电影名称：</Text>
						{this.props.title}
					</Text>
					<Text>
						<Text style={styles.s_txt}>播放类型：</Text>
						{this.props.playable ? '免费观看' : '会员专属'}
					</Text>
					<Text>
						<Text style={styles.s_txt}>最新上映：</Text>
						{this.props.is_new ? '是' : '否'}
					</Text>
					<Text>
						<Text style={styles.s_txt}>电影评分:</Text>
						{this.props.rate}分
					</Text>
				</View>
				{/* 渲染分割线，使用FlatList的ItemSeparatorComponent */}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 160,
		flexDirection: 'row',
		paddingVertical: 10
	},
	ig: {
		width: 100,
		height: 140,
		resizeMode: 'cover'
	},
	box: {
		flex: 1,
		paddingLeft: 10
	},
	s_txt: {
		/* fontWeight直接写数字，将报错，这个特殊，宽高可以直接写个数字，字体粗细必须使用字符串的'700' */
		fontWeight: '700'
	}
});
