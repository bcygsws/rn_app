/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform, // 用来提供平台检测的
	StyleSheet, // StyleSheet.create({样式})为当前组件书写样式，类样式写作className={styles.container}
	Text, // 文本布局
	Image, // 图片，接收本地、网络或者base64格式图片,网路图片必须指定宽高，否则不显示
	Button, // Button按钮必须声明title和onPress属性。title按钮名称，等于原生的value;onPress事件属性，声明点击后的js逻辑
	ActivityIndicator,
	FlatList,
	View, // 视图布局,用于元素的包裹
	ScrollView, // 如果一个页面相当长，不会像web那样自动会生成一个滚动条，需要该组件将需要滚动的元素放进去
	SafeAreaView,
	StatusBar
} from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu'
});
const Item = (title) => {
	return (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

// <{}>这是TS的语法
export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			DATA: [
				{
					id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
					title: 'First Item'
				},
				{
					id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
					title: 'Second Item'
				},
				{
					id: '58694a0f-3da1-471f-bd96-145571e29d72',
					title: 'Third Item'
				}
			]
		};
	}

	render() {
		const renderItem = (item) => {
			<Item title={item.title} />;
		};
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scro}
					horizontal={false}
					showsVerticalScrollIndicator={true}
				>
					<Text style={styles.welcome}>Welcome to React Native!</Text>
					<Text style={styles.instructions}>
						To get started, edit App.js
					</Text>
					<Text style={styles.instructions}>{instructions}</Text>
					{/* 本地图片可以正常显示出来 */}
					<Image
						source={require('./model.jpg')}
						style={{ width: '50%', height: '50%' }}
						resizeMode="cover"
					/>
					<Image
						source={require('./model.jpg')}
						style={{ width: '50%', height: '50%' }}
						resizeMode="cover"
					/>
					<Image
						source={require('./model.jpg')}
						style={{ width: '50%', height: '50%' }}
						resizeMode="cover"
					/>
					<Image
						source={require('./model.jpg')}
						style={{ width: '50%', height: '50%' }}
						resizeMode="cover"
					/>
					<Image
						source={require('./model.jpg')}
						style={{ width: '50%', height: '50%' }}
						resizeMode="cover"
					/>
					{/* 图片标签如果是网络图片，必须显式定义宽和高，否则图片无法显示,注意source中键是uri,不是url
      有时候，即时设置了宽高，网络图片也不显示 */}
					<Image
						style={styles.logo}
						source={{
							uri: 'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics0.baidu.com%2Ffeed%2F0b7b02087bf40ad1d4c82b6cd8ae17d5a8ecce9a.jpeg%3Ftoken%3Dd3be74b768bedfed9c6f1a71bd017ca0&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1647363600&t=cc19b37d569f9bf3c926d49b0383b24d'
						}}
					/>
					{/* Button按钮，必须声明title和onPress属性，onPress属性是点击后实现的某些逻辑*/}
					{/* <Button
						title="点击的按钮必须设置title"
						onPress={() => console.warn('123哈哈')}
					/> */}
					{/* 加载中……圆圈动画，size('small' 或 'large')和color */}
					{/* 列表组件，ListView也是一个列表组件，但是过失了；使用FlatList来表示列表 */}
					<FlatList
						data={this.state.DATA}
						extraData={this.state}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
					/>
					<ActivityIndicator
						size="large"
						color="#ee2324"
					></ActivityIndicator>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
// 文本值样式，必须加单引号
const styles = StyleSheet.create({
	container: {
		// paddingTop: StatusBar.currentHeight,
		flex: 1,
		// justifyContent: 'flex-start',
		alignItems: 'center',
		overflow: 'hidden'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
	logo: {
		width: 50,
		height: 50
		// resizeMode: 'cover'
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16
	},
	title: {
		fontSize: 32
	},
	scrollView: {
		width: '100%',
		backgroundColor: 'pink',
		flex: 1
	},
	scro: {
		// 设置一个上内边距，将滚动条挤压出来了
		// paddingVertical: 600
		paddingBottom: 1000
	}
});
/**
 * @ RN中创建组件的步骤
 * 1.导入react,组件创建和生命周期依赖包
 * 2.需要的标签组件按需引入，从react-native包
 * 3.导入StyleSheet,也是从react-native包中按需引入。为组件绑定类样式，const styles= StyleSheet.create({})
 * 4.使用react语法创建组件，标签组件只能使用RN提供的，不能使用网页中提供的标签
 *
 *
 *
 */
