## 安装
* npm install imgtopdf ---save

## 使用

* import imgToPdf from 'imgtopdf';
* imgToPdf(id,multiple,isPdf,pdfName)
* id : 打印目标id；
* multiple： 方法倍数，放大一定的倍数显示原来大小的图片或者pdf提高清晰度
* isPdf ： 是否导出pdf，默认false
* pdfName ： 导出的文件名称


* 函数默认返回一个promise，promise中的data:{img,canvas}
* img 生成的图片
* canvas html2canvas返回的canvas方法