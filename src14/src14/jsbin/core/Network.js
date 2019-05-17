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
    core.EV_CONNECT = -100; //连接事件
    core.EV_CLOSED = -200;
    core.EV_ERROR = -300;
    core.LOADED_PROTO = -400; //加载完成proto
    // 流量信息
    var FlowInfo = /** @class */ (function () {
        function FlowInfo() {
            this.codes = []; // 协议流量信息
            this.total = 0; // 总流量
        }
        FlowInfo.prototype.add = function (optcode, msg) {
            if (msg instanceof ArrayBuffer) {
                var len = msg.byteLength;
                this.total += len;
                this.codes[optcode] |= 0;
                this.codes[optcode] += len;
            }
        };
        return FlowInfo;
    }());
    core.FlowInfo = FlowInfo;
    var Network = /** @class */ (function (_super) {
        __extends(Network, _super);
        function Network(v) {
            if (v === void 0) { v = ""; }
            var _this = _super.call(this) || this;
            _this._hanlders = [];
            _this.ProtoBuf = Browser.window.protobuf;
            _this.protoTypePool = {};
            _this.rspdTemplateMap = {};
            _this.sequence = 0;
            Network._instance = _this;
            _this._name = v;
            //不使用laya.socket提供的解包服务
            _this.disableInput = true;
            _this.on(LEvent.OPEN, _this, _this.disptchHanlder, [core.EV_CONNECT]);
            _this.on(LEvent.CLOSE, _this, _this.duanxian, [core.EV_CLOSED]);
            _this.on(LEvent.ERROR, _this, _this.disptchHanlder, [core.EV_ERROR]);
            //this.on(LEvent.MESSAGE, this, this.onMessageReveived);
            _this.addHanlder(core.EV_CONNECT, _this, _this.sc_conn);
            _this.on(LEvent.MESSAGE, _this, _this.sc_message);
            //this.addHanlder(EV_CONNECT, this, this.sc_message);
            _this.ProtoBuf.load("common/proto/ActionCodeProtoc.proto", _this.onActionCodeProtoLoaded);
            return _this;
        }
        Object.defineProperty(Network.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (v) {
                this._name = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Network.prototype, "sendFlowInfo", {
            get: function () {
                return this._sendFlowInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Network.prototype, "receiveFlowInfo", {
            get: function () {
                return this._receiveFlowInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Network.prototype, "sendRecordData", {
            get: function () {
                return this._sendRecordData;
            },
            enumerable: true,
            configurable: true
        });
        Network.prototype.addCmdFilter = function (cmd) {
            !this._cmdFilter && (this._cmdFilter = []);
            this._cmdFilter.indexOf(cmd) == -1 && this._cmdFilter.push(cmd);
        };
        Network.prototype.removeCmdFilter = function (cmd) {
            if (!this._cmdFilter) {
                return;
            }
            var idx = this._cmdFilter.indexOf(cmd);
            if (idx != -1) {
                this._cmdFilter.splice(idx, 1);
            }
            !this._cmdFilter.length && (this._cmdFilter = null);
        };
        Network.prototype.duanxian = function () {
            this.event(game.modules.setBasics.models.TYPE_LINK_BROKEN_EVENT);
        };
        //开始连接
        Network.prototype.connect = function () {
            if (!this.connected) {
                // if (!this._address || !this._port) {
                //     loge("请先设置IP及端口");
                //     return;
                // }
                this.encipher = new core.Encipher();
                /*let httpsHead = 'https:';
                if (location.href.split('//')[0] == httpsHead) {
                    let url = "wss://" + this._address + ":" + this._port;
                    this.connectByUrl(url);
                }
                else {
                    super.connect(this._address,this._port);
                } */
                this.connectByUrl('ws://localhost:10000/test');
                // this.connectByUrl('ws://192.168.229.2:10000/test');
            }
        };
        Network.prototype.sc_conn = function () {
            console.log("socket 连接成功！");
            //game.modules.createrole.models.LoginModel.getInstance().isLinkSuccess = true;
            //this.ProtoBuf.load("res/awesome.proto", this.onAssetsLoaded);
            //this.ProtoBuf.load("common/proto/ActionCodeProtoc.proto", this.onActionCodeProtoLoaded);
            //console.log("sc_conn this", this);
        };
        Network.prototype.onActionCodeProtoLoaded = function (err, root) {
            if (err) {
                throw err;
            }
            //console.log("onActionCodeProtoLoaded this", this);
            //console.log("onActionCodeProtoLoaded root", root);
            Network._instance.protoTypePool.ActionCode = root.lookup("grace.proto.msg.ActionCode");
            Network._instance.protoTypePool.PBMessage = root.lookup("grace.proto.msg.PBMessage");
            console.log("onActionCodeProtoLoaded ActionCode", root.lookup("grace.proto.msg.ActionCode"));
            // Network._instance.connectByUrl(Browser.window.server);
        };
        Object.defineProperty(Network.prototype, "flowStatistics", {
            /*private sc_message(data: any): void {
                console.log("\n收到网络消息 socket sc_message:", data);
                if (data instanceof ArrayBuffer) {
    
                    var byte: Byte = new Byte(data);
                    //console.log("sc_message byte",byte);
                    var uint8Array: Uint8Array = byte.getUint8Array(0, byte.length);
                    var pbm = Network._instance.protoTypePool.PBMessage.decode(uint8Array);
                    console.log("pbm.actionCode:", pbm.actionCode);
                    var actionCode = pbm.actionCode - 786432;
                    //console.log("socket pbm:", pbm);
                    let byteArray:ByteArray = new ByteArray();
                    byteArray._writeUint8Array(pbm.data);
                    byteArray.position = 0;
                    byteArray.endian = Byte.BIG_ENDIAN;
                    //var obj: any = this.readPacket(actionCode, pbm.data);
                    var obj: any = this.readPacket(actionCode, byteArray);
                    if (obj == null) {
                        //this.disptchHanlder(actionCode, pbm.data)
                        this.disptchHanlder(actionCode, byteArray)
                    }
                    else {
                        //RspdTempLateClass.read(obj,pbm.data);
                        this.disptchHanlder(actionCode, obj)
                    }
                } else if (typeof data == "string") {
                    logd("Network:onMessageReveived " + data);
                } else {
                    logd("Network:onMessageReveived msg type unknow")
                }
                this.input.clear();
    
            }*/
            /*public sendMsg(actionCode: any, buffer: any): void {
                console.log("\n发送网络消息 socket sendMsg:", buffer);
                var base = Network._instance.protoTypePool.PBMessage.create(
                    {
                        //actionCode: 786432 + actionCode,
                        actionCode: actionCode,
                        sequence: this.sequence,
                        data: buffer
                    });
    
                var buffer1: any = Network._instance.protoTypePool.PBMessage.encode(base).finish();
                console.log("sendTo actionCode content buffer:", actionCode, buffer.length, buffer);
                this.send(buffer1);
                console.log("sendTo actionCode,base,buffer1", actionCode, base, buffer1);
                this.sequence++;
            }*/
            // 是否开启流量统计
            set: function (v) {
                if (v) {
                    this._sendFlowInfo = new FlowInfo();
                    this._receiveFlowInfo = new FlowInfo();
                }
                else {
                    this._sendFlowInfo = null;
                    this._receiveFlowInfo = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Network.prototype, "url", {
            get: function () {
                return this._socket ? this._socket.url : "";
            },
            enumerable: true,
            configurable: true
        });
        //设置远程
        Network.prototype.setRemotePoint = function (addr, p) {
            this._address = addr;
            this._port = p;
        };
        Network.prototype.addRspdTemplate = function (optcode, rspdTemplate) {
            this.rspdTemplateMap[optcode] = rspdTemplate;
        };
        // 增加网络包处理器
        Network.prototype.addHanlder = function (optcode, caller, method, args) {
            var list = this._hanlders[optcode];
            if (list == null) {
                list = [];
                this._hanlders[optcode] = list;
            }
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var struct_1 = list_1[_i];
                if (struct_1.caller == caller && struct_1.method == method) {
                    // 有可能同一帧里先删除了后添加
                    struct_1.dispose = false;
                    return;
                }
            }
            var struct = ObjectPools.malloc(HanlderStruct);
            struct.caller = caller;
            struct.method = method;
            struct.args = args;
            list.push(struct);
        };
        Network.prototype.disptchHanlder = function (optcode, pkt) {
            var list = this._hanlders[optcode];
            if (list == null) {
                return;
            }
            for (var i = 0; i < list.length; i++) {
                var struct = list[i];
                var dispose = struct.dispose;
                if (!dispose) {
                    var position = void 0;
                    if (pkt instanceof ByteArray) {
                        position = pkt.position;
                    }
                    dispose = struct.method.apply(struct.caller, [optcode, pkt].concat(struct.args));
                    position && (pkt.position = position);
                }
                if (dispose) {
                    list.splice(i, 1);
                    ObjectPools.free(struct);
                    i--;
                }
            }
        };
        // 移除网络包处理器
        Network.prototype.removeHanlder = function (optcode, caller, method) {
            var list = this._hanlders[optcode];
            if (list == null) {
                return;
            }
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var struct = list[i];
                if (struct.caller == caller && struct.method == method) {
                    // 标记为释放
                    struct.dispose = true;
                }
            }
        };
        Network.prototype.sendMsg = function (actionCode, buffer) {
            console.log("\n发送网络消息 socket sendMsg:", actionCode, buffer.length);
            /*var base = Network._instance.protoTypePool.PBMessage.create(
                {
                    //actionCode: 786432 + actionCode,
                    actionCode: actionCode,
                    sequence: this.sequence,
                    data: buffer
                });
            //console.log("sendTo buffer", buffer);

            var buffer1: any = Network._instance.protoTypePool.PBMessage.encode(base).finish();
            console.log("sendTo actionCode content buffer:", actionCode, buffer.length, buffer);
            this.send(buffer1);
            console.log("sendTo actionCode,base,buffer1", actionCode, base, buffer1);*/
            var actionCodeUint8Array = ByteArrayUtils.compact_uint32(actionCode);
            var sizeUint8Array = ByteArrayUtils.compact_uint32(buffer.length);
            var byteArray = new ByteArray();
            byteArray.position = 0;
            //byteArray.writeInt32(actionCode);
            //byteArray.writeInt32(buffer.length);
            byteArray.writeUint8Array(actionCodeUint8Array);
            byteArray.writeUint8Array(sizeUint8Array);
            byteArray.writeBytes(buffer);
            this.send(byteArray.buffer);
            console.log("sendTo actionCode content byteArray:", actionCode, byteArray.length);
            this.sequence++;
        };
        Network.prototype.sc_message = function (data) {
            console.log("\n收到网络消息 socket sc_message");
            if (data instanceof ArrayBuffer) {
                var byte = new Byte(data);
                //byte.writeArrayBuffer
                //console.log("sc_message byte",byte);
                var uint8Array = byte.getUint8Array(0, byte.length);
                var pbm = Network._instance.protoTypePool.PBMessage.decode(uint8Array);
                console.log("pbm.actionCode:", pbm.actionCode);
                var actionCode = pbm.actionCode;
                console.log("socket pbm:", actionCode);
                var byteArray = new ByteArray();
                byteArray.writeUint8Array(pbm.data);
                byteArray.position = 0;
                byteArray.endian = Byte.BIG_ENDIAN;
                //var obj: any = this.readPacket(actionCode, pbm.data);
                var obj = hanlder.ResponderProtocols.getInstance().readPacket(actionCode, byteArray);
                if (obj == null) {
                    //this.disptchHanlder(actionCode, pbm.data)
                    this.disptchHanlder(actionCode, byteArray);
                }
                else {
                    //RspdTempLateClass.read(obj,pbm.data);
                    this.disptchHanlder(actionCode, obj);
                }
            }
            else if (typeof data == "string") {
                logd("Network:onMessageReveived " + data);
            }
            else {
                logd("Network:onMessageReveived msg type unknow");
            }
            this.input.clear();
        };
        Network.SEND_MSG_NOT_CONNECTED = 'SEND_MSG_NOT_CONNECTED';
        return Network;
    }(Laya.Socket));
    core.Network = Network;
})(core || (core = {}));
//# sourceMappingURL=Network.js.map