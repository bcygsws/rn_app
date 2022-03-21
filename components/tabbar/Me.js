import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
// 第1步：
// import {View, Button, Image} from 'react-native'
// 拍照按钮的配置项
import ImagePicker from 'react-native-image-picker';
var photoOptions = {
	//底部弹出框选项
	title: '请选择',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '选择相册',
	quality: 0.75, // 照片质量
	allowsEditing: true, // 允许编辑
	noData: false, // 拍照时不带日期
	storageOptions: {
		// 存储选项
		skipBackup: true, // 针对ios的选项，在ios平台中会同步到iCloud中；设定为true,表示跳过备份，不会上传到iCloud
		path: 'images'
	}
};
export default class MeView extends Component<{}> {
	constructor(props) {
		super(props);
		// 第2步
		this.state = {
			// 拍摄照片的路径会存放在imgURL
			// 给相机设置了一个默认图片
			imgURL: 'https://avatars.githubusercontent.com/u/57598072?v=4'
		};
	}
	render() {
		return (
			<View style={{ alignItems: 'center', paddingTop: 70 }}>
				{/* 第三步，布局 */}
				<Image
					source={{ uri: this.state.imgURL }}
					style={{ width: 200, height: 200, borderRadius: 100 }}
				></Image>
				<Button title="拍照" onPress={this.cameraAction}></Button>
			</View>
		);
	}
	// 第4步
	cameraAction = () => {
		ImagePicker.showImagePicker(photoOptions, (response) => {
			console.log('response' + response);
			if (response.didCancel) {
				// 点击取消按钮，直接转向
				return;
			}
			this.setState({
				// 拍了一张照片
				imgURL: response.uri
			});
		});
	};
}
