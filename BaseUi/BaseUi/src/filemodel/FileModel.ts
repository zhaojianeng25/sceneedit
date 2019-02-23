module filemodel {
    import Scene_data = Pan3d.Scene_data
    import Engine = Pan3d.Engine
    import MathClass = Pan3d.MathClass
    import ModuleEventManager = Pan3d.ModuleEventManager

 

 
    export class FileVo {
        public name: string
        public path: string
        public suffix: string
        public isFolder: boolean
        public select: boolean



        public meshStr(str: string): void {
            var $arr: Array<string> = str.split("/");
            this.name = $arr[$arr.length - 2]
            this.path = str;
            this.isFolder = true;
            //  console.log(this.name, this.path)
        }
        public static meshObj(value: any): FileVo {
            if (value.name.length - 1 != value.name.lastIndexOf("/")) {
                var vo: FileVo = new FileVo()
                var str: string = value.name
                var $arr: Array<string> = str.split("/");
                vo.name = $arr[$arr.length - 1]

                vo.path = str.replace("upfile/shadertree/", "");
                vo.suffix = vo.name.split(".")[1]
                //  console.log(vo.name, vo.path)
                return vo
            }
            return null
        }
    }

    export class FolderModel {
        private static waitItem: Array<any>;
        public static ossWrapper: OSS.Wrapper;
        private static oneByOne(): void {
            if (this.waitItem.length > 0) {
                var $dir: string = this.waitItem[0].a;//目录

                var kFun: Function = this.waitItem[0].b; //返回
                var nextMarker = "";
                this.ossWrapper.list({
                    'delimiter': '/',
                    'prefix': $dir,
                    'max-keys': 100,
                    'marker': nextMarker,
                }).then((result) => {
                    this.waitItem.shift();
                    this.oneByOne();
                    kFun(result);
                }).catch((err) => {
                    console.log(err)
                    console.log("网络异常。需要注意");
                    this.waitItem.shift();
                    this.oneByOne();
                    kFun(null);
                });
            }
        }
        public static getFolderArr($dir: string, bfun: Function): void {

            this.getDisList($dir, (value) => {
                var fileArr: Array<FileVo> = []
             
                for (var i: number = 0; value.prefixes && i < value.prefixes.length; i++) {
                    var fileVo: FileVo = new FileVo();
                    fileVo.meshStr(value.prefixes[i])
                    fileArr.push(fileVo)
                }
                for (var j: number = 0; value.objects && j < value.objects.length; j++) {
                    var fileVo: FileVo = FileVo.meshObj(value.objects[j])
                    if (fileVo) {
                        fileArr.push(fileVo);
                    }

                }


                bfun(fileArr);
            })
        }
        private static getDisList($dir: string, bfun: Function): void {
            if (!this.waitItem) {
                this.waitItem = [];
            }
            this.waitItem.push({ a: $dir, b: bfun });
            if (this.waitItem.length == 1) {
                if (this.ossWrapper) {
                    this.oneByOne();
                } else {
                    FileModel.webseverurl = "https://api.h5key.com/api/";
                    FileModel.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, (res: any) => {
                        if (res.data && res.data.info) {
                            this.ossWrapper = new OSS.Wrapper({
                                accessKeyId: res.data.info.AccessKeyId,
                                accessKeySecret: res.data.info.AccessKeySecret,
                                stsToken: res.data.info.SecurityToken,
                                endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                                bucket: "webpan"
                            });
                            this.oneByOne();
                        } else {
                            console.log(res);
                        }
                    })
                }
            }
        }
       
   

    }
    export class FileModel {


        private static _instance: FileModel;
        public static getInstance(): FileModel {
            if (!this._instance) {
                this._instance = new FileModel();
            }
            return this._instance;
        }
        private info: any;
        private waitItemFile: Array<any> = []
        public upOssFile(file: File, $fileUrl: string, $bfun: Function = null): void {
            FileModel.webseverurl = "https://api.h5key.com/api/";
            this.waitItemFile.push({ a: file, b: $fileUrl, c: $bfun })
            if (this.waitItemFile.length == 1) {
                if (this.info) {
                    this.oneByOne();
                } else {
                    FileModel.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, (res: any) => {
                        this.info = res.data.info
                        if (this.info) {
                            this.oneByOne()
                        } else {
                            console.log("get_STS", res)
                        }
                    })
                }
                console.log("ccav")

            }
        }
        private oneByOne(): void {
            if (this.waitItemFile.length > 0) {
                this.uploadFile(this.waitItemFile[0].a, this.waitItemFile[0].b, () => {
                    console.log(this.waitItemFile[0])
                    var kFun: Function = this.waitItemFile[0].c;
                    this.waitItemFile.shift();
                    kFun && kFun()
                    this.oneByOne()
                })
            }

        }
   
    
        public convertCanvasToImage(canvas): any {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;
        }
    
        private uploadFile($file: File, $filename: string, $bfun: Function = null): void {

            if (!FolderModel.ossWrapper) {
                this.makeOSSWrapper()
            }
         
            FolderModel.ossWrapper.multipartUpload($filename, $file).then(function (result) {
                console.log(result);
                $bfun && $bfun()
            }).catch(function (err) {
                console.log(err);
            });
        }
        private makeOSSWrapper() {
            FolderModel.ossWrapper = new OSS.Wrapper({
                accessKeyId: this.info.AccessKeyId,
                accessKeySecret: this.info.AccessKeySecret,
                stsToken: this.info.SecurityToken,
                endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                bucket: "webpan"
            });
        }
        public deleFile($filename: string, $bfun: Function = null): void {

            if (!FolderModel.ossWrapper) {
                this.makeOSSWrapper()
            }
            console.log(FolderModel.ossWrapper)


            FolderModel.ossWrapper.delete($filename).then(function (result) {
                console.log(result);
                $bfun && $bfun()
            }).catch(function (err) {
                console.log(err);
            });

          
        }

        public static WEB_SEVER_EVENT_AND_BACK(webname: string, postStr: string, $bfun: Function = null): void {
            webname = webname.replace(/\s+/g, "");
            var $obj: any = new Object();
            $obj.webname = webname;
            $obj.postStr = postStr.replace(/\s+/g, "");
            $obj.fun = $bfun;
            this.isPostWeboffwx(webname, postStr, $bfun)
        }



        public static webseverurl: string
        //网页模式的WEB请求
        private static isPostWeboffwx(webname: string, postStr: string, $bfun: Function = null) {
            var ajax: XMLHttpRequest = new XMLHttpRequest();
            var url: string = FileModel.webseverurl + webname;

            // $bfun = null;

            let timestamp: string = String(Pan3d.TimeUtil.getTimer());
            let keystr: string = "ABC"
            let self_sign: string = hex_md5(postStr + timestamp + keystr)

            ajax.open("post", url, true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("timestamp", timestamp)
            ajax.setRequestHeader("sign", self_sign)
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        $bfun ? $bfun({ data: JSON.parse(ajax.responseText) }) : null
                    }
                    else {
                        console.log("HTTP请求错误！错误码：" + ajax.status);
                        $bfun ? $bfun(null) : null
                    }
                }

            }
            ajax.send(postStr);
        }

       

    }
}