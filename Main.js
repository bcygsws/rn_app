// 注意：在RN中组件名称后缀名不要使用jsx，会报错，使用.js后缀
import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import App from './App';
export default class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Router sceneStyle={{ backgroundColor: '#fff' }}>
				<Stack key="root">
					{/* 注意：1.所有的路由规则都应该写在这里，
						2.第一个Scene就是首屏，key属性表示路由的规则名称，将来可以使用这个key进行编程式导航，key每个路由唯一 
						3.title属性，设置后，会在顶部生成一个导航条，导航条标题是title值。隐藏它，使用hideNavBar布尔值属性*/}
					<Scene
						key="app"
						component={App}
						title="这是App组件"
						hideNavBar={true}
					/>
				</Stack>
			</Router>
		);
	}
}
/**
 *
 * 插件react-native-router-flux的使用
 * 1.导入Router,相当于之前的Hash Router
 * 2.导入Stack，它是用来分组的，不表示具体的路由
 * 3.导入Scene表示一个具体的路由规则，类比之前的Route
 *
 */
