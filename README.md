# qrcode-parse
node.js application with jsqr and jimp module

### 缘由
在做小程序的时候，有个需求是加载图片的同时扫描二维码，但是微信小程序的API并没有支持（scanCode接口只能从相机或者图片获取，不能从chooseImage的imagePath来取到）
故只能变通方法，在选取图片之后，传给服务端去做响应的扫描和请求。故本项目实现的node服务主要是利用node-fetch获取到远端的图片，然后对图片利用jimp进行解析。
再转换为jsQr支持的图片类型之后，识别二维码中的链接地址，并用puppeteer来进行访问并解析。

### 项目解决的问题
网上对上个段落提到的几个库合作实现的项目介绍非常的简略以至于调试起来比较花时间，最开始我使用pngjs来对node-fetch到的图片解析，这部分源码存在于pngjs.js文件中。
但是pngjs对jpg格式的文件又不支持，我转而使用了jimp这个图片处理工具来生成jsQr支持的图片格式，具体的代码请参考index.js，希望您如果搜索到本文档对您会有所帮助。

### 项目demo
项目已经部署到zeit上，可访问：https://qrcode-parse.jarbozhang.now.sh/
由于zeit没办法部署puppeteer，使用了puppeteer和chrome-aws-lambda的组合实现，可能遇到10秒超时500错误，请刷新重试
本地请直接运行node local.js利用puppeteer来完成操作。
