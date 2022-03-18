import React, { Component } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView
} from 'react-native';
// 导入电影列表数据,json格式数据导入其他js文件，就是一个对象了，无需再使用JSON.parse()
import movies from '../../data/movies.json';
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
					<ActivityIndicator size="large" color="#0079FF" />
				</View>
			);
		} else {
			return (
				<SafeAreaView style={styles.safeArea}>
					<ScrollView style={styles.scroll}>
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
		 * 上述接口图片加载不出来，遂使用：
		 * https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=200&page_start=0
		 * 有下载次数限次，使用postman拿到数据后，转为本地
		 *
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
					// movies: JSON.parse(movies).subjects // json格式数据导入其他js文件，已经是对象，无需使用JSON.parse()方法再处理
					movies: movies.subjects
				},
				function () {
					console.log(this.state.movies);
				}
			);
		}, 1000);
	};
}
// 测试发现：flex:1套在最外层盒子上，是有效果的，不要在其子组件或孙子组件再次使用flex:1,而是应该使用height百分比
const styles = StyleSheet.create({
	container: {
		width: '100%',
		// flex: 1,
		height: '100%',
		justifyContent: 'center'
	},
	safeArea: {
		width: '100%',
		/* 测试时尽量用实际高度代替flex，flex很多时候是失灵的 */
		// flex: 1, // ScrollView不显示
		// height: 500,// ……显示
		height: '100%'
	},
	scroll: {
		paddingHorizontal: 10
	}
});
