/**
 * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
 * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
 * @class egret.Endian
 * @classdesc
 */
var Pan3d;
(function (Pan3d) {
    var Endian = /** @class */ (function () {
        function Endian() {
        }
        /**
         * 表示多字节数字的最低有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @constant {string} egret.Endian.LITTLE_ENDIAN
         */
        Endian.LITTLE_ENDIAN = "littleEndian";
        /**
         * 表示多字节数字的最高有效字节位于字节序列的最前面。
         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
         * @constant {string} egret.Endian.BIG_ENDIAN
         */
        Endian.BIG_ENDIAN = "bigEndian";
        return Endian;
    }());
    Pan3d.Endian = Endian;
    /**
     * @class ByteArray
     * @classdesc
     * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
     * 注意：ByteArray 类适用于需要在字节层访问数据的高级 开发人员。
     */
    var Pan3dByteArray = /** @class */ (function () {
        /**
         * 创建一个 ByteArray 对象以引用指定的 ArrayBuffer 对象
         * @param buffer {ArrayBuffer} 数据源
         */
        function Pan3dByteArray(buffer) {
            this.BUFFER_EXT_SIZE = 0; //Buffer expansion size
            this.optcode = 0;
            this.EOF_byte = -1;
            this.EOF_code_point = -1;
            this._setArrayBuffer(buffer || new ArrayBuffer(this.BUFFER_EXT_SIZE));
            this.endian = Endian.BIG_ENDIAN;
        }
        Pan3dByteArray.prototype._setArrayBuffer = function (buffer) {
            this.write_position = buffer.byteLength;
            this.data = new DataView(buffer);
            this._position = 0;
        };
        Pan3dByteArray.prototype.setdata = function (srcByte) {
            this._setArrayBuffer(srcByte.buffer);
        };
        Object.defineProperty(Pan3dByteArray.prototype, "buffer", {
            get: function () {
                return this.data.buffer;
            },
            /**
             * @private
             */
            set: function (value) {
                this.data = new DataView(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pan3dByteArray.prototype, "dataView", {
            get: function () {
                return this.data;
            },
            /**
             * @private
             */
            set: function (value) {
                this.data = value;
                this.write_position = value.byteLength;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pan3dByteArray.prototype, "bufferOffset", {
            /**
             * @private
             */
            get: function () {
                return this.data.byteOffset;
            },
            enumerable: true,
            configurable: true
        });
        Pan3dByteArray.prototype.getByte = function (i) {
            return this.data.getUint8(i);
        };
        Pan3dByteArray.prototype.setByte = function (i, num) {
            this.data.setUint8(i, num);
        };
        Object.defineProperty(Pan3dByteArray.prototype, "position", {
            /**
             * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
             * @member {number} ByteArray#position
             */
            get: function () {
                return this._position;
            },
            set: function (value) {
                //if (this._position < value) {
                //    if (!this.validate(value - this._position)) {
                //        return;
                //    }
                //}
                this._position = value;
                this.write_position = value > this.write_position ? value : this.write_position;
            },
            enumerable: true,
            configurable: true
        });
        Pan3dByteArray.prototype.reset = function () {
            this.clear();
        };
        Object.defineProperty(Pan3dByteArray.prototype, "length", {
            /**
             * ByteArray 对象的长度（以字节为单位）。
             * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
             * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
             * @member {number} ByteArray#length
             */
            get: function () {
                return this.write_position;
            },
            set: function (value) {
                this.validateBuffer(value, true);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pan3dByteArray.prototype, "bytesAvailable", {
            /**
             * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
             * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
             * @member {number} ByteArray#bytesAvailable
             */
            get: function () {
                return this.data.byteLength - this._position;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
         * @method ByteArray#clear
         */
        Pan3dByteArray.prototype.clear = function () {
            this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE));
        };
        //public getArray():Uint8Array {
        //    if (this.array == null) {
        //        this.array = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength);
        //    }
        //    return this.array;
        //}
        /**
         * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
         * @return 如果字节不为零，则返回 true，否则返回 false
         * @method ByteArray#readBoolean
         */
        Pan3dByteArray.prototype.readBoolean = function () {
            //if (!this.validate(ByteArray.SIZE_OF_BOOLEAN)) return null;
            return this.data.getUint8(this.position++) != 0;
        };
        /**
         * 从字节流中读取带符号的字节
         * @return 介于 -128 和 127 之间的整数
         * @method ByteArray#readByte
         */
        Pan3dByteArray.prototype.readByte = function () {
            //if (!this.validate(ByteArray.SIZE_OF_INT8)) return null;
            return this.data.getInt8(this.position++);
        };
        /**
         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
         * @param bytes 要将数据读入的 ByteArray 对象
         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
         * @method ByteArray#readBytes
         */
        Pan3dByteArray.prototype.readBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            //if (length == 0) {
            //    length = this.bytesAvailable;
            //}
            //else if (!this.validate(length)) {
            //    return null;
            //}
            //if (bytes) {
            //    bytes.validateBuffer(length);
            //}
            //else {
            //    bytes = new ByteArray(new ArrayBuffer(length));
            //}
            //This method is expensive
            for (var i = 0; i < length; i++) {
                bytes.data.setUint8(i + offset, this.data.getUint8(this.position++));
            }
        };
        //public get leftBytes():ArrayBuffer {
        //    var begin = this.data.byteOffset + this.position;
        //    var end = this.data.byteLength;
        //    var result = new ArrayBuffer(end - begin);
        //    var resultBytes = new Uint8Array(result);
        //    var sourceBytes = new Uint8Array(this.data.buffer, begin, end - begin);
        //    resultBytes.set(sourceBytes);
        //    return resultBytes.buffer;
        //}
        /**
         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
         * @return 双精度（64 位）浮点数
         * @method ByteArray#readDouble
         */
        Pan3dByteArray.prototype.readDouble = function () {
            //if (!this.validate(ByteArray.SIZE_OF_FLOAT64)) return null;
            var value = this.data.getFloat64(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_FLOAT64;
            return value;
        };
        /**
         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
         * @return 单精度（32 位）浮点数
         * @method ByteArray#readFloat
         */
        Pan3dByteArray.prototype.readFloat = function () {
            //if (!this.validate(ByteArray.SIZE_OF_FLOAT32)) return null;
            var value = this.data.getFloat32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_FLOAT32;
            return value;
        };
        /**
         * 从字节流中读取一个带符号的 32 位整数
         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
         * @method ByteArray#readFloat
         */
        Pan3dByteArray.prototype.readInt = function () {
            //if (!this.validate(ByteArray.SIZE_OF_INT32)) return null;
            var value = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_INT32;
            return value;
        };
        Pan3dByteArray.prototype.getInt = function () {
            var value = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            return value;
        };
        Pan3dByteArray.prototype.readInt32 = function () {
            return this.readInt();
        };
        //        public readInt64():Int64{
        //            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
        //
        //            var low = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
        //            this.position += ByteArray.SIZE_OF_INT32;
        //            var high = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
        //            this.position += ByteArray.SIZE_OF_INT32;
        //            return new Int64(low,high);
        //        }
        /**
         * 使用指定的字符集从字节流中读取指定长度的多字节字符串
         * @param length 要从字节流中读取的字节数
         * @param charSet 表示用于解释字节的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
         * @return UTF-8 编码的字符串
         * @method ByteArray#readMultiByte
         */
        //public readMultiByte(length:number, charSet?:string):string {
        //    if (!this.validate(length)) return null;
        //
        //    return "";
        //}
        /**
         * 从字节流中读取一个带符号的 16 位整数
         * @return 介于 -32768 和 32767 之间的 16 位带符号整数
         * @method ByteArray#readShort
         */
        Pan3dByteArray.prototype.readShort = function () {
            //if (!this.validate(ByteArray.SIZE_OF_INT16)) return null;
            if (this.position >= this.data.byteLength) {
                //console.log("readShort")
            }
            var value = this.data.getInt16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_INT16;
            return value;
        };
        //自己添加的读无符号短整行2个字节 Pan
        Pan3dByteArray.prototype.readFloatTwoByte = function ($scaleNum) {
            return this.readShort() / $scaleNum;
            // return (this.readByte() * 127 + this.readByte()) / $scaleNum
        };
        //自己添加的读无符号短整行1个字节 lyf
        Pan3dByteArray.prototype.readFloatOneByte = function () {
            return (this.readByte() + 128) / 256;
        };
        /**
         * 从字节流中读取无符号的字节
         * @return 介于 0 和 255 之间的 32 位无符号整数
         * @method ByteArray#readUnsignedByte
         */
        Pan3dByteArray.prototype.readUnsignedByte = function () {
            //if (!this.validate(ByteArray.SIZE_OF_UINT8)) return null;
            return this.data.getUint8(this.position++);
        };
        Pan3dByteArray.prototype.readUint8 = function () {
            return this.readUnsignedByte();
        };
        Pan3dByteArray.prototype.readInt8 = function () {
            return this.readByte();
        };
        /**
         * 从字节流中读取一个无符号的 32 位整数
         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
         * @method ByteArray#readUnsignedInt
         */
        Pan3dByteArray.prototype.readUnsignedInt = function () {
            //if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
            var value = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_UINT32;
            return value;
        };
        Pan3dByteArray.prototype.readUint32 = function () {
            return this.readUnsignedInt();
        };
        Pan3dByteArray.prototype.readUint64 = function () {
            return this.readDouble();
        };
        //public readVariableSizedUnsignedInt():number {
        //    var i:number;
        //    var c:number = this.data.getUint8(this.position++);
        //    if (c != 0xFF) {
        //        i = c << 8;
        //        c = this.data.getUint8(this.position++);
        //        i |= c;
        //    }
        //    else {
        //        c = this.data.getUint8(this.position++);
        //        i = c << 16;
        //        c = this.data.getUint8(this.position++);
        //        i |= c << 8;
        //        c = this.data.getUint8(this.position++);
        //        i |= c;
        //    }
        //    return i;
        //}
        //		public readUnsignedInt64():UInt64{
        //            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
        //
        //            var low = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
        //            this.position += ByteArray.SIZE_OF_UINT32;
        //            var high = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
        //            this.position += ByteArray.SIZE_OF_UINT32;
        //			return new UInt64(low,high);
        //        }
        /**
         * 从字节流中读取一个无符号的 16 位整数
         * @return 介于 0 和 65535 之间的 16 位无符号整数
         * @method ByteArray#readUnsignedShort
         */
        Pan3dByteArray.prototype.readUnsignedShort = function () {
            //if (!this.validate(ByteArray.SIZE_OF_UINT16)) return null;
            var value = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_UINT16;
            return value;
        };
        Pan3dByteArray.prototype.readUint16 = function () {
            return this.readUnsignedShort();
        };
        /**
         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
         * @return UTF-8 编码的字符串
         * @method ByteArray#readUTF
         */
        Pan3dByteArray.prototype.readUTF = function () {
            //if (!this.validate(ByteArray.SIZE_OF_UINT16)) return null;
            var length = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_UINT16;
            if (length > 0) {
                return this.readUTFBytes(length);
            }
            else {
                return "";
            }
        };
        Pan3dByteArray.prototype.readString = function () {
            return this.readUTF();
        };
        /**
         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
         * @param length 指明 UTF-8 字节长度的无符号短整型数
         * @return 由指定长度的 UTF-8 字节组成的字符串
         * @method ByteArray#readUTFBytes
         */
        Pan3dByteArray.prototype.readUTFBytes = function (length) {
            //if (!this.validate(length)) return null;
            var bytes = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
            this.position += length;
            /*var bytes: Uint8Array = new Uint8Array(new ArrayBuffer(length));
             for (var i = 0; i < length; i++) {
             bytes[i] = this.data.getUint8(this.position++);
             }*/
            return this.decodeUTF8(bytes);
        };
        Pan3dByteArray.prototype.readStringByLen = function (len) {
            return this.readUTFBytes(len);
        };
        //public readStandardString(length:number):string {
        //    if (!this.validate(length)) return null;
        //
        //    var str:string = "";
        //
        //    for (var i = 0; i < length; i++) {
        //        str += String.fromCharCode(this.data.getUint8(this.position++));
        //    }
        //    return str;
        //}
        //public readStringTillNull(keepEvenByte:boolean = true):string {
        //
        //    var str:string = "";
        //    var num:number = 0;
        //    while (this.bytesAvailable > 0) {
        //        var b:number = this.data.getUint8(this.position++);
        //        num++;
        //        if (b != 0) {
        //            str += String.fromCharCode(b);
        //        } else {
        //            if (keepEvenByte && num % 2 != 0) {
        //                this.position++;
        //            }
        //            break;
        //        }
        //    }
        //    return str;
        //}
        /**
         * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
         * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
         * @method ByteArray#writeBoolean
         */
        Pan3dByteArray.prototype.writeBoolean = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_BOOLEAN);
            this.data.setUint8(this.position++, value ? 1 : 0);
        };
        /**
         * 在字节流中写入一个字节
         * 使用参数的低 8 位。忽略高 24 位
         * @param value 一个 32 位整数。低 8 位将被写入字节流
         * @method ByteArray#writeByte
         */
        Pan3dByteArray.prototype.writeByte = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT8);
            this.data.setInt8(this.position++, value);
        };
        Pan3dByteArray.prototype.writeUint8 = function (value) {
            this.writeByte(value);
        };
        Pan3dByteArray.prototype.writeInt8 = function (value) {
            this.writeByte(value);
        };
        //public writeUnsignedByte(value:number):void {
        //    this.validateBuffer(ByteArray.SIZE_OF_UINT8);
        //
        //    this.data.setUint8(this.position++, value);
        //}
        /**
         * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
         * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
         * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
         * @param bytes ByteArray 对象
         * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
         * @param length 一个无符号整数，表示在缓冲区中的写入范围
         * @method ByteArray#writeBytes
         */
        Pan3dByteArray.prototype.writeBytes = function (bytes, offset, length) {
            if (offset === void 0) { offset = 0; }
            if (length === void 0) { length = 0; }
            var writeLength;
            if (offset < 0) {
                return;
            }
            if (length < 0) {
                return;
            }
            else if (length == 0) {
                writeLength = bytes.length - offset;
            }
            else {
                writeLength = Math.min(bytes.length - offset, length);
            }
            if (writeLength > 0) {
                this.validateBuffer(writeLength);
                var tmp_data = new DataView(bytes.buffer);
                for (var i = offset; i < writeLength + offset; i++) {
                    this.data.setUint8(this.position++, tmp_data.getUint8(i));
                }
            }
        };
        /**
         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
         * @param value 双精度（64 位）浮点数
         * @method ByteArray#writeDouble
         */
        Pan3dByteArray.prototype.writeDouble = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_FLOAT64);
            this.data.setFloat64(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_FLOAT64;
        };
        /**
         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
         * @param value 单精度（32 位）浮点数
         * @method ByteArray#writeFloat
         */
        Pan3dByteArray.prototype.writeFloat = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_FLOAT32);
            this.data.setFloat32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_FLOAT32;
        };
        /**
         * 在字节流中写入一个带符号的 32 位整数
         * @param value 要写入字节流的整数
         * @method ByteArray#writeInt
         */
        Pan3dByteArray.prototype.writeInt = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT32);
            this.data.setInt32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_INT32;
        };
        Pan3dByteArray.prototype.writeInt32 = function (value) {
            this.writeInt(value);
        };
        /**
         * 使用指定的字符集将多字节字符串写入字节流
         * @param value 要写入的字符串值
         * @param charSet 表示要使用的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
         * @method ByteArray#writeMultiByte
         */
        //public writeMultiByte(value:string, charSet:string):void {
        //
        //}
        /**
         * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
         * @param value 32 位整数，该整数的低 16 位将被写入字节流
         * @method ByteArray#writeShort
         */
        Pan3dByteArray.prototype.writeUnsignedShort = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT16);
            this.data.setInt16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_INT16;
        };
        Pan3dByteArray.prototype.writeUint16 = function (value) {
            this.writeUnsignedShort(value);
        };
        Pan3dByteArray.prototype.writeUint64 = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_FLOAT64);
            this.data.setFloat64(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_FLOAT64;
        };
        Pan3dByteArray.prototype.writeShort = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT16);
            this.data.setUint16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_INT16;
        };
        //public writeUnsignedShort(value:number):void {
        //    this.validateBuffer(ByteArray.SIZE_OF_UINT16);
        //
        //    this.data.setUint16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
        //    this.position += ByteArray.SIZE_OF_UINT16;
        //}
        /**
         * 在字节流中写入一个无符号的 32 位整数
         * @param value 要写入字节流的无符号整数
         * @method ByteArray#writeUnsignedInt
         */
        Pan3dByteArray.prototype.writeUnsignedInt = function (value) {
            this.validateBuffer(Pan3dByteArray.SIZE_OF_UINT32);
            this.data.setUint32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_UINT32;
        };
        Pan3dByteArray.prototype.writeUint32 = function (value) {
            this.writeUnsignedInt(value);
        };
        /**
         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
         * @param value 要写入的字符串值
         * @method ByteArray#writeUTF
         */
        Pan3dByteArray.prototype.writeUTF = function (value) {
            var utf8bytes = this.encodeUTF8(value);
            var length = utf8bytes.length;
            this.validateBuffer(Pan3dByteArray.SIZE_OF_UINT16 + length);
            this.data.setUint16(this.position, length, this.endian === Endian.LITTLE_ENDIAN);
            this.position += Pan3dByteArray.SIZE_OF_UINT16;
            this._writeUint8Array(utf8bytes, false);
        };
        Pan3dByteArray.prototype.writeString = function (value) {
            var strByteArray = new Pan3dByteArray();
            strByteArray.writeUTFBytes(value);
            this.writeUint16(strByteArray.length + 1); //标识字符数量
            this.writeBytes(strByteArray, 0, strByteArray.length);
            this.writeByte(0);
        };
        Pan3dByteArray.prototype.writeStringByLen = function (value, len) {
            var curPos = this.position;
            this.writeUTFBytes(value);
            this.position = curPos + len;
            this.length = this.position + 1;
        };
        Pan3dByteArray.prototype.readVector3D = function ($w) {
            if ($w === void 0) { $w = false; }
            var $p = new Pan3d.Vector3D;
            $p.x = this.readFloat();
            $p.y = this.readFloat();
            $p.z = this.readFloat();
            if ($w) {
                $p.w = this.readFloat();
            }
            return $p;
        };
        /**
         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
         * @param value 要写入的字符串值
         * @method ByteArray#writeUTFBytes
         */
        Pan3dByteArray.prototype.writeUTFBytes = function (value) {
            this._writeUint8Array(this.encodeUTF8(value));
        };
        Pan3dByteArray.prototype.toString = function () {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
        };
        /**
         * 将 Uint8Array 写入字节流
         * @param bytes 要写入的Uint8Array
         * @param validateBuffer
         */
        Pan3dByteArray.prototype._writeUint8Array = function (bytes, validateBuffer) {
            if (validateBuffer === void 0) { validateBuffer = true; }
            if (validateBuffer) {
                this.validateBuffer(this.position + bytes.length);
            }
            for (var i = 0; i < bytes.length; i++) {
                this.data.setUint8(this.position++, bytes[i]);
            }
        };
        /**
         * @private
         */
        Pan3dByteArray.prototype.validate = function (len) {
            //len += this.data.byteOffset;
            if (this.data.byteLength > 0 && this._position + len <= this.data.byteLength) {
                return true;
            }
            else {
                //$error(1025);
            }
        };
        /**********************/
        /*  PRIVATE METHODS   */
        /**********************/
        Pan3dByteArray.prototype.validateBuffer = function (len, needReplace) {
            if (needReplace === void 0) { needReplace = false; }
            this.write_position = len > this.write_position ? len : this.write_position;
            len += this._position;
            if (this.data.byteLength < len || needReplace) {
                var tmp = new Uint8Array(new ArrayBuffer(len + this.BUFFER_EXT_SIZE));
                var length = Math.min(this.data.buffer.byteLength, len + this.BUFFER_EXT_SIZE);
                tmp.set(new Uint8Array(this.data.buffer, 0, length));
                this.buffer = tmp.buffer;
            }
        };
        /**
         * UTF-8 Encoding/Decoding
         */
        Pan3dByteArray.prototype.encodeUTF8 = function (str) {
            var pos = 0;
            var codePoints = this.stringToCodePoints(str);
            var outputBytes = [];
            while (codePoints.length > pos) {
                var code_point = codePoints[pos++];
                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
                    this.encoderError(code_point);
                }
                else if (this.inRange(code_point, 0x0000, 0x007f)) {
                    outputBytes.push(code_point);
                }
                else {
                    var count, offset;
                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
                        count = 1;
                        offset = 0xC0;
                    }
                    else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
                        count = 2;
                        offset = 0xE0;
                    }
                    else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
                        count = 3;
                        offset = 0xF0;
                    }
                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
                    while (count > 0) {
                        var temp = this.div(code_point, Math.pow(64, count - 1));
                        outputBytes.push(0x80 + (temp % 64));
                        count -= 1;
                    }
                }
            }
            return new Uint8Array(outputBytes);
        };
        Pan3dByteArray.prototype.decodeUTF8 = function (data) {
            var fatal = false;
            var pos = 0;
            var result = "";
            var code_point;
            var utf8_code_point = 0;
            var utf8_bytes_needed = 0;
            var utf8_bytes_seen = 0;
            var utf8_lower_boundary = 0;
            while (data.length > pos) {
                var _byte = data[pos++];
                if (_byte === this.EOF_byte) {
                    if (utf8_bytes_needed !== 0) {
                        code_point = this.decoderError(fatal);
                    }
                    else {
                        code_point = this.EOF_code_point;
                    }
                }
                else {
                    if (utf8_bytes_needed === 0) {
                        if (this.inRange(_byte, 0x00, 0x7F)) {
                            code_point = _byte;
                        }
                        else {
                            if (this.inRange(_byte, 0xC2, 0xDF)) {
                                utf8_bytes_needed = 1;
                                utf8_lower_boundary = 0x80;
                                utf8_code_point = _byte - 0xC0;
                            }
                            else if (this.inRange(_byte, 0xE0, 0xEF)) {
                                utf8_bytes_needed = 2;
                                utf8_lower_boundary = 0x800;
                                utf8_code_point = _byte - 0xE0;
                            }
                            else if (this.inRange(_byte, 0xF0, 0xF4)) {
                                utf8_bytes_needed = 3;
                                utf8_lower_boundary = 0x10000;
                                utf8_code_point = _byte - 0xF0;
                            }
                            else {
                                this.decoderError(fatal);
                            }
                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
                            code_point = null;
                        }
                    }
                    else if (!this.inRange(_byte, 0x80, 0xBF)) {
                        utf8_code_point = 0;
                        utf8_bytes_needed = 0;
                        utf8_bytes_seen = 0;
                        utf8_lower_boundary = 0;
                        pos--;
                        code_point = this.decoderError(fatal, _byte);
                    }
                    else {
                        utf8_bytes_seen += 1;
                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
                        if (utf8_bytes_seen !== utf8_bytes_needed) {
                            code_point = null;
                        }
                        else {
                            var cp = utf8_code_point;
                            var lower_boundary = utf8_lower_boundary;
                            utf8_code_point = 0;
                            utf8_bytes_needed = 0;
                            utf8_bytes_seen = 0;
                            utf8_lower_boundary = 0;
                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                                code_point = cp;
                            }
                            else {
                                code_point = this.decoderError(fatal, _byte);
                            }
                        }
                    }
                }
                //Decode string
                if (code_point !== null && code_point !== this.EOF_code_point) {
                    if (code_point <= 0xFFFF) {
                        if (code_point > 0)
                            result += String.fromCharCode(code_point);
                    }
                    else {
                        code_point -= 0x10000;
                        result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
                        result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
                    }
                }
            }
            return result;
        };
        Pan3dByteArray.prototype.encoderError = function (code_point) {
            //$error(1026, code_point);
        };
        Pan3dByteArray.prototype.decoderError = function (fatal, opt_code_point) {
            if (fatal) {
                //$error(1027);
            }
            return opt_code_point || 0xFFFD;
        };
        Pan3dByteArray.prototype.inRange = function (a, min, max) {
            return min <= a && a <= max;
        };
        Pan3dByteArray.prototype.div = function (n, d) {
            return Math.floor(n / d);
        };
        Pan3dByteArray.prototype.stringToCodePoints = function (string) {
            /** @type {Array.<number>} */
            var cps = [];
            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
            var i = 0, n = string.length;
            while (i < string.length) {
                var c = string.charCodeAt(i);
                if (!this.inRange(c, 0xD800, 0xDFFF)) {
                    cps.push(c);
                }
                else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                    cps.push(0xFFFD);
                }
                else { // (inRange(c, 0xD800, 0xDBFF))
                    if (i === n - 1) {
                        cps.push(0xFFFD);
                    }
                    else {
                        var d = string.charCodeAt(i + 1);
                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
                            var a = c & 0x3FF;
                            var b = d & 0x3FF;
                            i += 1;
                            cps.push(0x10000 + (a << 10) + b);
                        }
                        else {
                            cps.push(0xFFFD);
                        }
                    }
                }
                i += 1;
            }
            return cps;
        };
        Pan3dByteArray.SIZE_OF_BOOLEAN = 1;
        Pan3dByteArray.SIZE_OF_INT8 = 1;
        Pan3dByteArray.SIZE_OF_INT16 = 2;
        Pan3dByteArray.SIZE_OF_INT32 = 4;
        Pan3dByteArray.SIZE_OF_UINT8 = 1;
        Pan3dByteArray.SIZE_OF_UINT16 = 2;
        Pan3dByteArray.SIZE_OF_UINT32 = 4;
        Pan3dByteArray.SIZE_OF_FLOAT32 = 4;
        Pan3dByteArray.SIZE_OF_FLOAT64 = 8;
        return Pan3dByteArray;
    }());
    Pan3d.Pan3dByteArray = Pan3dByteArray;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Pan3dByteArray.js.map