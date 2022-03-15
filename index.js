import { AppRegistry } from 'react-native';
import App from './App';
// 导入自定义的首屏组件
// import MyHomePage from './MyHomePage.js';

/**
 *
 * @  AppRegistry是用于注册首页的
 * 它的方法registerComponent用于注册组件
 * 参数说明：
 * 参数1：名称不能更改，否则项目将不能工作了
 * 参数2：可以更改，可以更改成自己设定的组件，引入进来，就可以使用了
 *
 *
 */
// AppRegistry.registerComponent('rn_app', () => MyHomePage);
AppRegistry.registerComponent('rn_app', () => App);
