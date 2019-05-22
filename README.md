**安装**

    npm install imgtopdf --save
    
    yarn add imgtopdf



**使用**

* import imgToPdf from 'imgtopdf';  
* imgToPdf(id,multiple,isPdf,pdfName)
* id : 打印目标id； 
* multiple：放大倍数，放大一定的倍数显示原来大小的图片或者pdf提高清晰度 
* isPdf ：是否导出pdf，默认false
* pdfName ： 导出的文件名称

##
* 函数默认返回一个promise，promise中的data:{img,canvas}
* img 生成的图片
* canvas html2canvas返回的canvas方法




**addPagePdf 使用（导出多个分页pdf）**

    import imgToPdf, { addPagePdf } from "imgtopdf";
      let arr = [{
          id: 'id1',  //id
          multiple: 1.5  //放大倍数
      }, {
          id: 'id2',
          multiple: 1.5
      }]
      addPagePdf(arr, '1.0')

      
      //分页按照传进来的数组长度决定，导出的pdf每一页的宽度高度暂时未做到适应当前页图片大小，待调整


[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
  
  
  [![LICENSE](https://img.shields.io/badge/license-NPL%20(The%20996%20Prohibited%20License)-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
