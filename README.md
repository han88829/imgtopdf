**安装**

    npm install imgtopdf ---save
    
    yarn add imgtopdf



**使用**

* import imgToPdf from 'imgtopdf';  
* imgToPdf(id,multiple,isPdf,pdfName)
* id : 打印目标id； multiple：  
* 方法倍数，放大一定的倍数显示原来大小的图片或者pdf提高清晰度 isPdf ：
* 是否导出pdf，默认false pdfName ： 导出的文件名称

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

      
      //分页按照穿进来的数组长度决定，导出的pdf每一页的宽度高度暂时未做到适应当前页图片大小，待调整

  