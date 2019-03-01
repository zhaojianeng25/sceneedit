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
        return FileVo;
    }());
    filemodel.FileVo = FileVo;
    var FolderModel = /** @class */ (function () {
        function FolderModel() {
        }
        FolderModel.oneByOne = function () {
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
        FolderModel.getFolderArr = function ($dir, bfun) {
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
            });
        };
        FolderModel.getDisList = function ($dir, bfun) {
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
        FolderModel.makeOssWrapper = function (bfun) {
            var _this = this;
            FileModel.webseverurl = "https://api.h5key.com/api/";
            FileModel.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, function (res) {
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
        return FolderModel;
    }());
    filemodel.FolderModel = FolderModel;
    var FileModel = /** @class */ (function () {
        function FileModel() {
            this.waitItemFile = [];
        }
        FileModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new FileModel();
            }
            return this._instance;
        };
        FileModel.prototype.upOssFile = function (file, $fileUrl, $bfun) {
            var _this = this;
            if ($bfun === void 0) { $bfun = null; }
            FileModel.webseverurl = "https://api.h5key.com/api/";
            this.waitItemFile.push({ a: file, b: $fileUrl, c: $bfun });
            if (this.waitItemFile.length == 1) {
                if (this.info) {
                    this.oneByOne();
                }
                else {
                    FileModel.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, function (res) {
                        _this.info = res.data.info;
                        if (_this.info) {
                            _this.oneByOne();
                        }
                        else {
                            console.log("get_STS", res);
                        }
                    });
                }
            }
        };
        FileModel.prototype.oneByOne = function () {
            var _this = this;
            if (this.waitItemFile.length > 0) {
                this.uploadFile(this.waitItemFile[0].a, this.waitItemFile[0].b, function () {
                    console.log(_this.waitItemFile[0]);
                    var kFun = _this.waitItemFile[0].c;
                    _this.waitItemFile.shift();
                    kFun && kFun();
                    _this.oneByOne();
                });
            }
        };
        FileModel.prototype.convertCanvasToImage = function (canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        };
        FileModel.prototype.uploadFile = function ($file, $filename, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!FolderModel.ossWrapper) {
                this.makeOSSWrapper();
            }
            console.log("上传文件==>", $filename);
            FolderModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                console.log(result);
                $bfun && $bfun();
            }).catch(function (err) {
                console.log(err);
            });
        };
        FileModel.prototype.makeOSSWrapper = function () {
            FolderModel.ossWrapper = new OSS.Wrapper({
                accessKeyId: this.info.AccessKeyId,
                accessKeySecret: this.info.AccessKeySecret,
                stsToken: this.info.SecurityToken,
                endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                bucket: "webpan"
            });
        };
        FileModel.prototype.deleFile = function ($filename, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            if (!FolderModel.ossWrapper) {
                this.makeOSSWrapper();
            }
            console.log(FolderModel.ossWrapper);
            FolderModel.ossWrapper.delete($filename).then(function (result) {
                console.log(result);
                $bfun && $bfun();
            }).catch(function (err) {
                console.log(err);
            });
        };
        FileModel.WEB_SEVER_EVENT_AND_BACK = function (webname, postStr, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            webname = webname.replace(/\s+/g, "");
            var $obj = new Object();
            $obj.webname = webname;
            $obj.postStr = postStr.replace(/\s+/g, "");
            $obj.fun = $bfun;
            this.isPostWeboffwx(webname, postStr, $bfun);
        };
        //网页模式的WEB请求
        FileModel.isPostWeboffwx = function (webname, postStr, $bfun) {
            if ($bfun === void 0) { $bfun = null; }
            var ajax = new XMLHttpRequest();
            var url = FileModel.webseverurl + webname;
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
        return FileModel;
    }());
    filemodel.FileModel = FileModel;
})(filemodel || (filemodel = {}));
//# sourceMappingURL=FileModel.js.map