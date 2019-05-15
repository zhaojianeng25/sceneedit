var game;
(function (game) {
    var data;
    (function (data) {
        /**
         * 枚举转文字
         */
        var EnumToString = /** @class */ (function () {
            function EnumToString() {
            }
            /**
             * 通过枚举获取性别
             */
            EnumToString.getSexName = function (num) {
                switch (num) {
                    case 0:
                        return "通用";
                    case PlayerDataField.SEX_MAN:
                        return "男";
                    case PlayerDataField.SEX_WOMAN:
                        return "女";
                    case PlayerDataField.SEX_GAY:
                        return "人妖";
                    default:
                        return "我真的不知道是什么东西了";
                }
            };
            /**
             * 获取类型
             */
            EnumToString.getTypeByID = function (id) {
                switch (id) {
                    case 0:
                        return "消耗品";
                    case 1:
                        return "装备";
                    case 2:
                        return "材料";
                    case 3:
                        return "套装";
                    default:
                        return "不明物体";
                }
            };
            /**
             * 通过枚举获取装备属性
             */
            EnumToString.getEquipAttribute = function (num) {
                switch (num) {
                    case 0:
                        return null;
                    case UnitField.ATTR_HP:
                        return "生命";
                    case UnitField.ATTR_MP:
                        return "魔法";
                    case UnitField.ATTR_ATK:
                        return "攻击";
                    case UnitField.ATTR_DEF:
                        return "防御";
                    default:
                        return "未知信息";
                }
            };
            /**
             * 获取指定属性的值
             */
            EnumToString.getAttrById = function (numArray, attrType) {
                if (!numArray)
                    return;
                var length = numArray.length;
                if (length == 0)
                    return 0;
                //属性数量
                var attrNum = length / 2;
                var result = "";
                for (var i = 0; i < attrNum; i++) {
                    //属性
                    var id = numArray[2 * i];
                    if (id == attrType)
                        return numArray[2 * i + 1];
                }
                return 0;
            };
            /**
             * 格式化属性值
             */
            EnumToString.formatAttr = function (attrType, attrValue) {
                var str = "";
                // switch (attrType) {
                //     case UnitField.ATTR_CRIT:
                //     case UnitField.ATTR_BLOCKDEFRATE:
                //     case UnitField.ATTR_DEMAGEADD:
                //     case UnitField.ATTR_DEMAGEREDUCERATE:
                //         str = Math.round(attrValue * 100) + "%";
                //         break;
                //     default:
                str = attrValue.toString();
                // }
                return str;
            };
            /**
             *  格式化属性 无最大最小值
             *  XX x
             *  XX x
             */
            EnumToString.getAttrStr = function (numArray) {
                var length = numArray.length;
                if (length == 0)
                    return "无";
                //属性数量
                var attrNum = length / 2;
                var result = "";
                for (var i = 0; i < attrNum; i++) {
                    //属性
                    var key = numArray[2 * i];
                    var value = numArray[2 * i + 1];
                    if (value) {
                        var attr = this.getEquipAttribute(key);
                        //值
                        result += attr + "：" + this.formatAttr(key, value) + "\n";
                    }
                }
                result = result.slice(0, result.length - 1);
                return result;
            };
            EnumToString.getNumStr = function (num) {
                var unitPos = 0;
                var strIns = '', chnStr = '';
                var needZero = false;
                if (num === 0) {
                    return EnumToString.chnNumChar[0];
                }
                if (num == 10) {
                    return EnumToString.chnUnitChar[1];
                }
                while (num > 0) {
                    var section = num % 10000;
                    if (needZero) {
                        chnStr = EnumToString.chnNumChar[0] + chnStr;
                    }
                    strIns = EnumToString.sectionToChinese(section);
                    strIns += (section !== 0) ? EnumToString.chnUnitSection[unitPos] : EnumToString.chnUnitSection[0];
                    chnStr = strIns + chnStr;
                    needZero = (section < 1000) && (section > 0);
                    num = Math.floor(num / 10000);
                    unitPos++;
                }
                return chnStr;
            };
            EnumToString.sectionToChinese = function (section) {
                var strIns = '', chnStr = '';
                var unitPos = 0;
                var zero = true;
                while (section > 0) {
                    var v = section % 10;
                    if (v === 0) {
                        if (!zero) {
                            zero = true;
                            chnStr = EnumToString.chnNumChar[v] + chnStr;
                        }
                    }
                    else {
                        zero = false;
                        strIns = EnumToString.chnNumChar[v];
                        if (section == 1 && unitPos == 1) {
                            strIns = "";
                        }
                        strIns += EnumToString.chnUnitChar[unitPos];
                        chnStr = strIns + chnStr;
                    }
                    unitPos++;
                    section = Math.floor(section / 10);
                }
                return chnStr;
            };
            EnumToString.getTipsMsg = function (type, reason) {
                if (!EnumToString._optTips[type])
                    return "";
                return EnumToString._optTips[type][reason - 1];
            };
            EnumToString.getColorByQuality = function (value) {
                if (value < EnumToString.color.length)
                    return EnumToString.color[value];
                return "";
            };
            //获取品质名字
            EnumToString.getQualityName = function (value) {
                switch (value) {
                    // case ItemMgr.QUALITY_GREEN:
                    //     return "绿色";
                    // case ItemMgr.QUALITY_BLUE:
                    //     return "蓝色";
                    // case ItemMgr.QUALITY_PURPLE:
                    //     return "紫色";
                    // case ItemMgr.QUALITY_ORANGE:
                    //     return "橙色";
                }
                return "白色";
            };
            //货币名称
            EnumToString.getMoneyName = function (type) {
                switch (type) {
                    // case PlayerDataField.MONEY_TYPE_COPPER:
                    //     return "铜钱";
                    case PlayerDataField.MONEY_TYPE_GOLD:
                        return "元宝";
                    default:
                        return "未知货币";
                }
            };
            //获取等级文字
            EnumToString.getLevel = function (level, zsLevel, isNeedLv) {
                if (isNeedLv === void 0) { isNeedLv = false; }
                if (zsLevel <= 0)
                    return level.toString() + "级";
                var str = "";
                str += zsLevel.toString() + "转";
                if (isNeedLv && level > 0)
                    str += level.toString() + "级";
                return str;
            };
            //公告信息转HTML 
            EnumToString.getGongGaoText = function (str) {
                var result = str;
                //标题
                result = result.replace(new RegExp(this.LABEL_TITLE, "gm"), "<span style='color:#ffff00;bold:true;font-size:20px;'>$1</span><br/>");
                //字体大小
                result = result.replace(new RegExp(this.LABEL_SIZE, "gm"), "<span style='font-size:$1'>$2</span>");
                //字体颜色
                result = result.replace(new RegExp(this.LABEL_COLOR, "gm"), "<span style='color:$1'>$2</span>");
                //居中显示 
                result = result.replace(new RegExp(this.LABEL_CENTER, "gm"), "<span style='align:center'>$1</span>");
                //加粗
                result = result.replace(new RegExp(this.LABEL_BOLD, "gm"), "<span style='bold:true'>$1</span>");
                //下划线
                result = result.replace(new RegExp(this.LABEL_UNDERLINE, "gm"), "<u>$1</u>");
                //超链接
                result = result.replace(new RegExp(this.LABEL_LINK, "gm"), "<span href='$1'>$2</span>");
                //换行
                result = result.replace(this.LABEL_BR1, "<br/>");
                result = result.replace(this.LABEL_BR2, "<br/>");
                //表情
                result = result.replace(new RegExp(this.LABEL_BQ, "gm"), function (word) {
                    var index = parseInt(word.substring(2, word.length - 1));
                    return StringU.substitute("<img src='" + game.Path.ui + "icon/10/face_{0}.png'/>", index);
                });
                //定制玩家标签
                result = result.replace(new RegExp(this.LABEL_PLAYER, "gm"), function (word) {
                    word = word.substring(3, word.length - 4);
                    return StringU.substitute("<span style='color:#06ee00'>{0}</span>", EnumToString.getPlayerName(word, true));
                });
                //定制前往标签
                var id = -1;
                result = result.replace(new RegExp(this.LABEL_GOTO, "gm"), function (word) {
                    id = parseInt(word.substring(3, word.length - 4));
                    return "";
                });
                var tele = "";
                result = result.replace(new RegExp(this.LABEL_TELE, "gm"), function (word) {
                    tele = word.substring(3, word.length - 4);
                    return "";
                });
                var guid = "";
                result = result.replace(new RegExp(this.LABEL_GUID, "gm"), function (word) {
                    guid = word.substring(3, word.length - 4);
                    return "";
                });
                return { msg: result, id: id, tele: tele, guid: guid };
            };
            //广播文本转HTML
            EnumToString.getBroadcastText = function (str) {
                //解析字符串
                var result = str;
                //玩家名字
                result = result.replace(new RegExp('\\[p (.+?)\\]', "gm"), function (word) {
                    word = word.substring(3, word.length - 1);
                    return StringU.substitute("<span style='color:#06ee00'>{0}</span>", EnumToString.getPlayerName(word, true));
                });
                //物品或者信息
                result = result.replace(new RegExp('\\[i (.+?)\\]', "gm"), "<span style='color:#ffff00'>$1</span>");
                return result;
            };
            //物品模板描述规则
            EnumToString.getItemDesc = function (str) {
                //解析字符串
                var result = str;
                //行
                result = result.replace(new RegExp('\\[p\\](.+?)\\[/p\\]', "gm"), "<span>$1</span><br/>");
                //字体颜色
                result = result.replace(new RegExp('\\[c=(.+?)\\](.+?)\\[/c\\]', "gm"), "<span style='color:$1'>$2</span>");
                return result;
            };
            //名字截取
            EnumToString.getPlayerName = function (name, isServerID) {
                if (isServerID === void 0) { isServerID = true; }
                if (!name || !name.length)
                    return name;
                var result = "";
                var index = name.indexOf('_');
                if (index != -1) {
                    result = name.substring(index + 1, name.length);
                }
                else
                    result = name;
                if (isServerID) {
                    if (result.indexOf(',') != -1) {
                        result = "s" + result;
                        result = result.replace(',', '.');
                    }
                    return result;
                }
                else {
                    if (result.indexOf(',') != -1)
                        result = result.split(',')[1];
                    return result;
                }
            };
            //玩家guid 去掉前缀
            EnumToString.getPlayerGuid = function (guid) {
                if (!guid || !guid.length)
                    return guid;
                return guid.replace(GlobalDef.TYPE_PLAYER + ".", "");
            };
            //数字简写 
            EnumToString.sampleNum = function (num) {
                if (num <= 99999)
                    return num.toString();
                num = Math.floor(num / 10000);
                if (num <= 99999)
                    return num + "万";
                num = Math.floor(num / 10000);
                return num + "亿";
            };
            //随机个小贴士
            EnumToString.randomTeleGameTip = function () {
                var index = MathU.randomRange(0, EnumToString.TELE_GAME_TIPS.length - 1);
                return EnumToString.TELE_GAME_TIPS[index];
            };
            EnumToString.numChangeWEEK = function (num) {
                num = parseInt(num);
                return EnumToString.WEEKS[num - 1];
            };
            /**
             *  获取数字的中文
             *  @param num 数字
             *  @return 返回中文 1234
             */
            EnumToString.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
            EnumToString.chnUnitChar = ["", "十", "百", "千"];
            EnumToString.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
            //操作错误中文提示
            EnumToString._optTips = {
                1: ["登录成功！",
                    "登录错误！",
                    "登录超时！",
                    "账号错误！",
                    "性别错误！",
                    "昵称错误！",
                    "昵称包含非法字符！",
                    "该昵称已存在!",
                    "账号已经登录游戏！"
                ],
                //1
                2: ["",
                    "已经有这个任务了",
                    "已经完成过的",
                    "任务槽满了",
                    "账号错误",
                    "找不到任务模板",
                    "需要前置任务",
                    "任务状态不对",
                    "参数错误",
                    "等级太低",
                    "已经有了",
                    "已经十星了",
                    "钱不够",
                    "没有日常",
                    "进度少了",
                    "次数满了",
                    "",
                    ""],
                //2
                3: ["使用成功！",
                    "背包空间不足,请整理背包！",
                    "包裹不存在！",
                    "该物品无法装备！",
                    "等级不足！",
                    "性别不符！",
                    "找不到模板数据！",
                    "操作数量错误！",
                    "无法购买！",
                    "金钱不足！",
                    "背包类型不对！",
                    "物品不存在！",
                    "无法出售！",
                    "位置错误",
                    "宝石类型错误",
                    "宝石穿戴位置",
                    "宝石位置已经满了",
                    "宝石位置为空，卸载失败",
                    "宝石不足合成失败",
                    "宝石合成成功",
                    "",
                    "",
                    "装备成功",
                    "",
                    "材料不足！",
                    "神装升阶成功！",
                    "神装强化成功！",
                ],
                5: ["只能在主包裹使用物品!",
                    "这个位置没有物品",
                    "找不到模板",
                    "不是消耗品",
                    "没有使用物品的函数",
                    "空位不足",
                    "不能批量使用的物品",
                    "等级不足"],
                4: ["操作成功!",
                    "有附件未领取！",
                    "背包位置不足！",
                    "背包索引错误！",
                    "邮件已经过期！",
                    "邮件还未到激活时间！"],
                //8--招募
                10: ["武将空位不够",
                    "低级抽没有十连抽",
                    "招募材料不够",
                ],
            };
            //获取品质名字 白 绿 蓝 紫 红
            EnumToString.color = ["#ffffff", "#00ff00", "#42deff", "#e84bff", "#ffae3a", "#ff0000"];
            //关键词
            EnumToString.LABEL_TITLE = '\\[title\\](.+?)\\[/title\\]';
            EnumToString.LABEL_SIZE = '\\[font-size=(.+?)\\](.+?)\\[/font-size\\]';
            EnumToString.LABEL_COLOR = '\\[font-color=(.+?)\\](.+?)\\[/font-color\\]';
            EnumToString.LABEL_CENTER = '\\[center\\](.+?)\\[/center\\]';
            EnumToString.LABEL_BOLD = '\\[b\\](.+?)\\[/b\\]';
            EnumToString.LABEL_UNDERLINE = '\\[u\\](.+?)\\[/u\\]';
            EnumToString.LABEL_LINK = '\\[link=(.+?)\\](.+?)\\[/link\\]';
            EnumToString.LABEL_BR1 = '\n';
            EnumToString.LABEL_BR2 = '\r\n';
            EnumToString.LABEL_PLAYER = '\\[p\\](.+?)\\[/p\\]';
            EnumToString.LABEL_GOTO = '\\[q\\](.+?)\\[/q\\]';
            EnumToString.LABEL_TELE = '\\[d\\](.+?)\\[/d\\]';
            EnumToString.LABEL_GUID = '\\[g\\](.+?)\\[/g\\]';
            EnumToString.LABEL_BQ = '\\[f(.+?)\\]'; //表情
            //传送小贴士
            EnumToString.TELE_GAME_TIPS = [
                "及时的强化你的装备，打起怪物来会更得心应手哟~",
                "御剑不仅让你行走速度更快，还可以加强你的属性！",
                "释放剑诀，小怪们都会退避三舍。",
                "升级的同时，不要忘记你的技能等级。",
                "今天的事情都做完了吗，不要浪费你的副本次数",
                "我不会告诉你，锁妖塔的奖励有多丰富",
                "仙府=聚宝盆！拥有它，日进斗金不是梦。",
                "斗仙台是你展示个人实力最好的地方。"
            ];
            /**
             * 数字转换为周期
             */
            EnumToString.WEEKS = ["一", "二", "三", "四", "五", "六", "日"];
            return EnumToString;
        }());
        data.EnumToString = EnumToString;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=EnumToString.js.map