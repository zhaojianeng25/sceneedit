﻿

module md5list {
    import ObjectBaseBone = Pan3d.ObjectBaseBone;
    import Matrix3D = Pan3d.Matrix3D
    import Quaternion = Pan3d.Quaternion
    import Vector3D = Pan3d.Vector3D
    import Dictionary = Pan3d.Dictionary
    import ObjectBone = Pan3d.ObjectBone

    export class Md5animAnalysis {
        public allFrames: Array<Array<ObjectBone>>;
        public framesok: Boolean;

        private _dir: Dictionary;
        private _hierarchyitem: Array<ObjectBone>;
        private _hierarchy: Array<string>;
        private _baseframe: Array<string>;
        private _bounds: Array<any>;
        private _frame: Array<Array<string>>;
        public bigArr: Array<string>;


        public resultInfo: any;

        private loopKey: String = "inLoop";
        private boundsKey: String = "mybounds";
        private nameHeightKey: String = "nameheight";
        private interKey: String = "inter";
        private pos: String = "pos";
        /**
         * 包围盒最终数据 
         */
        private _boundFrameAry: Array<Vector3D>;

        private _posFrameAry: Array<Vector3D>;

        private _interAry: Array<any>;


        public addAnim(ini: String): Array<Array<Matrix3D>> {

            this._dir = new Dictionary([]);
            this.allFrames = new Array();
            this.framesok = false;
            this._hierarchyitem = new Array()
            this._hierarchy = new Array();
            this._baseframe = new Array();
            this._bounds = new Array();
            this._frame = new Array();
            this.bigArr = new Array();
            //var ini:String = urlloader.data;

            var arr: Array<string> = ini.split("\r\n");

            var len: number = arr.length;
            var tempStr: string = "";
            var isbig: Boolean = false;
            //var t:int = getTimer();
            for (var i: number = 0; i < len; i++) {
                var dindex: number = String(arr[i]).indexOf("//");
                if (dindex == 0) {
                    //注释行
                    continue;
                }
                if (dindex != -1) {
                    //包含注释
                    arr[i] = String(arr[i]).substring(0, dindex);
                    //删除注释
                }
                if (String(arr[i]).indexOf("{") != -1) {
                    isbig = true;
                }
                if (isbig) {

                    tempStr += arr[i] + "\n\r";

                    if (String(arr[i]).indexOf("}") != -1) {
                        isbig = false;
                        this.bigArr.push(tempStr);
                        tempStr = "";
                    }

                } else {

                    if (arr[i] != "") {

                        var arr2: Array<string> = String(arr[i]).split(" ");

                        this._dir[arr2[0]] = arr2[1];

                        //正常行
                    } else {
                        //空行
                    }

                }
            }

            //trace("anim字符串解析耗时：" + (getTimer() - t))
            //t = getTimer();
            //			trace(3)
            for (var p: number = 0; p < this.bigArr.length; p++) {
                this.handleBigWord(this.bigArr[p]);
            }

            this._pushhierarchyitem();
            //this.processBounds();
            //processInter();
            //processPos();
            // this.setRestult();


            return this.setFrameToMatrix(this.allFrames)

        }
        private setFrameToMatrix(frameAry: Array<Array<ObjectBaseBone>>): Array<Array<Matrix3D>> {

            var matrixAry: Array<Array<Matrix3D>> = new Array;

            for (var j: number = 0; j < frameAry.length; j++) {
                var boneAry: Array<ObjectBaseBone> = frameAry[j];

                var Q0: Quaternion = new Quaternion();
                var newM: Matrix3D = new Matrix3D();

                var frameMatrixAry: Array<Matrix3D> = new Array;
                matrixAry.push(frameMatrixAry);

                for (var i: number = 0; i < boneAry.length; i++) {

                    var xyzfarme0: ObjectBaseBone = boneAry[i];
                    Q0 = new Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
                    Q0.w = this.getW(Q0.x, Q0.y, Q0.z);

                    if (xyzfarme0.father == -1) {
                        newM = Q0.toMatrix3D();
                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                        newM.appendRotation(-90, Vector3D.X_AXIS);
                        //xyzfarme0.matrix = newM;
                        frameMatrixAry.push(newM);
                    } else {
                        var fatherBone: ObjectBaseBone = boneAry[xyzfarme0.father];

                        newM = Q0.toMatrix3D();
                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
                        //newM.append(fatherBone.matrix);
                        newM.append(frameMatrixAry[xyzfarme0.father]);
                        frameMatrixAry.push(newM);
                        //xyzfarme0.matrix = newM;

                    }
                }
                for (i = 0; i < frameMatrixAry.length; i++) {
                    frameMatrixAry[i].appendScale(-1, 1, 1);  //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
                    //xyzfarme0.matrix.appendScale(-1, 1, 1);
                }

            }

            return matrixAry;
        }
        private getW(x: number, y: number, z: number): number {
            var t: number = 1 - (x * x + y * y + z * z);
            if (t < 0) {
                t = 0
            } else {
                t = -Math.sqrt(t);
            }
            return t;
        }
        private setRestult(): void {
            this.resultInfo = new Object;
            this.resultInfo.frames = this.allFrames;
            this.resultInfo.matrixAry = this.setFrameToMatrix(this.allFrames)

        }

