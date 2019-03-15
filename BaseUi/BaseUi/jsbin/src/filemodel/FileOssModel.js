var filemodel;
(function (filemodel) {
    var FileVo = /** @class */ (function () {
        function FileVo() {
        }
        FileVo.prototype.meshStr = function (str) {
            var $arr = str.split("/");
            this.name = $arr[$arr.length - 2];
            this.path = str;
            this.isFolder = true;
            //  console.log(this.name, this.path)
        };
        FileVo.meshObj = function (value) {
            if (value.name.length - 1 != value.name.lastIndexOf("/")) {
                var vo = new FileVo();
                var str = value.name;
                var $arr = str.split("/");
                vo.name = $arr[$arr.length - 1];
                vo.path = str.replace("upfile/shadertree/", "");
                vo.suffix = vo.name.split(".")[1];
                return vo;
            }
            return null;
        };
        FileVo.PREFAB = "prefab";
        FileVo.MATERIAL = "material";
        FileVo.JPG = "jpg";
        FileVo.PNG = "png";
        FileVo.TXT = "txt";
        FileVo.OBJS = "objs";
        return FileVo;
    }());
    filemodel.FileVo = FileVo;
    var FileOssModel = /** @class */ (function () {
        function FileOssModel() {
        }
        FileOssModel.oneByOne = function () {
            var _this = this;
            if (this.waitItem.length > 0) {
                var $dir = this.waitItem[0].a; //目录
                var kFun = this.waitItem[0].b; //返回
                var nextMarker = "";
                this.ossWrapper.list({
                    'delimiter': '/',
                    'prefix': $dir,
                    'max-keys': 100,
                    'marker': nextMarker,
                }).then(function (result) {
                    _this.waitItem.shift();
                    _this.oneByOne();
                    kFun(result);
                }).catch(function (err) {
                    console.log(err);
                    console.log("网络异常。需要注意");
                    _this.waitItem.shift();
                    _this.oneByOne();
                    kFun(null);
                });
            }
        };
        FileOssModel.saveDicfileGropFun = function ($dir, fileArr) {
            console.log("保存文件夹目录", $dir, fileArr);
            JSON.stringify(fileArr);
        };
        FileOssModel.getFolderArr = function ($dir, bfun) {
            var _this = this;
            //  console.log("获取文件目录", $dir) 
            this.getDisList($dir, function (value) {
                var fileArr = [];
                for (var i = 0; value.prefixes && i < value.prefixes.length; i++) {
                    var fileVo = new FileVo();
                    fileVo.meshStr(value.prefixes[i]);
                    fileArr.push(fileVo);
                }
                for (var j = 0; value.objects && j < value.objects.length; j++) {
                    var fileVo = FileVo.meshObj(value.objects[j]);
                    if (fileVo) {
                        fileArr.push(fileVo);
                    }
                }
                bfun(fileArr);
                _this.saveDicfileGropFun($dir, fileArr);
            });
        };
        FileOssModel.getDisList = function ($dir, bfun) {
            var _this = this;
            if (!this.waitItem) {
                this.waitItem = [];
            }
            this.waitItem.push({ a: $dir, b: bfun });
            if (this.waitItem.length == 1) {
                if (!this.ossWrapper) {
                    this.makeOssWrapper(function () {
                        _this.oneByOne();
                    });
                }
                else {
                    this.oneByOne();
                }
            }
        };
        FileOssModel.makeOssWrapper = function (bfun) {
            var _this = this;
            this.webseverurl = "https://api.h5key.com/api/";
            this.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, function (res) {
                if (res.data && res.data.info) {
                    _this.ossWrapper = new OSS.Wrapper({
                        accessKeyId: res.data.info.AccessKeyId,
                        accessKeySecret: res.data.info.AccessKeySecret,
                        stsToken: res.data.info.SecurityToken,
                        endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                        bucket: "webpan"
                    });
                    bfun();
                }
                else {
                    console.log(res);
                }
            });
        };
        FileOssModel.deleFile = function ($filename, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(function () {
                    FileOssModel.ossWrapper.delete($filename).then(function (result) {
                        console.log(result);
                        $bfun && $bfun();
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
            else {
                FileOssModel.ossWrapper.delete($filename).then(function (result) {
                    console.log(result);
                    $bfun && $bfun();
                }).catch(function (err) {
                    console.log(err);
                });
            }
        };
        FileOssModel.uploadFile = function ($file, $filename, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!FileOssModel.ossWrapper) {
                this.makeOssWrapper(function () {
                    FileOssModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                        console.log(result);
                        $bfun && $bfun();
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
            else {
                FileOssModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                    console.log(result);
                    $bfun && $bfun();
                }).catch(function (err) {
                    console.log(err);
                });
            }
            console.log("上传文件==>", $filename);
        };
        FileOssModel.WEB_SEVER_EVENT_AND_BACK = function (webname, postStr, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            webname = webname.replace(/\s+/g, "");
            var $obj = new Object();
            $obj.webname = webname;
            $obj.postStr = postStr.replace(/\s+/g, "");
            $obj.fun = $bfun;
            this.isPostWeboffwx(webname, postStr, $bfun);
        };
        //网页模式的WEB请求
        FileOssModel.isPostWeboffwx = function (webname, postStr, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            var ajax = new XMLHttpRequest();
            var url = this.webseverurl + webname;
            // $bfun = null;
            var timestamp = String(Pan3d.TimeUtil.getTimer());
            var keystr = "ABC";
            var self_sign = hex_md5(postStr + timestamp + keystr);
            ajax.open("post", url, true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("timestamp", timestamp);
            ajax.setRequestHeader("sign", self_sign);
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        $bfun ? $bfun({ data: JSON.parse(ajax.responseText) }) : null;
                    }
                    else {
                        console.log("HTTP请求错误！错误码：" + ajax.status);
                        $bfun ? $bfun(null) : null;
                    }
                }
            };
            ajax.send(postStr);
        };
        FileOssModel.upOssFile = function (file, $fileUrl, $bfun) {
            var _this = this;
            if ($bfun === void 0) { $bfun = null; }
            FileOssModel.webseverurl = "https://api.h5key.com/api/";
            this.waitItemUpFile.push({ a: file, b: $fileUrl, c: $bfun });
            if (this.waitItemUpFile.length == 1) {
                if (!FileOssModel.ossWrapper) {
                    FileOssModel.makeOssWrapper(function () {
                        _this.oneByOneUpFile();
                    });
                }
                else {
                    this.oneByOneUpFile();
                }
            }
        };
        FileOssModel.oneByOneUpFile = function () {
            var _this = this;
            if (this.waitItemUpFile.length > 0) {
                FileOssModel.uploadFile(this.waitItemUpFile[0].a, this.waitItemUpFile[0].b, function () {
                    console.log(_this.waitItemUpFile[0]);
                    var kFun = _this.waitItemUpFile[0].c;
                    _this.waitItemUpFile.shift();
                    kFun && kFun();
                    _this.oneByOneUpFile();
                });
            }
        };
        FileOssModel.waitItemUpFile = [];
        return FileOssModel;
    }());
    filemodel.FileOssModel = FileOssModel;
})(filemodel || (filemodel = {}));
//# sourceMappingURL=FileOssModel.js.map