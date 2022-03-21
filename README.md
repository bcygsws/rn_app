## 项目构建

## 项目打包

### RN 打包 android apk 的步骤

[参考文档](http://blog.csdn.net/fengyuzhengfan/article/details/51958848)

1. 确保安装好 RN 开发环境
2. 打开 cmd，输入以下命令：
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   然后回车，口令秘钥：123。依次填入公司、城市等信息，确认，打入一个“是”字。设置别名的口令：默认和前面相同的 123，直接按
   回车
3. 生成了秘钥文件，生成文件在 ./bcygsws 下面
4. 将该文件放在项目的 android/app 目录下
5. 设置 gradle 变量：
   把 my-release-key.keystore 文件放到你工程中的 android/app 文件夹下。
   编辑~/.gradle/gradle.properties（没有这个文件你就创建一个），添加如下的代码（注意把其中的\*\*\*\*替换为相应密码）
   注意：~表示用户目录，比如 windows 上可能是 C:\Users\用户名，而 mac 上可能是/Users/用户名

-   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
-   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
-   MYAPP_RELEASE_STORE_PASSWORD=208010
-   MYAPP_RELEASE_KEY_PASSWORD=208010 6.第三步：在 gradle 配置文件中添加签名配置
    编辑 android/app/build.gradle 文件添加如下代码：

...

-   android {
-   ...
-   defaultConfig { ... }
-
-   signingConfigs {
-                  release {
-                  storeFile file(MYAPP_RELEASE_STORE_FILE)
-                  storePassword MYAPP_RELEASE_STORE_PASSWORD
-                  keyAlias MYAPP_RELEASE_KEY_ALIAS
-                  keyPassword MYAPP_RELEASE_KEY_PASSWORD
-                  }
-                 }
-                 buildTypes {
-                  release {
-                  ...
-                         signingConfig signingConfigs.release
-                               }
-                           }
-                 }
-                  ...

7.  从根目录切换到且 android 路径下使用命令：$ ./gradlew assembleRelease 如果打包出现报错内容：'Unable to process incoming event 'ProgressComplete ' (ProgressCompleteEvent)'。不能处理传入的事件。说是代码混淆的问题，具体原因不详……

改用命令：./gradlew.bat assembleRelease --console plain 来打包

[重要参考文档](https://blog.csdn.net/aexwx/article/details/79436445)

参考链接

-   https://www.jianshu.com/p/1380d4c8b596
-   http://blog.csdn.net/fengyuzhengfan/article/details/51958848

## BUG 修复

### 一、RN 项目中使用 fontAwesome 图标[配置 react-native-vector-icons 官方文档](https://github.com/oblador/react-native-vector-icons)，按照步骤进行完后，重新构建项目报错

#### 为使用字体图标，安装 react-native-vector-icons 包，然后逐步修改配置文件，需要重新构建一下项目

#### cd/android 目录，运行./gradlew clean 后，报错

-   What went wrong:
-   A problem occurred evaluating project ':react-native-vector-icons'.
    > Could not find method google() for arguments [] on repository container.\*

#### 原因

-   react-native-vector-icons 的版本太高，gradle 插件与 gradle 版本对应关系，可查看文档：[gradle 插件和 gradle 版本对应关系](https://blog.csdn.net/u013247461/article/details/103742718/)
-   之前安装的版本是react-native-vector-icons@8.1.0。这个包安装后，依照如下路径：\node_modules\react-native-vector-icons\android\build.gradle，查看其需要的 gradle 插件是 3.5.2，根据上面链接的文档需要至少 gradle-5.4.1-all.zip 版本的构建包，即使修改了 android\gradle\wrapper 文件下 gradle-wrapper.properties 文件中的 distributionUrl=https\\://services.gradle.org/distributions/gradle-5.4.1-all.zip
-   使用 cd android，进入根目录下的 android 路径，使用命令：./gradlew clean 可以下载 gradle-5.4.1-all.zip，但是又提示安卓开发环境需要 SDK28.0.3。然而，开发环境已经配置完成，这种由于一个包，引起连锁反应，想到降低react-native-vector-icons@4.4.2,它依赖 SDK 是 26.0.3,这个版本的 SDK 恰好已经配置了
-   解决思路来源：[参考文档](https://github.com/oblador/react-native-vector-icons/issues/873)
-   之后，在终端 android 路径，使用$ ./gradlew clean 命令构建成功
-   使用 cd ../命令，回到项目根目录，react-native run-android 也成功了

## 二、RN 项目报错：Cannot read properties of undefined (reading 'x')

### 原因

-   是使用了 react-native-swiper 插件，并设置了自动播放，即 autoPlay={true}。关闭该属性，再调试,报错消失

### 解决方案

#### 关掉自动播放，没有提示错误了

#### 若将下列代码加到 react-native-swiper\src\index.js:396 行(注：加到 396 行，bug 没有解决)，卸载手机上的包重新打包安装，轮播图正常

-   [解决思路-参考文档](https://github.com/leecade/react-native-swiper/issues/582)
-   react-native-swiper\src\index.js:401 行添加：
    if(offset === undefined || this.internals.offset === undefined){
    return;
    }
    先将 401 行恢复原状，react-native-swiper\src\index.js:396 行添加：
    if(offset === undefined || this.internals.offset === undefined){
    return;
    }

## 从根目录切换至 android 目录，运行命令：$ ./gradlew assembleRelease 打包 文件报错

### 原因

-   报错内容：'Unable to process incoming event 'ProgressComplete ' (ProgressCompleteEvent)'。不能处理传入的事件。说是代码混淆的问题，具体原因不详……

### 解决办法

-   切换至项目根目录下的 android 路径，使用./gradlew.bat assembleRelease --console plain 命令打包
-   [参考文档 1](https://blog.csdn.net/hanjiyu/article/details/74841503?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5.topblog&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-5.topblog)
-   [参考文档 2](https://blog.csdn.net/aexwx/article/details/79436445)
