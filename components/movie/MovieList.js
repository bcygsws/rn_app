import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	Image,
	Text
} from 'react-native';
// 导入电影列表数据,json格式数据导入其他js文件，就是一个对象了，无需再使用JSON.parse()
import movies from '../../data/movies.json';
export default class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// 每页的容量
			pageSize: 10,
			// 默认的开始检索的索引值，从0开始。和豆瓣不同的是，下拉刷新通过增加渲染的每页数据条数limit来控制
			start: 0,
			// 当前所在页
			curPage: 1,
			// 总页数应该从后台获取，此处为了方便将其设置为20=200/10
			totalPage: 20,
			// 加载前动画是否显示
			isLoading: true,
			// 电影信息列表
			movies: []
		};
	}
	render() {
		return <View>{this.showAnimationOrList()}</View>;
	}
	// 1.FlatList 的renderItem函数，用于渲染列表项，它必须传入一个对象包裹的参数：{item}，将data中传入的对象数据解构出来
	// 2.FlatList 继承ScrollView所有的属性，如果嵌套在其他同滚动方向的FlatList中则无效
	renderItem = ({ item }) => {
		return (
			<View style={styles.item_container}>
				<Image style={styles.item_ig} source={{ uri: item.cover }} />
				<View style={styles.item_box}>
					<Text>
						<Text style={styles.item_txt}>电影名称：</Text>
						{item.title}
					</Text>
					<Text>
						<Text style={styles.item_txt}>播放类型：</Text>
						{item.playable ? '免费观看' : '会员专属'}
					</Text>
					<Text>
						<Text style={styles.item_txt}>最新上映：</Text>
						{item.is_new ? '是' : '否'}
					</Text>
					<Text>
						<Text style={styles.item_txt}>电影评分:</Text>
						{item.rate}分
					</Text>
				</View>
				{/* 渲染分割线，使用FlatList的ItemSeparatorComponent */}
			</View>
		);
	};
	// 渲染列表边框
	renderSeparator = () => {
		return (
			<View
				style={{
					borderColor: '#ccc',
					borderTopWidth: 1
				}}
			></View>
		);
	};
	// 控制显示加载动画，数据请求到了，显示数据
	showAnimationOrList = () => {
		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="#0079FF" />
				</View>
			);
		} else {
			// return (
			// 	<SafeAreaView style={styles.safeArea}>
			// 		{/* 	<ScrollView style={styles.scroll}> */}
			// 		<FlatList
			// 			data={this.state.movies}
			// 			renderItem={this.renderItem}
			// 			keyExtractor={(item) => item.id}
			// 			ItemSeparatorComponent={this.renderSeparator}
			// 			onEndReachedThreshold={0.5}
			// 			onEndReached={this.reachedHandle}
			// 			style={styles.list}
			// 		></FlatList>
			// 		{/* 	</ScrollView> */}
			// 	</SafeAreaView>
			// );
			return (
				<FlatList
					data={this.state.movies}
					renderItem={this.renderItem}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={this.renderSeparator}
					onEndReachedThreshold={0.5}
					onEndReached={this.reachedHandle}
					style={styles.list}
				></FlatList>
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
		 */
		this.getList();
	}
	getList = () => {
		// 每次加载10条，控制curPage的数值，来实现下拉刷新
		// let start = (this.state.curPage-1) * this.state.pageSize;
		// fetch(
		// 	`https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=${this.state.pageSize}&page_start=start`
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
		// 				movies: res.subject
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
		let start = (this.state.curPage - 1) * this.state.pageSize;
		let end = this.state.curPage * this.state.pageSize;
		setTimeout(() => {
			this.setState(
				{
					isLoading: false,
					// movies: JSON.parse(movies).subjects
					// 1.json格式数据导入其他js文件，已经是对象，无需使用JSON.parse()方法再处理
					// 2.初始渲染时，[].concat(第一次请求拿到的数据)。上拉加载时this.state.movies是上一次的movies数组值，和新拿到的数组内容合并
					movies: this.state.movies.concat(
						movies.subjects.slice(start, end)
					)
				},
				function () {
					console.log(this.state.movies); // 在setState的回调中打印最新的movies数组的值
				}
			);
		}, 1000);
	};
	reachedHandle = () => {
		console.log('执行了吗？');
		// 页码变化前，有一个判断，是否是最后一页了，没有可加载的页了，19页的时候，20>20,为false。后面的代码可以继续执行
		if (this.state.curPage + 1 > this.state.totalPage) return;
		this.setState({ curPage: this.state.curPage + 1 }, function () {
			console.log('执行了吗2？');
			this.getList();
		});
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
	// safeArea: {
	// 	width: '100%',
	// 	/* 测试时尽量用实际高度代替flex，flex很多时候是失灵的 */
	// 	// flex: 1, // ScrollView不显示
	// 	// height: 500,// ……显示
	// 	height: '100%'
	// },
	// scroll: {
	// 	paddingHorizontal: 10
	// },
	list: {
		width: '100%',
		paddingHorizontal: 10
		// height: '100%'
		// backgroundColor: '#ee2322'
	},
	item_container: {
		width: '100%',
		height: 140,
		flexDirection: 'row',
		paddingVertical: 10
	},
	item_ig: {
		width: 90,
		height: 120,
		resizeMode: 'cover'
	},
	item_box: {
		flex: 1,
		flexDirection: 'column',
		/* justifyContent是控制主轴方向，垂直方向的排列情况 */
		justifyContent: 'center',
		paddingLeft: 10
	},
	item_txt: {
		/* fontWeight直接写数字，将报错，这个特殊，宽高可以直接写个数字，字体粗细必须使用字符串的'700' */
		fontWeight: '700',
		marginTop: 10,
		marginBottom: 10,
		height: 24,
		lineHeight: 24
	}
});
/**
 *
 * 1.	flex:1，撑满高度，在最外层盒子有效，flex=1不起作用，可以换height:100%
 * @ 两种布局
 * <SafeAreaView>
 *   <ScrollView></ScrollView>
 * </SafeAreaView>
 *
 *
 * 2. FlatList兼有ScrollView的超过高度，出现滚动条的工鞥能
 * <SafeAreaView>
 *   <FlatList></FlatList>
 * </SafeAreaView>
 *
 *
 * 3. onEndReachedThreshold={0.5} 距离内容高度底部中央时，触发onEndReached()事件
 * 用它来控制下拉刷新
 *
 *
 *
 */
