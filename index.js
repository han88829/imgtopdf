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
                var pageData = canvas.toDataURL('image/png', 1.0);
                if (isPdf) {

                    //方向默认横向，尺寸ponits, 按照图片大小进行输出
                    var pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
                    //需要dataUrl格式
                    pdf.addImage(pageData, 'PNG', 0, 0, canvas.width, canvas.height);
                    pdf.save(`${pdfName}.pdf`);
                }
                res({ img: pageData, canvas });
            }).catch(err => rej(err));
        } catch (error) {
            rej(error)
        }

    })
}

export async function addPagePdf(imgData = [{}], name) {
    let data = [];

    try {
        // 将多个图片保存
        for (let i = 0; i < imgData.length; i++) {
            data[i] = await imgToPdf(imgData[i].id, imgData[i].multiple);
        }

        var canvas = document.createElement("canvas"); //创建一个canvas节点
        let width = 0, height = 0;
        // 计算最大宽度和高度，暂时无法针对每个页面进行设置款到，否则会出现图片显示不完全
        data.forEach(item => {
            if (width < item.canvas.width) {
                width = item.canvas.width
            }
            if (height < item.canvas.height) {
                height = item.canvas.height
            }
        })
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        let parameter = [];
        var pdf = new jsPDF('l', 'px', [width, height]);
        for (let i = 0; i < data.length; i++) {

            // 循环往pdf中插入图片
            pdf.addImage(data[i].img, 'PNG', 0, 0, data[i].canvas.width, data[i].canvas.height);

            if (i === (data.length - 1)) {
                pdf.save(name + '.pdf');
            } else {
                pdf.addPage();
            }
        }
    } catch (error) {
        console.error(error);
    }

}

// 传入图片导出
export async function addImgToPdf(data = [{}], name = "pdf") {
    return new Promise((res, rej) => {
        try {
            let width = 0, height = 0;

            // 计算最大宽度和高度，暂时无法针对每个页面进行设置款到，否则会出现图片显示不完全
            data.forEach(item => {
                if (width < item.width) {
                    width = item.width
                }
                if (height < item.height) {
                    height = item.height
                }
            })
            var pdf = new jsPDF('l', 'px', [width, height]);
            for (let i = 0; i < data.length; i++) {

                // 循环往pdf中插入图片
                pdf.addImage(data[i].img, 'PNG', 0, 0, data[i].width, data[i].height);

                if (i === (data.length - 1)) {
                    pdf.save(name + '.pdf');
                    res({ status: 1, msg: "导出成功" })
                } else {
                    pdf.addPage();
                }
            }
        } catch (error) {
            console.error(error);
            rej(error);
        }
    })
}