'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var html2canvas = require('html2canvas');
var jsPDF = require('jspdf');
require('babel-polyfill')
module.exports = {
    imgToPdf: function imgToPdf(id) {
        var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.8;
        var isPdf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var pdfName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'pdf';

        return new Promise(function (res, rej) {
            try {
                var shareContent = document.getElementById(id); //需要截图的包裹的（原生的）DOM 对象
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
                html2canvas(shareContent, opts).then(function (canvas) {
                    //返回图片URL，参数：图片格式和清晰度(0-1)
                    var pageData = canvas.toDataURL('image/png', 1.0);
                    if (isPdf) {

                        //方向默认横向，尺寸ponits, 按照图片大小进行输出
                        var pdf = new jsPDF('l', 'px', [canvas.width, canvas.height]);
                        //需要dataUrl格式
                        pdf.addImage(pageData, 'PNG', 0, 0, canvas.width, canvas.height);
                        pdf.save(pdfName + '.pdf');
                    }
                    res({ img: pageData, canvas: canvas });
                }).catch(function (err) {
                    return rej(err);
                });
            } catch (error) {
                rej(error);
            }
        });
    },

    addPagePdf: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var imgData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
            var name = arguments[1];

            var data, i, canvas, width, height, ctx, parameter, pdf, _i;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            data = [];
                            _context.prev = 1;
                            i = 0;

                        case 3:
                            if (!(i < imgData.length)) {
                                _context.next = 10;
                                break;
                            }

                            _context.next = 6;
                            return imgToPdf(imgData[i].id, imgData[i].multiple);

                        case 6:
                            data[i] = _context.sent;

                        case 7:
                            i++;
                            _context.next = 3;
                            break;

                        case 10:
                            canvas = document.createElement("canvas"); //创建一个canvas节点

                            width = 0, height = 0;
                            // 计算最大宽度和高度，暂时无法针对每个页面进行设置款到，否则会出现图片显示不完全

                            data.forEach(function (item) {
                                if (width < item.canvas.width) {
                                    width = item.canvas.width;
                                }
                                if (height < item.canvas.height) {
                                    height = item.canvas.height;
                                }
                            });
                            canvas.width = width;
                            canvas.height = height;
                            ctx = canvas.getContext("2d");
                            parameter = [];
                            pdf = new jsPDF('l', 'px', [width, height]);

                            for (_i = 0; _i < data.length; _i++) {

                                // 循环往pdf中插入图片
                                pdf.addImage(data[_i].img, 'PNG', 0, 0, data[_i].canvas.width, data[_i].canvas.height);

                                if (_i === data.length - 1) {
                                    pdf.save(name + '.pdf');
                                } else {
                                    pdf.addPage();
                                }
                            }
                            _context.next = 24;
                            break;

                        case 21:
                            _context.prev = 21;
                            _context.t0 = _context['catch'](1);

                            console.error(_context.t0);

                        case 24:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[1, 21]]);
        }));

        return function addPagePdf() {
            return _ref.apply(this, arguments);
        };
    }(),

    // 传入图片导出
    addImgToPdf: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "pdf";
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', new Promise(function (res, rej) {
                                try {
                                    var width = 0,
                                        height = 0;

                                    // 计算最大宽度和高度，暂时无法针对每个页面进行设置款到，否则会出现图片显示不完全
                                    data.forEach(function (item) {
                                        if (width < item.width) {
                                            width = item.width;
                                        }
                                        if (height < item.height) {
                                            height = item.height;
                                        }
                                    });
                                    var pdf = new jsPDF('l', 'px', [width, height]);
                                    for (var i = 0; i < data.length; i++) {

                                        // 循环往pdf中插入图片
                                        pdf.addImage(data[i].img, 'PNG', 0, 0, data[i].width, data[i].height);

                                        if (i === data.length - 1) {
                                            pdf.save(name + '.pdf');
                                            res({ status: 1, msg: "导出成功" });
                                        } else {
                                            pdf.addPage();
                                        }
                                    }
                                } catch (error) {
                                    console.error(error);
                                    rej(error);
                                }
                            }));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function addImgToPdf() {
            return _ref2.apply(this, arguments);
        };
    }()
};