        private _pushhierarchyitem(): void {
            var _str: string = "";
            var _arr: Array<any> = new Array();
            var i: number = 0;
            for (i = 0; i < this._hierarchy.length; i++) {
                //_str=_genewStr(_hierarchy[i]);
                var tempary: Array<string> = this.getBoneFilterStr(this._hierarchy[i]);
                _arr = tempary[1].split(" ");
                //_arr=_str.split(" ");
                var _temp: ObjectBone = new ObjectBone();
                _temp.father = Number(_arr[0]);
                _temp.changtype = Number(_arr[1]);
                _temp.startIndex = Number(_arr[2]);
                _temp.name = tempary[0];
                this._hierarchyitem.push(_temp);

            }

            this._pushbasefamer();
        }
        private _pushbasefamer(): void {

            var _str: string = "";

            var i: number = 0;
            for (i = 0; i < this._baseframe.length; i++) {

                var _arr: Array<string> = TpGame.getArrByStr(this._baseframe[i])
                this._hierarchyitem[i].tx = Number(_arr[1]);
                this._hierarchyitem[i].ty = Number(_arr[2]);
                this._hierarchyitem[i].tz = Number(_arr[3]);
                this._hierarchyitem[i].qx = Number(_arr[6]);
                this._hierarchyitem[i].qy = Number(_arr[7]);
                this._hierarchyitem[i].qz = Number(_arr[8]);
            }
            this._pushfamers();

        }
        public _pushfamers(): void {
            var i: number = 0;
            for (i = 0; i < this._frame.length; i++) {
                if (this._frame[i]) {
                    this.allFrames.push(this._getsamplefamer(this._frame[i]));
                }
         
            }
            this.framesok = true;

        }
        public _getsamplefamer(_framesample: Array<any>): Array<ObjectBone> {

            var i: number = 0;
            var _arr: Array<ObjectBone> = new Array;
            var _arrframesample: Array<string> = new Array

            for (var js: number = 0; js < _framesample.length; js++) {
                var aar: Array<string> = TpGame.getArrByStr(_framesample[js])
                if (aar.length && aar[aar.length - 1] == "") {
                    aar.pop();
                }
                _arrframesample = _arrframesample.concat(aar);
            }
            for (i = 0; i < this._hierarchyitem.length; i++) {
                var _temp: ObjectBone = new ObjectBone();
                _temp.father = this._hierarchyitem[i].father;
                _temp.name = this._hierarchyitem[i].name;
                _temp.tx = this._hierarchyitem[i].tx;
                _temp.ty = this._hierarchyitem[i].ty;
                _temp.tz = this._hierarchyitem[i].tz;
                _temp.qx = this._hierarchyitem[i].qx;
                _temp.qy = this._hierarchyitem[i].qy;
                _temp.qz = this._hierarchyitem[i].qz;

                var k: number = 0;
                if (this._hierarchyitem[i].changtype & 1) {
                    _temp.tx = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
                    k++;
                }
                if (this._hierarchyitem[i].changtype & 2) {
                    _temp.ty = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
                    k++;
                }
                if (this._hierarchyitem[i].changtype & 4) {
                    _temp.tz = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
                    k++;
                }
                if (this._hierarchyitem[i].changtype & 8) {
                    _temp.qx = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
                    k++;
                }
                if (this._hierarchyitem[i].changtype & 16) {
                    _temp.qy = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
                    k++;
                }
                if (this._hierarchyitem[i].changtype & 32) {
                    _temp.qz = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
                    k++;
                }

                _arr.push(_temp);
            }
            return _arr;
        }
        private getBoneFilterStr(_str: string): Array<string> {
            var _s: string = "";
            var _t: string = "";
            var _e: string = " ";
            var i: number = 0;
            while (i < _str.length) {
                _t = _str.charAt(i);
                switch (_t) {
                    case "(":
                        break;
                    case ")":
                        break;
                    case "	":
                        if (_e != " ") {
                            _s = _s + " ";
                        }
                        _e = " ";
                        break;
                    case " ":
                        if (_e != " ") {
                            _s = _s + " ";
                        }
                        _e = " ";
                        break;
                    default:
                        _s = _s + _t;
                        _e = _t;
                        break;
                }

                i++;
            }
            var index: number = _s.indexOf("\"", 1);
            var name: string = _s.slice(1, index);
            //	var num:String = _s.slice(index+2,-1);
            var num: string = _s.substring(index + 2, _s.length);
            return [name, num];
        }

