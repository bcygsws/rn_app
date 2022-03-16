/**
 * @ 轮播图插件
 * 使用第三方包react-native-swiper
 *
 * @ 轮播图：数据接口请求
 * http://www.liulongbin.top:3005/api/getlunbo
 * get方法
 * 返回数据格式：json
 *
 *
 *
 */
import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, StyleSheet, Image } from 'react-native';
export default class HomeView extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			imgURI: []
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.outside}>
					<Swiper
						style={styles.wrapper}
						showsButtons={true}
						autoplay={true}
						autoplayTimeout={5}
						autoplayDirection={true}
						loop={true}
					>
						{this.state.imgURI.map((item, index) => {
							return (
								<View style={styles.slide} key={index}>
									<Image
										source={{ uri: `${item.img}` }}
										style={styles.ig}
									/>
								</View>
							);
						})}
					</Swiper>
				</View>
				{/* 六宫格布局 */}
				<View style={styles.grid}>
					<View style={styles.item}>
						<Image
							source={require('../../images/menu1.png')}
							style={styles.tinyLogo}
						/>
						<Text
							style={{ height: 20, lineHeight: 20, fontSize: 12 }}
						>
							新闻资讯
						</Text>
					</View>
					<View style={styles.item}>
						<Image
							source={require('../../images/menu2.png')}
							style={styles.tinyLogo}
						/>
						<Text
							style={{ height: 20, lineHeight: 20, fontSize: 12 }}
						>
							图片分享
						</Text>
					</View>
					<View style={styles.item}>
						<Image
							source={require('../../images/menu3.png')}
							style={styles.tinyLogo}
						/>
						<Text
							style={{ height: 20, lineHeight: 20, fontSize: 12 }}
						>
							商品购买
						</Text>
					</View>
					<View style={[styles.item, styles.item1]}>
						<Image
							source={require('../../images/menu4.png')}
							style={styles.tinyLogo}
						/>
						<Text
							style={{ height: 20, lineHeight: 20, fontSize: 12 }}
						>
							留言反馈
						</Text>
					</View>
					<View
						style={[styles.item, styles.item1]}
						onClick={this.goMovie}
					>
						<Image
							source={require('../../images/menu5.png')}
							style={styles.tinyLogo}
						/>
						<Text
							style={{ height: 20, lineHeight: 20, fontSize: 12 }}
						>
							热映电影
						</Text>
					</View>
					<View style={[styles.item, styles.item1]}>
						<Image
							source={require('../../images/menu6.png')}
							style={styles.tinyLogo}
						/>
						<Text
							style={{ height: 20, lineHeight: 20, fontSize: 12 }}
						>
							联系我们
						</Text>
					</View>
				</View>
			</View>
		);
	}
	goMovie = () => {
		console.log(this);
	};
	componentWillMount() {
		// 请求轮播图图片数据
		fetch('http://www.liulongbin.top:3005/api/getlunbo')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// 数据请求完成了，更新imgURI数据
				// this.state.imgURI = message;
				this.setState({ imgURI: data.message });
			});
	}
	// 图片列表循环,专门抽象成函数和写在render函数中是有区别的
	// 特别注意：特别是要用到后台请求回来的数据，和抽象成函数getImages()的区别，则在componentWillMount阶段就调用了，导致一个undefined.map((item,index)=>{})
	// getImages = () => {
	// 	// console.log(this.state.imgURI);

	// };
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	outside: {
		width: '100%',
		height: 220
	},
	wrapper: {
		width: '100%'
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	ig: {
		width: '100%',
		height: '100%',
		resizeMode: 'stretch' // 拉伸图片且不维持宽高比，直到宽度填满容器，resizeMode还有cover、contain、center三个取值
	},
	grid: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	item: {
		width: '33.33%',
		height: 120,
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderStyle: 'solid',
		borderBottomColor: '#eee',
		borderRightColor: '#eee',
		borderBottomWidth: 1,
		borderRightWidth: 1
	},
	item1: {
		borderBottomWidth: 0
	},
	tinyLogo: {
		marginTop: 10,
		width: 80,
		height: 80,
		resizeMode: 'cover'
	}
});
