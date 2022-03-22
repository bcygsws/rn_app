/**
 *
 * @ 电影列表的详情页
 *
 *
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ActivityIndicator,
	ScrollView,
	StyleSheet
} from 'react-native';
import details from '../../data/details.json';
// 导入时间格式化模块
import '../../utils/date.js';
// 定时器
var timer1;
// 详情页数据
export default class MovieItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.id,
			// 当前详情信息
			info: {},
			// 控制加载动画
			isloading: true
		};
	}

	// 生命周期钩子中从后台请求详情数据
	// 进入详情页，组件是重新创建的，当前钩子必定执行，完成渲染就可以了
	componentWillMount() {
		// 	fetch(`https://movie.douban.com/j/search_subjects/${this.state.id}`)
		// 		.then((response) => {
		// 			response.json();
		// 		})
		// 		.then((res) => {
		// 			console.log(res);
		// 			this.state = {
		// 				isLoading: false,
		// 				info: res.info
		// 			};
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// 用定时器模拟异步请求过程-数据接口请求有次数限制
		timer1 = setTimeout(() => {
			console.log(this);
			this.setState(
				{
					info: details.info,
					isloading: false
				},
				function () {
					console.log(this.state.info);
				}
			);
		}, 1000);
	}

	// react-native-router-flux中编程式导航传递的参数获取：
	/**
	 *
	 * @ 传递 Actions.movieitem({id:item.id})
	 * 接收：当前组件的this.props.id 而在react-router-dom中将是this.props.match.params.id
	 */
	render() {
		console.log(this);
		console.log(this.props.id);
		return <View>{this.showAnimationOrDetail()}</View>;
	}

	// 控制进入【详情页】加载动画和详情页的切换
	// 时间格式化：已经绑定在React.component.prototype.dateFormat原型上，this实例就可以直接调用，这是原型链的应用
	// emsp;一个中文宽度，ensp;半个中文宽度；nbsp;普通的英文半角空格但不换行
	// parseInt(undefined)=NaN
	showAnimationOrDetail = () => {
		if (this.state.isloading) {
			return (
				<View style={styles.ind_container}>
					<ActivityIndicator size="large" color="#0079FF" />
				</View>
			);
		}
		return (
			<View style={styles.mov_container}>
				<ScrollView style={styles.scroll}>
					<View style={styles.container}>
						<Text style={styles.movie_title}>
							{this.state.info.title}
						</Text>
						<View style={styles.box}>
							<View style={styles.l_box}>
								<Text style={styles.txt}>
									上映时间：
									{new Date(
										parseInt(this.state.info.playedAt) || 0
									).format('yyyy/MM/dd hh:mm:ss')}
								</Text>
								<Text style={styles.txt}>
									播放类型：
									{this.state.info.playable
										? '免费观看'
										: '会员专享'}
								</Text>
							</View>
							<View style={styles.r_box}>
								<Text style={styles.txt}>
									最新更新：
									{this.state.info.is_new ? '是' : '否'}
								</Text>
								<Text style={styles.txt}>
									电影评分：{this.state.info.rate}分
								</Text>
							</View>
						</View>
						<Image
							source={{ uri: this.state.info.cover }}
							style={styles.ig}
						></Image>
						<View style={styles.des_box}>
							<Text style={styles.des}>
								&emsp;&emsp; 剧情梗概：
								{this.state.info.description}
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	};
	componentWillUnmount() {
		clearTimeout(timer1);
	}
}
const styles = StyleSheet.create({
	mov_container: {
		width: '100%',
		height: '100%'
	},
	scroll: {
		flex: 1
	},
	container: {
		// height: 1000,
		// backgroundColor: 'orange'
		width: '100%',
		flexDirection: 'column',
		padding: 10,
		alignItems: 'center'
	},
	movie_title: {
		fontSize: 22,
		fontWeight: '700'
	},
	box: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	l_box: {
		flex: 1
	},
	r_box: {
		flex: 0.5
	},
	txt: {
		fontSize: 14,
		lineHeight: 20
	},
	ig: {
		width: '60%',
		height: 270,
		marginBottom: 10
	},
	des_box: {
		width: '100%'
	},
	des: {
		// 电影详情文本，每部电影给出的描述文案有长有短，为此应该设置一个最小高度，
		// 而不是具体的高度值，这样当文本高度大于100,根据自身高度自适应
		// height: 300, // 不推荐设定具体高度值
		minHeight: 100,
		fontSize: 14,
		lineHeight: 24
		// 多行文本的总高度
		// 多行中每一行的行高
	},
	ind_container: {
		// 加载动画样式
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'center'
	}
});