        private handleBigWord(str: string): void {

            var reg: RegExp = /\d+/;
            var arr: Array<any>;

            //			if (str.indexOf("inLoop") != -1) {
            //				
            //				arr = str.split("\n\r");
            //				
            //				for (var i:int = 0 ; i < arr.length ; i++) {
            //					
            //					if (String(arr[i]).indexOf("{") == -1 && String(arr[i]).indexOf("}") == -1 && arr[i] != "") {
            //						
            //						_hierarchy.push(arr[i]);
            //					}
            //				}
            //			}

            if (str.indexOf("hierarchy") != -1) {

                arr = str.split("\n\r");

                for (var i: number = 0; i < arr.length; i++) {

                    if (String(arr[i]).indexOf("{") == -1 && String(arr[i]).indexOf("}") == -1 && arr[i] != "") {

                        this._hierarchy.push(arr[i]);
                    }
                }
            }


            if (str.indexOf("bounds") != -1) {

                arr = str.split("\n\r");

                for (var m: number = 0; m < arr.length; m++) {

                    if (String(arr[m]).indexOf("{") == -1 && String(arr[m]).indexOf("}") == -1 && String(arr[m]) != "") {

                        this._bounds.push(arr[m]);
                    }
                }
            }

            if (str.indexOf("baseframe") != -1) {
                arr = str.split("\n\r");
                for (var k: number = 0; k < arr.length; k++) {

                    if (String(arr[k]).indexOf("{") == -1 && String(arr[k]).indexOf("}") == -1 && arr[k] != "") {

                        this._baseframe.push(arr[k]);
                    }
                }
            }

            if (str.indexOf("frame") != -1 && str.indexOf("baseframe") == -1 && str.indexOf("BoneScale") == -1) {
                arr = str.split("\n\r")
                var arrsign: number;
                var tempArray: Array<any> = new Array();
                for (var w: number = 0; w < arr.length; w++) {
                    if (String(arr[w]).indexOf("frame") != -1) {
                        arrsign = Number((arr[w]).match(reg)[0]);
                    }
                    if (String(arr[w]).indexOf("{") == -1 && String(arr[w]).indexOf("}") == -1 && arr[w] != "") {
                        tempArray.push(arr[w]);
                    }
                    this._frame[arrsign] = tempArray;
                }
            }
        }
    }
}