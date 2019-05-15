/**
* 模板扩展
*/
var game;
(function (game) {
    var data;
    (function (data_1) {
        var TemplateExpan = /** @class */ (function () {
            function TemplateExpan() {
            }
            TemplateExpan.init = function () {
            };
            /**
             * 根据系统类型获取系统名字
             * @param sys_type
             */
            TemplateExpan.getSysNameBySysType = function (sys_type) {
                if (!data_1.Template.data)
                    return "";
                var datas = data_1.Template.data["tb_open_panel"];
                if (datas && datas.length) {
                    var len = datas.length;
                    for (var i = 0; i < len; i++) {
                        var obj = datas[i];
                        if (obj && sys_type == obj.sys_type) {
                            return obj.name;
                        }
                    }
                }
                return "";
            };
            /**
             * 根据系统类型获取窗口配置
             * @param sys_type
             */
            TemplateExpan.getPageConfigBySysType = function (sys_type) {
                if (!data_1.Template.data)
                    return "";
                var datas = data_1.Template.data["tb_open_panel"];
                if (datas && datas.length) {
                    var len = datas.length;
                    for (var i = 0; i < len; i++) {
                        var obj = datas[i];
                        if (obj && sys_type == obj.sys_type) {
                            return obj.open_panel;
                        }
                    }
                }
                return "";
            };
            /**
             * 获取表有效数据的数量
             * @param tb_name 表名
             */
            TemplateExpan.getValidLength = function (tb_name) {
                var len = 0;
                var dataArray = data_1.Template.data[tb_name];
                if (dataArray && dataArray.length > 0) {
                    for (var _i = 0, dataArray_1 = dataArray; _i < dataArray_1.length; _i++) {
                        var data_2 = dataArray_1[_i];
                        if (data_2)
                            len++;
                    }
                }
                return len;
            };
            /**
             * 根据升级类型和等级获取武将升级模板
             * @param type 对应tb_wujiang_level表的 upgrade_type
             * @return 武将升级模板
             */
            TemplateExpan.getWJLevelTemp = function (type) {
                var dataArray = data_1.Template.data['tb_wujiang_level'];
                for (var _i = 0, dataArray_2 = dataArray; _i < dataArray_2.length; _i++) {
                    var data_3 = dataArray_2[_i];
                    if (data_3.upgrade_type == type) {
                        return data_3;
                    }
                }
                return null;
            };
            /**
             * 获取升级花费模板
             * @param quality 品质
             * @param level 等级
             */
            TemplateExpan.getWJLevelCostTemp = function (quality, level) {
                var dataArray = data_1.Template.data['tb_wujiang_levelcost'];
                for (var _i = 0, dataArray_3 = dataArray; _i < dataArray_3.length; _i++) {
                    var data_4 = dataArray_3[_i];
                    if (data_4.color == quality && data_4.level == level) {
                        return data_4;
                    }
                }
                return null;
            };
            /**
             * 获取最大升级级数
             * @param quality 品质
             */
            TemplateExpan.getMaxSJLevel = function () {
                var count = 200;
                return count;
            };
            /**
             * 根据武将模板ID和突破等级获取突破消耗模板
             * @param entryID 武将模板ID
             * @param tpLevel 突破等级
             */
            TemplateExpan.getWJTPCostTemp = function (entryID, tpLevel) {
                var dataArray = data_1.Template.data['tb_wujiang_tupo_cost'];
                for (var _i = 0, dataArray_4 = dataArray; _i < dataArray_4.length; _i++) {
                    var data_5 = dataArray_4[_i];
                    if (data_5.wj_id == entryID && data_5.level == tpLevel) {
                        return data_5;
                    }
                }
                return null;
            };
            /**
             * 获取突破最大等级
             * @param entryID 武将ID
             * @return 最大突破等级
             */
            TemplateExpan.getMaxTPLevel = function (entryID) {
                var maxTPLevel = 0;
                var dataArray = data_1.Template.data['tb_wujiang_tupo_cost'];
                for (var _i = 0, dataArray_5 = dataArray; _i < dataArray_5.length; _i++) {
                    var data_6 = dataArray_5[_i];
                    if (data_6.wj_id == entryID) {
                        if (data_6.level > maxTPLevel) {
                            maxTPLevel = data_6.level;
                        }
                    }
                }
                return maxTPLevel;
            };
            /**
             * 根据武将模板ID和突破等级获取突破属性模板
             * @param entryID 武将模板ID
             * @param tpLevel 突破等级
             */
            TemplateExpan.getWJTPTemp = function (entryID, tpLevel) {
                var dataArray = data_1.Template.data['tb_wujiang_tupo_attr'];
                for (var _i = 0, dataArray_6 = dataArray; _i < dataArray_6.length; _i++) {
                    var data_7 = dataArray_6[_i];
                    if (data_7 && data_7.wj_entry == entryID && data_7.level == tpLevel) {
                        return data_7;
                    }
                }
                return null;
            };
            /**
             * 根据武将模板ID获取突破详情
             * @param entryID 武将ID
             */
            TemplateExpan.getWJTPTempList = function (entryID) {
                var list = [];
                var dataArray = data_1.Template.data['tb_wujiang_tupo_attr'];
                for (var _i = 0, dataArray_7 = dataArray; _i < dataArray_7.length; _i++) {
                    var data_8 = dataArray_7[_i];
                    if (data_8 && data_8.wj_entry == entryID) {
                        list.push(data_8);
                    }
                }
                return list;
            };
            /**
             * 根据武将ID获取缘分
             * @param entryID 武将ID
             */
            TemplateExpan.getWJYuanFenByID = function (entryID) {
                var dataArray = data_1.Template.data['tb_wujiang_yuanfen'];
                for (var _i = 0, dataArray_8 = dataArray; _i < dataArray_8.length; _i++) {
                    var data_9 = dataArray_8[_i];
                    if (data_9.wj_entry == entryID) {
                        return data_9;
                    }
                }
                return null;
            };
            /**
             * 获得装备强化模板
             * @param quality 品质
             * @param pos 位置
             * @param level 强化等级
             */
            TemplateExpan.getEquipStrengthenTemp = function (quality, pos, level) {
                var dataArray = data_1.Template.data['tb_equip_streng'];
                for (var _i = 0, dataArray_9 = dataArray; _i < dataArray_9.length; _i++) {
                    var data_10 = dataArray_9[_i];
                    if (data_10.color == quality && data_10.pos == pos && data_10.level == level) {
                        return data_10;
                    }
                }
                return null;
            };
            /**
             * 获得装备精炼模板
             * @param quality 品质
             * @param pos 位置
             * @param level 精炼等级
             */
            TemplateExpan.getEquipJinglianTemp = function (quality, pos, level) {
                var dataArray = data_1.Template.data['tb_equip_jinglian'];
                for (var _i = 0, dataArray_10 = dataArray; _i < dataArray_10.length; _i++) {
                    var data_11 = dataArray_10[_i];
                    if (data_11.color == quality && data_11.pos == pos && data_11.level == level) {
                        return data_11;
                    }
                }
                return null;
            };
            /**
             * 获得装备精炼技能模板
             * @param quality 品质
             * @param pos 位置
             * @param level 精炼等级
             */
            TemplateExpan.getEquipJinglianSpellTemp = function (quality, pos) {
                var resultArray = [];
                var dataArray = data_1.Template.data['tb_equip_jinglian_spell'];
                for (var _i = 0, dataArray_11 = dataArray; _i < dataArray_11.length; _i++) {
                    var data_12 = dataArray_11[_i];
                    if (data_12.color == quality && data_12.pos == pos) {
                        resultArray.push(data_12);
                    }
                }
                return resultArray;
            };
            /**
             * 获得宝物强化模板
             * @param quality 品质
             * @param pos 位置
             * @param level 强化等级
             */
            TemplateExpan.getBaoWuStrengthenTemp = function (quality, pos, level) {
                var dataArray = data_1.Template.data['tb_baowu_streng'];
                for (var _i = 0, dataArray_12 = dataArray; _i < dataArray_12.length; _i++) {
                    var data_13 = dataArray_12[_i];
                    if (data_13.color == quality && data_13.pos == pos && data_13.level == level) {
                        return data_13;
                    }
                }
                return null;
            };
            /**
             * 获得宝物精炼模板
             * @param quality 品质
             * @param pos 位置
             * @param level 精炼等级
             */
            TemplateExpan.getBaoWuJinglianTemp = function (quality, pos, level) {
                var dataArray = data_1.Template.data['tb_baowu_jinglian'];
                for (var _i = 0, dataArray_13 = dataArray; _i < dataArray_13.length; _i++) {
                    var data_14 = dataArray_13[_i];
                    if (data_14.color == quality && data_14.pos == pos && data_14.level == level) {
                        return data_14;
                    }
                }
                return null;
            };
            /**
             * 获得宝物精炼技能模板
             * @param quality 品质
             * @param pos 位置
             * @param level 精炼等级
             */
            TemplateExpan.getBaoWuJinglianSpellTemp = function (quality, pos) {
                var resultArray = [];
                var dataArray = data_1.Template.data['tb_baowu_jinglian_spell'];
                for (var _i = 0, dataArray_14 = dataArray; _i < dataArray_14.length; _i++) {
                    var data_15 = dataArray_14[_i];
                    if (data_15.color == quality && data_15.pos == pos) {
                        resultArray.push(data_15);
                    }
                }
                return resultArray;
            };
            /**
             * 获取套装属性
             * @param suitType
             * @param count
             */
            TemplateExpan.getEquipSuitTemp = function (suitType, count) {
                var levelArray = [2, 3, 4];
                var curLevel = 0;
                //获取档位
                for (var i = levelArray.length - 1; i >= 0; i--) {
                    var level = levelArray[i];
                    if (count >= level) {
                        curLevel = level;
                        break;
                    }
                }
                //获取套装属性
                var dataArray = data_1.Template.data['tb_taozhuang'];
                for (var _i = 0, dataArray_15 = dataArray; _i < dataArray_15.length; _i++) {
                    var data_16 = dataArray_15[_i];
                    if (data_16.tz_id == suitType) {
                        switch (curLevel) {
                            case 2:
                                return data_16.two_attr; //2件套
                            case 3:
                                return data_16.three_attr; //3件套
                            case 4:
                                return data_16.four_attr; //4件套
                        }
                    }
                }
                return null;
            };
            /**
             * 获取装备强化大师模板
             * @param minLevel 全身最小强化等级
             */
            TemplateExpan.getEquipStrengthenMasterTemp = function (minLevel) {
                var dataArray = data_1.Template.data['tb_equip_streng_master'];
                for (var i = dataArray.length - 1; i >= 0; i--) {
                    var data_17 = dataArray[i];
                    logd(minLevel + "     " + data_17.need_min_lv);
                    if (minLevel >= data_17.need_min_lv)
                        return data_17;
                }
                return null;
            };
            /**
             * 获取装备精炼大师模板
             * @param minLevel 全身最小精炼等级
             */
            TemplateExpan.getEquipJingLianMasterTemp = function (minLevel) {
                var dataArray = data_1.Template.data['tb_equip_jinglian_master'];
                for (var i = dataArray.length - 1; i >= 0; i--) {
                    var data_18 = dataArray[i];
                    if (minLevel >= data_18.need_min_lv)
                        return data_18;
                }
                return null;
            };
            /**
             * 获取宝物强化大师模板
             * @param minLevel 全身最小强化等级
             */
            TemplateExpan.getBaoWuStrengthenMasterTemp = function (minLevel) {
                var dataArray = data_1.Template.data['tb_baowu_streng_master'];
                for (var i = dataArray.length - 1; i >= 0; i--) {
                    var data_19 = dataArray[i];
                    if (minLevel >= data_19.need_min_lv)
                        return data_19;
                }
                return null;
            };
            /**
             * 获取宝物精炼大师模板
             * @param minLevel 全身最小精炼等级
             */
            TemplateExpan.getBaoWuJingLianMasterTemp = function (minLevel) {
                var dataArray = data_1.Template.data['tb_baowu_jinglian_master'];
                for (var i = dataArray.length - 1; i >= 0; i--) {
                    var data_20 = dataArray[i];
                    if (minLevel >= data_20.need_min_lv)
                        return data_20;
                }
                return null;
            };
            return TemplateExpan;
        }());
        data_1.TemplateExpan = TemplateExpan;
    })(data = game.data || (game.data = {}));
})(game || (game = {}));
//# sourceMappingURL=TemplateExpan.js.map