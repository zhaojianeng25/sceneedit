var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var core;
(function (core) {
    var obj;
    (function (obj_1) {
        var GuidObjectTable = /** @class */ (function (_super) {
            __extends(GuidObjectTable, _super);
            function GuidObjectTable() {
                var _this = _super.call(this) || this;
                _this._objs = new Object;
                //std::function<uint32_t(const string&)> 从字符串转换出整形用于节约 
                _this._hashGUID = null;
                //以对象ID的hash希，整型作为key的对象表
                _this._u_2_guid = new Object();
                //用于每次发包的缓存 		 
                _this._packet_pool = new Array;
                !GuidObjectTable.applyBlock_tmp_obj && (GuidObjectTable.applyBlock_tmp_obj = new obj_1.GuidObject);
                _this._newEvent = new obj_1.NetEventDispatcher(obj_1.NetEventDispatcher.KEY_TYPE_STRING);
                _this._delEvent = new obj_1.NetEventDispatcher(obj_1.NetEventDispatcher.KEY_TYPE_STRING);
                _this._indexer = new obj_1.StringIndexer();
                return _this;
            }
            GuidObjectTable.prototype.Get = function (k) {
                return (this._objs[k]);
            };
            Object.defineProperty(GuidObjectTable.prototype, "indexer", {
                /**
                 * 索引器
                 */
                get: function () {
                    return this._indexer;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 创建对象
             * @param k
             * @return
             */
            GuidObjectTable.prototype.CreateObject = function (k, u) {
                var p = this._objs[k];
                if (!p) {
                    p = new obj_1.GuidObject();
                    p.guid = k;
                    p.oid = u;
                }
                this.AttachObject(p);
                return p;
            };
            /**
             * 释放对象
             * @param o
             */
            GuidObjectTable.prototype.ReleaseObject = function (o) {
                // var k:string = o.guid;
                // var p:GuidObject = this._objs[k];
                // if(!p)
                // 	return;
                this.DetachObject(o);
            };
            GuidObjectTable.prototype.ReleaseKey = function (k) {
                var p = this._objs[k];
                if (!p)
                    return;
                this.ReleaseObject(p);
            };
            GuidObjectTable.prototype.AttachObject = function (o) {
                if (o == null)
                    loge("AttachObject,o==null");
                this._objs[o.guid] = o;
                //加入对象分类
                this._indexer.insert(o);
                //如果hash函数不为空则要维护一个key对照表
                if (o.oid != 0) {
                    this._u_2_guid[o.oid] = o.guid;
                }
            };
            GuidObjectTable.prototype.DetachObject = function (o) {
                this._indexer.remove(o.guid);
                delete this._objs[o.guid];
                //如果hash函数不为空则要维护一个key对照表	
                var oid = o.oid;
                if (oid != 0) {
                    delete this._u_2_guid[oid];
                }
            };
            /**
             * 应用对象更新数据包
             * @param bytes
             */
            GuidObjectTable.prototype.ApplyBlock = function (bytes) {
                while (bytes.bytesAvailable) {
                    var flags = bytes.readUnsignedByte();
                    var guid; //= bytes.readUTF();	
                    var u_guid = 0;
                    //先读出标志，如果是整形guid则转换成字符串
                    if (flags & obj_1.SyncEvent.OBJ_OPT_U_GUID) {
                        //cur_obj.u_guid
                        u_guid = bytes.readUnsignedShort();
                        if (flags & obj_1.SyncEvent.OBJ_OPT_NEW) {
                            guid = bytes.readUTF();
                        }
                        else {
                            guid = this._u_2_guid[u_guid] ? this._u_2_guid[u_guid] : "";
                        }
                    }
                    else {
                        guid = bytes.readUTF();
                    }
                    var cur_obj = this.Get(guid);
                    //如果是删除则触发事件
                    if (flags & obj_1.SyncEvent.OBJ_OPT_DELETE) {
                        this._delEvent.DispatchString(guid, cur_obj);
                        this.ReleaseKey(guid);
                        cur_obj && cur_obj.dispose();
                        continue;
                    }
                    //从流中读出对象,如果没有找到该对象则读取后抛弃
                    if (!cur_obj) {
                        if (flags & obj_1.SyncEvent.OBJ_OPT_NEW) {
                            cur_obj = this.CreateObject(guid, u_guid);
                        }
                        else {
                            cur_obj = GuidObjectTable.applyBlock_tmp_obj;
                        }
                    }
                    if (cur_obj != GuidObjectTable.applyBlock_tmp_obj) {
                        cur_obj.oid = u_guid;
                    }
                    cur_obj.ReadFrom(flags, bytes);
                    //如果是新对象则触发下事件
                    if (flags & obj_1.SyncEvent.OBJ_OPT_NEW) {
                        this._newEvent.DispatchString(cur_obj.guid.charAt(0), cur_obj);
                    }
                }
                return true;
            };
            /*根据查询定符串返回对象列表*/
            GuidObjectTable.prototype.SearchObject = function (s, vec) {
                //TODO:这里的正则对象性能优化
                var regex = new RegExp(s);
                vec.length = 0;
                for (var k in this._objs) {
                    if (regex.test(k))
                        vec.push(k);
                }
            };
            /*提供一种机制用于遍历所有的对象列表 委托格式 f(obj:GuidObject):void*/
            GuidObjectTable.prototype.ForEachObject = function (f) {
                for (var o in this._objs) {
                    f(this._objs[o]);
                }
            };
            /**
             * 调用远程创建对象，成功的时候回调
             * @param guid
             * @param cb function(o:GuidObject):void
             */
            GuidObjectTable.prototype.RegisterCreateEvent = function (guid, caller, cb) {
                this._newEvent.AddListenString(guid, caller, cb);
            };
            /**
             * 调用远程删除对象,成功时回调
             * @param guid
             * @param cb function(o:GuidObject):void
             */
            GuidObjectTable.prototype.RegisterReleaseEvent = function (guid, caller, cb) {
                this._delEvent.AddListenString(guid, caller, cb);
            };
            /**
             * 从池中分配新的数据包,如果没有包号就不要写入
             * @param optCode
             * @return
             */
            GuidObjectTable.prototype.newPacket = function (optCode) {
                if (optCode === void 0) { optCode = 0; }
                var pkt = null;
                if (this._packet_pool.length == 0) {
                    pkt = new ByteArray;
                    pkt.endian = Endian.LITTLE_ENDIAN;
                }
                else {
                    pkt = this._packet_pool.shift();
                    pkt.clear();
                }
                if (optCode)
                    pkt.writeShort(optCode);
                return pkt;
            };
            /**
             * 回收数据包到包池
             * @param pkt
             */
            GuidObjectTable.prototype.freePacket = function (pkt) {
                pkt.clear();
                this._packet_pool.push(pkt);
            };
            /**
             * 清理对象
             */
            GuidObjectTable.prototype.clearObjs = function () {
                for (var key in this._objs) {
                    if (this._objs[key] instanceof obj_1.GuidObject) {
                        var obj = this._objs[key];
                        this.removeObject(obj.guid, obj);
                        obj.dispose();
                    }
                    delete this._objs[key];
                }
            };
            /*移除对象*/
            GuidObjectTable.prototype.removeObject = function (guid, obj) {
                this._delEvent.DispatchString(guid, obj);
                this.ReleaseKey(guid);
            };
            GuidObjectTable.prototype.saveObjsToString = function () {
                var byteArray = new ByteArray;
                for (var o in this._objs) {
                    this._objs[o].WriteCreateBlock(byteArray);
                }
                return byteArray.stringValue;
            };
            GuidObjectTable.prototype.loadObjsFormString = function (data) {
                var byteArray = new ByteArray();
                byteArray.stringValue = data;
                this.ApplyBlock(byteArray);
            };
            GuidObjectTable.prototype.dispose = function () {
                this._newEvent.Clear();
                this._delEvent.Clear();
                this._indexer.Clear();
                for (var key in this._objs) {
                    var k = this._objs[key];
                    if (k) {
                        k.dispose();
                    }
                }
            };
            return GuidObjectTable;
        }(obj_1.SyncEvent));
        obj_1.GuidObjectTable = GuidObjectTable;
    })(obj = core.obj || (core.obj = {}));
})(core || (core = {}));
//# sourceMappingURL=GuidObjectTable.js.map