/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import TabNavigator from 'react-native-tab-navigator';
import HomeView from './components/tabbar/Home.js';
import MeView from './components/tabbar/Me.js';
import SearchView from './components/tabbar/Search.js';
import ShopView from './components/tabbar/Shop.js';
// 按需导入FontAwesome.ttf库中的图片
import Icon from 'react-native-vector-icons/FontAwesome';
import {
	Platform, // 用来提供平台检测的
	StyleSheet, // StyleSheet.create({样式})为当前组件书写样式，类样式写作className={styles.container}
	View // 视图布局,用于元素的包裹
} from 'react-native';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu'
});
// <{}>这是TS的语法
export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			// 默认选中home
			selectedTab: 'home'
		};
	}

	render() {
		/**
		 * @ title属性：路由上的文本
		 * badgeText:徽标上的数字
		 * 
		 * RN中使用字体图标：
		 * 1.安装包react-native-vector-icons后，注意：安装包后可能会更改库中的blacklist.js文件中正则的表达式，
		 * a.先改正正则表达式
		 * b. cd android 目录，重新构建一下项目：./gradlew clean 
		 * c. 返回项目根目录，输入指令重新生成index.bundle的两个文件，
		 * 指令为：react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
		 * 2.结合官方文档在android/app/build.gradle路径下，更改build.gradle文件，添加以下代码：
		 * 官方文档地址：https://github.com/oblador/react-native-vector-icons
		 * 
		 * project.ext.vectoricons = [
     *	iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf','FontAwesome.ttf' ] // Name of the font files you want to copy
		 *	]
		 *
		 *	apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

		 * 3.要使用react-native-vector-icons包中FontAwesome库，需要在iconFontNames的数据中添加这个库的.ttf
		 * 文件名称：FontAwesome.ttf，在node_modules/react-native-vector-icons/Fonts路径下可以找到这个名称
		 *
		 * 4.Copy the contents in the Fonts folder to android/app/src/main/assets/fonts (note lowercase fonts folder)
		 * 5.Edit android/settings.gradle to look like this (without the +):
		 * 6.Edit android/app/build.gradle (note: app folder) to look like this:
		 * 7.Edit your MainApplication.java (deep in android/app/src/main/java/...) to look like this (note two places to edit):
		 * 8.
		 * 
		 *
		 */
		return (
			<View style={styles.container}>
				<TabNavigator>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'home'}
						title="主页"
						renderIcon={() => (
							<Icon name="home" size={25} color="gray" />
						)}
						renderSelectedIcon={() => (
							<Icon name="home" size={25} color="#0079FF" />
						)}
						onPress={() => this.setState({ selectedTab: 'home' })}
					>
						<HomeView style={{ height: 300 }} />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'search'}
						title="搜索"
						renderIcon={() => (
							<Icon name="search" size={25} color="gray" />
						)}
						renderSelectedIcon={() => (
							<Icon name="search" size={25} color="#0079FF" />
						)}
						onPress={() => this.setState({ selectedTab: 'search' })}
					>
						<SearchView />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'shopping'}
						title="购物车"
						renderIcon={() => (
							<Icon name="shopping-cart" size={25} color="gray" />
						)}
						renderSelectedIcon={() => (
							<Icon
								name="shopping-cart"
								size={25}
								color="#0079FF"
							/>
						)}
						badgeText="1"
						onPress={() =>
							this.setState({ selectedTab: 'shopping' })
						}
					>
						<ShopView />
					</TabNavigator.Item>
					<TabNavigator.Item
						selected={this.state.selectedTab === 'me'}
						title="我"
						renderIcon={() => (
							<Icon name="user" size={25} color="black" />
						)}
						renderSelectedIcon={() => (
							<Icon name="user" size={25} color="#0079FF" />
						)}
						onPress={() => this.setState({ selectedTab: 'me' })}
					>
						<MeView />
					</TabNavigator.Item>
				</TabNavigator>
			</View>
		);
	}
}
// 文本值样式，必须加单引号
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
/**
 * @ RN中创建组件的步骤
 * 1.导入react,组件创建和生命周期依赖包
 * 2.需要的标签组件按需引入，从react-native包
 * 3.导入StyleSheet,也是从react-native包中按需引入。为组件绑定类样式，const styles= StyleSheet.create({})
 * 4.使用react语法创建组件，标签组件只能使用RN提供的，不能使用网页中提供的标签
 *
 * RN路由使用第三方插件react-native-router-flux
 * 1.新建Main.js文件，Main.js在index.js中设定为首屏页面
 * 2.将App组件嵌套进来
 * 3.在App组件中引入包，render函数中将Router嵌套到最外层
 * 
 * 
 *
 */
