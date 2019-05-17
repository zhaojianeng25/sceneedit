/**
* name
*/
var game;
(function (game) {
    var utils;
    (function (utils) {
        var ByteArrayUtils = /** @class */ (function () {
            function ByteArrayUtils() {
            }
            ByteArrayUtils.readLong = function (bytes) {
                var hi;
                var low;
                if (bytes instanceof ByteArray) {
                    hi = bytes.readUint32();
                    low = bytes.readUint32();
                }
                else if (bytes instanceof Byte) {
                    hi = bytes.getUint32();
                    low = bytes.getUint32();
                }
                return hi * Math.pow(2, 32) + low;
            };
            ByteArrayUtils.writeLong = function (num, byteArray) {
                byteArray.endian = Endian.LITTLE_ENDIAN;
                var lowByte = new Laya.Byte();
                lowByte.endian = Laya.Byte.BIG_ENDIAN;
                lowByte.writeUint32(num);
                var low_uint8Array = lowByte.getUint8Array(0, lowByte.length);
                var hiByte = new Laya.Byte();
                hiByte.endian = Laya.Byte.BIG_ENDIAN;
                if (num > Number.MAX_VALUE) {
                    hiByte.writeUint32(num - Number.MAX_VALUE);
                }
                else {
                    hiByte.writeUint32(0);
                }
                var hi_uint8Array = hiByte.getUint8Array(0, hiByte.length);
                byteArray.writeUint8Array(hi_uint8Array);
                byteArray.writeUint8Array(low_uint8Array);
                byteArray.endian = Endian.BIG_ENDIAN;
            };
            ByteArrayUtils.FillArray = function (bytes, desArray, DataType) {
                var count = bytes.readUnsignedInt();
                //trace("FillArray count:",count);
                for (var i = 0; i < count; i++) {
                    var obj = new DataType();
                    obj.fromByteArray(bytes);
                    desArray.push(obj);
                }
            };
            ByteArrayUtils.FillMap = function (bytes, count, dataSrc, DataType, keyNames) {
                if (keyNames === void 0) { keyNames = "id"; }
                //dataSrc = new Laya.Dictionary;
                for (var i = 0; i < count; i++) {
                    var obj = new DataType();
                    obj.parse(bytes);
                    var keyAry = keyNames.split("_");
                    for (var key in keyAry) {
                        var num = obj[keyAry[key]];
                        if (dataSrc.get(num) == null) {
                            dataSrc.set(num, new Array(obj));
                        }
                        else {
                            var arr = dataSrc.get(num);
                            arr.push(obj);
                            dataSrc.set(num, arr);
                        }
                    }
                }
                // console.log("dataSrc = ", dataSrc);
                // var src: Array<any> = new Array();
                // for (var i: number = 0; i < count; i++) {
                // 	console.log("----------分割线" + i + "-----------------------------------------------");
                // 	var obj: any = new DataType();
                // 	obj.parse(bytes);
                // 	var keyAry: Array<any> = keyNames.split("_");
                // 	for (var key in keyAry) {
                // 		var data = obj[keyAry[key]];
                // 		console.log("888-------循环第一次", typeof (data));
                // 		if (src.length == 0) {
                // 			src.push(data);
                // 			console.log("9999999999-------循环第一次", src.length);
                // 		} else {
                // 			console.log("--------此时的obj[keyAry[key]]的值为:", obj[keyAry[key]]);
                // 			for (var j = 0; j < src.length; j++) {
                // 				if (src[j] != obj[keyAry[key]]) {
                // 					src.push(obj[keyAry[key]]);
                // 					// console.log("--------------值相同了11", typeof (srcKeyAry[j]));
                // 					// console.log("--------------值相同了22", typeof (obj[keyAry[key]]));
                // 				}
                // 			}
                // 		}
                // 	}
                // 	console.log("----------srcKeyAry-------------" + (i + 1), src);
                // 	console.log("----------srcKeyAry的长度-------" + (i + 1), src.length);
                // 	var realKey: string = src.join("_");
                // 	// console.log("----------realKey-------------" + (i + 1), realKey);
                // 	// if (dataSrc[realKey] == null) {
                // 	// 	dataSrc[realKey] = obj;
                // 	// }
                // }
                // console.log("----------dataSrc-------------", dataSrc);
            };
            ByteArrayUtils.FillList = function (bytes, count, dataSrc, DataType, keyNames) {
                //var count:number = bytes.readUnsignedInt();
                //trace("FillList count:",count);
                if (keyNames === void 0) { keyNames = "id"; }
                for (var i = 0; i < count; i++) {
                    var obj = new DataType();
                    obj.parse(bytes);
                    var keyAry = keyNames.split("_");
                    var srcKeyAry = new Array();
                    for (var key in keyAry) {
                        srcKeyAry.push(obj[keyAry[key]]);
                    }
                    var realKey = srcKeyAry.join("_");
                    //trace("FillList realKey:",realKey);
                    if (dataSrc[realKey] == null) {
                        dataSrc[realKey] = obj;
                    }
                    //console.log("FillList obj",dataSrc[realKey]);
                    //console.log("FillList obj",realKey,obj);
                }
            };
            ByteArrayUtils.writeUtf16String = function (str, byteArray) {
                byteArray.endian = Endian.LITTLE_ENDIAN;
                var len = str.length;
                //console.log("writeUtf16String1", byteArray.length);		
                byteArray.writeUint8Array(this.compact_uint32(len * 2));
                //console.log("writeUtf16String2", byteArray.length);
                var code;
                for (var i = 0; i < len; i++) {
                    code = str.charCodeAt(i);
                    byteArray.writeUint16(code);
                }
                //byteArray.writeByte(0);
                //console.log("writeUtf16String3", byteArray.length);
                byteArray.endian = Endian.BIG_ENDIAN;
            };
            ByteArrayUtils.compact_uint32 = function (x) {
                if (x < 0x40) {
                    return this.getUint8ArrayFromNum(x, 1);
                }
                else if (x < 0x4000) {
                    return this.getUint8ArrayFromNum((x | 0x8000), 2);
                }
                else if (x < 0x20000000) {
                    return this.getUint8ArrayFromNum((x | 0xc0000000), 4);
                }
                this.getUint8ArrayFromNum(0xe0, 1);
                return this.getUint8ArrayFromNum(x, 4);
            };
            ByteArrayUtils.getUint8ArrayFromNum = function (num, byteSize) {
                var byte = new Laya.Byte();
                byte.endian = Laya.Byte.BIG_ENDIAN;
                byte.writeInt32(num);
                var uint8Array = byte.getUint8Array(0, byte.length);
                var sliceUint8Array = byte.getUint8Array(byte.length - byteSize, byteSize);
                //console.log("getUint8ArrayFromNum:", byte , uint8Array, sliceUint8Array);
                return sliceUint8Array;
            };
            ByteArrayUtils.getNumFromUint8Array = function (u8Array, byteSize) {
                var byte = new Laya.Byte();
                byte.endian = Laya.Byte.BIG_ENDIAN;
                byte.writeArrayBuffer(u8Array);
                byte.pos = 0;
                switch (byteSize) {
                    case 1:
                        return byte.getByte();
                    case 2:
                        return byte.getInt16();
                    case 4:
                        return byte.getInt32();
                }
            };
            ByteArrayUtils.uncompact_uint32 = function (byteArray) {
                /*let byte:Laya.Byte = new Laya.Byte();
                byte.endian = Laya.Byte.BIG_ENDIAN;
                byte.writeInt32(x);
                if (byte.pos == byte.length){
                    return;
                }
                let posUint8Array:Uint8Array = byte.getUint8Array(byte.pos, 1);
                let flagByte:Laya.Byte = new Laya.Byte();
                flagByte.writeArrayBuffer(posUint8Array);
                flagByte.pos = 0;
                let flag:number = flagByte.readByte();*/
                //byte.buffer[byte.pos];
                //let byteArray:ByteArray;
                var flag = byteArray.readByte(); //byteArray.getUint8Array[byteArray.position];
                byteArray.position = byteArray.position - 1;
                var switchFlag = flag & 0xe0;
                console.log("uncompact_uint32:", 0xe0, 0xc0, 0xa0, 0x80, 0x8000);
                switch (flag & 0xe0) {
                    case 0xe0:
                        this.unmarshalBySize(byteArray, 1);
                        return this.unmarshalBySize(byteArray, 4);
                    case 0xc0:
                        return this.unmarshalBySize(byteArray, 4) & ~0xc0000000;
                    case 0xa0:
                    case 0x80:
                        var u8Array1 = this.getUint8ArrayFromNum(0x8000, 2);
                        var mashalNum = this.getNumFromUint8Array(u8Array1, 2);
                        return this.unmarshalBySize(byteArray, 2) & ~mashalNum;
                }
                return this.unmarshalBySize(byteArray, 1);
            };
            ByteArrayUtils.unmarshalBySize = function (byteArray, size) {
                var resultNum;
                var b0;
                var b1;
                var b2;
                var b3;
                switch (size) {
                    case 1:
                        b0 = byteArray.readByte();
                        resultNum = b0;
                        return b0;
                    case 2:
                        b0 = byteArray.readByte();
                        b1 = byteArray.readByte();
                        resultNum = (((b0 & 0xff) << 8) | ((b1 & 0xff) << 0));
                        return resultNum;
                    case 4:
                        b0 = byteArray.readByte();
                        b1 = byteArray.readByte();
                        b2 = byteArray.readByte();
                        b3 = byteArray.readByte();
                        resultNum = (((b0 & 0xff) << 24) | ((b1 & 0xff) << 16) | ((b2 & 0xff) << 8) | ((b3 & 0xff) << 0));
                        return resultNum;
                }
                return resultNum;
            };
            ByteArrayUtils.readUtf16String = function (byteArray) {
                var utf16StringLength = this.uncompact_uint32(byteArray);
                var arrayBuffer = byteArray.buffer.slice(byteArray.position, byteArray.position + utf16StringLength);
                var str = this.utf16ToUtf8FromByte(arrayBuffer);
                byteArray.position = byteArray.position + utf16StringLength;
                return str;
            };
            //UTF-16转UTF-8
            ByteArrayUtils.utf16ToUtf8FromByte = function (utf16ArrayBuffer) {
                var utf16ByteArray = new ByteArray(utf16ArrayBuffer);
                utf16ByteArray.position = 0;
                //var s:string;
                if (!utf16ByteArray.length) {
                    return;
                }
                var i;
                var code;
                var ret = [];
                var len = utf16ByteArray.length / 2;
                for (i = 0; i < len; i++) {
                    code = utf16ByteArray.readUint16();
                    ret.push(String.fromCharCode(code));
                    /*if(code > 0x0 && code <= 0x7f){
                        //单字节
                        //UTF-16 0000 - 007F
                        //UTF-8  0xxxxxxx
                        ret.push(String.fromCharCode(code));
                    }else if(code >= 0x80 && code <= 0x7ff){
                        //双字节
                        //UTF-16 0080 - 07FF
                        //UTF-8  110xxxxx 10xxxxxx
                        ret.push(
                            //110xxxxx
                            String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
                            //10xxxxxx
                            String.fromCharCode(0x80 | (code & 0x3f))
                        );
                    }else if(code >= 0x800 && code <= 0xffff){
                        //三字节
                        //UTF-16 0800 - FFFF
                        //UTF-8  1110xxxx 10xxxxxx 10xxxxxx
                        ret.push(
                            //1110xxxx
                            String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
                            //10xxxxxx
                            String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
                            //10xxxxxx
                            String.fromCharCode(0x80 | (code & 0x3f))
                        );
                    }*/
                }
                return ret.join('');
            };
            //UTF-16转UTF-8
            ByteArrayUtils.utf16ToUtf8 = function (s) {
                if (!s) {
                    return;
                }
                var i, code, ret = [], len = s.length;
                for (i = 0; i < len; i++) {
                    code = s.charCodeAt(i);
                    if (code > 0x0 && code <= 0x7f) {
                        //单字节
                        //UTF-16 0000 - 007F
                        //UTF-8  0xxxxxxx
                        ret.push(s.charAt(i));
                    }
                    else if (code >= 0x80 && code <= 0x7ff) {
                        //双字节
                        //UTF-16 0080 - 07FF
                        //UTF-8  110xxxxx 10xxxxxx
                        ret.push(
                        //110xxxxx
                        String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)), 
                        //10xxxxxx
                        String.fromCharCode(0x80 | (code & 0x3f)));
                    }
                    else if (code >= 0x800 && code <= 0xffff) {
                        //三字节
                        //UTF-16 0800 - FFFF
                        //UTF-8  1110xxxx 10xxxxxx 10xxxxxx
                        ret.push(
                        //1110xxxx
                        String.fromCharCode(0xe0 | ((code >> 12) & 0xf)), 
                        //10xxxxxx
                        String.fromCharCode(0x80 | ((code >> 6) & 0x3f)), 
                        //10xxxxxx
                        String.fromCharCode(0x80 | (code & 0x3f)));
                    }
                }
                return ret.join('');
            };
            //UTF-8转UTF-16
            ByteArrayUtils.utf8ToUtf16 = function (s) {
                if (!s) {
                    return;
                }
                var i, codes, bytes, ret = [], len = s.length;
                for (i = 0; i < len; i++) {
                    codes = [];
                    codes.push(s.charCodeAt(i));
                    if (((codes[0] >> 7) & 0xff) == 0x0) {
                        //单字节  0xxxxxxx
                        ret.push(s.charAt(i));
                    }
                    else if (((codes[0] >> 5) & 0xff) == 0x6) {
                        //双字节  110xxxxx 10xxxxxx
                        codes.push(s.charCodeAt(++i));
                        bytes = [];
                        bytes.push(codes[0] & 0x1f);
                        bytes.push(codes[1] & 0x3f);
                        ret.push(String.fromCharCode((bytes[0] << 6) | bytes[1]));
                    }
                    else if (((codes[0] >> 4) & 0xff) == 0xe) {
                        //三字节  1110xxxx 10xxxxxx 10xxxxxx
                        codes.push(s.charCodeAt(++i));
                        codes.push(s.charCodeAt(++i));
                        bytes = [];
                        bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));
                        bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & 0x3f));
                        ret.push(String.fromCharCode((bytes[0] << 8) | bytes[1]));
                    }
                }
                return ret.join('');
            };
            ///////////////////////////////////////////////////////////////////////////////////////////
            ByteArrayUtils.utf16ToUtf81 = function (utf16Str) {
                var utf8Arr = [];
                var byteSize = 0;
                for (var i = 0; i < utf16Str.length; i++) {
                    //获取字符Unicode码值
                    var code = utf16Str.charCodeAt(i);
                    //如果码值是1个字节的范围，则直接写入
                    if (code >= 0x00 && code <= 0x7f) {
                        byteSize += 1;
                        utf8Arr.push(code);
                        //如果码值是2个字节以上的范围，则按规则进行填充补码转换
                    }
                    else if (code >= 0x80 && code <= 0x7ff) {
                        byteSize += 2;
                        utf8Arr.push((192 | (31 & (code >> 6))));
                        utf8Arr.push((128 | (63 & code)));
                    }
                    else if ((code >= 0x800 && code <= 0xd7ff)
                        || (code >= 0xe000 && code <= 0xffff)) {
                        byteSize += 3;
                        utf8Arr.push((224 | (15 & (code >> 12))));
                        utf8Arr.push((128 | (63 & (code >> 6))));
                        utf8Arr.push((128 | (63 & code)));
                    }
                    else if (code >= 0x10000 && code <= 0x10ffff) {
                        byteSize += 4;
                        utf8Arr.push((240 | (7 & (code >> 18))));
                        utf8Arr.push((128 | (63 & (code >> 12))));
                        utf8Arr.push((128 | (63 & (code >> 6))));
                        utf8Arr.push((128 | (63 & code)));
                    }
                }
                return utf8Arr;
            };
            ByteArrayUtils.utf8ToUtf161 = function (utf8Arr) {
                var utf16Str = '';
                for (var i = 0; i < utf8Arr.length; i++) {
                    //每个字节都转换为2进制字符串进行判断
                    var one = utf8Arr[i].toString(2);
                    //正则表达式判断该字节是否符合>=2个1和1个0的情况
                    var v = one.match(/^1+?(?=0)/);
                    //多个字节编码
                    if (v && one.length == 8) {
                        //获取该编码是多少个字节长度
                        var bytesLength = v[0].length;
                        //首个字节中的数据,因为首字节有效数据长度为8位减去1个0位，再减去bytesLength位的剩余位数
                        var store = utf8Arr[i].toString(2).slice(7 - bytesLength);
                        for (var st = 1; st < bytesLength; st++) {
                            //后面剩余字节中的数据，因为后面字节都是10xxxxxxx，所以slice中的2指的是去除10
                            store += utf8Arr[st + i].toString(2).slice(2);
                        }
                        //转换为Unicode码值
                        utf16Str += String.fromCharCode(parseInt(store, 2));
                        //调整剩余字节数
                        i += bytesLength - 1;
                    }
                    else {
                        //单个字节编码，和Unicode码值一致，直接将该字节转换为UTF-16
                        utf16Str += String.fromCharCode(utf8Arr[i]);
                    }
                }
                return utf16Str;
            };
            return ByteArrayUtils;
        }());
        utils.ByteArrayUtils = ByteArrayUtils;
    })(utils = game.utils || (game.utils = {}));
})(game || (game = {}));
//# sourceMappingURL=ByteArrayUtils.js.map