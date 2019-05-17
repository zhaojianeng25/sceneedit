/**
* name
*/
var hanlder;
(function (hanlder) {
    var RequesterProtocols = /** @class */ (function () {
        function RequesterProtocols() {
            //super();
            RequesterProtocols._instance = this;
        }
        RequesterProtocols.prototype.sendMsg = function (optcode, msg) {
            //throw Error("send msg not implementation.");
            Network._instance.sendMsg(optcode, msg);
        };
        RequesterProtocols.prototype.c2s_login = function (username, password, logintype, gameid, gamekey, serverid, selfchannel, childchannel, deviceid, mid, reserved1, reserved2) {
            if (logintype === void 0) { logintype = 1; }
            if (gameid === void 0) { gameid = 115; }
            if (gamekey === void 0) { gamekey = ""; }
            if (serverid === void 0) { serverid = ""; }
            if (selfchannel === void 0) { selfchannel = ""; }
            if (childchannel === void 0) { childchannel = ""; }
            if (deviceid === void 0) { deviceid = ""; }
            if (mid === void 0) { mid = "**"; }
            if (reserved1 === void 0) { reserved1 = 116; }
            if (reserved2 === void 0) { reserved2 = ""; }
            var byteArray = new ByteArray();
            ByteArrayUtils.writeUtf16String(username, byteArray);
            ByteArrayUtils.writeUtf16String(password, byteArray);
            byteArray.writeUint32(logintype); //登录类型(sdk类型) 1:locojoy platform sdk
            byteArray.writeUint32(gameid); // 
            ByteArrayUtils.writeUtf16String(gamekey, byteArray); //appsecrert
            ByteArrayUtils.writeUtf16String(serverid, byteArray);
            ByteArrayUtils.writeUtf16String(selfchannel, byteArray); //渠道号 //appid
            ByteArrayUtils.writeUtf16String(childchannel, byteArray); //子渠道号 code
            ByteArrayUtils.writeUtf16String(deviceid, byteArray); //设备唯一标识
            ByteArrayUtils.writeUtf16String(mid, byteArray);
            byteArray.writeUint32(reserved1);
            ByteArrayUtils.writeUtf16String(reserved2, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CLogin, byteArray);
        };
        //txx
        //获取角色列表
        RequesterProtocols.prototype.c2s_CRoleList = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CRoleList, byteArray);
        };
        //客户端请求返回角色选择界面
        RequesterProtocols.prototype.c2s_CReturnRoleList = function () {
            /*let messageObj: any = {};
            var proto = Network._instance.protoTypePool.CReturnRoleList.fromObject(messageObj);
            console.log("CReturnRoleList proto", proto);
            var buffer: any = Network._instance.protoTypePool.CReturnRoleList.encode(proto).finish();*/
            //this.sendMsg(ProtocolsEnum.CReturnRoleList, buffer);
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CReturnRoleList, byteArray);
        };
        RequesterProtocols.prototype.c2s_create_role = function (nickname, school, shape) {
            //////////////////////////////////////////////
            /*let messageObj: any = {};
            messageObj.name = nickname;
            messageObj.school = school;
            messageObj.shape = shape;
            messageObj.code = "0";
            var proto = Network._instance.protoTypePool.CCreateRole.fromObject(messageObj);
            console.log("CCreateRole proto", proto);
            var buffer: any = Network._instance.protoTypePool.CCreateRole.encode(proto).finish();
            this.sendMsg(ProtocolsEnum.CCreateRole, buffer);*/
            //let byteArray:Laya.Byte = new Laya.Byte();	
            var byteArray = new ByteArray();
            //byteArray.endian = Endian.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(nickname, byteArray);
            byteArray.writeUint32(school);
            byteArray.writeUint32(shape);
            /*var valueUint8Array:Uint8Array = ByteArrayUtils.compact_uint32(school);
            byteArray._writeUint8Array(valueUint8Array);
            valueUint8Array = ByteArrayUtils.compact_uint32(shape);
            byteArray._writeUint8Array(valueUint8Array);*/
            ByteArrayUtils.writeUtf16String("x0y", byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CCreateRole, byteArray);
        };
        //进入游戏
        RequesterProtocols.prototype.c2s_CEnterWorld = function (roleid, rolesnum) {
            /*let messageObj: any = {};
            messageObj.roleid = roleid;//角色ID
            messageObj.rolesnum = rolesnum;//同屏数量
            var proto = Network._instance.protoTypePool.CEnterWorld.fromObject(messageObj);
            console.log("c2s_CEnterWorld CEnterWorld proto", proto);
            var buffer: any = Network._instance.protoTypePool.CEnterWorld.encode(proto).finish();
            this.sendMsg(ProtocolsEnum.CEnterWorld, buffer);*/
            var byteArray = new ByteArray();
            console.log("c2s_CEnterWorld roleId:", roleid);
            //byteArray.writeLong(roleid);
            ByteArrayUtils.writeLong(roleid, byteArray);
            byteArray.writeInt32(rolesnum);
            //byteArray.writeInt32(888);
            this.sendMsg(hanlder.ProtocolsEnum.CEnterWorld, byteArray);
        };
        // 客户端向服务器发送 剧本播放结束消息
        RequesterProtocols.prototype.c2s_CSendRoundPlayEnd = function (actionTimes) {
            /*let messageObj: any = {};
            messageObj.action = action;
            var proto = Network._instance.protoTypePool.CSendRoundPlayEnd.fromObject(messageObj);
            console.log("CSendRoundPlayEnd proto", proto);
            var buffer: any = Network._instance.protoTypePool.CSendRoundPlayEnd.encode(proto).finish();
            this.sendMsg(ProtocolsEnum.CSendRoundPlayEnd, buffer);*/
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(actionTimes.length);
            var index;
            for (index = 0; index < actionTimes.length; index++) {
                byteArray.writeInt32(actionTimes[index]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CSendRoundPlayEnd, byteArray);
        };
        //客户端向服务器发送操作选择消息
        RequesterProtocols.prototype.c2s_CSendAction = function (action, isrole, autooperate) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(action.operationType);
            byteArray.writeInt32(action.aim);
            byteArray.writeInt32(action.operationID);
            byteArray.writeByte(isrole);
            byteArray.writeByte(autooperate);
            this.sendMsg(hanlder.ProtocolsEnum.CSendAction, byteArray);
            /*let messageObj: any = {};
            messageObj.action = action;
            messageObj.isrole = isrole;
            messageObj.autooperate = autooperate;
            var proto = Network._instance.protoTypePool.CSendAction.fromObject(messageObj);
            console.log("CSendAction proto", proto);
            var buffer: any = Network._instance.protoTypePool.CSendAction.encode(proto).finish();
            this.sendMsg(ProtocolsEnum.CSendAction, buffer);*/
        };
        RequesterProtocols.prototype.c2s_attention_goods = function (attentype, id, attentiontype, itemtype) {
            // let messageObj: any = {};
            // messageObj.attentype = attentype;
            // messageObj.id = id;
            // messageObj.attentiontype = attentiontype;
            // messageObj.itemtype = itemtype;
            // var proto = Network._instance.protoTypePool.CAttentionGoods.fromObject(messageObj);
            // console.log("CAttentionGoods proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CAttentionGoods.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CAttentionGoods, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(attentype);
            ByteArrayUtils.writeLong(id, byteArray);
            byteArray.writeInt32(attentiontype);
            byteArray.writeInt32(itemtype);
            this.sendMsg(hanlder.ProtocolsEnum.CAttentionGoods, byteArray);
        };
        RequesterProtocols.prototype.c2s_re_marketup = function (itemtype, id, money) {
            // let messageObj: any = {};
            // messageObj.itemtype = itemtype;
            // messageObj.id = id;
            // messageObj.money = money;
            // var proto = Network._instance.protoTypePool.CReMarketUp.fromObject(messageObj);
            // console.log("CReMarketUp proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CReMarketUp.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CReMarketUp, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(itemtype);
            ByteArrayUtils.writeLong(id, byteArray);
            byteArray.writeInt32(money);
            this.sendMsg(hanlder.ProtocolsEnum.CReMarketUp, byteArray);
        };
        RequesterProtocols.prototype.c2s_exchange_shop = function (shopid, goodsid, num, buytype) {
            // let messageObj: any = {};
            // messageObj.shopid = shopid;
            // messageObj.goodsid = goodsid;
            // messageObj.num = num;
            // messageObj.buytype = buytype;
            // var proto = Network._instance.protoTypePool.CExchangeShop.fromObject(messageObj);
            // console.log("CExchangeShop proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CExchangeShop.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CExchangeShop, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(shopid);
            byteArray.writeInt32(goodsid);
            byteArray.writeInt32(num);
            byteArray.writeInt32(buytype);
            this.sendMsg(hanlder.ProtocolsEnum.CExchangeShop, byteArray);
        };
        RequesterProtocols.prototype.c2s_exchange_currency = function (srcmoneytype, dstmoneytype, money) {
            var bytearray = new ByteArray();
            bytearray.endian = Laya.Byte.BIG_ENDIAN;
            bytearray.writeUint32(srcmoneytype);
            bytearray.writeUint32(dstmoneytype);
            bytearray.writeUint32(money);
            this.sendMsg(hanlder.ProtocolsEnum.CExchangeCurrency, bytearray);
        };
        RequesterProtocols.prototype.c2s_get_marketupprice = function (containertype, key) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(containertype);
            byteArray.writeInt32(key);
            this.sendMsg(hanlder.ProtocolsEnum.CGetMarketUpPrice, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_pettips = function (roleid, key, tipstype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            byteArray.writeInt32(key);
            byteArray.writeInt32(tipstype);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketPetTips, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_containerbrowse = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CMarketContainerBrowse, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_tradelog = function () {
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CMarketTradeLog.fromObject(messageObj);
            // console.log("CMarketTradeLog proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CMarketTradeLog.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CMarketTradeLog, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CMarketTradeLog, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_down = function (downtype, key) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(downtype);
            byteArray.writeInt32(key);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketDown, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_up = function (containertype, key, num, price) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(containertype);
            byteArray.writeInt32(key);
            byteArray.writeInt32(num);
            byteArray.writeInt32(price);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketUp, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_buy = function (id, saleRoleid, itemid, num) {
            // let messageObj: any = {};
            // messageObj.id = id;
            // messageObj.saleRoleid = saleRoleid;
            // messageObj.itemid = itemid;
            // messageObj.num = num;
            // var proto = Network._instance.protoTypePool.CMarketBuy.fromObject(messageObj);
            // console.log("CMarketBuy proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CMarketBuy.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CMarketBuy, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            ByteArrayUtils.writeLong(id, byteArray);
            ByteArrayUtils.writeLong(saleRoleid, byteArray);
            byteArray.writeInt32(itemid);
            byteArray.writeInt32(num);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketBuy, byteArray);
        };
        RequesterProtocols.prototype.c2s_market_browse = function (browsetype, firstno, twono, threeno, itemtype, limitmin, limitmax, currpage, priceSort, issearch) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(browsetype);
            byteArray.writeInt32(firstno);
            byteArray.writeInt32(twono);
            var arrSize = threeno.length;
            byteArray.writeByte(arrSize);
            for (var i = 0; i < arrSize; i++) {
                byteArray.writeInt32(threeno[i]);
            }
            byteArray.writeInt32(itemtype);
            byteArray.writeInt32(limitmin);
            byteArray.writeInt32(limitmax);
            byteArray.writeInt32(currpage);
            byteArray.writeInt32(priceSort);
            byteArray.writeInt32(issearch);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketBrowse, byteArray);
        };
        RequesterProtocols.prototype.c2s_query_limit = function (querytype, goodsids) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(querytype);
            var arrSize = goodsids.length;
            var sizeUint8Array = ByteArrayUtils.compact_uint32(arrSize);
            byteArray.writeUint8Array(sizeUint8Array);
            for (var i = 0; i < arrSize; i++) {
                byteArray.writeInt32(goodsids[i]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CQueryLimit, byteArray);
        };
        RequesterProtocols.prototype.c2s_requst_shopprice = function (shopid) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(shopid);
            this.sendMsg(hanlder.ProtocolsEnum.CRequstShopPrice, byteArray);
        };
        RequesterProtocols.prototype.c2s_chamber_ofcommerceshop = function (shopid, itemkey, goodsid, num, buytype) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(shopid);
            byteArray.writeInt32(itemkey);
            byteArray.writeInt32(goodsid);
            byteArray.writeInt32(num);
            byteArray.writeInt32(buytype);
            this.sendMsg(hanlder.ProtocolsEnum.CChamberOfCommerceShop, byteArray);
        };
        RequesterProtocols.prototype.c2s_buy_npcshop = function (shopid, goodsid, num, buytype) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(shopid);
            byteArray.writeInt32(goodsid);
            byteArray.writeInt32(num);
            byteArray.writeInt32(buytype);
            this.sendMsg(hanlder.ProtocolsEnum.CBuyNpcShop, byteArray);
        };
        RequesterProtocols.prototype.c2s_buy_mallshop = function (shopid, taskid, goodsid, num) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(shopid);
            byteArray.writeInt32(taskid);
            byteArray.writeInt32(goodsid);
            byteArray.writeInt32(num);
            this.sendMsg(hanlder.ProtocolsEnum.CBuyMallShop, byteArray);
        };
        RequesterProtocols.prototype.c2s_change_gem = function (gemKey, newGemItemId) {
            var messageObj = {};
            messageObj.gemKey = gemKey;
            messageObj.newGemItemId = newGemItemId;
            var proto = Network._instance.protoTypePool.CChangeGem.fromObject(messageObj);
            console.log("CChangeGem proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeGem.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeGem, buffer);
        };
        RequesterProtocols.prototype.c2s_change_weapon = function (srcWeaponKey, newWeaponTypeId) {
            var messageObj = {};
            messageObj.srcWeaponKey = srcWeaponKey;
            messageObj.newWeaponTypeId = newWeaponTypeId;
            var proto = Network._instance.protoTypePool.CChangeWeapon.fromObject(messageObj);
            console.log("CChangeWeapon proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeWeapon.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeWeapon, buffer);
        };
        RequesterProtocols.prototype.c2s_change_schoolextinfo = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CChangeSchoolExtInfo.fromObject(messageObj);
            console.log("CChangeSchoolExtInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeSchoolExtInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeSchoolExtInfo, buffer);
        };
        RequesterProtocols.prototype.c2s_change_school = function (newShape, newSchool) {
            var messageObj = {};
            messageObj.newShape = newShape;
            messageObj.newSchool = newSchool;
            var proto = Network._instance.protoTypePool.CChangeSchool.fromObject(messageObj);
            console.log("CChangeSchool proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeSchool.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeSchool, buffer);
        };
        RequesterProtocols.prototype.c2s_old_schoollist = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.COldSchoolList.fromObject(messageObj);
            console.log("COldSchoolList proto", proto);
            var buffer = Network._instance.protoTypePool.COldSchoolList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.COldSchoolList, buffer);
        };
        RequesterProtocols.prototype.c2s_shouxi_shape = function (shouxikey) {
            var messageObj = {};
            messageObj.shouxikey = shouxikey;
            var proto = Network._instance.protoTypePool.CShouxiShape.fromObject(messageObj);
            console.log("CShouxiShape proto", proto);
            var buffer = Network._instance.protoTypePool.CShouxiShape.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CShouxiShape, buffer);
        };
        RequesterProtocols.prototype.c2s_vote_candidate = function (candidateid, shouxikey) {
            var messageObj = {};
            messageObj.candidateid = candidateid;
            messageObj.shouxikey = shouxikey;
            var proto = Network._instance.protoTypePool.CVoteCandidate.fromObject(messageObj);
            console.log("CVoteCandidate proto", proto);
            var buffer = Network._instance.protoTypePool.CVoteCandidate.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CVoteCandidate, buffer);
        };
        RequesterProtocols.prototype.c2s_send_electorwords = function (electorwords) {
            var messageObj = {};
            messageObj.electorwords = electorwords;
            var proto = Network._instance.protoTypePool.CSendElectorWords.fromObject(messageObj);
            console.log("CSendElectorWords proto", proto);
            var buffer = Network._instance.protoTypePool.CSendElectorWords.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendElectorWords, buffer);
        };
        //在排行榜界面，请求某信息，服务器会返回并抛出SRankRoleInfo2消息
        RequesterProtocols.prototype.c2s_rank_getpetinfo = function (roleid, infotype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(roleid);
            byteArray.writeInt32(infotype);
            this.sendMsg(hanlder.ProtocolsEnum.CRankGetPetInfo, byteArray);
        };
        //请求排行榜上玩家、宠物、帮派信息查看
        RequesterProtocols.prototype.c2s_rank_getinfo = function (ranktype, rank, id) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(ranktype);
            byteArray.writeInt32(rank);
            ByteArrayUtils.writeLong(id, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRankGetInfo, byteArray);
        };
        //请求榜单上宠物的详细信息常看
        RequesterProtocols.prototype.c2s_request_rankpetdata = function (uniquePetId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(uniquePetId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRankPetData, byteArray);
        };
        //请求榜单的详细信息
        RequesterProtocols.prototype.c2s_request_ranklist = function (ranktype, page) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(ranktype);
            byteArray.writeInt32(page);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRankList, byteArray);
        };
        RequesterProtocols.prototype.c2s_resolve_gem = function (itemkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(itemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CResolveGem, byteArray);
        };
        RequesterProtocols.prototype.c2s_resolve_equip = function (itemkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(itemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CResolveEquip, byteArray);
        };
        RequesterProtocols.prototype.c2s_make_equip = function (equipID, makeType) {
            // let messageObj: any = {};
            // messageObj.equipID = equipID;
            // messageObj.makeType = makeType;
            // var proto = Network._instance.protoTypePool.CMakeEquip.fromObject(messageObj);
            // console.log("CMakeEquip proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CMakeEquip.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CMakeEquip, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(equipID);
            byteArray.writeInt16(makeType);
            this.sendMsg(hanlder.ProtocolsEnum.CMakeEquip, byteArray);
        };
        RequesterProtocols.prototype.c2s_add_blackrole = function (roleId) {
            // let messageObj: any = {};
            // messageObj.roleId = roleId;
            // var proto = Network._instance.protoTypePool.CAddBlackRole.fromObject(messageObj);
            // console.log("CAddBlackRole proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CAddBlackRole.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CAddBlackRole, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CAddBlackRole, byteArray);
        };
        RequesterProtocols.prototype.c2s_remove_blackrole = function (roleId) {
            // let messageObj: any = {};
            // messageObj.roleId = roleId;
            // var proto = Network._instance.protoTypePool.CRemoveBlackRole.fromObject(messageObj);
            // console.log("CRemoveBlackRole proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRemoveBlackRole.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRemoveBlackRole, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRemoveBlackRole, byteArray);
        };
        RequesterProtocols.prototype.c2s_search_blackrole = function (roleId) {
            // let messageObj: any = {};
            // messageObj.roleId = roleId;
            // var proto = Network._instance.protoTypePool.CSearchBlackRole.fromObject(messageObj);
            // console.log("CSearchBlackRole proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CSearchBlackRole.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CSearchBlackRole, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSearchBlackRole, byteArray);
        };
        RequesterProtocols.prototype.c2s_req_blackroles = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqBlackRoles.fromObject(messageObj);
            console.log("CReqBlackRoles proto", proto);
            var buffer = Network._instance.protoTypePool.CReqBlackRoles.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqBlackRoles, buffer);
        };
        RequesterProtocols.prototype.c2s_recover_petinfo = function (uniqId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(uniqId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRecoverPetInfo, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_recover = function (uniqId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(uniqId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CPetRecover, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_recoverlist = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CPetRecoverList, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_levelreset = function (petkey, itemkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(itemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CPetLevelReset, byteArray);
        };
        RequesterProtocols.prototype.c2s_shen_shouyangcheng = function (petkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            this.sendMsg(hanlder.ProtocolsEnum.CShenShouYangCheng, byteArray);
        };
        RequesterProtocols.prototype.c2s_shen_shouchongzhi = function (petkey, needpetid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(needpetid);
            this.sendMsg(hanlder.ProtocolsEnum.CShenShouChongZhi, byteArray);
        };
        RequesterProtocols.prototype.c2s_shen_shouduihuan = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CShenShouDuiHuan, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_sell = function (petkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            this.sendMsg(hanlder.ProtocolsEnum.CPetSell, byteArray);
        };
        RequesterProtocols.prototype.c2s_get_petinfo = function (roleid, petkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            byteArray.writeInt32(petkey);
            this.sendMsg(hanlder.ProtocolsEnum.CGetPetInfo, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_depotcolumnaddcapacity = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CPetDepotColumnAddCapacity, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_expcultivate = function (petkey, itemid, itemnum) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(itemid);
            byteArray.writeByte(itemnum);
            this.sendMsg(hanlder.ProtocolsEnum.CPetExpCultivate, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_aptitudecultivate = function (petkey, aptid, itemkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(aptid);
            byteArray.writeInt32(itemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CPetAptitudeCultivate, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_skillcertification = function (petkey, skillId, isconfirm) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(skillId);
            byteArray.writeInt32(isconfirm);
            this.sendMsg(hanlder.ProtocolsEnum.CPetSkillCertification, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_synthesize = function (petkey1, petkey2) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey1);
            byteArray.writeInt32(petkey2);
            this.sendMsg(hanlder.ProtocolsEnum.CPetSynthesize, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_wash = function (petkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            this.sendMsg(hanlder.ProtocolsEnum.CPetWash, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_resetpoint = function (petkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            this.sendMsg(hanlder.ProtocolsEnum.CPetResetPoint, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_setautoaddpoint = function (petkey, str, iq, cons, endu, agi) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(str);
            byteArray.writeInt32(iq);
            byteArray.writeInt32(cons);
            byteArray.writeInt32(endu);
            byteArray.writeInt32(agi);
            this.sendMsg(hanlder.ProtocolsEnum.CPetSetAutoAddPoint, byteArray);
        };
        RequesterProtocols.prototype.c2s_free_pet1 = function (petkeys) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(petkeys.length);
            var index;
            var intInfo;
            for (index = 0; index < petkeys.length; index++) {
                intInfo = petkeys[index];
                byteArray.writeInt32(intInfo);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CFreePet1, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_learnskillbybook = function (petkey, bookkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(bookkey);
            this.sendMsg(hanlder.ProtocolsEnum.CPetLearnSkillByBook, byteArray);
        };
        RequesterProtocols.prototype.c2s_show_petinfo = function (masterid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(masterid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CShowPetInfo, byteArray);
        };
        RequesterProtocols.prototype.c2s_mod_petname = function (petkey, petname) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            ByteArrayUtils.writeUtf16String(petname, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CModPetName, byteArray);
        };
        /** 宠物仓库存取宠物
         * @param srccolumnid 源宠物栏
         * @param petkey 存或取的宠物key
         * @param dstcolumnid 目的宠物栏
         * @param npckey 仓库npckey
         */
        RequesterProtocols.prototype.c2s_move_petcolumn = function (srccolumnid, petkey, dstcolumnid, npckey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(srccolumnid);
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(dstcolumnid);
            ByteArrayUtils.writeLong(npckey, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CMovePetColumn, byteArray);
        };
        /** 客户端请求宠物栏信息
         * @param columnid 宠物栏id
         * @param npckey 仓库老板的npckey
         */
        RequesterProtocols.prototype.c2s_get_petcolumninfo = function (columnid, npckey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(columnid);
            ByteArrayUtils.writeLong(npckey, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CGetPetcolumnInfo, byteArray);
        };
        RequesterProtocols.prototype.c2s_set_fightpetrest = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CSetFightPetRest, byteArray);
        };
        RequesterProtocols.prototype.c2s_set_fightpet = function (petkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            this.sendMsg(hanlder.ProtocolsEnum.CSetFightPet, byteArray);
        };
        RequesterProtocols.prototype.c2s_pet_addpoint = function (petkey, str, iq, cons, endu, agi) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(str);
            byteArray.writeInt32(iq);
            byteArray.writeInt32(cons);
            byteArray.writeInt32(endu);
            byteArray.writeInt32(agi);
            this.sendMsg(hanlder.ProtocolsEnum.CPetAddPoint, byteArray);
        };
        RequesterProtocols.prototype.c2s_show_petoff = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CShowPetOff.fromObject(messageObj);
            console.log("CShowPetOff proto", proto);
            var buffer = Network._instance.protoTypePool.CShowPetOff.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CShowPetOff, buffer);
        };
        RequesterProtocols.prototype.c2s_show_pet = function (petkey) {
            var messageObj = {};
            messageObj.petkey = petkey;
            var proto = Network._instance.protoTypePool.CShowPet.fromObject(messageObj);
            console.log("CShowPet proto", proto);
            var buffer = Network._instance.protoTypePool.CShowPet.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CShowPet, buffer);
        };
        RequesterProtocols.prototype.c2s_abandon_macth = function (npckey) {
            var messageObj = {};
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CAbandonMacth.fromObject(messageObj);
            console.log("CAbandonMacth proto", proto);
            var buffer = Network._instance.protoTypePool.CAbandonMacth.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAbandonMacth, buffer);
        };
        RequesterProtocols.prototype.c2s_exit_copy = function (gotoType) {
            var messageObj = {};
            messageObj.gotoType = gotoType;
            var proto = Network._instance.protoTypePool.CExitCopy.fromObject(messageObj);
            console.log("CExitCopy proto", proto);
            var buffer = Network._instance.protoTypePool.CExitCopy.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CExitCopy, buffer);
        };
        RequesterProtocols.prototype.c2s_request_activityanswerquestion = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRequestActivityAnswerQuestion.fromObject(messageObj);
            console.log("CRequestActivityAnswerQuestion proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestActivityAnswerQuestion.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestActivityAnswerQuestion, buffer);
        };
        RequesterProtocols.prototype.c2s_open_chest = function (chestnpckey) {
            var messageObj = {};
            messageObj.chestnpckey = chestnpckey;
            var proto = Network._instance.protoTypePool.COpenChest.fromObject(messageObj);
            console.log("COpenChest proto", proto);
            var buffer = Network._instance.protoTypePool.COpenChest.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.COpenChest, buffer);
        };
        RequesterProtocols.prototype.c2s_answer_activityquestion = function (questionid, answerid, xiangguanid) {
            var messageObj = {};
            messageObj.questionid = questionid;
            messageObj.answerid = answerid;
            messageObj.xiangguanid = xiangguanid;
            var proto = Network._instance.protoTypePool.CAnswerActivityQuestion.fromObject(messageObj);
            console.log("CAnswerActivityQuestion proto", proto);
            var buffer = Network._instance.protoTypePool.CAnswerActivityQuestion.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAnswerActivityQuestion, buffer);
        };
        RequesterProtocols.prototype.c2s_activity_answerquestionhelp = function (questionid) {
            var messageObj = {};
            messageObj.questionid = questionid;
            var proto = Network._instance.protoTypePool.CActivityAnswerQuestionHelp.fromObject(messageObj);
            console.log("CActivityAnswerQuestionHelp proto", proto);
            var buffer = Network._instance.protoTypePool.CActivityAnswerQuestionHelp.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CActivityAnswerQuestionHelp, buffer);
        };
        RequesterProtocols.prototype.c2s_grab_activityreward = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGrabActivityReward.fromObject(messageObj);
            console.log("CGrabActivityReward proto", proto);
            var buffer = Network._instance.protoTypePool.CGrabActivityReward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGrabActivityReward, buffer);
        };
        RequesterProtocols.prototype.c2s_give_upquestion = function (questiontype, npckey) {
            var messageObj = {};
            messageObj.questiontype = questiontype;
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CGiveUpQuestion.fromObject(messageObj);
            console.log("CGiveUpQuestion proto", proto);
            var buffer = Network._instance.protoTypePool.CGiveUpQuestion.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGiveUpQuestion, buffer);
        };
        RequesterProtocols.prototype.c2s_general_summoncommand = function (summontype, npckey, agree) {
            var messageObj = {};
            messageObj.summontype = summontype;
            messageObj.npckey = npckey;
            messageObj.agree = agree;
            var proto = Network._instance.protoTypePool.CGeneralSummonCommand.fromObject(messageObj);
            console.log("CGeneralSummonCommand proto", proto);
            var buffer = Network._instance.protoTypePool.CGeneralSummonCommand.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGeneralSummonCommand, buffer);
        };
        RequesterProtocols.prototype.c2s_has_fortunewheel = function (npckey) {
            var messageObj = {};
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CHasFortuneWheel.fromObject(messageObj);
            console.log("CHasFortuneWheel proto", proto);
            var buffer = Network._instance.protoTypePool.CHasFortuneWheel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CHasFortuneWheel, buffer);
        };
        RequesterProtocols.prototype.c2s_start_fortunewheel = function (npckey) {
            var messageObj = {};
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CStartFortuneWheel.fromObject(messageObj);
            console.log("CStartFortuneWheel proto", proto);
            var buffer = Network._instance.protoTypePool.CStartFortuneWheel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CStartFortuneWheel, buffer);
        };
        RequesterProtocols.prototype.c2s_winner_changetask = function (acceptflag) {
            var messageObj = {};
            messageObj.acceptflag = acceptflag;
            var proto = Network._instance.protoTypePool.CWinnerChangeTask.fromObject(messageObj);
            console.log("CWinnerChangeTask proto", proto);
            var buffer = Network._instance.protoTypePool.CWinnerChangeTask.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CWinnerChangeTask, buffer);
        };
        RequesterProtocols.prototype.c2s_query_impexamstate = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CQueryImpExamState.fromObject(messageObj);
            console.log("CQueryImpExamState proto", proto);
            var buffer = Network._instance.protoTypePool.CQueryImpExamState.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQueryImpExamState, buffer);
        };
        RequesterProtocols.prototype.c2s_imp_examhelp = function (impexamtype) {
            var bytearray = new ByteArray();
            bytearray.endian = Laya.Byte.BIG_ENDIAN;
            bytearray.writeByte(impexamtype);
            this.sendMsg(hanlder.ProtocolsEnum.CImpExamHelp, bytearray);
        };
        RequesterProtocols.prototype.c2s_send_impexamanswer = function (impexamtype, answerid, assisttype) {
            var bytearray = new ByteArray();
            bytearray.endian = Laya.Byte.BIG_ENDIAN;
            bytearray.writeByte(impexamtype);
            bytearray.writeInt32(answerid);
            bytearray.writeByte(assisttype);
            this.sendMsg(hanlder.ProtocolsEnum.CSendImpExamAnswer, bytearray);
        };
        RequesterProtocols.prototype.c2s_apply_impexam = function (impexamtype, operate) {
            var byteArray = new ByteArray;
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(impexamtype);
            byteArray.writeByte(operate);
            this.sendMsg(hanlder.ProtocolsEnum.CApplyImpExam, byteArray);
        };
        RequesterProtocols.prototype.c2s_confirm_impexam = function (impexamtype, operate) {
            var messageObj = {};
            messageObj.impexamtype = impexamtype;
            messageObj.operate = operate;
            var proto = Network._instance.protoTypePool.CConfirmImpExam.fromObject(messageObj);
            console.log("CConfirmImpExam proto", proto);
            var buffer = Network._instance.protoTypePool.CConfirmImpExam.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CConfirmImpExam, buffer);
        };
        //发布公会群消息
        RequesterProtocols.prototype.c2s_CClanMessage = function (message) {
            var byteArray = new ByteArray();
            ByteArrayUtils.writeUtf16String(message, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CClanMessage, byteArray);
        };
        //驱逐成员
        RequesterProtocols.prototype.c2s_CFireMember = function (memberroleid, reasontype) {
            var byteArray = new ByteArray();
            ByteArrayUtils.writeLong(memberroleid, byteArray);
            byteArray.writeInt32(reasontype);
            this.sendMsg(hanlder.ProtocolsEnum.CFireMember, byteArray);
        };
        //更改职务
        RequesterProtocols.prototype.c2s_CChangePosition = function (memberroleid, position) {
            var byteArray = new ByteArray();
            ByteArrayUtils.writeLong(memberroleid, byteArray);
            byteArray.writeInt32(position);
            this.sendMsg(hanlder.ProtocolsEnum.CChangePosition, byteArray);
        };
        //公会邀请
        RequesterProtocols.prototype.c2s_CClanInvitation = function (guestroleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(guestroleid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CClanInvitation, byteArray);
        };
        //更改宗旨
        RequesterProtocols.prototype.c2s_CChangeClanAim = function (newaim) {
            // let messageObj: any = {};
            // messageObj.newaim = newaim;
            // var proto = Network._instance.protoTypePool.CChangeClanAim.fromObject(messageObj);
            // console.log("CChangeClanAim proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CChangeClanAim.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CChangeClanAim, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(newaim, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CChangeClanAim, byteArray);
        };
        //
        RequesterProtocols.prototype.c2s_CAcceptOrRefuseApply = function (applyroleid, accept) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(applyroleid, byteArray);
            byteArray.writeByte(accept);
            this.sendMsg(hanlder.ProtocolsEnum.CAcceptOrRefuseApply, byteArray);
        };
        //清除申请者列表
        RequesterProtocols.prototype.c2s_CClearApplyList = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CClearApplyList, byteArray);
        };
        //客户端请求申请加入公会的人员列表
        RequesterProtocols.prototype.c2s_CRequestApplyList = function () {
            /*let messageObj: any = {};
            var proto = Network._instance.protoTypePool.CRequestApplyList.fromObject(messageObj);
            console.log("CRequestApplyList proto", proto);
            var buffer: any = Network._instance.protoTypePool.CRequestApplyList.encode(proto).finish();*/
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestApplyList, byteArray);
        };
        //申请入会
        RequesterProtocols.prototype.c2s_CApplyClan = function (clanid) {
            // let messageObj: any = {};
            // messageObj.clanid = clanid;
            // var proto = Network._instance.protoTypePool.CApplyClan.fromObject(messageObj);
            // console.log("CApplyClan proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CApplyClan.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CApplyClan, buffer);
            var byteArray = new ByteArray();
            ByteArrayUtils.writeLong(clanid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CApplyClan, byteArray);
        };
        //主动脱离公会
        RequesterProtocols.prototype.c2s_CLeaveClan = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CLeaveClan, byteArray);
        };
        //客户端请求创建公会
        RequesterProtocols.prototype.c2s_CCreateClan = function (clanname, clanaim) {
            // let messageObj: any = {};
            // messageObj.clanname = clanname;
            // messageObj.clanaim = clanaim;
            // var proto = Network._instance.protoTypePool.CCreateClan.fromObject(messageObj);
            // console.log("CCreateClan proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CCreateClan.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CCreateClan, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(clanname, byteArray);
            ByteArrayUtils.writeUtf16String(clanaim, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CCreateClan, byteArray);
        };
        //客户端请求公会列表：没有公会
        RequesterProtocols.prototype.c2s_COpenClanList = function (currpage) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(currpage);
            this.sendMsg(hanlder.ProtocolsEnum.COpenClanList, byteArray);
        };
        //客户端请求公会界面：有公会
        RequesterProtocols.prototype.c2s_COpenClan = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.COpenClan, byteArray);
        };
        //购买药房的药品
        RequesterProtocols.prototype.c2s_CBuyMedic = function (itemid, itemnum) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(itemid);
            byteArray.writeInt32(itemnum);
            this.sendMsg(hanlder.ProtocolsEnum.CBuyMedic, byteArray);
        };
        //请求药房信息
        RequesterProtocols.prototype.c2s_COpenClanMedic = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.COpenClanMedic, byteArray);
        };
        /** 放弃当前正在探索的天机仙令任务
         * @param questid 要放弃的任务id(活动类型)
         */
        RequesterProtocols.prototype.c2s_CAbandonAnYe = function (questid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(questid);
            this.sendMsg(hanlder.ProtocolsEnum.CAbandonAnYe, byteArray);
        };
        /** 开启天机仙令中探索模式
         * @param taskpos 任务栏位
         */
        RequesterProtocols.prototype.c2s_CLengendAnYetask = function (taskpos) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(taskpos);
            this.sendMsg(hanlder.ProtocolsEnum.CLengendAnYetask, byteArray);
        };
        /** 首次参加天机仙令的时间
         * @param jointime 当前时间戳
        */
        RequesterProtocols.prototype.c2s_CSetAnYeJoinTime = function (jointime) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(jointime, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSetAnYeJoinTime, byteArray);
        };
        /** 在天机仙令界面任性一下（即申请用金币或声望完成任务）
         * @param taskpos 任务栏位
         * @param moneytype 此处只分金币与声望类型的货币
        */
        RequesterProtocols.prototype.c2s_CRenXingAnYeTask = function (taskpos, moneytype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(taskpos);
            byteArray.writeInt32(moneytype);
            this.sendMsg(hanlder.ProtocolsEnum.CRenXingAnYeTask, byteArray);
        };
        /** 在天机仙令界面上交目标对象
         * @param taskpos 任务栏位
         * @param taskid 任务id
         * @param taskrole 完成任务的角色id（可本人角色，也可他人角色）
         * @param submittype 上交类型（宠物、道具）
         * @param things 目标对象的key与value
        */
        RequesterProtocols.prototype.c2s_CSubmitThings = function (taskpos, taskid, taskrole, submittype, things) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(taskpos);
            byteArray.writeInt32(taskid);
            ByteArrayUtils.writeLong(taskrole, byteArray);
            byteArray.writeInt32(submittype);
            var sizeUint8Array = ByteArrayUtils.compact_uint32(things.length);
            byteArray.writeUint8Array(sizeUint8Array);
            for (var i = 0; i < things.length; i++) {
                byteArray.writeInt32(things[i].key);
                byteArray.writeInt32(things[i].num);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CSubmitThings, byteArray);
        };
        //客户端请求查询任务状态
        RequesterProtocols.prototype.c2s_CQueryCircleTaskState = function (questid) {
            var byteArray = new ByteArray();
            byteArray.writeUint32(questid);
            this.sendMsg(hanlder.ProtocolsEnum.CQueryCircleTaskState, byteArray);
        };
        //客户端选择货币类型任性任务
        RequesterProtocols.prototype.c2s_CRenXingCircleTask = function (serviceid, moneytype) {
            var messageObj = {};
            messageObj.serviceid = serviceid;
            messageObj.moneytype = moneytype;
            var proto = Network._instance.protoTypePool.CRenXingCircleTask.fromObject(messageObj);
            console.log("CRenXingCircleTask proto", proto);
            var buffer = Network._instance.protoTypePool.CRenXingCircleTask.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRenXingCircleTask, buffer);
        };
        //请求跳转到职业巡逻地图
        RequesterProtocols.prototype.c2s_CReqGotoPatrol = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqGotoPatrol.fromObject(messageObj);
            console.log("CReqGotoPatrol proto", proto);
            var buffer = Network._instance.protoTypePool.CReqGotoPatrol.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqGotoPatrol, buffer);
        };
        //问卷调查答案
        RequesterProtocols.prototype.c2s_CQuestionnaireResult = function (questid, step, result) {
            var messageObj = {};
            messageObj.questid = questid;
            messageObj.step = step;
            messageObj.result = result;
            var proto = Network._instance.protoTypePool.CQuestionnaireResult.fromObject(messageObj);
            console.log("CQuestionnaireResult proto", proto);
            var buffer = Network._instance.protoTypePool.CQuestionnaireResult.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQuestionnaireResult, buffer);
        };
        //放弃的任务id
        RequesterProtocols.prototype.c2s_CAbandonQuest = function (questid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(questid);
            this.sendMsg(hanlder.ProtocolsEnum.CAbandonQuest, byteArray);
        };
        RequesterProtocols.prototype.c2s_CSetBattleFlag = function (opttype, index, flag) {
            var messageObj = {};
            messageObj.opttype = opttype;
            messageObj.index = index;
            messageObj.flag = flag;
            var proto = Network._instance.protoTypePool.CSetBattleFlag.fromObject(messageObj);
            console.log("CSetBattleFlag proto", proto);
            var buffer = Network._instance.protoTypePool.CSetBattleFlag.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSetBattleFlag, buffer);
        };
        RequesterProtocols.prototype.c2s_CSetCommander = function (opttype, roleid) {
            var byte = new ByteArray(); // 0 set, 1 reset
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeByte(opttype);
            ByteArrayUtils.writeLong(roleid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.CSetCommander, byte);
        };
        // 
        RequesterProtocols.prototype.c2s_CModifyBattleFlag = function (opttype, index, flag) {
            var messageObj = {};
            messageObj.opttype = opttype;
            messageObj.index = index;
            messageObj.flag = flag;
            var proto = Network._instance.protoTypePool.CModifyBattleFlag.fromObject(messageObj);
            console.log("CModifyBattleFlag proto", proto);
            var buffer = Network._instance.protoTypePool.CModifyBattleFlag.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CModifyBattleFlag, buffer);
        };
        // 
        RequesterProtocols.prototype.c2s_CReqBattleFlag = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqBattleFlag.fromObject(messageObj);
            console.log("CReqBattleFlag proto", proto);
            var buffer = Network._instance.protoTypePool.CReqBattleFlag.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqBattleFlag, buffer);
        };
        // 玩家来应战(第一个确认按钮)
        RequesterProtocols.prototype.c2s_CAcceptLiveDieBattleFirst = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CAcceptLiveDieBattleFirst, byteArray);
        };
        // 观看战斗
        RequesterProtocols.prototype.c2s_CLiveDieBattleWatchFight = function (battleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(battleid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CLiveDieBattleWatchFight, byteArray);
        };
        // 观看录像
        RequesterProtocols.prototype.c2s_CLiveDieBattleWatchVideo = function (vedioid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(vedioid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CLiveDieBattleWatchVideo, byteArray);
        };
        // 点赞
        RequesterProtocols.prototype.c2s_CLiveDieBattleGiveRose = function (vedioid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(vedioid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CLiveDieBattleGiveRose, byteArray);
        };
        // 请求生死战排行界面
        RequesterProtocols.prototype.c2s_CLiveDieBattleRankView = function (modeltype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(modeltype);
            this.sendMsg(hanlder.ProtocolsEnum.CLiveDieBattleRankView, byteArray);
        };
        // 请求生死战观战界面
        RequesterProtocols.prototype.c2s_CLiveDieBattleWatchView = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CLiveDieBattleWatchView, byteArray);
        };
        // npc处应战开战
        RequesterProtocols.prototype.c2s_CAcceptLiveDieBattle = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CAcceptLiveDieBattle, byteArray);
        };
        // 确定是否接受战书
        RequesterProtocols.prototype.c2s_CAcceptInvitationLiveDieBattle = function (sourceid, acceptresult) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(sourceid, byteArray);
            byteArray.writeInt32(acceptresult);
            this.sendMsg(hanlder.ProtocolsEnum.CAcceptInvitationLiveDieBattle, byteArray);
        };
        // 确定是否下战书
        RequesterProtocols.prototype.c2s_CInvitationLiveDieBattleOK = function (objectid, selecttype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(objectid, byteArray);
            byteArray.writeInt32(selecttype);
            this.sendMsg(hanlder.ProtocolsEnum.CInvitationLiveDieBattleOK, byteArray);
        };
        // 下战书
        RequesterProtocols.prototype.c2s_CInvitationLiveDieBattle = function (idorname, selecttype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(idorname, byteArray);
            byteArray.writeInt32(selecttype);
            this.sendMsg(hanlder.ProtocolsEnum.CInvitationLiveDieBattle, byteArray);
        };
        // 停止播放
        RequesterProtocols.prototype.c2s_CStopRePlay = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CStopRePlay.fromObject(messageObj);
            console.log("CStopRePlay proto", proto);
            var buffer = Network._instance.protoTypePool.CStopRePlay.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CStopRePlay, buffer);
        };
        // 请求播放录像
        RequesterProtocols.prototype.c2s_CReqRePlay = function (battleCameraUrl) {
            var messageObj = {};
            messageObj.battleCameraUrl = battleCameraUrl;
            var proto = Network._instance.protoTypePool.CReqRePlay.fromObject(messageObj);
            console.log("CReqRePlay proto", proto);
            var buffer = Network._instance.protoTypePool.CReqRePlay.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqRePlay, buffer);
        };
        // 请求录像url
        RequesterProtocols.prototype.c2s_CReqCameraUrl = function (battleid) {
            var messageObj = {};
            messageObj.battleid = battleid;
            var proto = Network._instance.protoTypePool.CReqCameraUrl.fromObject(messageObj);
            console.log("CReqCameraUrl proto", proto);
            var buffer = Network._instance.protoTypePool.CReqCameraUrl.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqCameraUrl, buffer);
        };
        // 是拒绝还是接受切磋
        RequesterProtocols.prototype.c2s_CInvitationPlayPKResult = function (sourceid, acceptresult) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(sourceid, byteArray);
            byteArray.writeInt32(acceptresult);
            this.sendMsg(hanlder.ProtocolsEnum.CInvitationPlayPKResult, byteArray);
        };
        // 发送切磋邀请
        RequesterProtocols.prototype.c2s_CInvitationPlayPK = function (objectid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(objectid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CInvitationPlayPK, byteArray);
        };
        // 寻找对手界面
        RequesterProtocols.prototype.c2s_CPlayPKFightView = function (modeltype, school, levelindex) {
            var messageObj = {};
            messageObj.modeltype = modeltype;
            messageObj.school = school;
            messageObj.levelindex = levelindex;
            var proto = Network._instance.protoTypePool.CPlayPKFightView.fromObject(messageObj);
            console.log("CPlayPKFightView proto", proto);
            var buffer = Network._instance.protoTypePool.CPlayPKFightView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPlayPKFightView, buffer);
        };
        // 客户端请求打开箱子
        RequesterProtocols.prototype.c2s_CPvP5OpenBox = function (boxtype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(boxtype);
            this.sendMsg(hanlder.ProtocolsEnum.CPvP5OpenBox, byteArray);
        };
        // 客户端请求准备完毕
        // public c2s_CPvP5ReadyFight(ready: number): void {
        // 	let byteArray: ByteArray = new ByteArray();
        // 	byteArray.endian = Laya.Byte.BIG_ENDIAN;
        // 	byteArray.writeByte(ready);
        // 	this.sendMsg(ProtocolsEnum.CPvP5ReadyFight, byteArray);
        // }
        // 客户端请求排行榜
        RequesterProtocols.prototype.c2s_CPvP5RankingList = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CPvP5RankingList, byteArray);
        };
        // 客户端请求自己的信息
        RequesterProtocols.prototype.c2s_CPvP5MyInfo = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CPvP5MyInfo, byteArray);
        };
        // 客户端请求打开箱子
        RequesterProtocols.prototype.c2s_CPvP3OpenBox = function (boxtype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(boxtype);
            this.sendMsg(hanlder.ProtocolsEnum.CPvP3OpenBox, byteArray);
        };
        // 客户端请求准备完毕
        RequesterProtocols.prototype.c2s_CPvP3ReadyFight = function (ready) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(ready);
            this.sendMsg(hanlder.ProtocolsEnum.CPvP3ReadyFight, byteArray);
        };
        // 客户端请求排行榜
        RequesterProtocols.prototype.c2s_CPvP3RankingList = function (history) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(history);
            this.sendMsg(hanlder.ProtocolsEnum.CPvP3RankingList, byteArray);
        };
        // 客户端请求自己的信息
        RequesterProtocols.prototype.c2s_CPvP3MyInfo = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CPvP3MyInfo, byteArray);
        };
        // 客户端请求打开箱子
        RequesterProtocols.prototype.c2s_CPvP1OpenBox = function (boxtype) {
            var messageObj = {};
            messageObj.boxtype = boxtype;
            var proto = Network._instance.protoTypePool.CPvP1OpenBox.fromObject(messageObj);
            console.log("CPvP1OpenBox proto", proto);
            var buffer = Network._instance.protoTypePool.CPvP1OpenBox.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPvP1OpenBox, buffer);
        };
        // 客户端请求准备完毕
        RequesterProtocols.prototype.c2s_CPvP1ReadyFight = function (ready) {
            var messageObj = {};
            messageObj.ready = ready;
            var proto = Network._instance.protoTypePool.CPvP1ReadyFight.fromObject(messageObj);
            console.log("CPvP1ReadyFight proto", proto);
            var buffer = Network._instance.protoTypePool.CPvP1ReadyFight.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPvP1ReadyFight, buffer);
        };
        // 客户端请求排行榜
        RequesterProtocols.prototype.c2s_CPvP1RankingList = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CPvP1RankingList.fromObject(messageObj);
            console.log("CPvP1RankingList proto", proto);
            var buffer = Network._instance.protoTypePool.CPvP1RankingList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPvP1RankingList, buffer);
        };
        // 客户端请求自己的信息
        RequesterProtocols.prototype.c2s_CPvP1MyInfo = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CPvP1MyInfo.fromObject(messageObj);
            console.log("CPvP1MyInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CPvP1MyInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPvP1MyInfo, buffer);
        };
        // 客户端请求新手战斗
        RequesterProtocols.prototype.c2s_CReqNewHandBattle = function () {
            /*let messageObj: any = {};
            var proto = Network._instance.protoTypePool.CReqNewHandBattle.fromObject(messageObj);
            console.log("CReqNewHandBattle proto", proto);
            var buffer: any = Network._instance.protoTypePool.CReqNewHandBattle.encode(proto).finish();
            this.sendMsg(ProtocolsEnum.CReqNewHandBattle, buffer);*/
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CReqNewHandBattle, byteArray);
            console.log("ProtocolsEnum.CReqNewHandBattle c2s_CReqNewHandBattle:");
        };
        // 邀请某角色进行PK
        RequesterProtocols.prototype.c2s_CSendInvitePlayPK = function (guestRoleid) {
            var messageObj = {};
            messageObj.guestRoleid = guestRoleid;
            var proto = Network._instance.protoTypePool.CSendInvitePlayPK.fromObject(messageObj);
            console.log("CSendInvitePlayPK proto", proto);
            var buffer = Network._instance.protoTypePool.CSendInvitePlayPK.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendInvitePlayPK, buffer);
        };
        // 请求退出观战
        RequesterProtocols.prototype.c2s_CEndWatchBattle = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CEndWatchBattle, byteArray);
        };
        // 请求观战
        RequesterProtocols.prototype.c2s_CSendWatchBattle = function (roleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSendWatchBattle, byteArray);
        };
        //客户端申请角色盈福经验
        RequesterProtocols.prototype.c2s_CApplyYingFuExprience = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CApplyYingFuExprience, byteArray);
        };
        //观看战斗
        RequesterProtocols.prototype.c2s_CXMRWatchFight = function (battleid) {
            var messageObj = {};
            messageObj.battleid = battleid;
            var proto = Network._instance.protoTypePool.CXMRWatchFight.fromObject(messageObj);
            console.log("CXMRWatchFight proto", proto);
            var buffer = Network._instance.protoTypePool.CXMRWatchFight.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXMRWatchFight, buffer);
        };
        //观看录像
        RequesterProtocols.prototype.c2s_CXMRWatchVideo = function (videoid, viewtype) {
            var messageObj = {};
            messageObj.videoid = videoid;
            messageObj.viewtype = viewtype;
            var proto = Network._instance.protoTypePool.CXMRWatchVideo.fromObject(messageObj);
            console.log("CXMRWatchVideo proto", proto);
            var buffer = Network._instance.protoTypePool.CXMRWatchVideo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXMRWatchVideo, buffer);
        };
        //点赞
        RequesterProtocols.prototype.c2s_CXMRGiveRose = function (videoid, viewtype) {
            var messageObj = {};
            messageObj.videoid = videoid;
            messageObj.viewtype = viewtype;
            var proto = Network._instance.protoTypePool.CXMRGiveRose.fromObject(messageObj);
            console.log("CXMRGiveRose proto", proto);
            var buffer = Network._instance.protoTypePool.CXMRGiveRose.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXMRGiveRose, buffer);
        };
        //请求熊猫人boss界面
        RequesterProtocols.prototype.c2s_CXMRBossNPCView = function (viewtype, npccode) {
            var messageObj = {};
            messageObj.viewtype = viewtype;
            messageObj.npccode = npccode;
            var proto = Network._instance.protoTypePool.CXMRBossNPCView.fromObject(messageObj);
            console.log("CXMRBossNPCView proto", proto);
            var buffer = Network._instance.protoTypePool.CXMRBossNPCView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXMRBossNPCView, buffer);
        };
        //请求熊猫人界面
        RequesterProtocols.prototype.c2s_CXMRNPCView = function (npccode) {
            var messageObj = {};
            messageObj.npccode = npccode;
            var proto = Network._instance.protoTypePool.CXMRNPCView.fromObject(messageObj);
            console.log("CXMRNPCView proto", proto);
            var buffer = Network._instance.protoTypePool.CXMRNPCView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXMRNPCView, buffer);
        };
        RequesterProtocols.prototype.c2s_CExchangeCode = function (exchangeCode, npckey) {
            var messageObj = {};
            messageObj.exchangeCode = exchangeCode;
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CExchangeCode.fromObject(messageObj);
            console.log("CExchangeCode proto", proto);
            var buffer = Network._instance.protoTypePool.CExchangeCode.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CExchangeCode, buffer);
        };
        //客户端请求QQ会员兑换码状态
        RequesterProtocols.prototype.c2s_CQQExchangeCodeStatus = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CQQExchangeCodeStatus.fromObject(messageObj);
            console.log("CQQExchangeCodeStatus proto", proto);
            var buffer = Network._instance.protoTypePool.CQQExchangeCodeStatus.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQQExchangeCodeStatus, buffer);
        };
        RequesterProtocols.prototype.c2s_CGetHydScoreAward = function (rewardindex) {
            var messageObj = {};
            messageObj.rewardindex = rewardindex;
            var proto = Network._instance.protoTypePool.CGetHydScoreAward.fromObject(messageObj);
            console.log("CGetHydScoreAward proto", proto);
            var buffer = Network._instance.protoTypePool.CGetHydScoreAward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetHydScoreAward, buffer);
        };
        //请求节日积分奖励表数据
        RequesterProtocols.prototype.c2s_CQueryHydScoreData = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CQueryHydScoreData.fromObject(messageObj);
            console.log("CQueryHydScoreData proto", proto);
            var buffer = Network._instance.protoTypePool.CQueryHydScoreData.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQueryHydScoreData, buffer);
        };
        RequesterProtocols.prototype.c2s_CGetChargeAwardCount = function (rewardindex) {
            var messageObj = {};
            messageObj.rewardindex = rewardindex;
            var proto = Network._instance.protoTypePool.CGetChargeAwardCount.fromObject(messageObj);
            console.log("CGetChargeAwardCount proto", proto);
            var buffer = Network._instance.protoTypePool.CGetChargeAwardCount.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetChargeAwardCount, buffer);
        };
        //请求累计充值奖励表数据
        RequesterProtocols.prototype.c2s_CQueryChargeAwardCountData = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CQueryChargeAwardCountData.fromObject(messageObj);
            console.log("CQueryChargeAwardCountData proto", proto);
            var buffer = Network._instance.protoTypePool.CQueryChargeAwardCountData.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQueryChargeAwardCountData, buffer);
        };
        RequesterProtocols.prototype.c2s_GetChargeAward = function (rewardindex) {
            var messageObj = {};
            messageObj.rewardindex = rewardindex;
            var proto = Network._instance.protoTypePool.CGetChargeAward.fromObject(messageObj);
            console.log("GetChargeAward proto", proto);
            var buffer = Network._instance.protoTypePool.CGetChargeAward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetChargeAward, buffer);
        };
        RequesterProtocols.prototype.c2s_GetHydAward = function (rewardindex) {
            var messageObj = {};
            messageObj.rewardindex = rewardindex;
            var proto = Network._instance.protoTypePool.CGetHydAward.fromObject(messageObj);
            console.log("GetHydAward proto", proto);
            var buffer = Network._instance.protoTypePool.CGetHydAward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetHydAward, buffer);
        };
        //请求节日活跃度奖励表数据
        RequesterProtocols.prototype.c2s_QueryJRAwardData = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CQueryJRAwardData.fromObject(messageObj);
            console.log("QueryJRAwardData proto", proto);
            var buffer = Network._instance.protoTypePool.CQueryJRAwardData.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQueryJRAwardData, buffer);
        };
        //活动奖励ID
        RequesterProtocols.prototype.c2s_GetFestivalReward = function (id) {
            var messageObj = {};
            messageObj.rewardid = id;
            var proto = Network._instance.protoTypePool.CGetFestivalReward.fromObject(messageObj);
            console.log("GetFestivalReward proto", proto);
            var buffer = Network._instance.protoTypePool.CGetFestivalReward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetFestivalReward, buffer);
        };
        //节日签到数据请求
        RequesterProtocols.prototype.c2s_Cfestival = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.festival.fromObject(messageObj);
            console.log("Cfestival proto", proto);
            var buffer = Network._instance.protoTypePool.festival.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.festival, buffer);
        };
        RequesterProtocols.prototype.c2s_CReg = function (month) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeUint32(month);
            this.sendMsg(hanlder.ProtocolsEnum.CReg, byteArray);
        };
        //签到开始
        RequesterProtocols.prototype.c2s_queryregdata = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CQueryRegData, byteArray);
        };
        /**
         * by lqw
         * c2s
         */
        //  CDissolveRelation
        RequesterProtocols.prototype.c2s_dissolve_relation = function (relation, playerid) {
            var messageObj = {};
            //结构类型
            messageObj.relation = relation; //关系,师傅or徒弟
            messageObj.playerid = playerid; //是否主动 0为被动,1为主动,2为自动
            var proto = Network._instance.protoTypePool.CDissolveRelation.fromObject(messageObj);
            console.log("CDissolveRelation proto", proto);
            var buffer = Network._instance.protoTypePool.CDissolveRelation.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CDissolveRelation, buffer);
        };
        // CSelectedMasterAward
        RequesterProtocols.prototype.c2s_selected_master_award = function (awardkey, npckey) {
            var messageObj = {};
            //结构类型
            messageObj.awardkey = awardkey; //玩家id
            messageObj.npckey = npckey; //交互的npc key
            var proto = Network._instance.protoTypePool.CSelectedMasterAward.fromObject(messageObj);
            console.log("CSelectedMasterAward proto", proto);
            var buffer = Network._instance.protoTypePool.CSelectedMasterAward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSelectedMasterAward, buffer);
        };
        // CSelectedPrenticePassBook
        RequesterProtocols.prototype.c2s_selected_prentice_pass_book = function (prenticeid, itemkey) {
            var messageObj = {};
            //结构类型
            messageObj.prenticeid = prenticeid; //徒弟id
            messageObj.itemkey = itemkey; //物品的bagkey
            var proto = Network._instance.protoTypePool.CSelectedPrenticePassBook.fromObject(messageObj);
            console.log("CSelectedPrenticePassBook proto", proto);
            var buffer = Network._instance.protoTypePool.CSelectedPrenticePassBook.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSelectedPrenticePassBook, buffer);
        };
        // CEvaluateMasterResult
        RequesterProtocols.prototype.c2s_evaluate_master_result = function (result) {
            var messageObj = {};
            //结构类型
            messageObj.result = result; //选项id，1、2、3、4中的一项
            var proto = Network._instance.protoTypePool.CEvaluateMasterResult.fromObject(messageObj);
            console.log("CEvaluateMasterResult proto", proto);
            var buffer = Network._instance.protoTypePool.CEvaluateMasterResult.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEvaluateMasterResult, buffer);
        };
        // SReceiveNewPrentice
        RequesterProtocols.prototype.c2s_receive_new_prentice = function (prenticeid, prenticename) {
            var messageObj = {};
            //结构类型
            messageObj.prenticeid = prenticeid; //徒弟id
            messageObj.prenticename = prenticename; //徒弟名字
            var proto = Network._instance.protoTypePool.SReceiveNewPrentice.fromObject(messageObj);
            console.log("SReceiveNewPrentice proto", proto);
            var buffer = Network._instance.protoTypePool.SReceiveNewPrentice.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.SReceiveNewPrentice, buffer);
        };
        // CRequestAsMaster
        RequesterProtocols.prototype.c2s_request_as_master = function (prenticeid) {
            var messageObj = {};
            //结构类型
            messageObj.prenticeid = prenticeid;
            var proto = Network._instance.protoTypePool.CRequestAsMaster.fromObject(messageObj);
            console.log("CRequestAsMaster proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestAsMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestAsMaster, buffer);
        };
        // CMasterRequestResult
        RequesterProtocols.prototype.c2s_master_request_result = function (masterid, result) {
            var messageObj = {};
            //结构类型
            messageObj.masterid = masterid;
            messageObj.result = result;
            var proto = Network._instance.protoTypePool.CMasterRequestResult.fromObject(messageObj);
            console.log("CMasterRequestResult proto", proto);
            var buffer = Network._instance.protoTypePool.CMasterRequestResult.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CMasterRequestResult, buffer);
        };
        // CSendRequestWordToMaster
        RequesterProtocols.prototype.c2s_send_request_world_to_master = function (roleid, rolename) {
            var messageObj = {};
            //结构类型
            messageObj.roleid = roleid;
            messageObj.rolename = rolename;
            var proto = Network._instance.protoTypePool.CSendRequestWordToMaster.fromObject(messageObj);
            console.log(" proto", proto);
            var buffer = Network._instance.protoTypePool.CSendRequestWordToMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendRequestWordToMaster, buffer);
        };
        // CSendRequestWordToPrentice
        RequesterProtocols.prototype.c2s_send_request_world_to_prentice = function (roleid, requestword) {
            var messageObj = {};
            //结构类型
            messageObj.roleid = roleid;
            messageObj.requestword = requestword;
            var proto = Network._instance.protoTypePool.CSendRequestWordToPrentice.fromObject(messageObj);
            console.log("CSendRequestWordToPrentice proto", proto);
            var buffer = Network._instance.protoTypePool.CSendRequestWordToPrentice.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendRequestWordToPrentice, buffer);
        };
        // CRequestMasterPrenticeList
        RequesterProtocols.prototype.c2s_request_master_prentice_list = function () {
            var messageObj = {};
            //结构类型
            var proto = Network._instance.protoTypePool.CRequestMasterPrenticeList.fromObject(messageObj);
            console.log("CRequestMasterPrenticeList proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestMasterPrenticeList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestMasterPrenticeList, buffer);
        };
        // CRequestPrenticeOnLineState
        RequesterProtocols.prototype.c2s_request_prentice_on_line_state = function (roleid) {
            var messageObj = {};
            //结构类型
            messageObj.roleid = roleid;
            var proto = Network._instance.protoTypePool.CRequestPrenticeOnLineState.fromObject(messageObj);
            console.log("CRequestPrenticeOnLineState proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestPrenticeOnLineState.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestPrenticeOnLineState, buffer);
        };
        // CRequestGiveMasterPrenticeTips
        RequesterProtocols.prototype.c2s_request_give_master_prentice_tips = function () {
            var messageObj = {};
            //结构类型
            var proto = Network._instance.protoTypePool.CRequestGiveMasterPrenticeTips.fromObject(messageObj);
            console.log("CRequestGiveMasterPrenticeTips proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestGiveMasterPrenticeTips.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestGiveMasterPrenticeTips, buffer);
        };
        // CEvaluate
        RequesterProtocols.prototype.c2s_evaluate = function (flag, roleId, result) {
            var messageObj = {};
            //结构类型
            messageObj.flag = flag; //1=对师傅评价 2=对徒弟的评价
            messageObj.roleId = roleId; //要评价的人
            messageObj.result = result; //评价
            var proto = Network._instance.protoTypePool.CEvaluate.fromObject(messageObj);
            console.log("CEvaluate proto", proto);
            var buffer = Network._instance.protoTypePool.CEvaluate.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEvaluate, buffer);
        };
        // CDismissApprentce
        RequesterProtocols.prototype.c2s_dismiss_apprentce = function (roleid) {
            var messageObj = {};
            //结构类型
            messageObj.roleid = roleid;
            var proto = Network._instance.protoTypePool.CDismissApprentce.fromObject(messageObj);
            console.log("CDismissApprentce proto", proto);
            var buffer = Network._instance.protoTypePool.CDismissApprentce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CDismissApprentce, buffer);
        };
        // CDismissMaster
        RequesterProtocols.prototype.c2s_dismiss_master = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CDismissMaster.fromObject(messageObj);
            console.log("CDismissMaster proto", proto);
            var buffer = Network._instance.protoTypePool.CDismissMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CDismissMaster, buffer);
        };
        // CReqApprences
        RequesterProtocols.prototype.c2s_req_apprences = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqApprences.fromObject(messageObj);
            console.log("CReqApprences proto", proto);
            var buffer = Network._instance.protoTypePool.CReqApprences.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqApprences, buffer);
        };
        // CTakeAchiveAward
        RequesterProtocols.prototype.c2s_task_achive_award = function (roleid, key) {
            var messageObj = {};
            //结构类型
            messageObj.roleid = roleid;
            messageObj.key = key;
            var proto = Network._instance.protoTypePool.CTakeAchiveAward.fromObject(messageObj);
            console.log("CTakeAchiveAward proto", proto);
            var buffer = Network._instance.protoTypePool.CTakeAchiveAward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTakeAchiveAward, buffer);
        };
        // CAppMaster
        RequesterProtocols.prototype.c2s_app_master = function (flag) {
            var messageObj = {};
            //结构类型
            messageObj.flag = flag;
            var proto = Network._instance.protoTypePool.CAppMaster.fromObject(messageObj);
            console.log("CAppMaster proto", proto);
            var buffer = Network._instance.protoTypePool.CAppMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAppMaster, buffer);
        };
        // CCommitMission
        RequesterProtocols.prototype.c2s_commit_mission = function (missionid, npckey, option) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(missionid);
            ByteArrayUtils.writeLong(npckey, byteArray);
            byteArray.writeInt32(option);
            this.sendMsg(hanlder.ProtocolsEnum.CCommitMission, byteArray);
        };
        // CAnswerQuestion
        RequesterProtocols.prototype.c2s_answer_question = function (missionid, npckey, answerid) {
            var messageObj = {};
            //结构类型
            messageObj.missionid = missionid;
            messageObj.npckey = npckey;
            messageObj.answerid = answerid;
            var proto = Network._instance.protoTypePool.CAnswerQuestion.fromObject(messageObj);
            console.log("CAnswerQuestion proto", proto);
            var buffer = Network._instance.protoTypePool.CAnswerQuestion.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAnswerQuestion, buffer);
        };
        // CTrackMission
        RequesterProtocols.prototype.c2s_track_mission = function (missionid, track) {
            var messageObj = {};
            //结构类型
            messageObj.missionid = missionid;
            messageObj.track = track;
            var proto = Network._instance.protoTypePool.CTrackMission.fromObject(messageObj);
            console.log("CTrackMission proto", proto);
            var buffer = Network._instance.protoTypePool.CTrackMission.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTrackMission, buffer);
        };
        // CActiveMissionAIBattle
        // 激活任务AI战斗服务
        RequesterProtocols.prototype.c2s_active_mission_ai_battle = function (missionid, npckey, activetype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(missionid);
            ByteArrayUtils.writeLong(npckey, byteArray);
            byteArray.writeInt32(activetype);
            this.sendMsg(hanlder.ProtocolsEnum.CActiveMissionAIBattle, byteArray);
        };
        // CAbsentFairyland
        RequesterProtocols.prototype.c2s_ = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CAbsentFairyland.fromObject(messageObj);
            console.log("CAbsentFairyland proto", proto);
            var buffer = Network._instance.protoTypePool.CAbsentFairyland.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAbsentFairyland, buffer);
        };
        // CReturnFairyland
        RequesterProtocols.prototype.c2s_return_fairyland = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReturnFairyland.fromObject(messageObj);
            console.log("CReturnFairyland proto", proto);
            var buffer = Network._instance.protoTypePool.CReturnFairyland.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReturnFairyland, buffer);
        };
        // CReqMissionCanAccept
        RequesterProtocols.prototype.c2s_req_mission_can_accept = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqMissionCanAccept.fromObject(messageObj);
            console.log("CReqMissionCanAccept proto", proto);
            var buffer = Network._instance.protoTypePool.CReqMissionCanAccept.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqMissionCanAccept, buffer);
        };
        // CMissionDialogEnd
        RequesterProtocols.prototype.c2s_mission_dialog_end = function (missionid) {
            var messageObj = {};
            //结构类型
            messageObj.missionid = missionid;
            var proto = Network._instance.protoTypePool.CMissionDialogEnd.fromObject(messageObj);
            console.log("CMissionDialogEnd proto", proto);
            var buffer = Network._instance.protoTypePool.CMissionDialogEnd.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CMissionDialogEnd, buffer);
        };
        // CMissionReachScene
        RequesterProtocols.prototype.c2s_mission_reach_scene = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CMissionReachScene.fromObject(messageObj);
            console.log("CMissionReachScene proto", proto);
            var buffer = Network._instance.protoTypePool.CMissionReachScene.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CMissionReachScene, buffer);
        };
        // CReqLandTask
        RequesterProtocols.prototype.c2s_req_land_task = function (taskId, taskType) {
            var messageObj = {};
            //结构类型
            messageObj.taskId = taskId;
            messageObj.taskType = taskType;
            var proto = Network._instance.protoTypePool.CReqLandTask.fromObject(messageObj);
            console.log("CReqLandTask proto", proto);
            var buffer = Network._instance.protoTypePool.CReqLandTask.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqLandTask, buffer);
        };
        // CAskLandTimes
        RequesterProtocols.prototype.c2s_ask_land_times = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CAskLandTimes.fromObject(messageObj);
            console.log("CAskLandTimes proto", proto);
            var buffer = Network._instance.protoTypePool.CAskLandTimes.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAskLandTimes, buffer);
        };
        // CGetInstanceState
        RequesterProtocols.prototype.c2s_get_instance_state = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGetInstanceState.fromObject(messageObj);
            console.log("CGetInstanceState proto", proto);
            var buffer = Network._instance.protoTypePool.CGetInstanceState.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetInstanceState, buffer);
        };
        // CGetLineState
        RequesterProtocols.prototype.c2s_get_line_state = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGetLineState, byteArray);
        };
        // CReqLineTask
        RequesterProtocols.prototype.c2s_req_line_task = function (taskId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(taskId);
            this.sendMsg(hanlder.ProtocolsEnum.CReqLineTask, byteArray);
        };
        // CNotifyTeamMemeberSubmitItem
        RequesterProtocols.prototype.c2s_notify_team_memeber_submit_item = function (questid, npckey, submittype) {
            var messageObj = {};
            //结构类型
            messageObj.questid = questid;
            messageObj.npckey = npckey;
            messageObj.submittype = submittype;
            var proto = Network._instance.protoTypePool.CNotifyTeamMemeberSubmitItem.fromObject(messageObj);
            console.log("CNotifyTeamMemeberSubmitItem proto", proto);
            var buffer = Network._instance.protoTypePool.CNotifyTeamMemeberSubmitItem.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CNotifyTeamMemeberSubmitItem, buffer);
        };
        // CRefreshActivityListFinishTimes
        RequesterProtocols.prototype.c2s_sRefresh_activity_list_finish_times = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CRefreshActivityListFinishTimes, byteArray);
        };
        // CDrawGiftBox
        RequesterProtocols.prototype.c2s_draw_gift_box = function (id) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeUint32(id);
            this.sendMsg(hanlder.ProtocolsEnum.CDrawGiftBox, byteArray);
        };
        // CShareActivity
        RequesterProtocols.prototype.c2s_share_activity = function (activityId) {
            var messageObj = {};
            //结构类型
            messageObj.activityId = activityId;
            var proto = Network._instance.protoTypePool.CShareActivity.fromObject(messageObj);
            console.log("CShareActivity proto", proto);
            var buffer = Network._instance.protoTypePool.CShareActivity.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CShareActivity, buffer);
        };
        // CReqGoto
        RequesterProtocols.prototype.c2s_req_goto = function (mapid, xpos, ypos) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(mapid);
            byteArray.writeInt32(xpos);
            byteArray.writeInt32(ypos);
            this.sendMsg(hanlder.ProtocolsEnum.CReqGoto, byteArray);
        };
        // CReqJionActivity
        RequesterProtocols.prototype.c2s_req_jion_activity = function (activityType) {
            var messageObj = {};
            //结构类型
            messageObj.activityType = activityType;
            var proto = Network._instance.protoTypePool.CReqJionActivity.fromObject(messageObj);
            console.log("CReqJionActivity proto", proto);
            var buffer = Network._instance.protoTypePool.CReqJionActivity.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqJionActivity, buffer);
        };
        // CAnsQuestion
        RequesterProtocols.prototype.c2s_ans_question = function (npckey, questionid, answer, flag) {
            var messageObj = {};
            //结构类型
            messageObj.npckey = npckey; //1=对师傅评价 2=对徒弟的评价
            messageObj.questionid = questionid; //要评价的人
            messageObj.answer = answer; //评价
            messageObj.flag = flag;
            var proto = Network._instance.protoTypePool.CAnsQuestion.fromObject(messageObj);
            console.log("CAnsQuestion proto", proto);
            var buffer = Network._instance.protoTypePool.CAnsQuestion.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAnsQuestion, buffer);
        };
        // CUseTreasureMap
        RequesterProtocols.prototype.c2s_use_treasure_map = function (itemkey, maptype) {
            var messageObj = {};
            //结构类型
            messageObj.itemkey = itemkey;
            messageObj.maptype = maptype;
            var proto = Network._instance.protoTypePool.CUseTreasureMap.fromObject(messageObj);
            console.log("CUseTreasureMap proto", proto);
            var buffer = Network._instance.protoTypePool.CUseTreasureMap.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUseTreasureMap, buffer);
        };
        // CUseTreasureMapEnd
        RequesterProtocols.prototype.c2s_use_treasure_map_end = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CUseTreasureMapEnd.fromObject(messageObj);
            console.log("CUseTreasureMapEnd proto", proto);
            var buffer = Network._instance.protoTypePool.CUseTreasureMapEnd.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUseTreasureMapEnd, buffer);
        };
        // CGetActivityInfo
        RequesterProtocols.prototype.c2s_sGet_activity_info = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGetActivityInfo, byteArray);
        };
        // CAskIntoInstance
        RequesterProtocols.prototype.c2s_ask_into_instance = function (answer, insttype) {
            var messageObj = {};
            //结构类型
            messageObj.answer = answer;
            messageObj.insttype = insttype;
            var proto = Network._instance.protoTypePool.CAskIntoInstance.fromObject(messageObj);
            console.log("CAskIntoInstance proto", proto);
            var buffer = Network._instance.protoTypePool.CAskIntoInstance.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAskIntoInstance, buffer);
        };
        //CGetArchiveInfo
        RequesterProtocols.prototype.c2s_get_archive_info = function () {
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CGetArchiveInfo.fromObject(messageObj);
            // console.log("CGetArchiveInfo proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CGetArchiveInfo.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CGetArchiveInfo, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGetArchiveInfo, byteArray);
        };
        // CGetArchiveAward
        RequesterProtocols.prototype.c2s_get_archive_award = function (archiveId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(archiveId);
            this.sendMsg(hanlder.ProtocolsEnum.CGetArchiveAward, byteArray);
        };
        // CDropInstance
        RequesterProtocols.prototype.c2s_drop_instance = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CDropInstance, byteArray);
        };
        // <!--前尘旧梦章节战斗-->
        // CRequestChapterInfo
        RequesterProtocols.prototype.c2s_request_chapter_info = function (roleid) {
            var messageObj = {};
            //结构类型
            messageObj.roleid = roleid;
            var proto = Network._instance.protoTypePool.CRequestChapterInfo.fromObject(messageObj);
            console.log("CRequestChapterInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestChapterInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestChapterInfo, buffer);
        };
        // CRequestChapterChallenge
        RequesterProtocols.prototype.c2s_request_chapter_challenge = function (chapterid) {
            var messageObj = {};
            //结构类型
            messageObj.chapterid = chapterid;
            var proto = Network._instance.protoTypePool.CRequestChapterChallenge.fromObject(messageObj);
            console.log("CRequestChapterChallenge proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestChapterChallenge.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestChapterChallenge, buffer);
        };
        // CRespondChapterChallenge
        RequesterProtocols.prototype.c2s_respond_chapter_challenge = function (result) {
            var messageObj = {};
            //结构类型
            messageObj.result = result;
            var proto = Network._instance.protoTypePool.CRespondChapterChallenge.fromObject(messageObj);
            console.log("CRespondChapterChallenge proto", proto);
            var buffer = Network._instance.protoTypePool.CRespondChapterChallenge.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRespondChapterChallenge, buffer);
        };
        //move.xml
        // CRoleMove
        RequesterProtocols.prototype.c2s_role_move = function (srcPos, destPos, sceneID) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt16(srcPos.x * 16);
            byteArray.writeInt16(srcPos.y * 16.15);
            byteArray.writeInt16(destPos.x * 16);
            byteArray.writeInt16(destPos.y * 16.15);
            ByteArrayUtils.writeLong(sceneID, byteArray);
            // console.error('当前坐标-------------',srcPos.x  * 16,srcPos.y  * 16.15);
            // console.error('目标坐标-------------',destPos.x * 16,destPos.y * 16.15);
            var date = new Date();
            // console.error('当前时间==='+date.valueOf());
            this.sendMsg(hanlder.ProtocolsEnum.CRoleMove, byteArray);
        };
        // CCheckMove
        RequesterProtocols.prototype.c2s_check_move = function (curPos, poslist, sceneID) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt16(curPos.x * 16);
            byteArray.writeInt16(curPos.y * 16.15);
            byteArray.writeByte(poslist.length);
            var index;
            var pos;
            for (index = 0; index < poslist.length; index++) {
                pos = poslist[index];
                byteArray.writeInt16(pos.x * 16);
                byteArray.writeInt16(pos.y * 16.15);
            }
            ByteArrayUtils.writeLong(sceneID, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CCheckMove, byteArray);
        };
        // CSendAutoMovePathID
        RequesterProtocols.prototype.c2s_send_auto_move_path_id = function (pathid, pathid2, pathid3) {
            var messageObj = {};
            //结构类型
            messageObj.pathid = pathid;
            messageObj.pathid2 = pathid2;
            messageObj.pathid3 = pathid3;
            var proto = Network._instance.protoTypePool.CSendAutoMovePathID.fromObject(messageObj);
            console.log("CSendAutoMovePathID proto", proto);
            var buffer = Network._instance.protoTypePool.CSendAutoMovePathID.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendAutoMovePathID, buffer);
        };
        // CRoleTurn
        RequesterProtocols.prototype.c2s_role_turn = function (direction) {
            var messageObj = {};
            //结构类型
            messageObj.direction = direction;
            var proto = Network._instance.protoTypePool.CRoleTurn.fromObject(messageObj);
            console.log("CRoleTurn proto", proto);
            var buffer = Network._instance.protoTypePool.CRoleTurn.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRoleTurn, buffer);
        };
        // CRoleStop
        RequesterProtocols.prototype.c2s_role_stop = function (Poslist, pos, sceneid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(Poslist.length);
            var index;
            var pos;
            for (index = 0; index < Poslist.length; index++) {
                pos = Poslist[index];
                byteArray.writeInt32(pos.x);
                byteArray.writeInt32(pos.y);
            }
            byteArray.writeInt16(pos.x * 16);
            byteArray.writeInt16(pos.y * 16);
            ByteArrayUtils.writeLong(sceneid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRoleStop, byteArray);
        };
        // CRelocateRolePos
        RequesterProtocols.prototype.c2s_relocate_role_pos = function (sceneId, curPos, locz) {
            var messageObj = {};
            //结构类型
            messageObj.sceneId = sceneId;
            messageObj.curPos = curPos;
            messageObj.locz = locz;
            var proto = Network._instance.protoTypePool.CRelocateRolePos.fromObject(messageObj);
            console.log("CRelocateRolePos proto", proto);
            var buffer = Network._instance.protoTypePool.CRelocateRolePos.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRelocateRolePos, buffer);
        };
        // CEnterDangerConfirm
        RequesterProtocols.prototype.c2s_enter_danger_confirm = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CEnterDangerConfirm.fromObject(messageObj);
            console.log("CEnterDangerConfirm proto", proto);
            var buffer = Network._instance.protoTypePool.CEnterDangerConfirm.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEnterDangerConfirm, buffer);
        };
        // CGMGetAroundRoles
        RequesterProtocols.prototype.c2s_gm_get_around_roles = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGMGetAroundRoles.fromObject(messageObj);
            console.log("CGMGetAroundRoles proto", proto);
            var buffer = Network._instance.protoTypePool.CGMGetAroundRoles.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGMGetAroundRoles, buffer);
        };
        // CRoleJump
        RequesterProtocols.prototype.c2s_role_jump = function (Poslist, srcPos, destPos, jumptype, sceneID) {
            var messageObj = {};
            //结构类型
            messageObj.Poslist = Poslist; //1=对师傅评价 2=对徒弟的评价
            messageObj.srcPos = srcPos; //要评价的人
            messageObj.destPos = destPos; //评价
            messageObj.jumptype = jumptype;
            messageObj.sceneID = sceneID;
            var proto = Network._instance.protoTypePool.CRoleJump.fromObject(messageObj);
            console.log("CRoleJump proto", proto);
            var buffer = Network._instance.protoTypePool.CRoleJump.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRoleJump, buffer);
        };
        // CRoleJumpStop
        RequesterProtocols.prototype.c2s_role_jump_stop = function (destPos, destz) {
            var messageObj = {};
            //结构类型
            messageObj.destPos = destPos;
            messageObj.destz = destz;
            var proto = Network._instance.protoTypePool.CRoleJumpStop.fromObject(messageObj);
            console.log("CRoleJumpStop proto", proto);
            var buffer = Network._instance.protoTypePool.CRoleJumpStop.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRoleJumpStop, buffer);
        };
        // CReqSeeEachOther
        RequesterProtocols.prototype.c2s_req_see_each_other = function (roleId) {
            var messageObj = {};
            //结构类型
            messageObj.roleId = roleId;
            var proto = Network._instance.protoTypePool.CReqSeeEachOther.fromObject(messageObj);
            console.log("CReqSeeEachOther proto", proto);
            var buffer = Network._instance.protoTypePool.CReqSeeEachOther.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqSeeEachOther, buffer);
        };
        //npc.xml
        // CVisitNpc
        RequesterProtocols.prototype.c2s_visit_npc = function (npckey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(npckey, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CVisitNpc, byteArray);
        };
        // CNpcService
        RequesterProtocols.prototype.c2s_npc_service = function (npckey, serviceid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(npckey, byteArray);
            byteArray.writeInt32(serviceid);
            this.sendMsg(hanlder.ProtocolsEnum.CNpcService, byteArray);
        };
        // CReqQuestion
        RequesterProtocols.prototype.c2s_req_question = function (npckey) {
            var messageObj = {};
            //结构类型
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CReqQuestion.fromObject(messageObj);
            console.log("CReqQuestion proto", proto);
            var buffer = Network._instance.protoTypePool.CReqQuestion.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqQuestion, buffer);
        };
        // CFinishFortuneWheel
        RequesterProtocols.prototype.c2s_finish_fortune_wheel = function (npckey, serviceid) {
            var messageObj = {};
            //结构类型
            messageObj.npckey = npckey;
            messageObj.serviceid = serviceid;
            var proto = Network._instance.protoTypePool.CFinishFortuneWheel.fromObject(messageObj);
            console.log("CFinishFortuneWheel proto", proto);
            var buffer = Network._instance.protoTypePool.CFinishFortuneWheel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CFinishFortuneWheel, buffer);
        };
        // CSubmit2Npc
        RequesterProtocols.prototype.c2s_submit_2npc = function (questid, npckey, submittype, things) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(questid);
            ByteArrayUtils.writeLong(npckey, byteArray);
            byteArray.writeInt32(submittype);
            byteArray.writeByte(things.length);
            var index;
            var SubmitUnitInfo;
            for (index = 0; index < things.length; index++) {
                SubmitUnitInfo = things[index];
                byteArray.writeInt32(SubmitUnitInfo.key);
                byteArray.writeInt32(SubmitUnitInfo.num);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CSubmit2Npc, byteArray);
        };
        // CDoneFortuneWheel
        RequesterProtocols.prototype.c2s_done_fortune_wheel = function (npckey, taskid, succ, flag) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(npckey, byteArray);
            byteArray.writeInt32(taskid);
            byteArray.writeInt32(succ);
            byteArray.writeByte(flag);
            this.sendMsg(hanlder.ProtocolsEnum.CDoneFortuneWheel, byteArray);
        };
        //客户端请求属性加点
        RequesterProtocols.prototype.c2s_CAddPointToAttr = function (cons, iq, str, agi, endu) {
            // let messageObj: any = {};
            // messageObj.cons = cons;//体质
            // messageObj.iq = iq;//智力
            // messageObj.str = str;//力量
            // messageObj.agi = agi;//敏捷
            // messageObj.endu = endu;//耐力
            // var proto = Network._instance.protoTypePool.CAddPointToAttr.fromObject(messageObj);
            // console.log("CAddPointToAttr proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CAddPointToAttr.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CAddPointToAttr, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(cons);
            byteArray.writeInt32(iq);
            byteArray.writeInt32(str);
            byteArray.writeInt32(agi);
            byteArray.writeInt32(endu);
            this.sendMsg(hanlder.ProtocolsEnum.CAddPointToAttr, byteArray);
        };
        //客户端请求属性加点
        RequesterProtocols.prototype.c2s_CResetSysConfig = function (sysconfigmap) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(sysconfigmap.keys.length);
            // let sizeUint8Array: Uint8Array = ByteArrayUtils.compact_uint32(sysconfigmap.keys.length);
            // byteArray.writeUint8Array(sizeUint8Array);
            var keyArray = sysconfigmap.keys;
            for (var i = 0; i < sysconfigmap.keys.length; i++) {
                byteArray.writeInt32(keyArray[i]);
                byteArray.writeInt32(sysconfigmap.get(keyArray[i]));
            }
            this.sendMsg(hanlder.ProtocolsEnum.CResetSysConfig, byteArray);
        };
        //客户端下线
        RequesterProtocols.prototype.c2s_CRoleOffline = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRoleOffline, byteArray);
        };
        //客户端请求其他玩家的某个属性信息
        RequesterProtocols.prototype.c2s_CReqRoleProp = function (roleid, proptype) {
            var messageObj = {};
            messageObj.roleid = roleid;
            messageObj.proptype = proptype;
            var proto = Network._instance.protoTypePool.CReqRoleProp.fromObject(messageObj);
            console.log("CReqRoleProp proto", proto);
            var buffer = Network._instance.protoTypePool.CReqRoleProp.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqRoleProp, buffer);
        };
        //
        RequesterProtocols.prototype.c2s_CEndPlayCG = function (id) {
            var messageObj = {};
            messageObj.id = id; //动画的id
            var proto = Network._instance.protoTypePool.CEndPlayCG.fromObject(messageObj);
            console.log("CEndPlayCG proto", proto);
            var buffer = Network._instance.protoTypePool.CEndPlayCG.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEndPlayCG, buffer);
        };
        //
        RequesterProtocols.prototype.c2s_CBeginnerTip = function (tipid) {
            var messageObj = {};
            messageObj.tipid = tipid; // id为BeginnerTipType
            var proto = Network._instance.protoTypePool.CBeginnerTip.fromObject(messageObj);
            console.log("CBeginnerTip proto", proto);
            var buffer = Network._instance.protoTypePool.CBeginnerTip.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBeginnerTip, buffer);
        };
        //
        RequesterProtocols.prototype.c2s_CBeginnerTipShowed = function (tipid) {
            var messageObj = {};
            messageObj.tipid = tipid; // id为BeginnerTipType
            var proto = Network._instance.protoTypePool.CBeginnerTipShowed.fromObject(messageObj);
            console.log("CBeginnerTipShowed proto", proto);
            var buffer = Network._instance.protoTypePool.CBeginnerTipShowed.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBeginnerTipShowed, buffer);
        };
        //客户端请求其他玩家的组队情况
        RequesterProtocols.prototype.c2s_CReqRoleTeamState = function (roleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CReqRoleTeamState, byteArray);
        };
        //返回请求生成随机名字
        RequesterProtocols.prototype.c2s_CRequestName = function (sex) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeShort(sex);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestName, byteArray);
        };
        //客户端，人物选择界面："退出游戏"，"返回登录界面"，"返回服务器选择"；在排队中："取消排队
        RequesterProtocols.prototype.c2s_CUserOffline = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CUserOffline.fromObject(messageObj);
            console.log("CUserOffline proto", proto);
            var buffer = Network._instance.protoTypePool.CUserOffline.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUserOffline, buffer);
        };
        //客户端请求返回登录界面
        RequesterProtocols.prototype.c2s_CReturnToLogin = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CReturnToLogin, byteArray);
        };
        //客户端使用千里寻踪蝶请求玩家坐标
        RequesterProtocols.prototype.c2s_CRequestRolePos = function (roleid, rolename, searchtype) {
            var messageObj = {};
            messageObj.roleid = roleid; //玩家id
            messageObj.rolename = rolename; //玩家名
            messageObj.searchtype = searchtype; //查找类型
            var proto = Network._instance.protoTypePool.CRequestRolePos.fromObject(messageObj);
            console.log("CRequestRolePos proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestRolePos.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRolePos, buffer);
        };
        //客户端通告服务器10分钟内ping值 1分钟一个PingStatEntry
        RequesterProtocols.prototype.c2s_CPingStat = function (beginstamp, pingstats, losspercent) {
            var messageObj = {};
            messageObj.beginstamp = beginstamp; // 开始时间戳
            messageObj.pingstats = pingstats; // 10分钟内统计数据
            messageObj.losspercent = losspercent; // 丢包率（losspercent%100）
            var proto = Network._instance.protoTypePool.CPingStat.fromObject(messageObj);
            console.log("CPingStat proto", proto);
            var buffer = Network._instance.protoTypePool.CPingStat.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPingStat, buffer);
        };
        //客户端进入场景完毕
        RequesterProtocols.prototype.c2s_CAfterEnterWorld = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CAfterEnterWorld, byteArray);
        };
        //客户端自动更改同屏显示人数
        RequesterProtocols.prototype.c2s_CSetMaxScreenShowNum = function (maxscreenshownum) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt16(maxscreenshownum); //同屏最大人数
            this.sendMsg(hanlder.ProtocolsEnum.CSetMaxScreenShowNum, byteArray);
        };
        //客户端请求更改名字
        RequesterProtocols.prototype.c2s_CModifyRoleName = function (newName, itemkey) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(newName, byteArray);
            byteArray.writeInt32(itemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CModifyRoleName, byteArray);
        };
        //请求人物信息界面（主要是 几个积分以及大红大蓝的剩余量）
        RequesterProtocols.prototype.c2s_CReqRoleInfo = function (reqkey) {
            // let messageObj: any = {};
            // messageObj.reqkey = reqkey;
            // var proto = Network._instance.protoTypePool.CReqRoleInfo.fromObject(messageObj);
            // console.log("CReqRoleInfo proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CReqRoleInfo.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CReqRoleInfo, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(reqkey);
            this.sendMsg(hanlder.ProtocolsEnum.CReqRoleInfo, byteArray);
        };
        //客户端发送激活码给服务器
        RequesterProtocols.prototype.c2s_CSendSn = function (snStr) {
            var messageObj = {};
            messageObj.snStr = snStr;
            var proto = Network._instance.protoTypePool.CSendSn.fromObject(messageObj);
            console.log("CSendSn proto", proto);
            var buffer = Network._instance.protoTypePool.CSendSn.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendSn, buffer);
        };
        //客户端发送充值请求给服务器
        RequesterProtocols.prototype.c2s_CReqChargeMoney = function (num, orderSnPlatform) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(num);
            ByteArrayUtils.writeUtf16String(orderSnPlatform, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CReqChargeMoney, byteArray);
        };
        //
        RequesterProtocols.prototype.c2s_CNotifyDeviceInfo = function (info) {
            var messageObj = {};
            messageObj.info = info;
            var proto = Network._instance.protoTypePool.CNotifyDeviceInfo.fromObject(messageObj);
            console.log("CNotifyDeviceInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CNotifyDeviceInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CNotifyDeviceInfo, buffer);
        };
        //请求角色曾用名
        RequesterProtocols.prototype.c2s_CReqOldName = function (roleId) {
            var messageObj = {};
            messageObj.roleId = roleId; //角色id
            var proto = Network._instance.protoTypePool.CReqOldName.fromObject(messageObj);
            console.log("CReqOldName proto", proto);
            var buffer = Network._instance.protoTypePool.CReqOldName.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqOldName, buffer);
        };
        //
        RequesterProtocols.prototype.c2s_CTeamVoteAgree = function (result) {
            var messageObj = {};
            messageObj.result = result; //0=同意 1= 拒绝
            var proto = Network._instance.protoTypePool.CTeamVoteAgree.fromObject(messageObj);
            console.log("CTeamVoteAgree proto", proto);
            var buffer = Network._instance.protoTypePool.CTeamVoteAgree.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTeamVoteAgree, buffer);
        };
        RequesterProtocols.prototype.c2s_CDefineTeam = function (answer) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt16(answer);
            this.sendMsg(hanlder.ProtocolsEnum.CDefineTeam, byteArray);
        };
        //客户端请求修改系统设置
        RequesterProtocols.prototype.c2s_CGetSysConfig = function (sysconfigmap) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            if (sysconfigmap == undefined || sysconfigmap == null) {
                sysconfigmap = new Laya.Dictionary();
                sysconfigmap.set(null, null);
            }
            console.log("---------c2s_CGetSysConfig size = ", sysconfigmap.keys.length);
            byteArray.writeByte(sysconfigmap.keys.length);
            var keyArray = sysconfigmap.keys;
            for (var i = 0; i < sysconfigmap.keys.length; i++) {
                byteArray.writeInt32(keyArray[i]);
                byteArray.writeInt32(sysconfigmap.get(keyArray[i]));
            }
            this.sendMsg(hanlder.ProtocolsEnum.CGetSysConfig, byteArray);
        };
        //客户端请求切换加点方案
        RequesterProtocols.prototype.c2s_CChangePointScheme = function (schemeid) {
            // let messageObj: any = {};
            // messageObj.schemeid = schemeid;//客户端请求切换加点方案
            // var proto = Network._instance.protoTypePool.CChangePointScheme.fromObject(messageObj);
            // console.log("CChangePointScheme proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CChangePointScheme.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CChangePointScheme, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(schemeid);
            this.sendMsg(hanlder.ProtocolsEnum.CChangePointScheme, byteArray);
        };
        //客户端请求援助统计面板
        RequesterProtocols.prototype.c2s_CReqHelpCountView = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CReqHelpCountView, byteArray);
        };
        //请求人物染色衣橱信息
        RequesterProtocols.prototype.c2s_CReqColorRoomView = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqColorRoomView.fromObject(messageObj);
            console.log("CReqColorRoomView proto", proto);
            var buffer = Network._instance.protoTypePool.CReqColorRoomView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqColorRoomView, buffer);
        };
        //删除衣柜配色方案
        RequesterProtocols.prototype.c2s_CReqDelColor = function (removeindex) {
            var messageObj = {};
            messageObj.removeindex = removeindex; //删除索引
            var proto = Network._instance.protoTypePool.CReqDelColor.fromObject(messageObj);
            console.log("CReqDelColor proto", proto);
            var buffer = Network._instance.protoTypePool.CReqDelColor.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqDelColor, buffer);
        };
        //使用染色
        RequesterProtocols.prototype.c2s_CReqUseColor = function (rolecolorinfo) {
            var messageObj = {};
            messageObj.rolecolorinfo = rolecolorinfo; //染色信息
            var proto = Network._instance.protoTypePool.CReqUseColor.fromObject(messageObj);
            console.log("CReqUseColor proto", proto);
            var buffer = Network._instance.protoTypePool.CReqUseColor.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqUseColor, buffer);
        };
        //请求人物切换加点方案次数
        RequesterProtocols.prototype.c2s_CReqPointSchemeTime = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CReqPointSchemeTime, byteArray);
        };
        //
        RequesterProtocols.prototype.c2s_CReqUsePetColor = function (petkey, colorpos1, colorpos2) {
            var messageObj = {};
            messageObj.petkey = petkey; //宠物ID
            messageObj.colorpos1 = colorpos1; //部位1
            messageObj.colorpos2 = colorpos2; //部位2
            var proto = Network._instance.protoTypePool.CReqUsePetColor.fromObject(messageObj);
            console.log("CReqUsePetColor proto", proto);
            var buffer = Network._instance.protoTypePool.CReqUsePetColor.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqUsePetColor, buffer);
        };
        //设置适配引导类型
        RequesterProtocols.prototype.c2s_CSetPilotType = function (pilotType) {
            var messageObj = {};
            messageObj.pilotType = pilotType; //适配引导类型  0新手 1老手
            var proto = Network._instance.protoTypePool.CSetPilotType.fromObject(messageObj);
            console.log("CSetPilotType proto", proto);
            var buffer = Network._instance.protoTypePool.CSetPilotType.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSetPilotType, buffer);
        };
        //援助声望当前值
        RequesterProtocols.prototype.c2s_CSendHelpSW = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CSendHelpSW, byteArray);
        };
        //取服务器时间
        RequesterProtocols.prototype.c2s_CGameTime = function () {
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CGameTime.fromObject(messageObj);
            // console.log("CGameTime proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CGameTime.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CGameTime, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGameTime, byteArray);
        };
        //踢人
        RequesterProtocols.prototype.c2s_CKick = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CKick.fromObject(messageObj);
            console.log("CKick proto", proto);
            var buffer = Network._instance.protoTypePool.CKick.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CKick, buffer);
        };
        //
        RequesterProtocols.prototype.c2s_CSetLineConfig = function (configmap) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            var sizeUint8Array = ByteArrayUtils.compact_uint32(configmap.keys.length);
            byteArray.writeUint8Array(sizeUint8Array);
            var dic = new Laya.Dictionary();
            dic = configmap;
            var keyArray = dic.keys;
            for (var i = 0; i < keyArray.length; i++) {
                byteArray.writeInt32(keyArray[i]);
                byteArray.writeInt32(dic.get(keyArray[i]));
            }
            this.sendMsg(hanlder.ProtocolsEnum.CSetLineConfig, byteArray);
        };
        //得到验证码
        RequesterProtocols.prototype.c2s_CGetCheckCode = function (tel) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(tel, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CGetCheckCode, byteArray);
        };
        //确认关联手机
        RequesterProtocols.prototype.c2s_CBindTel = function (tel, code) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(tel, byteArray);
            ByteArrayUtils.writeUtf16String(code, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CBindTel, byteArray);
        };
        //解除关联手机
        RequesterProtocols.prototype.c2s_CUnBindTel = function (tel, code) {
            var messageObj = {};
            messageObj.tel = tel;
            messageObj.code = code;
            var proto = Network._instance.protoTypePool.CUnBindTel.fromObject(messageObj);
            console.log("CUnBindTel proto", proto);
            var buffer = Network._instance.protoTypePool.CUnBindTel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUnBindTel, buffer);
        };
        //得到关联手机信息
        RequesterProtocols.prototype.c2s_CGetBindTel = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGetBindTel, byteArray);
        };
        //领取绑定手机奖励
        RequesterProtocols.prototype.c2s_CGetBindTelAward = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGetBindTelAward, byteArray);
        };
        //<!-- 道具安全锁 -->设置密码
        RequesterProtocols.prototype.c2s_CSetPassword = function (initPd, repeatPd) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(initPd, byteArray); //初始密码
            ByteArrayUtils.writeUtf16String(repeatPd, byteArray); //重复密码
            this.sendMsg(hanlder.ProtocolsEnum.CSetPassword, byteArray);
        };
        //重新设置密码
        RequesterProtocols.prototype.c2s_CResetPassword = function (initPd, newtPd, repeatPd) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(initPd, byteArray); //初始密码
            ByteArrayUtils.writeUtf16String(newtPd, byteArray); //新密码
            ByteArrayUtils.writeUtf16String(repeatPd, byteArray); //重复密码
            this.sendMsg(hanlder.ProtocolsEnum.CResetPassword, byteArray);
        };
        //解除安全锁
        RequesterProtocols.prototype.c2s_CDelPassword = function (initPd, repeatPd) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(initPd, byteArray); //初始密码
            ByteArrayUtils.writeUtf16String(repeatPd, byteArray); //重复密码
            this.sendMsg(hanlder.ProtocolsEnum.CDelPassword, byteArray);
        };
        //强制解除安全锁
        RequesterProtocols.prototype.c2s_CForceDelPassword = function (code) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(code, byteArray); //验证码
            this.sendMsg(hanlder.ProtocolsEnum.CForceDelPassword, byteArray);
        };
        //取消强制解除安全锁
        RequesterProtocols.prototype.c2s_CCancelForceDelPassword = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CCancelForceDelPassword, byteArray);
        };
        //开启安全锁状态
        RequesterProtocols.prototype.c2s_COpenGoodLocks = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.COpenGoodLocks, byteArray);
        };
        //关闭安全锁状态
        RequesterProtocols.prototype.c2s_CCloseGoodLocks = function (password, closeType) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(password, byteArray); //道具安全锁密码
            byteArray.writeInt32(closeType); //关闭类型
            this.sendMsg(hanlder.ProtocolsEnum.CCloseGoodLocks, byteArray);
        };
        //得到道具安全锁信息
        RequesterProtocols.prototype.c2s_CGetGoodLocksInfo = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGetGoodLocksInfo, byteArray);
        };
        //道具输入密码解锁
        RequesterProtocols.prototype.c2s_CGoodUnLock = function (password) {
            var messageObj = {};
            messageObj.password = password; //安全锁密码
            var proto = Network._instance.protoTypePool.CGoodUnLock.fromObject(messageObj);
            console.log("CGoodUnLock proto", proto);
            var buffer = Network._instance.protoTypePool.CGoodUnLock.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGoodUnLock, buffer);
        };
        //通知强制解锁到期
        RequesterProtocols.prototype.c2s_CForceUnlockTimeExpire = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CForceUnlockTimeExpire.fromObject(messageObj);
            console.log("CForceUnlockTimeExpire proto", proto);
            var buffer = Network._instance.protoTypePool.CForceUnlockTimeExpire.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CForceUnlockTimeExpire, buffer);
        };
        //<!-- 发送短信验证 -->得到验证码
        RequesterProtocols.prototype.c2s_CReceiveCheckCode = function (checkCodeType) {
            var messageObj = {};
            messageObj.checkCodeType = checkCodeType; //2 道具安全锁 3藏宝阁
            var proto = Network._instance.protoTypePool.CReceiveCheckCode.fromObject(messageObj);
            console.log("CReceiveCheckCode proto", proto);
            var buffer = Network._instance.protoTypePool.CReceiveCheckCode.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReceiveCheckCode, buffer);
        };
        //<!-- 藏宝阁上架短信验证 -->藏宝阁发送验证码
        RequesterProtocols.prototype.c2s_CSendCBGCheckCode = function (code) {
            var messageObj = {};
            messageObj.code = code; //验证码
            var proto = Network._instance.protoTypePool.CSendCBGCheckCode.fromObject(messageObj);
            console.log("CSendCBGCheckCode proto", proto);
            var buffer = Network._instance.protoTypePool.CSendCBGCheckCode.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendCBGCheckCode, buffer);
        };
        //
        RequesterProtocols.prototype.c2s_CGetPetEquipInfo = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGetPetEquipInfo, byteArray);
        };
        //ljmm
        RequesterProtocols.prototype.c2s_CCheck_GM = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CCheckGM.fromObject(messageObj);
            var buffer = Network._instance.protoTypePool.CCheckGM.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCheckGM, buffer);
        };
        //我的伙伴的key
        RequesterProtocols.prototype.c2s_CGetHuoban_DetailInfo = function (huobanId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(huobanId);
            this.sendMsg(hanlder.ProtocolsEnum.CGetHuobanDetailInfo, byteArray);
        };
        //c2s_CSwitch_Zhenrong
        RequesterProtocols.prototype.c2s_CSwitch_Zhenrong = function (zhenrongid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(zhenrongid);
            this.sendMsg(hanlder.ProtocolsEnum.CSwitchZhenrong, byteArray);
        };
        //CZhenrongMember
        RequesterProtocols.prototype.c2s_CZhenrong_Member = function (zhenrongid, members) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(zhenrongid);
            byteArray.writeByte(members.length);
            var index;
            for (index = 0; index < members.length; index++) {
                byteArray.writeInt32(members[index]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CZhenrongMember, byteArray);
        };
        //<!--解锁伙伴请求-->
        RequesterProtocols.prototype.c2s_CActive_HuoBan = function (huobanId, activeType, activeTime) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(huobanId);
            byteArray.writeInt32(activeType);
            byteArray.writeInt32(activeTime);
            this.sendMsg(hanlder.ProtocolsEnum.CActiveHuoBan, byteArray);
        };
        //<!-- 改变阵容的光环-->
        RequesterProtocols.prototype.c2s_CSwitch_Zhenfa = function (zhenrongid, zhenfaid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(zhenrongid);
            byteArray.writeInt32(zhenfaid);
            this.sendMsg(hanlder.ProtocolsEnum.CSwitchZhenfa, byteArray);
        };
        //<!-- 获取伙伴信息列表-->
        RequesterProtocols.prototype.c2s_CGet_HuoBanList = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGetHuoBanList, byteArray);
        };
        //<!-- 请求进入冰封王座副本-->
        RequesterProtocols.prototype.c2s_CEnter_BingFengLand = function (landId, stage) {
            var messageObj = {};
            messageObj.landId = landId; //根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
            messageObj.stage = stage; //第几步
            var proto = Network._instance.protoTypePool.CEnterBingFengLand.fromObject(messageObj);
            console.log("CEnterBingFengLand proto", proto);
            var buffer = Network._instance.protoTypePool.CEnterBingFengLand.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEnterBingFengLand, buffer);
        };
        //<!-- 请求离开冰封王座副本-->
        RequesterProtocols.prototype.c2s_CLeave_BingFengLand = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CLeaveBingFengLand.fromObject(messageObj);
            console.log("CLeaveBingFengLand proto", proto);
            var buffer = Network._instance.protoTypePool.CLeaveBingFengLand.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CLeaveBingFengLand, buffer);
        };
        //<!-- 客户端请求打开冰封王座的界面-->
        RequesterProtocols.prototype.c2s_CReqBingFeng_Rank = function (npckey, landId) {
            var messageObj = {};
            messageObj.npckey = npckey; //
            messageObj.landId = landId; //根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
            var proto = Network._instance.protoTypePool.CReqBingFengRank.fromObject(messageObj);
            console.log("CReqBingFengRank proto", proto);
            var buffer = Network._instance.protoTypePool.CReqBingFengRank.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqBingFengRank, buffer);
        };
        //客户端请求打开冰封王座的界面
        RequesterProtocols.prototype.c2s_CCanEnter_BingFeng = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CCanEnterBingFeng, byteArray);
        };
        //<!-- 获取该关卡最快通关信息-->
        RequesterProtocols.prototype.c2s_CGetBingFeng_Detail = function (npckey, stage) {
            var messageObj = {};
            messageObj.npckey = npckey; //
            messageObj.stage = stage; //根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
            var proto = Network._instance.protoTypePool.CGetBingFengDetail.fromObject(messageObj);
            console.log("CGetBingFengDetail proto", proto);
            var buffer = Network._instance.protoTypePool.CGetBingFengDetail.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetBingFengDetail, buffer);
        };
        //<!-- 机器人发送战斗信息-->
        RequesterProtocols.prototype.c2s_CBattleto_BingFeng = function (roleid, npcid) {
            var messageObj = {};
            messageObj.roleid = roleid; //
            messageObj.npcid = npcid; //根据配置表里的数据,比如40级冰封王座是1,50级冰封王座是2
            var proto = Network._instance.protoTypePool.CBattletoBingFeng.fromObject(messageObj);
            console.log("CBattletoBingFeng proto", proto);
            var buffer = Network._instance.protoTypePool.CBattletoBingFeng.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBattletoBingFeng, buffer);
        };
        //<!-- 物品失效 -->
        RequesterProtocols.prototype.c2s_CItemLose_Effect = function (packid, itemkey) {
            var messageObj = {};
            messageObj.packid = packid; //
            messageObj.itemkey = itemkey; //
            var proto = Network._instance.protoTypePool.CItemLoseEffect.fromObject(messageObj);
            console.log("CItemLoseEffect proto", proto);
            var buffer = Network._instance.protoTypePool.CItemLoseEffect.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CItemLoseEffect, buffer);
        };
        //<!-- CGetPackInfo -->
        RequesterProtocols.prototype.c2s_CGetPack_Info = function (packid, npcid) {
            var messageObj = {};
            messageObj.packid = packid; //
            messageObj.npcid = npcid; //
            var proto = Network._instance.protoTypePool.CGetPackInfo.fromObject(messageObj);
            console.log("CGetPackInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CGetPackInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetPackInfo, buffer);
        };
        //<!-- CListPack -->
        RequesterProtocols.prototype.c2s_CList_Pack = function (packid, npcid) {
            // let messageObj:any = {};
            // messageObj.packid = packid; //
            // messageObj.npcid = npcid;//
            // var proto = Network._instance.protoTypePool.CListPack.fromObject(messageObj);
            // console.log("CListPack proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CListPack.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CListPack, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            ByteArrayUtils.writeLong(npcid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CListPack, byteArray);
        };
        //<!-- CPutOnEquip -->
        RequesterProtocols.prototype.c2s_CPutOn_Equip = function (packkey, dstPos) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packkey);
            byteArray.writeInt32(dstPos);
            this.sendMsg(hanlder.ProtocolsEnum.CPutOnEquip, byteArray);
        };
        //<!-- CTakeOffEquip -->
        RequesterProtocols.prototype.c2s_CTakeOff_Equip = function (equipkey, posinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(equipkey);
            byteArray.writeInt32(posinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CTakeOffEquip, byteArray);
        };
        //<!-- CTransItem -->
        RequesterProtocols.prototype.c2s_CTrans_Item = function (srcpackid, srckey, number, dstpackid, dstpos, page, npcid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(srcpackid); //背包id
            byteArray.writeInt32(srckey); //物品的Key
            byteArray.writeInt32(number); //数量
            byteArray.writeInt32(dstpackid); // 1为放入背包，2为放入仓库
            byteArray.writeInt32(dstpos); //仓库的位置 -1
            byteArray.writeInt32(page); //仓库的id
            ByteArrayUtils.writeLong(npcid, byteArray); // -1
            this.sendMsg(hanlder.ProtocolsEnum.CTransItem, byteArray);
        };
        //<!-- CDropItem -->
        RequesterProtocols.prototype.c2s_CDrop_Item = function (packid, keyinpack, npcid) {
            var bytearray = new ByteArray();
            bytearray.endian = Laya.Byte.BIG_ENDIAN;
            bytearray.writeInt32(packid);
            bytearray.writeInt32(keyinpack);
            bytearray.writeInt32(npcid);
            this.sendMsg(hanlder.ProtocolsEnum.CDropItem, bytearray);
        };
        //<!-- CPutOnPetEquip -->
        RequesterProtocols.prototype.c2s_CPutOnPet_Equip = function (packkey, petkey, dstPos) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packkey);
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(dstPos);
            this.sendMsg(hanlder.ProtocolsEnum.CPutOnPetEquip, byteArray);
        };
        //<!-- CTakeOffPetEquip -->
        RequesterProtocols.prototype.c2s_CTakeOffPet_Equip = function (equipkey, petkey, posinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(equipkey);
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(posinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CTakeOffPetEquip, byteArray);
        };
        //<!-- CGetItemTips -->
        RequesterProtocols.prototype.c2s_CGetItem_Tips = function (packid, keyinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CGetItemTips, byteArray);
        };
        //<!-- CAppendItem -->
        RequesterProtocols.prototype.c2s_CAppend_Item = function (keyinpack, idtype, id) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(keyinpack);
            byteArray.writeInt32(idtype);
            ByteArrayUtils.writeLong(id, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CAppendItem, byteArray);
        };
        //<!-- CGetPetEquipTips -->
        RequesterProtocols.prototype.c2s_CGetPetEquip_Tips = function (petkey, keyinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(petkey);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CGetPetEquipTips, byteArray);
            // this.sendMsg(ProtocolsEnum.CGetPetEquipTips, byteArray);
        };
        //<!-- CCleanTempPack -->
        RequesterProtocols.prototype.c2s_CCleanTemp_Pack = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CCleanTempPack.fromObject(messageObj);
            console.log("CCleanTempPack proto", proto);
            var buffer = Network._instance.protoTypePool.CCleanTempPack.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCleanTempPack, buffer);
        };
        //<!-- CXiuLiEquipItem -->
        RequesterProtocols.prototype.c2s_CXiuLiEquip_Item = function (repairtype, packid, keyinpack) {
            // let messageObj:any = {};
            // messageObj.repairtype = repairtype; //
            // messageObj.packid = packid;//
            // messageObj.keyinpack = keyinpack;//
            // var proto = Network._instance.protoTypePool.CXiuLiEquipItem.fromObject(messageObj);
            // console.log("CXiuLiEquipItem proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CXiuLiEquipItem.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CXiuLiEquipItem, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(repairtype);
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CXiuLiEquipItem, byteArray);
        };
        //<!-- CGetRoleEquip -->
        RequesterProtocols.prototype.c2s_CGetRole_Equip = function (roleid, sendmsg) {
            var messageObj = {};
            messageObj.roleid = roleid; //
            messageObj.sendmsg = sendmsg; //
            var proto = Network._instance.protoTypePool.CGetRoleEquip.fromObject(messageObj);
            console.log("CGetRoleEquip proto", proto);
            var buffer = Network._instance.protoTypePool.CGetRoleEquip.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetRoleEquip, buffer);
        };
        //<!-- CGetRolePetInfo -->
        RequesterProtocols.prototype.c2s_CGetRolePet_Info = function (roleid) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.CGetRolePetInfo, byte);
        };
        //<!-- CGetRoleEquip -->
        RequesterProtocols.prototype.c2s_CGetRoleEquip = function (roleid, sendmsg) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byte);
            byte.writeByte(sendmsg);
            this.sendMsg(hanlder.ProtocolsEnum.CGetRoleEquip, byte);
        };
        //<!-- CAttachGem -->
        RequesterProtocols.prototype.c2s_CAttach_Gem = function (keyinpack, packid, gemkey) {
            // let messageObj:any = {};
            // messageObj.keyinpack = keyinpack; //
            // messageObj.packid = packid; //
            // messageObj.gemkey = gemkey; //
            // var proto = Network._instance.protoTypePool.CAttachGem.fromObject(messageObj);
            // console.log("CAttachGem proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CAttachGem.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CAttachGem, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(keyinpack);
            byteArray.writeByte(packid);
            byteArray.writeInt32(gemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CAttachGem, byteArray);
        };
        RequesterProtocols.prototype.c2s_CGetTime_Award = function (awardid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeUint32(awardid);
            this.sendMsg(hanlder.ProtocolsEnum.CGetTimeAward, byteArray);
        };
        //<!-- CGetEquipTips -->
        RequesterProtocols.prototype.c2s_CGetEquip_Tips = function (packid, keyinpack, key2inpack) {
            var messageObj = {};
            messageObj.packid = packid; //
            messageObj.keyinpack = keyinpack; //
            messageObj.key2inpack = key2inpack; //
            var proto = Network._instance.protoTypePool.CGetEquipTips.fromObject(messageObj);
            console.log("CGetEquipTips proto", proto);
            var buffer = Network._instance.protoTypePool.CGetEquipTips.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetEquipTips, buffer);
        };
        //<!-- CReqAllNaiJiu -->
        RequesterProtocols.prototype.c2s_CReqAll_NaiJiu = function (packid) {
            var messageObj = {};
            messageObj.packid = packid; //
            var proto = Network._instance.protoTypePool.CReqAllNaiJiu.fromObject(messageObj);
            console.log("CReqAllNaiJiu proto", proto);
            var buffer = Network._instance.protoTypePool.CReqAllNaiJiu.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqAllNaiJiu, buffer);
        };
        //<!--打开道具背包 COpenItemBag -->
        RequesterProtocols.prototype.c2s_COpenItem_Bag = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.COpenItemBag.fromObject(messageObj);
            console.log("COpenItemBag proto", proto);
            var buffer = Network._instance.protoTypePool.COpenItemBag.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.COpenItemBag, buffer);
        };
        //<!-- CHeChengItem -->
        RequesterProtocols.prototype.c2s_CHeCheng_Item = function (money, isall, hammer, keyinpack) {
            var messageObj = {};
            messageObj.money = money; //
            messageObj.isall = isall; //
            messageObj.hammer = hammer; //
            messageObj.keyinpack = keyinpack; //
            var proto = Network._instance.protoTypePool.CHeChengItem.fromObject(messageObj);
            console.log("CHeChengItem proto", proto);
            var buffer = Network._instance.protoTypePool.CHeChengItem.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CHeChengItem, buffer);
        };
        //<!-- CHeChengPetEquip -->
        RequesterProtocols.prototype.c2s_CHeChengPet_Equip = function (keyinpack1, keyinpack2) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(keyinpack1);
            byteArray.writeInt32(keyinpack2);
            this.sendMsg(hanlder.ProtocolsEnum.CHeChengPetEquip, byteArray);
        };
        //<!-- CMailRead -->
        RequesterProtocols.prototype.c2s_CMailRead = function (kind, id) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(kind);
            ByteArrayUtils.writeLong(id, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CMailRead, byteArray);
        };
        //<!-- CMailGetAward -->
        RequesterProtocols.prototype.c2s_CMailGet_Award = function (kind, id) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(kind);
            ByteArrayUtils.writeLong(id, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CMailGetAward, byteArray);
        };
        //<!-- CDelGem -->
        RequesterProtocols.prototype.c2s_CDel_Gem = function (keyinpack, isequip, gempos) {
            // let messageObj:any = {};
            // messageObj.keyinpack = keyinpack; //类型 0=定时邮件 1=GM邮件
            // messageObj.isequip = isequip; //id
            // messageObj.gempos =gempos; //id
            // var proto = Network._instance.protoTypePool.CDelGem.fromObject(messageObj);
            // console.log("CDelGem proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CDelGem.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CDelGem, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(keyinpack);
            byteArray.writeByte(isequip);
            byteArray.writeInt32(gempos);
            this.sendMsg(hanlder.ProtocolsEnum.CDelGem, byteArray);
        };
        //<!-- CGetRoleInfo -->
        RequesterProtocols.prototype.c2s_CGetRole_Info = function (roleid) {
            var messageObj = {};
            messageObj.roleid = roleid; //
            var proto = Network._instance.protoTypePool.CGetRoleInfo.fromObject(messageObj);
            console.log("CGetRoleInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CGetRoleInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetRoleInfo, buffer);
        };
        RequesterProtocols.prototype.c2s_CGetMulDayLogin_Gift = function (rewardid) {
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeByte(rewardid);
            this.sendMsg(hanlder.ProtocolsEnum.CGetMulDayLoginGift, byteArray);
        };
        // CExtPackSize
        RequesterProtocols.prototype.c2s_CExtpack_Size = function (packid) {
            // let messageObj:any = {};
            // messageObj.packid = packid; //
            // var proto = Network._instance.protoTypePool.CExtPackSize.fromObject(messageObj);
            // console.log("CExtPackSize proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CExtPackSize.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CExtPackSize, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            this.sendMsg(hanlder.ProtocolsEnum.CExtPackSize, byteArray);
        };
        //<!-- COpenPack -->
        RequesterProtocols.prototype.c2s_COpen_Pack = function (packid) {
            var messageObj = {};
            messageObj.packid = packid; //
            var proto = Network._instance.protoTypePool.COpenPack.fromObject(messageObj);
            console.log("COpenPack proto", proto);
            var buffer = Network._instance.protoTypePool.COpenPack.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.COpenPack, buffer);
        };
        //<!-- CBuyPackMoney -->
        RequesterProtocols.prototype.c2s_CBuyPack_Money = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CBuyPackMoney.fromObject(messageObj);
            console.log("CBuyPackMoney proto", proto);
            var buffer = Network._instance.protoTypePool.CBuyPackMoney.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBuyPackMoney, buffer);
        };
        //<!--客户端申请替换宝石 CReplaceGemFromEquip -->
        RequesterProtocols.prototype.c2s_CReplaceGemFrom_Equip = function (equipItemkey, equipBag, gemIndex, gemItemkey) {
            // let messageObj: any = {};
            // messageObj.equipItemkey = equipItemkey; //装备的keyinpack
            // messageObj.equipBag = equipBag; //为0为背包栏，为1为装备栏
            // messageObj.gemIndex = gemIndex; //宝石槽索引
            // messageObj.gemItemkey = gemItemkey; //宝石的keyinpack,成功后扣除指定的这颗宝石
            // var proto = Network._instance.protoTypePool.CReplaceGemFromEquip.fromObject(messageObj);
            // console.log("CReplaceGemFromEquip proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CReplaceGemFromEquip.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CReplaceGemFromEquip, buffer);
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeInt32(equipItemkey);
            byte.writeByte(equipBag);
            byte.writeInt32(gemIndex);
            byte.writeInt32(gemItemkey);
            this.sendMsg(hanlder.ProtocolsEnum.CReplaceGemFromEquip, byte);
        };
        //<!--一键把物品从临时背包移动到背包 COneKeyMoveTempToBag -->
        RequesterProtocols.prototype.c2s_COneKeyMoveTempTo_Bag = function (srckey, number, dstpos, npcid) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeInt32(srckey);
            byte.writeInt32(number);
            byte.writeInt32(dstpos);
            ByteArrayUtils.writeLong(npcid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.COneKeyMoveTempToBag, byte);
        };
        //<!-- CListDepot -->
        RequesterProtocols.prototype.c2s_CList_Depot = function (pageid) {
            // let messageObj:any = {};
            // messageObj.pageid = pageid; //仓库的页数
            // var proto = Network._instance.protoTypePool.CListDepot.fromObject(messageObj);
            // console.log("CListDepot proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CListDepot.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CListDepot, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(pageid);
            this.sendMsg(hanlder.ProtocolsEnum.CListDepot, byteArray);
        };
        //<!--宝石替换 CReplaceGem -->
        RequesterProtocols.prototype.c2s_CReplace_Gem = function (ret, srckey, deskey) {
            var messageObj = {};
            messageObj.ret = ret; //0 表示不替换;1 表示替换
            messageObj.srckey = srckey; //在背包栏里源装备的key
            messageObj.deskey = deskey; //在装备栏里目标装备的key
            var proto = Network._instance.protoTypePool.CReplaceGem.fromObject(messageObj);
            console.log("CReplaceGem proto", proto);
            var buffer = Network._instance.protoTypePool.CReplaceGem.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReplaceGem, buffer);
        };
        //<!--摆摊Tip请求 COtherItemTips -->
        RequesterProtocols.prototype.c2s_COtherItem_Tips = function (roleid, packid, keyinpack) {
            // let messageObj: any = {};
            // messageObj.roleid = roleid; //目标玩家的id
            // messageObj.packid = packid; //
            // messageObj.keyinpack = keyinpack; //
            // var proto = Network._instance.protoTypePool.COtherItemTips.fromObject(messageObj);
            // console.log("COtherItemTips proto", proto);
            // var buffer: any = Network._instance.protoTypePool.COtherItemTips.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.COtherItemTips, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.COtherItemTips, byteArray);
        };
        //<!-- CGetDepotInfo -->
        RequesterProtocols.prototype.c2s_CGetDepot_Info = function (pageid) {
            // let messageObj:any = {};
            // messageObj.pageid = pageid; //从1开始
            // var proto = Network._instance.protoTypePool.CGetDepotInfo.fromObject(messageObj);
            // console.log("CGetDepotInfo proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CGetDepotInfo.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CGetDepotInfo, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(pageid);
            this.sendMsg(hanlder.ProtocolsEnum.CGetDepotInfo, byteArray);
        };
        //<!--修改仓库名称 CModifyDepotName -->
        RequesterProtocols.prototype.c2s_CModifyDepot_Name = function (depotIndex, depotName) {
            // let messageObj:any = {};
            // messageObj.depotIndex = depotIndex; //目标玩家的id
            // messageObj.depotName = depotName; //
            // var proto = Network._instance.protoTypePool.CModifyDepotName.fromObject(messageObj);
            // console.log("CModifyDepotName proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CModifyDepotName.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CModifyDepotName, buffer);
            // CModifyDepot
            var byteArray = new ByteArray();
            byteArray.endian = Endian.BIG_ENDIAN;
            byteArray.writeInt32(depotIndex);
            ByteArrayUtils.writeUtf16String(depotName, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CModifyDepotName, byteArray);
        };
        //<!--合成宝石 CComposeGem -->
        RequesterProtocols.prototype.c2s_CCompose_Gem = function (bUseRongHeJi, targetGemItemId, bagGems, shopGems) {
            // let messageObj:any = {};
            // messageObj.bUseRongHeJi = bUseRongHeJi; //是否使用融合剂 0:不使用 1:使用
            // messageObj.targetGemItemId = targetGemItemId; //合成宝石的ID
            // messageObj.bagGems = bagGems; //使用的背包宝石
            // messageObj.shopGems = shopGems; //使用的商店宝石
            // var proto = Network._instance.protoTypePool.CComposeGem.fromObject(messageObj);
            // console.log("CComposeGem proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CComposeGem.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CComposeGem, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(bUseRongHeJi);
            byteArray.writeInt32(targetGemItemId);
            byteArray.writeByte(bagGems.length);
            var index;
            var composeGemInfoBean;
            for (index = 0; index < bagGems.length; index++) {
                composeGemInfoBean = bagGems[index];
                byteArray.writeInt32(composeGemInfoBean.itemIdOrGoodId);
                byteArray.writeInt32(composeGemInfoBean.num);
            }
            byteArray.writeByte(shopGems.length);
            for (index = 0; index < shopGems.length; index++) {
                composeGemInfoBean = shopGems[index];
                byteArray.writeInt32(composeGemInfoBean.itemIdOrGoodId);
                byteArray.writeInt32(composeGemInfoBean.num);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CComposeGem, byteArray);
        };
        //<!--客户端请求道具找回列表 CItemRecoverList -->
        RequesterProtocols.prototype.c2s_CItemRecover_List = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CItemRecoverList, byteArray);
        };
        //<!--客户端请求道具找回 CItemRecover -->
        RequesterProtocols.prototype.c2s_CItem_Recover = function (uniqId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(uniqId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CItemRecover, byteArray);
        };
        //<!--客户端请求查看一个找回道具的信息 CRecoverItemInfo -->
        RequesterProtocols.prototype.c2s_CRecoverItem_Info = function (uniqId) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(uniqId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRecoverItemInfo, byteArray);
        };
        //<!--洗基础属性 CRefineEquipBase -->
        RequesterProtocols.prototype.c2s_CRefineEquip_Base = function (packid, keyinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CRefineEquipBase, byteArray);
        };
        //<!--保存基础属性 CSaveRefineData -->
        RequesterProtocols.prototype.c2s_CSaveRefine_Data = function (packid, keyinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CSaveRefineData, byteArray);
        };
        //<!--洗特技 CRefineEquipSkill -->
        RequesterProtocols.prototype.c2s_CRefineEquip_Skill = function (packid, keyinpack) {
            // let messageObj: any = {};
            // messageObj.packid = packid; //背包id
            // messageObj.keyinpack = keyinpack; //key
            // var proto = Network._instance.protoTypePool.CRefineEquipSkill.fromObject(messageObj);
            // console.log("CRefineEquipSkill proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRefineEquipSkill.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRefineEquipSkill, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CRefineEquipSkill, byteArray);
        };
        //<!--洗所有属性 CRefineEquipAll -->
        RequesterProtocols.prototype.c2s_CRefineEquip_All = function (packid, keyinpack) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(packid);
            byteArray.writeInt32(keyinpack);
            this.sendMsg(hanlder.ProtocolsEnum.CRefineEquipAll, byteArray);
        };
        //<!--客户端请求角色安全锁信息 CReqLockInfo -->
        RequesterProtocols.prototype.c2s_CReqLock_Info = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqLockInfo.fromObject(messageObj);
            console.log("CReqLockInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CReqLockInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqLockInfo, buffer);
        };
        //<!--客户端请求设置安全锁 CReqAddLock -->
        RequesterProtocols.prototype.c2s_CReqAdd_Lock = function (password) {
            var messageObj = {};
            messageObj.password = password; //密码
            var proto = Network._instance.protoTypePool.CReqAddLock.fromObject(messageObj);
            console.log("CReqAddLock proto", proto);
            var buffer = Network._instance.protoTypePool.CReqAddLock.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqAddLock, buffer);
        };
        //<!--客户端请求解锁 CReqUnlock -->
        RequesterProtocols.prototype.c2s_CReqUn_lock = function (password) {
            var messageObj = {};
            messageObj.password = password; //密码
            var proto = Network._instance.protoTypePool.CReqUnlock.fromObject(messageObj);
            console.log("CReqUnlock proto", proto);
            var buffer = Network._instance.protoTypePool.CReqUnlock.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqUnlock, buffer);
        };
        //<!--客户端请求强行解锁 CReqForceUnlock -->
        RequesterProtocols.prototype.c2s_CReqForceUn_lock = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqForceUnlock.fromObject(messageObj);
            console.log("CReqForceUnlock proto", proto);
            var buffer = Network._instance.protoTypePool.CReqForceUnlock.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqForceUnlock, buffer);
        };
        //<!--洗所有属性 CReqChangePassword -->
        RequesterProtocols.prototype.c2s_CReqChange_Password = function (oldPassword, newPassword) {
            var messageObj = {};
            messageObj.oldPassword = oldPassword; //旧密码
            messageObj.newPassword = newPassword; //新密码
            var proto = Network._instance.protoTypePool.CReqChangePassword.fromObject(messageObj);
            console.log("CReqChangePassword proto", proto);
            var buffer = Network._instance.protoTypePool.CReqChangePassword.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqChangePassword, buffer);
        };
        //<!--客户端请求取消安全锁 CReqCancelLock -->
        RequesterProtocols.prototype.c2s_CReqCancel_Lock = function (password) {
            var messageObj = {};
            messageObj.password = password; //密码
            var proto = Network._instance.protoTypePool.CReqCancelLock.fromObject(messageObj);
            console.log("CReqCancelLock proto", proto);
            var buffer = Network._instance.protoTypePool.CReqCancelLock.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqCancelLock, buffer);
        };
        //<!--注册为师傅 CRegMaster -->
        RequesterProtocols.prototype.c2s_CReg_Master = function (declaration) {
            var messageObj = {};
            messageObj.declaration = declaration; //宣言
            var proto = Network._instance.protoTypePool.CRegMaster.fromObject(messageObj);
            console.log("CRegMaster proto", proto);
            var buffer = Network._instance.protoTypePool.CRegMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRegMaster, buffer);
        };
        //<!--查找师傅 CSearchMaster -->
        RequesterProtocols.prototype.c2s_CSearch_Master = function (pageid) {
            var messageObj = {};
            messageObj.pageid = pageid; //页数
            var proto = Network._instance.protoTypePool.CSearchMaster.fromObject(messageObj);
            console.log("CSearchMaster proto", proto);
            var buffer = Network._instance.protoTypePool.CSearchMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSearchMaster, buffer);
        };
        //<!--查找师傅 CRequestAsApprentice -->
        RequesterProtocols.prototype.c2s_CRequestAs_Apprentice = function (masterid) {
            var messageObj = {};
            messageObj.masterid = masterid; //请求师傅的id
            var proto = Network._instance.protoTypePool.CRequestAsApprentice.fromObject(messageObj);
            console.log("CRequestAsApprentice proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestAsApprentice.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestAsApprentice, buffer);
        };
        //<!--查找师傅 CPrenticeRequestResult -->
        RequesterProtocols.prototype.c2s_CPrenticeRequest_Result = function (prenticeid, result) {
            var messageObj = {};
            messageObj.prenticeid = prenticeid; //请求师傅的id
            messageObj.result = result; //结果
            var proto = Network._instance.protoTypePool.CPrenticeRequestResult.fromObject(messageObj);
            console.log("CPrenticeRequestResult proto", proto);
            var buffer = Network._instance.protoTypePool.CPrenticeRequestResult.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPrenticeRequestResult, buffer);
        };
        //<!--查找师傅 CCanAcceptPrentice -->
        RequesterProtocols.prototype.c2s_CCanAccept_Prentice = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CCanAcceptPrentice.fromObject(messageObj);
            console.log("CCanAcceptPrentice proto", proto);
            var buffer = Network._instance.protoTypePool.CCanAcceptPrentice.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCanAcceptPrentice, buffer);
        };
        //<!--查找师傅 CConfirmRegMaster -->
        RequesterProtocols.prototype.c2s_CConfirmReg_Master = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CConfirmRegMaster.fromObject(messageObj);
            console.log("CConfirmRegMaster proto", proto);
            var buffer = Network._instance.protoTypePool.CConfirmRegMaster.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CConfirmRegMaster, buffer);
        };
        //<!--查找师傅 CSearchPrentice -->
        RequesterProtocols.prototype.c2s_CSearch_Prentice = function (pageid) {
            var messageObj = {};
            messageObj.pageid = pageid; //页数
            var proto = Network._instance.protoTypePool.CSearchPrentice.fromObject(messageObj);
            console.log("CSearchPrentice proto", proto);
            var buffer = Network._instance.protoTypePool.CSearchPrentice.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSearchPrentice, buffer);
        };
        //wangf\
        RequesterProtocols.prototype.c2s_CAcceptOrRefuseInvitation = function (hostroleid, accept) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(hostroleid, byteArray);
            byteArray.writeByte(accept);
            this.sendMsg(hanlder.ProtocolsEnum.CAcceptOrRefuseInvitation, byteArray);
        };
        /**
         * 升级公会大厅，金库，药店，旅馆
         */
        RequesterProtocols.prototype.c2s_CRequestClanLevelup = function (id) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(id);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestClanLevelup, byteArray);
        };
        /**
         * 领取分红
         */
        RequesterProtocols.prototype.c2s_CGrabBonus = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGrabBonus, byteArray);
        };
        /**
         * 查询分红
         */
        RequesterProtocols.prototype.c2s_CBonusQuery = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CBonusQuery, byteArray);
        };
        /**
         * 客户端请求公会宗旨
         */
        RequesterProtocols.prototype.c2s_CRequestClanAim = function (clanid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(clanid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestClanAim, byteArray);
        };
        /**
         * 更改公会名字
         */
        RequesterProtocols.prototype.c2s_CChangeClanName = function (newname) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(newname, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CChangeClanName, byteArray);
        };
        /**
         * 请求搜索公会
         */
        RequesterProtocols.prototype.c2s_CSearchClan = function (clanid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(clanid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSearchClan, byteArray);
        };
        /**
         * 一键申请
         */
        RequesterProtocols.prototype.c2s_COneKeyApplyClan = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            // messageObj.clanid = clanid;
            var proto = Network._instance.protoTypePool.COneKeyApplyClan.fromObject(messageObj);
            console.log("c2s_COneKeyApplyClan proto", proto);
            var buffer = Network._instance.protoTypePool.COneKeyApplyClan.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.COneKeyApplyClan, buffer);
        };
        /**
         * 禁言
         */
        RequesterProtocols.prototype.c2s_CBannedtalk = function (memberid, flag) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(memberid, byteArray);
            byteArray.writeInt32(flag);
            this.sendMsg(hanlder.ProtocolsEnum.CBannedtalk, byteArray);
        };
        /**
         * 进入公会地图
         */
        RequesterProtocols.prototype.c2s_CEnterClanMap = function () {
            //////////////////////////////////////////////
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CEnterClanMap, byteArray);
        };
        /**
         * 请求刷新成员列表
         */
        RequesterProtocols.prototype.c2s_CRefreshMemberList = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRefreshMemberList, byteArray);
        };
        /**
         * 取消申请公会
         */
        RequesterProtocols.prototype.c2s_CCancelApplyClan = function (clanid) {
            //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.clanid = clanid;
            // var proto = Network._instance.protoTypePool.CCancelApplyClan.fromObject(messageObj);
            // console.log("c2s_CCancelApplyClan proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CCancelApplyClan.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CCancelApplyClan, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(clanid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CCancelApplyClan, byteArray);
        };
        /**
         * 是否开启自动接收入会
         */
        RequesterProtocols.prototype.c2s_COpenAutoJoinClan = function (autostate, requestlevel, applylevel) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(autostate);
            byteArray.writeInt16(requestlevel);
            byteArray.writeInt16(applylevel);
            this.sendMsg(hanlder.ProtocolsEnum.COpenAutoJoinClan, byteArray);
        };
        /**
         * 请求公会事件信息
         */
        RequesterProtocols.prototype.c2s_CRequestEventInfo = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRequestEventInfo, byteArray);
        };
        /**
         * 请求公会事件详情信息
         */
        RequesterProtocols.prototype.c2s_CRequestRoleInfo = function (roleid, moduletype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleid = roleid; //角色id 
            messageObj.moduletype = moduletype; //模块类型
            var proto = Network._instance.protoTypePool.CRequestRoleInfo.fromObject(messageObj);
            console.log("c2s_CRequestRoleInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestRoleInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRoleInfo, buffer);
        };
        /**
         * 请求修改产药倍数
         */
        RequesterProtocols.prototype.c2s_CRequestSelectType = function (selecttype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(selecttype);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSelectType, byteArray);
        };
        /**
         * 请求符文请求信息
         */
        RequesterProtocols.prototype.c2s_CRequestRuneInfo = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRuneInfo, byteArray);
        };
        /**
         * 捐献符文
         */
        RequesterProtocols.prototype.c2s_CRuneGive = function (roleid, givetype, givevalue, itemkey, bagtype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            byteArray.writeInt32(givetype); //捐赠类型  0活力  1道具
            byteArray.writeInt32(givevalue); //物品code
            byteArray.writeInt32(itemkey); //物品key
            byteArray.writeInt32(bagtype); //背包类型
            this.sendMsg(hanlder.ProtocolsEnum.CRuneGive, byteArray);
        };
        /**
         * 请求符文
         */
        RequesterProtocols.prototype.c2s_CRuneRequest = function (runerequestinfolist) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            var size = runerequestinfolist.length;
            byteArray.writeInt8(size);
            for (var i = 0; i < size; i++) {
                byteArray.writeInt32(runerequestinfolist[i]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CRuneRequest, byteArray);
        };
        /**
         * 请求符文统计
         */
        RequesterProtocols.prototype.c2s_CRequestRuneCount = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRuneCount, byteArray);
        };
        /**
         * 请求符文界面
         */
        RequesterProtocols.prototype.c2s_CRuneRequestView = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRuneRequestView, byteArray);
        };
        /**
         * 客户端请求服务器该玩家是否有公会
         */
        RequesterProtocols.prototype.c2s_CRefreshRoleClan = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRefreshRoleClan, byteArray);
        };
        /**
         * 客户端请求邀请界面
         */
        RequesterProtocols.prototype.c2s_CClanInvitationView = function (type_level, type_school, type_sex) {
            // //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.type_level = type_level;  //等级删选  -1表示所有
            // messageObj.type_school = type_school;  //职业删选  -1表示所有
            // messageObj.type_sex = type_sex;   //性别删选  1男  2女  -1表示所有
            // var proto = Network._instance.protoTypePool.CClanInvitationView.fromObject(messageObj);
            // console.log("c2s_CClanInvitationView proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CClanInvitationView.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CClanInvitationView, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(type_level);
            byteArray.writeInt32(type_school);
            byteArray.writeInt32(type_sex);
            this.sendMsg(hanlder.ProtocolsEnum.CClanInvitationView, byteArray);
        };
        /**
         * 搜索
         */
        RequesterProtocols.prototype.c2s_CRequestSearchRole = function (roleId) {
            //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.roleId = roleId;
            // var proto = Network._instance.protoTypePool.CRequestSearchRole.fromObject(messageObj);
            // console.log("c2s_CRequestSearchRole proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestSearchRole.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestSearchRole, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(roleId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSearchRole, byteArray);
        };
        /**
         * 改变公会副本
         */
        RequesterProtocols.prototype.c2s_CChangeClanInst = function (claninstservice) {
            // //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.claninstservice = claninstservice;  //进入副本服务编号
            // var proto = Network._instance.protoTypePool.CChangeClanInst.fromObject(messageObj);
            // console.log("c2s_CChangeClanInst proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CChangeClanInst.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CChangeClanInst, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(claninstservice);
            this.sendMsg(hanlder.ProtocolsEnum.CChangeClanInst, byteArray);
        };
        /**
         * 请求弹劾界面
         */
        RequesterProtocols.prototype.c2s_CRequestImpeachMentView = function (cmdtype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(cmdtype);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestImpeachMentView, byteArray);
        };
        /**
         * 得到对战列表
         */
        RequesterProtocols.prototype.c2s_CGetClanFightList = function (whichweek, which) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(whichweek);
            byteArray.writeInt32(which);
            this.sendMsg(hanlder.ProtocolsEnum.CGetClanFightList, byteArray);
        };
        /**
         * 点击进入pk
         */
        RequesterProtocols.prototype.c2s_CStartClanFightBattle = function (targetid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.targetid = targetid; //目标id
            var proto = Network._instance.protoTypePool.CStartClanFightBattle.fromObject(messageObj);
            console.log("c2s_CStartClanFightBattle proto", proto);
            var buffer = Network._instance.protoTypePool.CStartClanFightBattle.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CStartClanFightBattle, buffer);
        };
        /**
         * 公会战时统计
         */
        RequesterProtocols.prototype.c2s_CBattleFieldScore = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CBattleFieldScore.fromObject(messageObj);
            console.log("c2s_CBattleFieldScore proto", proto);
            var buffer = Network._instance.protoTypePool.CBattleFieldScore.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBattleFieldScore, buffer);
        };
        /**
         * 公会战时统计
         */
        RequesterProtocols.prototype.c2s_CBattleFieldRankList = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CBattleFieldRankList.fromObject(messageObj);
            console.log("c2s_CBattleFieldRankList proto", proto);
            var buffer = Network._instance.protoTypePool.CBattleFieldRankList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBattleFieldRankList, buffer);
        };
        /**
         * 请求是否是敌对
         */
        RequesterProtocols.prototype.c2s_CRequestRoleIsEnemy = function (roleidlist) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleidlist = roleidlist; //角色list
            var proto = Network._instance.protoTypePool.CRequestRoleIsEnemy.fromObject(messageObj);
            console.log("c2s_CRequestRoleIsEnemy proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestRoleIsEnemy.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRoleIsEnemy, buffer);
        };
        /**
         * 得到下次清零时间
         */
        RequesterProtocols.prototype.c2s_CGetClearTime = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGetClearTime, byteArray);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSSendCrosserInfo = function (season, week, seasonendtime, crosserinfo) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.season = season;
            messageObj.week = week;
            messageObj.seasonendtime = seasonendtime;
            messageObj.crosserinfo = crosserinfo;
            var proto = Network._instance.protoTypePool.CSSendCrosserInfo.fromObject(messageObj);
            console.log("c2s_CSSendCrosserInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CSSendCrosserInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSSendCrosserInfo, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSSendRoomInfos = function (roleId, roomInfos) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.roomInfos = roomInfos;
            var proto = Network._instance.protoTypePool.CSSendRoomInfos.fromObject(messageObj);
            console.log("c2s_CSSendCrosserInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CSSendRoomInfos.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSSendRoomInfos, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSUpdataRoomInfo = function (roleId, roomInfos) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.roomInfos = roomInfos;
            var proto = Network._instance.protoTypePool.CSUpdataRoomInfo.fromObject(messageObj);
            console.log("c2s_CSUpdataRoomInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CSUpdataRoomInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSUpdataRoomInfo, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSLeaveRoom = function (roleId, LeaveroleId, bSend2Client) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.LeaveroleId = LeaveroleId;
            messageObj.bSend2Client = bSend2Client;
            var proto = Network._instance.protoTypePool.CSLeaveRoom.fromObject(messageObj);
            console.log("c2s_CSLeaveRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CSLeaveRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSLeaveRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSStandCross = function (roleId, standroleId, flag, roomid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.standroleId = standroleId;
            messageObj.flag = flag; //1准备，2取消
            messageObj.roomid = roomid;
            var proto = Network._instance.protoTypePool.CSStandCross.fromObject(messageObj);
            console.log("c2s_CSStandCross proto", proto);
            var buffer = Network._instance.protoTypePool.CSStandCross.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSStandCross, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSNotifyMsg = function (roleId, errorType, msgID) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.errorType = errorType;
            messageObj.msgID = msgID;
            var proto = Network._instance.protoTypePool.CSNotifyMsg.fromObject(messageObj);
            console.log("c2s_CSNotifyMsg proto", proto);
            var buffer = Network._instance.protoTypePool.CSNotifyMsg.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSNotifyMsg, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSRoomStand = function (roleId, flag, roomid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.flag = flag;
            messageObj.roomid = roomid;
            var proto = Network._instance.protoTypePool.CSRoomStand.fromObject(messageObj);
            console.log("c2s_CSRoomStand proto", proto);
            var buffer = Network._instance.protoTypePool.CSRoomStand.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSRoomStand, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSCrossBattleInfo = function (roleId, Room1members, Room2members) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.Room1members = Room1members;
            messageObj.Room2members = Room2members;
            var proto = Network._instance.protoTypePool.CSRoomStand.fromObject(messageObj);
            console.log("c2s_CSRoomStand proto", proto);
            var buffer = Network._instance.protoTypePool.CSRoomStand.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSRoomStand, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSCrossBattleMemberState = function (roleId, stateChangeroleId, state) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.stateChangeroleId = stateChangeroleId;
            messageObj.state = state;
            var proto = Network._instance.protoTypePool.CSCrossBattleMemberState.fromObject(messageObj);
            console.log("c2s_CSCrossBattleMemberState proto", proto);
            var buffer = Network._instance.protoTypePool.CSCrossBattleMemberState.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSCrossBattleMemberState, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSCrossBattleResult = function (roleId, resultType, heroIntegral, heroMaxIntegral, herolistFightTime, herolistWinTime, herolistRunawayTime) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.resultType = resultType; //-1 失败 1 胜利 0平局
            messageObj.heroIntegral = heroIntegral;
            messageObj.heroMaxIntegral = heroMaxIntegral;
            messageObj.herolistFightTime = herolistFightTime; // 战斗次数
            messageObj.herolistWinTime = herolistWinTime; //胜利次数
            messageObj.herolistRunawayTime = herolistRunawayTime; //逃跑次数
            var proto = Network._instance.protoTypePool.CSCrossBattleResult.fromObject(messageObj);
            console.log("c2s_CSCrossBattleResult proto", proto);
            var buffer = Network._instance.protoTypePool.CSCrossBattleResult.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSCrossBattleResult, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSChangeCrosserForm = function (roleId, changeroleId, formId, formlv) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.changeroleId = changeroleId;
            messageObj.formId = formId;
            messageObj.formlv = formlv;
            var proto = Network._instance.protoTypePool.CSChangeCrosserForm.fromObject(messageObj);
            console.log("c2s_CSChangeCrosserForm proto", proto);
            var buffer = Network._instance.protoTypePool.CSChangeCrosserForm.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSChangeCrosserForm, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSCrossMoneyBonus = function (roleId, crossMoney, useditems) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.crossMoney = crossMoney;
            messageObj.useditems = useditems;
            var proto = Network._instance.protoTypePool.CSCrossMoneyBonus.fromObject(messageObj);
            console.log("c2s_CSCrossMoneyBonus proto", proto);
            var buffer = Network._instance.protoTypePool.CSCrossMoneyBonus.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSCrossMoneyBonus, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSEndCross = function (roleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            var proto = Network._instance.protoTypePool.CSEndCross.fromObject(messageObj);
            console.log("c2s_CSEndCross proto", proto);
            var buffer = Network._instance.protoTypePool.CSEndCross.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSEndCross, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSResultTTBonus = function (roleId, ttBonusid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.ttBonusid = ttBonusid;
            var proto = Network._instance.protoTypePool.CSResultTTBonus.fromObject(messageObj);
            console.log("c2s_CSResultTTBonus proto", proto);
            var buffer = Network._instance.protoTypePool.CSResultTTBonus.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSResultTTBonus, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSInvitJoinRoom = function (beInvitroleId, Invitername, Invitroomid, Invitroomname, pwd) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.beInvitroleId = beInvitroleId;
            messageObj.Invitername = Invitername;
            messageObj.Invitroomid = Invitroomid;
            messageObj.Invitroomname = Invitroomname;
            messageObj.pwd = pwd;
            var proto = Network._instance.protoTypePool.CSInvitJoinRoom.fromObject(messageObj);
            console.log("c2sCSInvitJoinRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CSInvitJoinRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSInvitJoinRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSReqCrossRankList = function (roleId, ranklevel, ranktype, rankindex, RankLists) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.ranklevel = ranklevel;
            messageObj.ranktype = ranktype;
            messageObj.rankindex = rankindex;
            messageObj.RankLists = RankLists;
            var proto = Network._instance.protoTypePool.CSReqCrossRankList.fromObject(messageObj);
            console.log("c2s_CSReqCrossRankList proto", proto);
            var buffer = Network._instance.protoTypePool.CSReqCrossRankList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSReqCrossRankList, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSKickoffRoom = function (roleId, bekickoffroleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.bekickoffroleId = bekickoffroleId;
            var proto = Network._instance.protoTypePool.CSKickoffRoom.fromObject(messageObj);
            console.log("c2s_CSKickoffRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CSKickoffRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSKickoffRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSSwapRoomMember = function (roleId, index1, index2) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            messageObj.index1 = index1; //index是队员的序号，5人队伍的话，就是0~4
            messageObj.index2 = index2; //index是队员的序号，5人队伍的话，就是0~4
            var proto = Network._instance.protoTypePool.CSSwapRoomMember.fromObject(messageObj);
            console.log("c2s_CSSwapRoomMember proto", proto);
            var buffer = Network._instance.protoTypePool.CSSwapRoomMember.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSSwapRoomMember, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSendAllServerMsg = function (worldMsg, flag) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.worldMsg = worldMsg;
            messageObj.flag = flag; //1=跨服战队赛消息 2=普通世界消息
            var proto = Network._instance.protoTypePool.CSendAllServerMsg.fromObject(messageObj);
            console.log("c2s_CSendAllServerMsg proto", proto);
            var buffer = Network._instance.protoTypePool.CSendAllServerMsg.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSendAllServerMsg, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CReqCrosserInfo = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            // messageObj.worldMsg = worldMsg;
            // messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息
            var proto = Network._instance.protoTypePool.CReqCrosserInfo.fromObject(messageObj);
            console.log("c2s_CReqCrosserInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CReqCrosserInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqCrosserInfo, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CReqRoomInfos = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            // messageObj.worldMsg = worldMsg;
            // messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息
            var proto = Network._instance.protoTypePool.CReqRoomInfos.fromObject(messageObj);
            console.log("c2s_CReqRoomInfos proto", proto);
            var buffer = Network._instance.protoTypePool.CReqRoomInfos.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqRoomInfos, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CLeaveRoom = function (roomid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roomid = roomid;
            // messageObj.flag = flag;  //1=跨服战队赛消息 2=普通世界消息
            var proto = Network._instance.protoTypePool.CLeaveRoom.fromObject(messageObj);
            console.log("c2s_CLeaveRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CLeaveRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CLeaveRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CStandCross = function (flag, roomid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.flag = flag;
            messageObj.roomid = roomid;
            var proto = Network._instance.protoTypePool.CStandCross.fromObject(messageObj);
            console.log("c2s_CStandCross proto", proto);
            var buffer = Network._instance.protoTypePool.CStandCross.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CStandCross, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CCreateRoom = function (roomName, pwd) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roomName = roomName;
            messageObj.pwd = pwd;
            var proto = Network._instance.protoTypePool.CCreateRoom.fromObject(messageObj);
            console.log("c2s_CCreateRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CCreateRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCreateRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CEnterRoom = function (roomid, pwd) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roomid = roomid;
            messageObj.pwd = pwd;
            var proto = Network._instance.protoTypePool.CEnterRoom.fromObject(messageObj);
            console.log("c2s_CEnterRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CEnterRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEnterRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CRoomStand = function (flag, roomid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.flag = flag;
            messageObj.roomid = roomid;
            var proto = Network._instance.protoTypePool.CRoomStand.fromObject(messageObj);
            console.log("c2s_CRoomStand proto", proto);
            var buffer = Network._instance.protoTypePool.CRoomStand.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRoomStand, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CChangeCrosserForm = function (formId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.formId = formId;
            var proto = Network._instance.protoTypePool.CChangeCrosserForm.fromObject(messageObj);
            console.log("c2s_CChangeCrosserForm proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeCrosserForm.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeCrosserForm, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CChangeRoomPwd = function (roompwd) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roompwd = roompwd;
            var proto = Network._instance.protoTypePool.CChangeRoomPwd.fromObject(messageObj);
            console.log("c2s_CChangeRoomPwd proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeRoomPwd.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeRoomPwd, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CEndCross = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            // messageObj.roompwd = roompwd;
            var proto = Network._instance.protoTypePool.CEndCross.fromObject(messageObj);
            console.log("c2s_CEndCross proto", proto);
            var buffer = Network._instance.protoTypePool.CEndCross.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEndCross, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CReqTTBonus = function (ttBonusid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.ttBonusid = ttBonusid;
            var proto = Network._instance.protoTypePool.CReqTTBonus.fromObject(messageObj);
            console.log("c2s_CReqTTBonus proto", proto);
            var buffer = Network._instance.protoTypePool.CReqTTBonus.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqTTBonus, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CInvitJoinRoom = function (beInvitroleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.beInvitroleId = beInvitroleId;
            var proto = Network._instance.protoTypePool.CInvitJoinRoom.fromObject(messageObj);
            console.log("c2s_CReqTTBonus proto", proto);
            var buffer = Network._instance.protoTypePool.CInvitJoinRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CInvitJoinRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CReqCrossRankList = function (ranklevel, ranktype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.ranklevel = ranklevel;
            messageObj.ranktype = ranktype;
            var proto = Network._instance.protoTypePool.CReqCrossRankList.fromObject(messageObj);
            console.log("c2s_CReqCrossRankList proto", proto);
            var buffer = Network._instance.protoTypePool.CReqCrossRankList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqCrossRankList, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CKickoffRoom = function (bekickoffroleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.bekickoffroleId = bekickoffroleId;
            var proto = Network._instance.protoTypePool.CKickoffRoom.fromObject(messageObj);
            console.log("c2s_CKickoffRoom proto", proto);
            var buffer = Network._instance.protoTypePool.CKickoffRoom.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CKickoffRoom, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CEnterLeaveHell = function (enterleave) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.enterleave = enterleave;
            var proto = Network._instance.protoTypePool.CEnterLeaveHell.fromObject(messageObj);
            console.log("c2s_CEnterLeaveHell proto", proto);
            var buffer = Network._instance.protoTypePool.CEnterLeaveHell.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEnterLeaveHell, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSetRoomOwner = function (roleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            var proto = Network._instance.protoTypePool.CSetRoomOwner.fromObject(messageObj);
            console.log("c2s_CSetRoomOwner proto", proto);
            var buffer = Network._instance.protoTypePool.CSetRoomOwner.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSetRoomOwner, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CSwapRoomMember = function (index1, index2) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.index1 = index1;
            messageObj.index2 = index2;
            var proto = Network._instance.protoTypePool.CSwapRoomMember.fromObject(messageObj);
            console.log("c2s_CSwapRoomMember proto", proto);
            var buffer = Network._instance.protoTypePool.CSwapRoomMember.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSwapRoomMember, buffer);
        };
        /**
         * 聊天C-->S
         */
        RequesterProtocols.prototype.c2s_CSendMessageToRole = function (roleid, content, checkShiedMsg, displayinfo) {
            //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.roleid = roleid;
            // messageObj.content = content;
            // messageObj.checkShiedMsg = checkShiedMsg;
            // messageObj.displayinfo = displayinfo;
            // var proto = Network._instance.protoTypePool.CSendMessageToRole.fromObject(messageObj);
            // console.log("c2s_CSendMessageToRole proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CSendMessageToRole.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CSendMessageToRole, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            ByteArrayUtils.writeUtf16String(content, byteArray);
            ByteArrayUtils.writeUtf16String(checkShiedMsg, byteArray);
            byteArray.writeByte(displayinfo.length);
            // var index: number;
            // var displayInfo;
            for (var index = 0; index < displayinfo.length; index++) {
                byteArray.writeInt32(displayinfo[index].displaytype);
                ByteArrayUtils.writeLong(displayinfo[index].roleid, byteArray);
                ByteArrayUtils.writeLong(displayinfo[index].shopid, byteArray);
                byteArray.writeInt32(displayinfo[index].counterid);
                byteArray.writeInt32(displayinfo[index].uniqid);
                ByteArrayUtils.writeLong(displayinfo[index].teamid, byteArray);
                ByteArrayUtils.writeLong(displayinfo[index].crosstt, byteArray);
                ByteArrayUtils.writeLong(displayinfo[index].serverid, byteArray);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CSendMessageToRole, byteArray);
        };
        /**
         * 聊天C-->S
         */
        RequesterProtocols.prototype.c2s_CBreakOffRelation = function (roleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CBreakOffRelation, byteArray);
        };
        /**
         *加好友C-->S
         */
        RequesterProtocols.prototype.c2s_CRequestAddFriend = function (roleId) {
            //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.roleId = roleId;
            // var proto = Network._instance.protoTypePool.CRequestAddFriend.fromObject(messageObj);
            // console.log("c2s_CRequestAddFriend proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestAddFriend.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestAddFriend, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestAddFriend, byteArray);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CChangeBaseConfig = function (refuseStrangerMsg) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.refuseStrangerMsg = refuseStrangerMsg;
            var proto = Network._instance.protoTypePool.CChangeBaseConfig.fromObject(messageObj);
            console.log("c2s_CChangeBaseConfig proto", proto);
            var buffer = Network._instance.protoTypePool.CChangeBaseConfig.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CChangeBaseConfig, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CRequestUpdateRoleInfo = function (roleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestUpdateRoleInfo, byteArray);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CRequestSpaceRoleInfo = function (roleid, reqtype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleid = roleid;
            messageObj.reqtype = reqtype;
            var proto = Network._instance.protoTypePool.CRequestSpaceRoleInfo.fromObject(messageObj);
            console.log("c2s_CRequestSpaceRoleInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestSpaceRoleInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSpaceRoleInfo, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CReqJionCamp = function (campType) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.campType = campType;
            var proto = Network._instance.protoTypePool.CReqJionCamp.fromObject(messageObj);
            console.log("c2s_CReqJionCamp proto", proto);
            var buffer = Network._instance.protoTypePool.CReqJionCamp.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqJionCamp, buffer);
        };
        /**
         *
         */
        RequesterProtocols.prototype.c2s_CCampPK = function (roleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            var proto = Network._instance.protoTypePool.CCampPK.fromObject(messageObj);
            console.log("c2s_CCampPK proto", proto);
            var buffer = Network._instance.protoTypePool.CCampPK.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCampPK, buffer);
        };
        /**
         *搜索好友C-->S
         */
        RequesterProtocols.prototype.c2s_CRequestSearchFriend = function (roleId) {
            //////////////////////////////////////////////
            // let messageObj: any = {};
            // messageObj.roleId = roleId;
            // var proto = Network._instance.protoTypePool.CRequestSearchFriend.fromObject(messageObj);
            // console.log("c2s_CRequestSearchFriend proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestSearchFriend.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestSearchFriend, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(roleId, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSearchFriend, byteArray);
        };
        /**
         *客户端请求推荐好友
         */
        RequesterProtocols.prototype.c2s_CRecommendFriend = function () {
            //////////////////////////////////////////////
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CRecommendFriend.fromObject(messageObj);
            // console.log("c2s_CRecommendFriend proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRecommendFriend.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRecommendFriend, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRecommendFriend, byteArray);
        };
        //sugq 客户端1
        //CGiveInfoList 客户端请求好友赠送信息列表
        RequesterProtocols.prototype.c2s_give_infolist = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGiveInfoList.fromObject(messageObj);
            console.log("CGiveInfoList proto", proto);
            var buffer = Network._instance.protoTypePool.CGiveInfoList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGiveInfoList, buffer);
        };
        //CGiveItem   <!-- 赠送道具 -->
        RequesterProtocols.prototype.c2s_give_item = function (roleId, itemMap) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleId, byteArray);
            byteArray.writeByte(itemMap.keys.length);
            for (var index = 0; index < itemMap.keys.length; index++) {
                byteArray.writeInt32(itemMap.keys[index]);
                byteArray.writeInt32(itemMap.values[index]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CGiveItem, byteArray);
        };
        //CGiveGift   <!-- 赠送礼物 -->
        RequesterProtocols.prototype.c2s_give_gift = function (roleId, itemId, itemNum, content, force) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleId, byteArray);
            byteArray.writeInt(itemId);
            byteArray.writeByte(itemNum);
            ByteArrayUtils.writeUtf16String(content, byteArray);
            byteArray.writeByte(force);
            this.sendMsg(hanlder.ProtocolsEnum.CGiveGift, byteArray);
        };
        //CGetSpaceInfo   <!-- 获取某角色空间数据 -->
        RequesterProtocols.prototype.c2s_get_spaceinfo = function (roleId) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleId = roleId;
            var proto = Network._instance.protoTypePool.CGetSpaceInfo.fromObject(messageObj);
            console.log("CGetSpaceInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CGetSpaceInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetSpaceInfo, buffer);
        };
        //CSetSpaceGift   <!-- 放置角色空间礼物 -->
        RequesterProtocols.prototype.c2s_set_spacegift = function (giftnum) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.giftnum = giftnum;
            var proto = Network._instance.protoTypePool.CSetSpaceGift.fromObject(messageObj);
            console.log("CSetSpaceGift proto", proto);
            var buffer = Network._instance.protoTypePool.CSetSpaceGift.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSetSpaceGift, buffer);
        };
        //CStepSpace   <!-- 踩某个角色空间 -->
        RequesterProtocols.prototype.c2s_step_space = function (spaceroleid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.spaceroleid = spaceroleid;
            var proto = Network._instance.protoTypePool.CStepSpace.fromObject(messageObj);
            console.log("CStepSpace proto", proto);
            var buffer = Network._instance.protoTypePool.CStepSpace.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CStepSpace, buffer);
        };
        //CGetRolesLevel   <!-- 踩某个角色空间 -->
        RequesterProtocols.prototype.c2s_get_roleslevel = function (roles, gettype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roles = roles;
            messageObj.gettype = gettype;
            var proto = Network._instance.protoTypePool.CGetRolesLevel.fromObject(messageObj);
            console.log("CGetRolesLevel proto", proto);
            var buffer = Network._instance.protoTypePool.CGetRolesLevel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetRolesLevel, buffer);
        };
        //CXshSpace   <!-- 踩说不得大师空间 -->
        RequesterProtocols.prototype.c2s_xsh_space = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CXshSpace.fromObject(messageObj);
            console.log("CXshSpace proto", proto);
            var buffer = Network._instance.protoTypePool.CXshSpace.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXshSpace, buffer);
        };
        //CXshGiveGift   <!-- 赠送说不得大师礼物 -->
        RequesterProtocols.prototype.c2s_xsh_givegift = function (itemId, itemNum, content, force) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.itemId = itemId;
            messageObj.itemNum = itemNum;
            messageObj.content = content;
            messageObj.force = force;
            var proto = Network._instance.protoTypePool.CXshGiveGift.fromObject(messageObj);
            console.log("CXshGiveGift proto", proto);
            var buffer = Network._instance.protoTypePool.CXshGiveGift.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CXshGiveGift, buffer);
        };
        //CGetXshSpaceInfo   <!-- 获取说不得大师空间数据 -->
        RequesterProtocols.prototype.c2s_get_xshspaceinfo = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGetXshSpaceInfo.fromObject(messageObj);
            console.log("CGetXshSpaceInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CGetXshSpaceInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetXshSpaceInfo, buffer);
        };
        //CGetRecruitAward   <!-- 招募 -->
        RequesterProtocols.prototype.c2s_get_recruitaward = function (awardtype, awardid, recruitrole, recruitserver) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(awardtype);
            byteArray.writeInt32(awardid);
            ByteArrayUtils.writeLong(recruitrole, byteArray);
            ByteArrayUtils.writeUtf16String(recruitserver, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CGetRecruitAward, byteArray);
        };
        //CReqRecruitWheel   <!-- 请求招募大转盘信息 -->
        RequesterProtocols.prototype.c2s_req_recruitwheel = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CReqRecruitWheel, byteArray);
        };
        //CBeginRecruitWheel   <!-- 开始转招募大转盘 -->
        RequesterProtocols.prototype.c2s_begin_recruitwheel = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CBeginRecruitWheel, byteArray);
        };
        //CSetSign   <!-- 设置签名 -->
        RequesterProtocols.prototype.c2s_setsign = function (signContent) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.signContent = signContent;
            var proto = Network._instance.protoTypePool.CSetSign.fromObject(messageObj);
            console.log("CSetSign proto", proto);
            var buffer = Network._instance.protoTypePool.CSetSign.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSetSign, buffer);
        };
        //CRequestMarry   <!-- 申请结婚(队长) -->
        RequesterProtocols.prototype.c2s_request_marry = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRequestMarry.fromObject(messageObj);
            console.log("CRequestMarry proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestMarry.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestMarry, buffer);
        };
        //CRespondMarry   <!-- 响应结婚申请(队员) -->
        RequesterProtocols.prototype.c2s_respond_marry = function (result) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.result = result;
            var proto = Network._instance.protoTypePool.CRespondMarry.fromObject(messageObj);
            console.log("CRespondMarry proto", proto);
            var buffer = Network._instance.protoTypePool.CRespondMarry.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRespondMarry, buffer);
        };
        //CGetMarriageInfo   <!-- 请求玩家婚姻信息 -->
        RequesterProtocols.prototype.c2s_get_marriageinfo = function (roleid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleid = roleid;
            var proto = Network._instance.protoTypePool.CGetMarriageInfo.fromObject(messageObj);
            console.log("CGetMarriageInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CGetMarriageInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetMarriageInfo, buffer);
        };
        //CGetMarriageAnniversaryAward   <!-- 领取结婚周年礼盒 -->
        RequesterProtocols.prototype.c2s_get_marriageAnniversary_award = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGetMarriageAnniversaryAward.fromObject(messageObj);
            console.log("CGetMarriageAnniversaryAward proto", proto);
            var buffer = Network._instance.protoTypePool.CGetMarriageAnniversaryAward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetMarriageAnniversaryAward, buffer);
        };
        //CRequestWedding   <!-- 婚宴协议 20271-20290-->
        RequesterProtocols.prototype.c2s_request_wedding = function (weddingtype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.weddingtype = weddingtype;
            var proto = Network._instance.protoTypePool.CRequestWedding.fromObject(messageObj);
            console.log("CRequestWedding proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestWedding.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestWedding, buffer);
        };
        //CInviteFriends   <!-- 邀请好友来婚宴-->
        RequesterProtocols.prototype.c2s_CInviteFriends = function (roles) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roles = roles;
            var proto = Network._instance.protoTypePool.CInviteFriends.fromObject(messageObj);
            console.log("CInviteFriends proto", proto);
            var buffer = Network._instance.protoTypePool.CInviteFriends.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CInviteFriends, buffer);
        };
        //CRespondWeddingInvite   <!-- 好友响应邀请-->
        RequesterProtocols.prototype.c2s_CRespondWeddingInvite = function (result, weddingid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.result = result;
            messageObj.weddingid = weddingid;
            var proto = Network._instance.protoTypePool.CRespondWeddingInvite.fromObject(messageObj);
            console.log("CRespondWeddingInvite proto", proto);
            var buffer = Network._instance.protoTypePool.CRespondWeddingInvite.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRespondWeddingInvite, buffer);
        };
        //CGiveAsPresent   <!-- 好友响应邀请-->
        RequesterProtocols.prototype.c2s_CGiveAsPresent = function (target) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.target = target;
            var proto = Network._instance.protoTypePool.CGiveAsPresent.fromObject(messageObj);
            console.log("CGiveAsPresent proto", proto);
            var buffer = Network._instance.protoTypePool.CGiveAsPresent.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGiveAsPresent, buffer);
        };
        //CBeginWeddingRoll   <!-- 请求婚礼roll点开始-->
        RequesterProtocols.prototype.c2s_CBeginWeddingRoll = function (rolltype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.rolltype = rolltype;
            var proto = Network._instance.protoTypePool.CBeginWeddingRoll.fromObject(messageObj);
            console.log("CBeginWeddingRoll proto", proto);
            var buffer = Network._instance.protoTypePool.CBeginWeddingRoll.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBeginWeddingRoll, buffer);
        };
        //CWeddingRoll   <!-- 玩家点击roll点-->
        RequesterProtocols.prototype.c2s_CWeddingRoll = function (rolltype, isjoin, rollid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.rolltype = rolltype;
            messageObj.isjoin = isjoin;
            messageObj.rollid = rollid;
            var proto = Network._instance.protoTypePool.CWeddingRoll.fromObject(messageObj);
            console.log("CWeddingRoll proto", proto);
            var buffer = Network._instance.protoTypePool.CWeddingRoll.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CWeddingRoll, buffer);
        };
        //CRequestForcibleDivorce   <!-- 申请强制离婚<!-- 离婚协议 20291-20310---->
        RequesterProtocols.prototype.c2s_CRequestForcibleDivorce = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRequestForcibleDivorce.fromObject(messageObj);
            console.log("CRequestForcibleDivorce proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestForcibleDivorce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestForcibleDivorce, buffer);
        };
        //CRefuseForcibleDivorce   <!-- 拒绝强制离婚---->
        RequesterProtocols.prototype.c2s_CRefuseForcibleDivorce = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRefuseForcibleDivorce.fromObject(messageObj);
            console.log("CRefuseForcibleDivorce proto", proto);
            var buffer = Network._instance.protoTypePool.CRefuseForcibleDivorce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRefuseForcibleDivorce, buffer);
        };
        //CCancelForcibleDivorce   <!-- 取消强制离婚---->
        RequesterProtocols.prototype.c2s_CCancelForcibleDivorce = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CCancelForcibleDivorce.fromObject(messageObj);
            console.log("CCancelForcibleDivorce proto", proto);
            var buffer = Network._instance.protoTypePool.CCancelForcibleDivorce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCancelForcibleDivorce, buffer);
        };
        //CConfirmForcibleDivorce   <!-- 确认强制离婚---->
        RequesterProtocols.prototype.c2s_CConfirmForcibleDivorce = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CConfirmForcibleDivorce.fromObject(messageObj);
            console.log("CConfirmForcibleDivorce proto", proto);
            var buffer = Network._instance.protoTypePool.CConfirmForcibleDivorce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CConfirmForcibleDivorce, buffer);
        };
        //CRequestPeacefulDivorce   <!-- 申请协议离婚---->
        RequesterProtocols.prototype.c2s_CRequestPeacefulDivorce = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CConfirmForcibleDivorce.fromObject(messageObj);
            console.log("CConfirmForcibleDivorce proto", proto);
            var buffer = Network._instance.protoTypePool.CConfirmForcibleDivorce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CConfirmForcibleDivorce, buffer);
        };
        //CRespondPeacefulDivorce   <!-- 响应协议离婚申请---->
        RequesterProtocols.prototype.c2s_CRespondPeacefulDivorce = function (result) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.result = result;
            var proto = Network._instance.protoTypePool.CRespondPeacefulDivorce.fromObject(messageObj);
            console.log("CRespondPeacefulDivorce proto", proto);
            var buffer = Network._instance.protoTypePool.CRespondPeacefulDivorce.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRespondPeacefulDivorce, buffer);
        };
        //CGetMarriageSkillInfo   <!-- 请求婚姻技能信息---->
        RequesterProtocols.prototype.c2s_CGetMarriageSkillInfo = function (rollid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.rollid = rollid;
            var proto = Network._instance.protoTypePool.CGetMarriageSkillInfo.fromObject(messageObj);
            console.log("CGetMarriageSkillInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CGetMarriageSkillInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetMarriageSkillInfo, buffer);
        };
        //CStudyMarriageSkill   <!-- 请求学习婚姻技能---->
        RequesterProtocols.prototype.c2s_CStudyMarriageSkill = function (skillid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.skillid = skillid;
            var proto = Network._instance.protoTypePool.CStudyMarriageSkill.fromObject(messageObj);
            console.log("CStudyMarriageSkill proto", proto);
            var buffer = Network._instance.protoTypePool.CStudyMarriageSkill.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CStudyMarriageSkill, buffer);
        };
        //客户端要充值,服务器返回SReqCharge
        RequesterProtocols.prototype.c2s_CReqCharge = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CReqCharge, byteArray);
        };
        //客户端点购买按钮确认充值
        RequesterProtocols.prototype.c2s_CConfirmCharge = function (goodid, goodnum, extra) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(goodid);
            byteArray.writeInt32(goodnum);
            ByteArrayUtils.writeUtf16String(extra, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CConfirmCharge, byteArray);
        };
        //领取首充奖励
        RequesterProtocols.prototype.c2s_CGetFirstPayReward = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGetFirstPayReward, byteArray);
        };
        //CReqServerId   <!-- 请求服务器id---->
        RequesterProtocols.prototype.c2s_CReqServerId = function (flag) {
            //////////////////////////////////////////////
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(flag);
            this.sendMsg(hanlder.ProtocolsEnum.CReqServerId, byteArray);
        };
        //CRequestChargeReturnProfit   <!-- ---->
        RequesterProtocols.prototype.c2s_CRequestChargeReturnProfit = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRequestChargeReturnProfit.fromObject(messageObj);
            console.log("CRequestChargeReturnProfit proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestChargeReturnProfit.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestChargeReturnProfit, buffer);
        };
        //CGrabChargeReturnProfitReward   <!-- 领取充值返利奖励---->
        RequesterProtocols.prototype.c2s_CGrabChargeReturnProfitReward = function (id) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.id = id;
            var proto = Network._instance.protoTypePool.CGrabChargeReturnProfitReward.fromObject(messageObj);
            console.log("CGrabChargeReturnProfitReward proto", proto);
            var buffer = Network._instance.protoTypePool.CGrabChargeReturnProfitReward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGrabChargeReturnProfitReward, buffer);
        };
        //CReqChargeRefundsInfo   <!-- 请求封测充值返还数据---->
        RequesterProtocols.prototype.c2s_CReqChargeRefundsInfo = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqChargeRefundsInfo.fromObject(messageObj);
            console.log("CReqChargeRefundsInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CReqChargeRefundsInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqChargeRefundsInfo, buffer);
        };
        //CGetChargeRefunds   <!-- 领取封测充值返还数据---->
        RequesterProtocols.prototype.c2s_CGetChargeRefunds = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGetChargeRefunds.fromObject(messageObj);
            console.log("CGetChargeRefunds proto", proto);
            var buffer = Network._instance.protoTypePool.CGetChargeRefunds.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGetChargeRefunds, buffer);
        };
        RequesterProtocols.prototype.c2s_CRequestVipInfo = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestVipInfo, byteArray);
        };
        //CRequestVipJiangli
        RequesterProtocols.prototype.c2s_CRequestVipJiangli = function (bounusIndex) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(bounusIndex);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestVipJiangli, byteArray);
        };
        //CReqFushiInfo   <!-- ---->
        RequesterProtocols.prototype.c2s_CReqFushiInfo = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CReqFushiInfo.fromObject(messageObj);
            console.log("CReqFushiInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CReqFushiInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CReqFushiInfo, buffer);
        };
        //CUpYingYongBaoInfo   <!-- ---->
        RequesterProtocols.prototype.c2s_CUpYingYongBaoInfo = function (openid, openkey, paytoken, pf, pfkey, zoneid, platformname) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.openid = openid;
            messageObj.openkey = openkey;
            messageObj.paytoken = paytoken;
            messageObj.pf = pf;
            messageObj.pfkey = pfkey;
            messageObj.zoneid = zoneid;
            messageObj.platformname = platformname;
            var proto = Network._instance.protoTypePool.CUpYingYongBaoInfo.fromObject(messageObj);
            console.log("CUpYingYongBaoInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CUpYingYongBaoInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUpYingYongBaoInfo, buffer);
        };
        //CSendRedPackView   <!-- 红包界面---->
        RequesterProtocols.prototype.c2s_CSendRedPackView = function (modeltype, redpackid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(modeltype);
            ByteArrayUtils.writeUtf16String(redpackid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSendRedPackView, byteArray);
        };
        //CSendRedPack   <!-- 发送红包---->
        RequesterProtocols.prototype.c2s_CSendRedPack = function (modeltype, fushinum, redpacknum, redpackdes) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(modeltype);
            byteArray.writeInt32(fushinum);
            byteArray.writeInt32(redpacknum);
            ByteArrayUtils.writeUtf16String(redpackdes, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSendRedPack, byteArray);
        };
        //CGetRedPack   <!-- 领取红包---->
        RequesterProtocols.prototype.c2s_CGetRedPack = function (modeltype, redpackid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(modeltype);
            ByteArrayUtils.writeUtf16String(redpackid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CGetRedPack, byteArray);
        };
        //CSendRedPackHisView   <!-- 查看红包历史---->
        RequesterProtocols.prototype.c2s_CSendRedPackHisView = function (modeltype, redpackid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(modeltype);
            ByteArrayUtils.writeUtf16String(redpackid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSendRedPackHisView, byteArray);
        };
        //CSendRedPackRoleRecordView   <!-- 查看玩家个人红包记录---->
        RequesterProtocols.prototype.c2s_CSendRedPackRoleRecordView = function (modeltype, redpackid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(modeltype);
            ByteArrayUtils.writeUtf16String(redpackid, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSendRedPackRoleRecordView, byteArray);
        };
        //CQueryConsumeDayPay   <!-- 是否消耗点卡 ---->
        RequesterProtocols.prototype.c2s_CQueryConsumeDayPay = function (yesorno) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.yesorno = yesorno;
            var proto = Network._instance.protoTypePool.CQueryConsumeDayPay.fromObject(messageObj);
            console.log("CQueryConsumeDayPay proto", proto);
            var buffer = Network._instance.protoTypePool.CQueryConsumeDayPay.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQueryConsumeDayPay, buffer);
        };
        //CQuerySubscribeInfo   <!-- 查询订阅信息 ---->
        RequesterProtocols.prototype.c2s_CQuerySubscribeInfo = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CQuerySubscribeInfo.fromObject(messageObj);
            console.log("CQuerySubscribeInfo proto", proto);
            var buffer = Network._instance.protoTypePool.CQuerySubscribeInfo.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CQuerySubscribeInfo, buffer);
        };
        //CBuySpotCard   <!-- 求购符石 ---->
        RequesterProtocols.prototype.c2s_CBuySpotCard = function (buynum, buyprice) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.buynum = buynum;
            messageObj.buyprice = buyprice;
            var proto = Network._instance.protoTypePool.CBuySpotCard.fromObject(messageObj);
            console.log("CBuySpotCard proto", proto);
            var buffer = Network._instance.protoTypePool.CBuySpotCard.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBuySpotCard, buffer);
        };
        //CSellSpotCard   <!-- 寄售符石 ---->
        RequesterProtocols.prototype.c2s_CSellSpotCard = function (sellnum, sellprice) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.sellnum = sellnum;
            messageObj.sellprice = sellprice;
            var proto = Network._instance.protoTypePool.CSellSpotCard.fromObject(messageObj);
            console.log("CSellSpotCard proto", proto);
            var buffer = Network._instance.protoTypePool.CSellSpotCard.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CSellSpotCard, buffer);
        };
        //CTradingSpotCardView   <!-- 交易区界面 ---->
        RequesterProtocols.prototype.c2s_CTradingSpotCardView = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CTradingSpotCardView.fromObject(messageObj);
            console.log("CTradingSpotCardView proto", proto);
            var buffer = Network._instance.protoTypePool.CTradingSpotCardView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTradingSpotCardView, buffer);
        };
        //CRoleTradingView   <!-- 个人买卖界面 ---->
        RequesterProtocols.prototype.c2s_CRoleTradingView = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRoleTradingView.fromObject(messageObj);
            console.log("CRoleTradingView proto", proto);
            var buffer = Network._instance.protoTypePool.CRoleTradingView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRoleTradingView, buffer);
        };
        //CRoleTradingRecordView   <!-- 个人买卖记录界面 ---->
        RequesterProtocols.prototype.c2s_CRoleTradingRecordView = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRoleTradingRecordView.fromObject(messageObj);
            console.log("CRoleTradingRecordView proto", proto);
            var buffer = Network._instance.protoTypePool.CRoleTradingRecordView.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRoleTradingRecordView, buffer);
        };
        //CCancelTrading   <!-- 撤销订单 ---->
        RequesterProtocols.prototype.c2s_CCancelTrading = function (tradingid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.tradingid = tradingid;
            var proto = Network._instance.protoTypePool.CCancelTrading.fromObject(messageObj);
            console.log("CCancelTrading proto", proto);
            var buffer = Network._instance.protoTypePool.CCancelTrading.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CCancelTrading, buffer);
        };
        //CTradingOpenState   <!-- 交易所功能是否开启 ---->
        RequesterProtocols.prototype.c2s_CTradingOpenState = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CTradingOpenState.fromObject(messageObj);
            console.log("CTradingOpenState proto", proto);
            var buffer = Network._instance.protoTypePool.CTradingOpenState.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTradingOpenState, buffer);
        };
        //购买月卡
        RequesterProtocols.prototype.c2s_CBuyMonthCard = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CBuyMonthCard, byteArray);
        };
        //CGrabMonthCardReward   <!-- 领取月卡单独道具奖励 ---->
        RequesterProtocols.prototype.c2s_CGrabMonthCardReward = function (itemid, rewarddistribution) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.itemid = itemid;
            messageObj.rewarddistribution = itemid;
            var proto = Network._instance.protoTypePool.CGrabMonthCardReward.fromObject(messageObj);
            console.log("CGrabMonthCardReward proto", proto);
            var buffer = Network._instance.protoTypePool.CGrabMonthCardReward.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGrabMonthCardReward, buffer);
        };
        //领取月卡奖励
        RequesterProtocols.prototype.c2s_CGrabMonthCardRewardAll = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGrabMonthCardRewardAll, byteArray);
        };
        RequesterProtocols.prototype.c2s_CRequestMonthCard = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRequestMonthCard, byteArray);
        };
        //CBeginSchoolWheel   <!--  ---->
        RequesterProtocols.prototype.c2s_CBeginSchoolWheeld = function () {
            //////////////////////////////////////////////
            // let messageObj:any = {};
            // var proto = Network._instance.protoTypePool.CBeginSchoolWheel.fromObject(messageObj);
            // console.log("CBeginSchoolWheel proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CBeginSchoolWheel.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CBeginSchoolWheel, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CBeginSchoolWheel, byteArray);
        };
        //CEndSchoolWheel   <!--  ---->
        RequesterProtocols.prototype.c2s_CEndSchoolWheel = function () {
            //////////////////////////////////////////////
            // let messageObj:any = {};
            // var proto = Network._instance.protoTypePool.CEndSchoolWheel.fromObject(messageObj);
            // console.log("CEndSchoolWheel proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CEndSchoolWheel.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CEndSchoolWheel, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CEndSchoolWheel, byteArray);
        };
        //CBeginXueYueWheel   <!--  血月商人---->
        RequesterProtocols.prototype.c2s_CBeginXueYueWheel = function (npckey, boxtype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.npckey = npckey;
            messageObj.boxtype = boxtype;
            var proto = Network._instance.protoTypePool.CBeginXueYueWheel.fromObject(messageObj);
            console.log("CBeginXueYueWheel proto", proto);
            var buffer = Network._instance.protoTypePool.CBeginXueYueWheel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBeginXueYueWheel, buffer);
        };
        //CEndXueYueWheel   <!--  ---->
        RequesterProtocols.prototype.c2s_CEndXueYueWheel = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CEndXueYueWheel.fromObject(messageObj);
            console.log("CEndXueYueWheel proto", proto);
            var buffer = Network._instance.protoTypePool.CEndXueYueWheel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CEndXueYueWheel, buffer);
        };
        //CUseXueYueKey   <!--  ---->
        RequesterProtocols.prototype.c2s_CUseXueYueKey = function (npckid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.npckid = npckid;
            var proto = Network._instance.protoTypePool.CUseXueYueKey.fromObject(messageObj);
            console.log("CUseXueYueKey proto", proto);
            var buffer = Network._instance.protoTypePool.CUseXueYueKey.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUseXueYueKey, buffer);
        };
        //CRoleAccusationCheck   <!--  举报时候客户端给服务器发消息,用于扣费---->
        RequesterProtocols.prototype.c2s_CRoleAccusationCheck = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRoleAccusationCheck, byteArray);
        };
        //CLogPushToken   <!--  推送Token日志---->
        RequesterProtocols.prototype.c2s_CLogPushToken = function (token) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.token = token;
            var proto = Network._instance.protoTypePool.CLogPushToken.fromObject(messageObj);
            console.log("CLogPushToken proto", proto);
            var buffer = Network._instance.protoTypePool.CLogPushToken.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CLogPushToken, buffer);
        };
        //CNoOperationKick   <!--  踢掉长时间不操作的玩家---->
        RequesterProtocols.prototype.c2s_CNoOperationKick = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CNoOperationKick.fromObject(messageObj);
            console.log("CNoOperationKick proto", proto);
            var buffer = Network._instance.protoTypePool.CNoOperationKick.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CNoOperationKick, buffer);
        };
        //CClientTime   <!--  踢掉长时间不操作的玩家---->
        RequesterProtocols.prototype.c2s_CClientTime = function (time) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.time = time;
            var proto = Network._instance.protoTypePool.CClientTime.fromObject(messageObj);
            console.log("CClientTime proto", proto);
            var buffer = Network._instance.protoTypePool.CClientTime.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CClientTime, buffer);
        };
        //CSetAutoBattle   <!--  ---->
        RequesterProtocols.prototype.c2s_CSetAutoBattle = function (isautobattle) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(isautobattle);
            this.sendMsg(hanlder.ProtocolsEnum.CSetAutoBattle, byteArray);
        };
        //CSetCharOpt   <!--  ---->
        RequesterProtocols.prototype.c2s_CSetCharOpt = function (charoptype, charopid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt16(charoptype);
            byteArray.writeInt32(charopid);
            this.sendMsg(hanlder.ProtocolsEnum.CSetCharOpt, byteArray);
        };
        //CSetPetOpt   <!--  ---->
        RequesterProtocols.prototype.c2s_CSetPetOpt = function (petoptype, petopid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt16(petoptype);
            byteArray.writeInt32(petopid);
            this.sendMsg(hanlder.ProtocolsEnum.CSetPetOpt, byteArray);
        };
        //获取双倍点数
        RequesterProtocols.prototype.c2s_CGetDPoint = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CGetDPoint, byteArray);
        };
        //冻结双倍点数
        RequesterProtocols.prototype.c2s_CFreezeDPoint = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CFreezeDPoint, byteArray);
        };
        //设置人物战斗ai
        RequesterProtocols.prototype.c2s_CSetRoleFightAI = function (fightaiids) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            var sizeUint8Array = ByteArrayUtils.compact_uint32(fightaiids.length);
            byteArray.writeUint8Array(sizeUint8Array);
            for (var i = 0; i < fightaiids.length; i++) {
                byteArray.writeInt32(fightaiids[i]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CSetRoleFightAI, byteArray);
        };
        //CGetRoleFightAI   <!--  获取人物战斗ai---->
        RequesterProtocols.prototype.c2s_CGetRoleFightAI = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CGetRoleFightAI, byteArray);
        };
        //CClientLockScreen   <!--  机器锁屏通知服务器---->
        RequesterProtocols.prototype.c2s_CClientLockScreen = function (lock) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.lock = lock;
            var proto = Network._instance.protoTypePool.CClientLockScreen.fromObject(messageObj);
            console.log("CClientLockScreen proto", proto);
            var buffer = Network._instance.protoTypePool.CClientLockScreen.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CClientLockScreen, buffer);
        };
        //CBuyDPoint   <!--  购买双倍点数---->
        RequesterProtocols.prototype.c2s_CBuyDPoint = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CBuyDPoint.fromObject(messageObj);
            console.log("CBuyDPoint proto", proto);
            var buffer = Network._instance.protoTypePool.CBuyDPoint.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CBuyDPoint, buffer);
        };
        //CSendCommand   <!--  5001 开始---->
        RequesterProtocols.prototype.c2s_CSendCommand = function (cmd) {
            //////////////////////////////////////////////
            // let messageObj:any = {};
            // messageObj.cmd = cmd;
            // var proto = Network._instance.protoTypePool.CSendCommand.fromObject(messageObj);
            // console.log("CSendCommand proto",proto);
            // var buffer:any = Network._instance.protoTypePool.CSendCommand.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CSendCommand, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeUtf16String(cmd, byteArray);
            this.sendMsg(hanlder.ProtocolsEnum.CSendCommand, byteArray);
        };
        //CGMCheckRoleID   <!--  请求角色ID检测---->
        RequesterProtocols.prototype.c2s_CGMCheckRoleID = function (roleid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.roleid = roleid;
            var proto = Network._instance.protoTypePool.CGMCheckRoleID.fromObject(messageObj);
            console.log("CGMCheckRoleID proto", proto);
            var buffer = Network._instance.protoTypePool.CGMCheckRoleID.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGMCheckRoleID, buffer);
        };
        //sugq 客户端2
        RequesterProtocols.prototype.c2s_CMarketAttentionBrowse = function (attentype) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(attentype);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketAttentionBrowse, byteArray);
        };
        //c2s_CMarketSearchEquip   c2s_market_searchequip
        RequesterProtocols.prototype.c2s_CMarketSearchEquip = function (euqiptype, level, pricemin, pricemax, effect, skill, color, basicattr, additionalattr, totalattr, score, sellstate) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(euqiptype);
            byteArray.writeInt32(level);
            byteArray.writeInt32(pricemin);
            byteArray.writeInt32(pricemax);
            byteArray.writeInt32(effect);
            byteArray.writeInt32(skill);
            var size = color.length;
            byteArray.writeInt8(size);
            for (var i = 0; i < size; i++) {
                var cc = color[i];
                byteArray.writeInt32(cc);
            }
            var basicattrSize = basicattr.length;
            byteArray.writeInt8(basicattrSize);
            for (var i = 0; i < basicattrSize; i++) {
                var m_basicattr = basicattr[i];
                byteArray.writeInt32(m_basicattr.attrid);
                byteArray.writeInt32(m_basicattr.attrval);
            }
            var additionalattrSize = additionalattr.length;
            byteArray.writeInt8(additionalattrSize);
            for (var i = 0; i < additionalattrSize; i++) {
                byteArray.writeInt32(additionalattr[i]);
            }
            byteArray.writeInt32(totalattr);
            byteArray.writeInt32(score);
            byteArray.writeInt32(sellstate);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketSearchEquip, byteArray);
        };
        //CMarketSearchPet
        RequesterProtocols.prototype.c2s_CMarketSearchPet = function (pettype, levelmin, levelmax, pricemin, pricemax, zizhi, skills, totalskillnum, attr, score, sellstate) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(pettype);
            byteArray.writeInt32(levelmin);
            byteArray.writeInt32(levelmax);
            byteArray.writeInt32(pricemin);
            byteArray.writeInt32(pricemax);
            var zizhiSize = zizhi.length;
            byteArray.writeInt8(zizhiSize);
            for (var i = 0; i < zizhiSize; i++) {
                var m_zizhi = zizhi[i];
                byteArray.writeInt32(m_zizhi.attrid);
                byteArray.writeInt32(m_zizhi.attrval);
            }
            var skillsSize = skills.length;
            byteArray.writeInt8(skillsSize);
            for (var i = 0; i < skillsSize; i++) {
                byteArray.writeInt32(skills[i].id);
            }
            byteArray.writeInt32(totalskillnum);
            var attrSize = attr.length;
            byteArray.writeInt8(attrSize);
            for (var i = 0; i < attrSize; i++) {
                var m_attr = attr[i];
                byteArray.writeInt32(m_attr.attrid);
                byteArray.writeInt32(m_attr.attrval);
            }
            byteArray.writeInt32(score);
            byteArray.writeInt32(sellstate);
            this.sendMsg(hanlder.ProtocolsEnum.CMarketSearchPet, byteArray);
        };
        //CMarketCleanTradeLog
        RequesterProtocols.prototype.c2s_CMarketCleanTradeLog = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CMarketCleanTradeLog.fromObject(messageObj);
            console.log("CMarketCleanTradeLog proto", proto);
            var buffer = Network._instance.protoTypePool.CMarketCleanTradeLog.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CMarketCleanTradeLog, buffer);
        };
        //CMarketItemChatShow
        RequesterProtocols.prototype.c2s_CMarketItemChatShow = function (id, itemtype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.id = id; //数据库唯一id
            messageObj.itemtype = itemtype; //物品类型:  1普通、2宠物、3装备 4范围
            var proto = Network._instance.protoTypePool.CMarketItemChatShow.fromObject(messageObj);
            console.log("CMarketItemChatShow proto", proto);
            var buffer = Network._instance.protoTypePool.CMarketItemChatShow.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CMarketItemChatShow, buffer);
        };
        //CTakeBackTempMarketContainerItem  拍卖临时背包,合服后取出道具请求
        RequesterProtocols.prototype.c2s_CTakeBackTempMarketContainerItem = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CTakeBackTempMarketContainerItem.fromObject(messageObj);
            console.log("CTakeBackTempMarketContainerItem proto", proto);
            var buffer = Network._instance.protoTypePool.CTakeBackTempMarketContainerItem.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTakeBackTempMarketContainerItem, buffer);
        };
        //CGoldOrderUpBlackMarket
        RequesterProtocols.prototype.c2s_CGoldOrderUpBlackMarket = function (goldnumber, rmb) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.goldnumber = goldnumber; //金币数量, 整数
            messageObj.rmb = rmb; //出售价格, 整数, 单位人民币分
            var proto = Network._instance.protoTypePool.CGoldOrderUpBlackMarket.fromObject(messageObj);
            console.log("CGoldOrderUpBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CGoldOrderUpBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGoldOrderUpBlackMarket, buffer);
        };
        //CGoldOrderDownBlackMarket
        RequesterProtocols.prototype.c2s_CGoldOrderDownBlackMarket = function (pid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.pid = pid; //订单编号
            var proto = Network._instance.protoTypePool.CGoldOrderDownBlackMarket.fromObject(messageObj);
            console.log("CGoldOrderDownBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CGoldOrderDownBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGoldOrderDownBlackMarket, buffer);
        };
        //CGoldOrderTakeOutBlackMarket
        RequesterProtocols.prototype.c2s_CGoldOrderTakeOutBlackMarket = function (pid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.pid = pid; //订单编号
            var proto = Network._instance.protoTypePool.CGoldOrderTakeOutBlackMarket.fromObject(messageObj);
            console.log("CGoldOrderTakeOutBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CGoldOrderTakeOutBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGoldOrderTakeOutBlackMarket, buffer);
        };
        //CGoldOrderBrowseBlackMarket
        RequesterProtocols.prototype.c2s_CGoldOrderBrowseBlackMarket = function () {
            //////////////////////////////////////////////
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CGoldOrderBrowseBlackMarket.fromObject(messageObj);
            console.log("CGoldOrderBrowseBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CGoldOrderBrowseBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CGoldOrderBrowseBlackMarket, buffer);
        };
        //CTransTianTiShop
        RequesterProtocols.prototype.c2s_CTransTianTiShop = function (shopid, itemkey, goodsid, num, buytype, bagtype) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.shopid = shopid; //商店序号
            messageObj.itemkey = itemkey; // 是物品在背包中的位置,在卖背包中物品时用到。叫itemkey是为了和系统统一称呼。
            messageObj.goodsid = goodsid; //商品id
            messageObj.num = num; //买卖数量
            messageObj.buytype = buytype; //购买类型
            messageObj.bagtype = bagtype; //背包类型 1,角色背包 10,天梯背包
            var proto = Network._instance.protoTypePool.CTransTianTiShop.fromObject(messageObj);
            console.log("CTransTianTiShop proto", proto);
            var buffer = Network._instance.protoTypePool.CTransTianTiShop.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CTransTianTiShop, buffer);
        };
        //CItemOrderUpBlackMarket
        RequesterProtocols.prototype.c2s_CItemOrderUpBlackMarket = function (itemtype, number, key, rmb) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.itemtype = itemtype; //2装备 3宠物
            messageObj.number = number; //数量
            messageObj.key = key; //背包或宠物栏中的key
            messageObj.rmb = rmb; //出售价格, 整数, 单位人民币分
            var proto = Network._instance.protoTypePool.CItemOrderUpBlackMarket.fromObject(messageObj);
            console.log("CItemOrderUpBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CItemOrderUpBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CItemOrderUpBlackMarket, buffer);
        };
        //CItemOrderDownBlackMarket
        RequesterProtocols.prototype.c2s_CItemOrderDownBlackMarket = function (itemtype, pid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.itemtype = itemtype; //2装备 3宠物
            messageObj.pid = pid; //订单编号
            var proto = Network._instance.protoTypePool.CItemOrderDownBlackMarket.fromObject(messageObj);
            console.log("CItemOrderDownBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CItemOrderDownBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CItemOrderDownBlackMarket, buffer);
        };
        //CItemOrderTakeOutBlackMarket
        RequesterProtocols.prototype.c2s_CItemOrderTakeOutBlackMarket = function (itemtype, pid) {
            //////////////////////////////////////////////
            var messageObj = {};
            messageObj.itemtype = itemtype; //2装备 3宠物
            messageObj.pid = pid; //订单编号
            var proto = Network._instance.protoTypePool.CItemOrderTakeOutBlackMarket.fromObject(messageObj);
            console.log("CItemOrderTakeOutBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CItemOrderTakeOutBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CItemOrderTakeOutBlackMarket, buffer);
        };
        //CItemOrderBrowseBlackMarket
        RequesterProtocols.prototype.c2s_CItemOrderBrowseBlackMarket = function (itemtype) {
            var messageObj = {};
            messageObj.itemtype = itemtype; //2装备 3宠物
            var proto = Network._instance.protoTypePool.CItemOrderBrowseBlackMarket.fromObject(messageObj);
            console.log("CItemOrderBrowseBlackMarket proto", proto);
            var buffer = Network._instance.protoTypePool.CItemOrderBrowseBlackMarket.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CItemOrderBrowseBlackMarket, buffer);
        };
        //CUpdaetAssistSkillLevel
        RequesterProtocols.prototype.c2s_CUpdaetAssistSkillLevel = function (npckey, id) {
            var messageObj = {};
            messageObj.npckey = npckey;
            messageObj.id = id;
            var proto = Network._instance.protoTypePool.CUpdaetAssistSkillLevel.fromObject(messageObj);
            console.log("CUpdaetAssistSkillLevel proto", proto);
            var buffer = Network._instance.protoTypePool.CUpdaetAssistSkillLevel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUpdaetAssistSkillLevel, buffer);
        };
        //CUpdateInborn
        RequesterProtocols.prototype.c2s_CUpdateInborn = function (id, flag) {
            // let messageObj: any = {};
            // messageObj.id = id;
            // messageObj.flag = flag;
            // var proto = Network._instance.protoTypePool.CUpdateInborn.fromObject(messageObj);
            // console.log("CUpdateInborn proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CUpdateInborn.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CUpdateInborn, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(id);
            byteArray.writeByte(flag);
            this.sendMsg(hanlder.ProtocolsEnum.CUpdateInborn, byteArray);
        };
        //CUseSceneSkill
        RequesterProtocols.prototype.c2s_CUseSceneSkill = function (skillId, aimtype, aimId) {
            var messageObj = {};
            messageObj.skillId = skillId; //技能ID
            messageObj.aimtype = aimtype; //技能使用目标类型 对自己角色使用==1，对自己战斗宠物使用==2，对正常队友角色使用==3
            messageObj.aimId = aimId; //技能使用目标ID，为队友角色ID
            var proto = Network._instance.protoTypePool.CUseSceneSkill.fromObject(messageObj);
            console.log("CUseSceneSkill proto", proto);
            var buffer = Network._instance.protoTypePool.CUseSceneSkill.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUseSceneSkill, buffer);
        };
        //CPractiseSkill
        RequesterProtocols.prototype.c2s_CPractiseSkill = function (npckey, skillId, kind) {
            var messageObj = {};
            messageObj.npckey = npckey;
            messageObj.skillId = skillId;
            messageObj.kind = kind;
            var proto = Network._instance.protoTypePool.CPractiseSkill.fromObject(messageObj);
            console.log("CPractiseSkill proto", proto);
            var buffer = Network._instance.protoTypePool.CPractiseSkill.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CPractiseSkill, buffer);
        };
        //CRequestParticleSkillList
        RequesterProtocols.prototype.c2s_CRequestParticleSkillList = function () {
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CRequestParticleSkillList.fromObject(messageObj);
            // console.log("CRequestParticleSkillList proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestParticleSkillList.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestParticleSkillList, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRequestParticleSkillList, byteArray);
        };
        //CRequestLearnParticleSkill
        RequesterProtocols.prototype.c2s_CRequestLearnParticleSkill = function (id, times, itemid) {
            // let messageObj: any = {};
            // messageObj.id = id;	  	//技能ID by changhao
            // messageObj.times = times;	//学习次数 by changhao
            // messageObj.itemid = itemid;		//使用的道具 by changhao	
            // var proto = Network._instance.protoTypePool.CRequestLearnParticleSkill.fromObject(messageObj);
            // console.log("CRequestLearnParticleSkill proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestLearnParticleSkill.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestLearnParticleSkill, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(id);
            byteArray.writeInt32(times);
            byteArray.writeInt32(itemid);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestLearnParticleSkill, byteArray);
        };
        //CRequestLiveSkillList
        RequesterProtocols.prototype.c2s_CRequestLiveSkillList = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CRequestLiveSkillList, byteArray);
        };
        //CRequestLearnLiveSkill
        RequesterProtocols.prototype.c2s_CRequestLearnLiveSkill = function (id) {
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CRequestLearnLiveSkill.fromObject(messageObj);
            // console.log("CRequestLiveSkillList proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestLearnLiveSkill.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestLearnLiveSkill, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(id);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestLearnLiveSkill, byteArray);
        };
        //CLiveSkillMakeStuff
        RequesterProtocols.prototype.c2s_CLiveSkillMakeStuff = function (itemid, itemnum) {
            // let messageObj: any = {};
            // messageObj.itemid = itemid;	  	//物品的ID by changhao
            // messageObj.itemnum = itemnum;	// 物品数量 by changhao
            // var proto = Network._instance.protoTypePool.CLiveSkillMakeStuff.fromObject(messageObj);
            // console.log("CLiveSkillMakeStuff proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeStuff.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CLiveSkillMakeStuff, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(itemid);
            byteArray.writeInt32(itemnum);
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeStuff, byteArray);
        };
        //CLiveSkillMakeDrug
        RequesterProtocols.prototype.c2s_CLiveSkillMakeDrug = function (makingslist) {
            // let messageObj: any = {};
            // messageObj.makingslist = makingslist;	  	//物品的ID by changhao
            // var proto = Network._instance.protoTypePool.CLiveSkillMakeDrug.fromObject(messageObj);
            // console.log("CLiveSkillMakeDrug proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeDrug.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CLiveSkillMakeDrug, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(makingslist.length);
            var index;
            for (index = 0; index < makingslist.length; index++) {
                byteArray.writeInt32(makingslist[index]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeDrug, byteArray);
        };
        //CLiveSkillMakeFood
        RequesterProtocols.prototype.c2s_CLiveSkillMakeFood = function () {
            // let messageObj: any = {};
            // var proto = Network._instance.protoTypePool.CLiveSkillMakeFood.fromObject(messageObj);
            // console.log("CLiveSkillMakeFood proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeFood.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CLiveSkillMakeFood, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeFood, byteArray);
        };
        //CLiveSkillMakeFriendGift
        RequesterProtocols.prototype.c2s_CLiveSkillMakeFriendGift = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CLiveSkillMakeFriendGift.fromObject(messageObj);
            console.log("CLiveSkillMakeFriendGift proto", proto);
            var buffer = Network._instance.protoTypePool.CLiveSkillMakeFriendGift.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeFriendGift, buffer);
        };
        //CLiveSkillMakeEnhancement
        RequesterProtocols.prototype.c2s_CLiveSkillMakeEnhancement = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeEnhancement, byteArray);
        };
        //CLiveSkillMakeFarm
        RequesterProtocols.prototype.c2s_CLiveSkillMakeFarm = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeFarm, byteArray);
        };
        //CRequestAttr
        RequesterProtocols.prototype.c2s_CRequestAttr = function (attrid) {
            // let messageObj: any = {};
            // messageObj.attrid = attrid
            // var proto = Network._instance.protoTypePool.CRequestAttr.fromObject(messageObj);
            // console.log("CRequestAttr proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CRequestAttr.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CRequestAttr, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeByte(attrid.length);
            var index;
            for (index = 0; index < attrid.length; index++) {
                byteArray.writeInt32(attrid[index]);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CRequestAttr, byteArray);
        };
        //CLiveSkillMakeCard
        RequesterProtocols.prototype.c2s_CLiveSkillMakeCard = function (level) {
            // let messageObj: any = {};
            // messageObj.level = level //选择的等级
            // var proto = Network._instance.protoTypePool.CLiveSkillMakeCard.fromObject(messageObj);
            // console.log("CLiveSkillMakeCard proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CLiveSkillMakeCard.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CLiveSkillMakeCard, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(level);
            this.sendMsg(hanlder.ProtocolsEnum.CLiveSkillMakeCard, byteArray);
        };
        //CShapeCardInfoList
        RequesterProtocols.prototype.c2s_CShapeCardInfoList = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CShapeCardInfoList.fromObject(messageObj);
            console.log("CShapeCardInfoList proto", proto);
            var buffer = Network._instance.protoTypePool.CShapeCardInfoList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CShapeCardInfoList, buffer);
        };
        //CAddShapeCardPoint
        RequesterProtocols.prototype.c2s_CAddShapeCardPoint = function (shapecard) {
            var messageObj = {};
            messageObj.shapecard = shapecard; // 变身卡
            var proto = Network._instance.protoTypePool.CAddShapeCardPoint.fromObject(messageObj);
            console.log("CAddShapeCardPoint proto", proto);
            var buffer = Network._instance.protoTypePool.CLiveSkiCAddShapeCardPointllMakeCard.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CAddShapeCardPoint, buffer);
        };
        //CUseShapeCard
        RequesterProtocols.prototype.c2s_CUseShapeCard = function (shapecard) {
            var messageObj = {};
            messageObj.shapecard = shapecard; // 使用变身卡,=0时取消变身
            var proto = Network._instance.protoTypePool.CUseShapeCard.fromObject(messageObj);
            console.log("CUseShapeCard proto", proto);
            var buffer = Network._instance.protoTypePool.CUseShapeCard.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUseShapeCard, buffer);
        };
        //CUseRoleShape
        RequesterProtocols.prototype.c2s_CUseRoleShape = function (useroleshape) {
            var messageObj = {};
            messageObj.useroleshape = useroleshape; // 变身后仍显示原造型 1:是 0:不是
            var proto = Network._instance.protoTypePool.CUseRoleShape.fromObject(messageObj);
            console.log("CUseRoleShape proto", proto);
            var buffer = Network._instance.protoTypePool.CUseRoleShape.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CUseRoleShape, buffer);
        };
        //CTransChatMessage2Serv
        RequesterProtocols.prototype.c2s_CTransChatMessage2Serv = function (messagetype, message, checkshiedmessage, displayinfo, funtype, taskid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(messagetype);
            ByteArrayUtils.writeUtf16String(message, byteArray);
            ByteArrayUtils.writeUtf16String(checkshiedmessage, byteArray);
            byteArray.writeByte(displayinfo.length);
            //  var displayinfo;
            for (var index = 0; index < displayinfo.length; index++) {
                byteArray.writeInt32(displayinfo[index].displaytype);
                ByteArrayUtils.writeLong(displayinfo[index].roleid, byteArray);
                ByteArrayUtils.writeLong(displayinfo[index].shopid, byteArray);
                byteArray.writeInt32(displayinfo[index].counterid);
                byteArray.writeInt32(displayinfo[index].uniqid);
                ByteArrayUtils.writeLong(displayinfo[index].teamid, byteArray);
                ByteArrayUtils.writeLong(displayinfo[index].crosstt, byteArray);
                ByteArrayUtils.writeLong(displayinfo[index].serverid, byteArray);
            }
            byteArray.writeInt32(funtype);
            byteArray.writeInt32(taskid);
            this.sendMsg(hanlder.ProtocolsEnum.CTransChatMessage2Serv, byteArray);
        };
        //CChatItemTips
        RequesterProtocols.prototype.c2s_CChatItemTips = function (displayInfo) {
            var byteArray = new ByteArray();
            // byteArray.writeByte(displayinfos.length);
            // var index:number;
            // var displayInfo: game.modules.chat.models.DisplayInfoVo;
            // for (index = 0; index < displayinfos.length; index++) {
            // displayInfo = displayinfos[index];
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(displayInfo.displaytype);
            ByteArrayUtils.writeLong(displayInfo.roleid, byteArray);
            ByteArrayUtils.writeLong(displayInfo.shopid, byteArray);
            byteArray.writeInt32(displayInfo.counterid);
            byteArray.writeInt32(displayInfo.uniqid);
            ByteArrayUtils.writeLong(displayInfo.teamid, byteArray);
            ByteArrayUtils.writeLong(displayInfo.crosstt, byteArray);
            ByteArrayUtils.writeLong(displayInfo.serverid, byteArray);
            // }
            this.sendMsg(hanlder.ProtocolsEnum.CChatItemTips, byteArray);
        };
        //CCreateTeam
        RequesterProtocols.prototype.c2s_CCreateTeam = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.CCreateTeam, byteArray);
        };
        //CAcceptToTeam
        RequesterProtocols.prototype.c2s_CAcceptToTeam = function (roleid, accept) {
            var bytearray = new ByteArray();
            bytearray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, bytearray);
            bytearray.writeInt32(accept);
            this.sendMsg(hanlder.ProtocolsEnum.CAcceptToTeam, bytearray);
        };
        //CQuitTeam
        RequesterProtocols.prototype.c2s_CQuitTeam = function () {
            var byteArray = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CQuitTeam, byteArray);
        };
        //CAbsentReturnTeam
        RequesterProtocols.prototype.c2s_CAbsentReturnTeam = function (absent) {
            var bytearray = new ByteArray();
            bytearray.endian = Laya.Byte.BIG_ENDIAN;
            bytearray.writeByte(absent);
            this.sendMsg(hanlder.ProtocolsEnum.CAbsentReturnTeam, bytearray);
        };
        //CExpelMember
        RequesterProtocols.prototype.c2s_CExpelMember = function (roleid) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.CExpelMember, byte);
        };
        //CCallbackMember
        RequesterProtocols.prototype.c2s_CCallbackMember = function (memberid) {
            var byte = new ByteArray();
            ByteArrayUtils.writeLong(memberid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.CCallbackMember, byte);
        };
        //CSetTeamLeader
        RequesterProtocols.prototype.c2s_CSetTeamLeader = function (roleid) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.CSetTeamLeader, byte);
        };
        //CInviteJoinTeam
        RequesterProtocols.prototype.c2s_CInviteJoinTeam = function (roleid, force) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byte);
            byte.writeInt32(force);
            this.sendMsg(hanlder.ProtocolsEnum.CInviteJoinTeam, byte);
        };
        //CRespondInvite
        RequesterProtocols.prototype.c2s_CRespondInvite = function (agree) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeByte(agree);
            console.log('agree-----------' + agree);
            this.sendMsg(hanlder.ProtocolsEnum.CRespondInvite, byte);
        };
        //CRequestJoinTeam
        RequesterProtocols.prototype.c2s_CRequestJoinTeam = function (roleid) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(roleid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestJoinTeam, byte);
        };
        //CSwapMember
        RequesterProtocols.prototype.c2s_CSwapMember = function (index1, index2) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeInt32(index1);
            byte.writeInt32(index2);
            this.sendMsg(hanlder.ProtocolsEnum.CSwapMember, byte);
        };
        //CAnswerforSetLeader
        RequesterProtocols.prototype.c2s_CAnswerforSetLeader = function (agree) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeByte(agree);
            this.sendMsg(hanlder.ProtocolsEnum.CAnswerforSetLeader, byte);
        };
        //CAnswerforCallBack
        RequesterProtocols.prototype.c2s_CAnswerforCallBack = function (agree) {
            var byte = new ByteArray();
            byte.writeByte(agree);
            this.sendMsg(hanlder.ProtocolsEnum.CAnswerforCallBack, byte);
        };
        //CRequestSetTeamLevel
        RequesterProtocols.prototype.c2s_CRequestSetTeamLevel = function (minlevel, maxlevel) {
            var messageObj = {};
            messageObj.minlevel = minlevel;
            messageObj.maxlevel = maxlevel;
            var proto = Network._instance.protoTypePool.CRequestSetTeamLevel.fromObject(messageObj);
            console.log("CRequestSetTeamLevel proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestSetTeamLevel.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSetTeamLevel, buffer);
        };
        //CDismissTeam
        RequesterProtocols.prototype.c2s_CDismissTeam = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CDismissTeam.fromObject(messageObj);
            console.log("CDismissTeam proto", proto);
            var buffer = Network._instance.protoTypePool.CDismissTeam.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CDismissTeam, buffer);
        };
        //CFInviteJoinTeam
        RequesterProtocols.prototype.c2s_CFInviteJoinTeam = function (roleid) {
            var messageObj = {};
            messageObj.roleid = roleid;
            var proto = Network._instance.protoTypePool.CFInviteJoinTeam.fromObject(messageObj);
            console.log("CFInviteJoinTeam proto", proto);
            var buffer = Network._instance.protoTypePool.CFInviteJoinTeam.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CFInviteJoinTeam, buffer);
        };
        //CRequestTeamMatch
        RequesterProtocols.prototype.c2s_CRequestTeamMatch = function (typematch, targetid, levelmin, levelmax) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeInt32(typematch);
            byte.writeInt32(targetid);
            byte.writeInt32(levelmin);
            byte.writeInt32(levelmax);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestTeamMatch, byte);
        };
        //CRequestStopTeamMatch
        RequesterProtocols.prototype.c2s_CRequestStopTeamMatch = function () {
            var byte = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestStopTeamMatch, byte);
        };
        //COneKeyTeamMatch
        RequesterProtocols.prototype.c2s_COneKeyTeamMatch = function (channeltype, text) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeInt32(channeltype);
            ByteArrayUtils.writeUtf16String(text, byte);
            this.sendMsg(hanlder.ProtocolsEnum.COneKeyTeamMatch, byte);
        };
        //CRequestSetTeamMatchInfo
        RequesterProtocols.prototype.c2s_CRequestSetTeamMatchInfo = function (targetid, levelmin, levelmax) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            byte.writeInt32(targetid);
            byte.writeInt32(levelmin);
            byte.writeInt32(levelmax);
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSetTeamMatchInfo, byte);
        };
        //CRequestTeamMatchList
        RequesterProtocols.prototype.c2s_CRequestTeamMatchList = function (targetid, startteamid, num) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(targetid); //目标ID
            ByteArrayUtils.writeLong(startteamid, byteArray); //起始队伍ID
            byteArray.writeInt32(num); //取起始队伍id后面的num个数据
            this.sendMsg(hanlder.ProtocolsEnum.CRequestTeamMatchList, byteArray);
        };
        RequesterProtocols.prototype.c2s_CRequestMatchInfo = function () {
            var byte = new ByteArray();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestMatchInfo, byte);
        };
        //CRequestHaveTeam
        RequesterProtocols.prototype.c2s_CRequestHaveTeam = function (roleid) {
            var messageObj = {};
            messageObj.roleid = roleid; //某个人是否有队 by changhao
            var proto = Network._instance.protoTypePool.CRequestHaveTeam.fromObject(messageObj);
            console.log("CRequestHaveTeam proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestHaveTeam.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestHaveTeam, buffer);
        };
        //COneKeyApplyTeamInfo
        RequesterProtocols.prototype.c2s_COneKeyApplyTeamInfo = function (teamid) {
            var byte = new ByteArray();
            byte.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(teamid, byte);
            this.sendMsg(hanlder.ProtocolsEnum.COneKeyApplyTeamInfo, byte);
        };
        //CTeamRollMelon
        RequesterProtocols.prototype.c2s_CTeamRollMelon = function (melonid, status) {
            // let messageObj: any = {};
            // messageObj.melonid = melonid   		//分赃id by changhao
            // messageObj.status = status   		//1是ROLL 0是放弃 by changhao
            // var proto = Network._instance.protoTypePool.CTeamRollMelon.fromObject(messageObj);
            // console.log("CTeamRollMelon proto", proto);
            // var buffer: any = Network._instance.protoTypePool.CTeamRollMelon.encode(proto).finish();
            // this.sendMsg(ProtocolsEnum.CTeamRollMelon, buffer);
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            ByteArrayUtils.writeLong(melonid, byteArray);
            byteArray.writeInt32(status);
            this.sendMsg(hanlder.ProtocolsEnum.CTeamRollMelon, byteArray);
        };
        //CRequestRollItemTips
        RequesterProtocols.prototype.c2s_CRequestRollItemTips = function (melonid) {
            var messageObj = {};
            messageObj.melonid = melonid;
            var proto = Network._instance.protoTypePool.CRequestRollItemTips.fromObject(messageObj);
            console.log("CRequestRollItemTips proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestRollItemTips.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestRollItemTips, buffer);
        };
        //CRequestSetFormation
        RequesterProtocols.prototype.c2s_CRequestSetFormation = function (formation) {
            var messageObj = {};
            messageObj.formation = formation;
            var proto = Network._instance.protoTypePool.CRequestSetFormation.fromObject(messageObj);
            console.log("CRequestSetFormation proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestSetFormation.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestSetFormation, buffer);
        };
        //CFormationMakeBook
        RequesterProtocols.prototype.c2s_CFormationMakeBook = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CFormationMakeBook.fromObject(messageObj);
            console.log("CFormationMakeBook proto", proto);
            var buffer = Network._instance.protoTypePool.CFormationMakeBook.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CFormationMakeBook, buffer);
        };
        //CUseFormBook
        RequesterProtocols.prototype.c2s_CUseFormBook = function (formationid, listbook) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(formationid);
            byteArray.writeByte(listbook.length);
            var index;
            var useFormBook;
            for (index = 0; index < listbook.length; index++) {
                useFormBook = listbook[index];
                byteArray.writeInt32(useFormBook.bookid);
                byteArray.writeInt32(useFormBook.num);
            }
            this.sendMsg(hanlder.ProtocolsEnum.CUseFormBook, byteArray);
        };
        //CRequestClanFightTeamList
        RequesterProtocols.prototype.c2s_CRequestClanFightTeamList = function (isfresh, start, num) {
            var messageObj = {};
            messageObj.isfresh = isfresh; //客户端用 0刷新 1不刷新  by qyl 	
            messageObj.start = start; //起始teamid by changhao	
            messageObj.num = num; //请求的数量 by changhao
            var proto = Network._instance.protoTypePool.CRequestClanFightTeamList.fromObject(messageObj);
            console.log("CRequestClanFightTeamList proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestClanFightTeamList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestClanFightTeamList, buffer);
        };
        //CRequestClanFightRoleList
        RequesterProtocols.prototype.c2s_CRequestClanFightRoleList = function (isfresh, start, num) {
            var messageObj = {};
            messageObj.isfresh = isfresh; //客户端用 0刷新 1不刷新  by qyl 	
            messageObj.start = start; //起始teamid by changhao	
            messageObj.num = num; //请求的数量 by changhao
            var proto = Network._instance.protoTypePool.CRequestClanFightRoleList.fromObject(messageObj);
            console.log("CRequestClanFightRoleList proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestClanFightRoleList.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestClanFightRoleList, buffer);
        };
        //CRequestClanFightTeamRoleNum
        RequesterProtocols.prototype.c2s_CRequestClanFightTeamRoleNum = function () {
            var messageObj = {};
            var proto = Network._instance.protoTypePool.CRequestClanFightTeamRoleNum.fromObject(messageObj);
            console.log("CRequestClanFightTeamRoleNum proto", proto);
            var buffer = Network._instance.protoTypePool.CRequestClanFightTeamRoleNum.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CRequestClanFightTeamRoleNum, buffer);
        };
        //COnTitle
        RequesterProtocols.prototype.c2s_COnTitle = function (titleid) {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            byteArray.writeInt32(titleid);
            this.sendMsg(hanlder.ProtocolsEnum.COnTitle, byteArray);
        };
        //COffTitle
        RequesterProtocols.prototype.c2s_COffTitle = function () {
            var byteArray = new ByteArray();
            byteArray.endian = Laya.Byte.BIG_ENDIAN;
            this.sendMsg(hanlder.ProtocolsEnum.COffTitle, byteArray);
        };
        //CNpcToTrigger
        RequesterProtocols.prototype.c2s_CNpcToTrigger = function (triggerid, npckey) {
            var messageObj = {};
            messageObj.triggerid = triggerid;
            messageObj.npckey = npckey;
            var proto = Network._instance.protoTypePool.CNpcToTrigger.fromObject(messageObj);
            console.log("CNpcToTrigger proto", proto);
            var buffer = Network._instance.protoTypePool.CNpcToTrigger.encode(proto).finish();
            this.sendMsg(hanlder.ProtocolsEnum.CNpcToTrigger, buffer);
        };
        /*加入地图结果*/
        RequesterProtocols.SMSG_JOIN_MAP_RESULT = 14; //join_map_result	
        return RequesterProtocols;
    }());
    hanlder.RequesterProtocols = RequesterProtocols;
})(hanlder || (hanlder = {}));
//# sourceMappingURL=RequesterProtocols.js.map