import React, { Component } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView
} from 'react-native';
// 导入电影列表数据
import movies from '../../data/movies';
import MovieItem from './MovieItem.js';
export default class MovieList extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			// 每页的容量
			pageSize: 10,
			// 默认的开始检索的索引值，从0开始。和豆瓣不同的是，下拉刷新通过增加渲染的每页数据条数limit来控制
			skip: 0,
			// 当前所在页
			curPage: 1,
			// 加载前动画是否显示
			isLoading: true,
			// 电影信息列表
			movies: []
		};
	}
	render() {
		return <View>{this.showAnimationOrList()}</View>;
	}
	// 控制显示加载动画，数据请求到了，显示数据
	showAnimationOrList = () => {
		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#00ff00" />
				</View>
			);
		} else {
			return (
				<SafeAreaView style={styles.safeArea}>
					<ScrollView
						style={styles.scroll}
						contentContainerStyle={styles.contentContainer}
					>
						{this.state.movies.map((item, index) => {
							return (
								<MovieItem key={index} {...item}></MovieItem>
							);
						})}
					</ScrollView>
				</SafeAreaView>
			);
		}
	};
	componentWillMount() {
		/**
		 *
		 * @ 电影列表数据接口
		 * https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn
		 *
		 */
		this.getList();
	}
	getList = () => {
		// let limit = this.state.curPage * this.state.pageSize;
		// fetch(
		// 	'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn'
		// )
		// 	.then((response) => {
		// 		console.log(response);
		// 		response.json();
		// 	})
		// 	.then((res) => {
		// 		console.log(res);
		// 		this.setState(
		// 			{
		// 				isLoading: false,
		// 				movies: res
		// 			},
		// 			function () {
		// 				console.log(this.state.movies);
		// 			}
		// 		);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});

		// 请求数据报警告：Promise Rejection (id: 0):TypeError: Network request failed
		// 使用本地数据和定时器模拟请求后台数据这一异步过程
		setTimeout(() => {
			this.setState(
				{
					isLoading: false,
					movies: movies
				},
				function () {
					console.log(this.state.movies);
				}
			);
		}, 2000);
	};
}
// 测试发现：flex:1套在最外层盒子上，是有效果的，不要在其子组件或孙子组件再次使用flex:1,而是应该使用height百分比
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	safeArea: {
		width: '100%',
		/* 测试时尽量用实际高度代替flex，flex很多时候是失灵的 */
		// flex: 1, // ScrollView不显示
		// height: 500,// ……显示
		height: '100%',
		backgroundColor: 'green'
	},
	scroll: {
		backgroundColor: 'pink',
		marginHorizontal: 10
	},
	contentContainer: {
		paddingBottom: 200
	}
});
