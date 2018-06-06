const html2canvas = require('html2canvas');
const jsPDF = require('jspdf');


export default function imgToPdf(id, multiple = 1.8, isPdf = false, pdfName = 'pdf') {
    return new Promise((res, rej) => {
        try {
            var shareContent = document.getElementById(id);//需要截图的包裹的（原生的）DOM 对象
            var width = shareContent.offsetWidth; //获取dom 宽度
            var height = shareContent.offsetHeight; //获取dom 高度
            var canvas = document.createElement("canvas"); //创建一个canvas节点
            var scale = multiple; //定义任意放大倍数 支持小数
            canvas.width = width * scale; //定义canvas 宽度 * 缩放
            canvas.height = height * scale; //定义canvas高度 *缩放
            canvas.getContext("2d").scale(scale, scale); //获取context,设置scale 
            var opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: true, //日志开关
                width: width, //dom 原始宽度
                height: height //dom 原始高度
            };
            html2canvas(shareContent, opts).then((canvas) => {
                //返回图片URL，参数：图片格式和清晰度(0-1)
                var pageData = canvas.toDataURL('image/jpeg', 1.0);
                if (isPdf) {
                    //返回图片URL，参数：图片格式和清晰度(0-1)
                    var pageData = canvas.toDataURL('image/jpeg', 1.0);

                    //方向默认横向，尺寸ponits, 按照图片大小进行输出
                    var pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
                    //需要dataUrl格式
                    pdf.addImage(pageData, 'JPEG', 0, 0, canvas.width, canvas.height);
                    pdf.save(`${pdfName}.pdf`);
                }
                res({ img: pageData, canvas });
            }).catch(err => rej(err));
        } catch (error) {
            rej(error)
        }

    })

}