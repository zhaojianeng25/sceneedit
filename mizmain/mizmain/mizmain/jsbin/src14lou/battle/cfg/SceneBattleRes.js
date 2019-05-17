var battle;
(function (battle) {
    /**战斗场景配置*/
    var SceneBattleRes = /** @class */ (function () {
        function SceneBattleRes() {
        }
        /**阵位数量*/
        SceneBattleRes.MAX_POS = 14; //6;
        /**中心点偏移量*/
        SceneBattleRes.CENTER_OFFSETX = 8.6;
        SceneBattleRes.CENTER_OFFSETY = 4.4;
        /**上阵位:0~13*/
        SceneBattleRes.TOP_POSX = [];
        SceneBattleRes.TOP_POSY = [];
        /**下阵位:0~13*/
        SceneBattleRes.BOTTOM_POSX = [];
        SceneBattleRes.BOTTOM_POSY = [];
        /** 中阵位29-39观战站位 */
        SceneBattleRes.MIDDLE_POX = [];
        SceneBattleRes.MIDDLE_POY = [];
        /**上阵位战将进场坐标x*/
        SceneBattleRes.ENTER_TOPX = 171.25;
        /**上阵位战将进场坐标y*/
        SceneBattleRes.ENTER_TOPY = -367.25;
        /**下阵位战将进场坐标x*/
        SceneBattleRes.ENTER_BOTTOMX = -171.25;
        /**下阵位战将进场坐标y*/
        SceneBattleRes.ENTER_BOTTOMY = 373.25;
        /**战将普攻前往目标偏移量x*/
        SceneBattleRes.FORWARD_OFFSETX = 36.75;
        /**战将普攻前往目标偏移量y*/
        SceneBattleRes.FORWARD_OFFSETY = 78.75;
        /**战将受击偏移量x*/
        SceneBattleRes.BEATEN_OFFSETX = 18.375;
        /**战将受击偏移量y*/
        SceneBattleRes.BEATEN_OFFSETY = 39.375;
        /**战将受击击飞偏移量x*/
        SceneBattleRes.BEATEN_FLYX = 294;
        /**战将受击击飞偏移量y*/
        SceneBattleRes.BEATEN_FLYY = 630;
        /**通用受击技能*/
        SceneBattleRes.BEATEN_SPELL = 1001;
        /**场景火特效名*/
        SceneBattleRes.EFFECT_FIRE = ["smoke", "huoxing", "fire", "smoke", "huoxing", "fire", "smoke", "huoxing", "fire"];
        /**场景火特效y轴偏移*/
        SceneBattleRes.EFFECT_FIRE_POS = [120, -250, 2, 100, -300, 2, 50, -220, 1.5, 0, -270, 2.2, -20, -320, 2.2, -65, -217, 1.8, -140, -260, 2.2, -170, -320, 2.2, -140, -230, 1.5];
        /**施法者特效名*/
        SceneBattleRes.EFFECT_CAST = "10104_shifa_lyf";
        /**施法者特效y轴偏移*/
        SceneBattleRes.EFFECT_CAST_Y = 0;
        /**己方目标待选择特效名*/
        SceneBattleRes.EFFECT_WAIT0 = "wofang_01";
        /**敌方目标待选择特效名*/
        SceneBattleRes.EFFECT_WAIT1 = "difang_01";
        /**目标待选择特效y轴偏移*/
        SceneBattleRes.EFFECT_WAIT_Y = 65;
        /**目标选中特效名*/
        SceneBattleRes.EFFECT_SELECT = "npcxuanzhon_lyf";
        /**目标选中特效y轴偏移*/
        SceneBattleRes.EFFECT_SELECT_Y = 65;
        /**技能闪光特效名*/
        SceneBattleRes.EFFECT_SPELL = "dashan";
        /**技能闪光特效y轴偏移*/
        SceneBattleRes.EFFECT_SPELL_Y = 160;
        /**加血特效名*/
        SceneBattleRes.EFFECT_JIAXUE = "jiaxue";
        /**加血特效y轴偏移*/
        SceneBattleRes.EFFECT_JIAXUE_Y = 50;
        /**衰落特效名*/
        SceneBattleRes.EFFECT_SHUAIRUO = "10104_shouji1_lyf";
        /**衰落特效y轴偏移*/
        SceneBattleRes.EFFECT_SHUAIRUO_Y = 20;
        /** 准备中特效*/
        SceneBattleRes.EFFECT_READY = "ready_lyf";
        /** 连击点特效1*/
        SceneBattleRes.EFFECT_COMBO_POINT_1 = "lianji-1_lyf";
        /** 连击点特效2*/
        SceneBattleRes.EFFECT_COMBO_POINT_2 = "lianji-2_lyf";
        /** 连击点特效3*/
        SceneBattleRes.EFFECT_COMBO_POINT_3 = "lianji-3_lyf";
        /** 连击点特效4*/
        SceneBattleRes.EFFECT_COMBO_POINT_4 = "lianji-4_lyf";
        /** 连击点特效5*/
        SceneBattleRes.EFFECT_COMBO_POINT_5 = "lianji-5_lyf";
        /** 血量银边特效 */
        SceneBattleRes.EFFECT_BLOOD_SILVER_EDGE = "yinbian_lyf";
        /** 门派图标_云霄殿 */
        SceneBattleRes.EFFECT_YUNXIAO = "yunxiaodian_lyf";
        /** 门派图标_火云宗 */
        SceneBattleRes.EFFECT_HUOYUN = "huoyunzon_lyf";
        /** 门派图标_苍羽宫 */
        SceneBattleRes.EFFECT_CANGYU = "cangyugong_lyf";
        /** 门派图标_飞雪崖 */
        SceneBattleRes.EFFECT_FEIXUE = "feixueya_lyf";
        /** 门派图标_天雷狱 */
        SceneBattleRes.EFFECT_TIANLEI = "tianleiyu_lyf";
        /** 门派图标_无量宫 */
        SceneBattleRes.EFFECT_WULIANG = "wulianggong_lyf";
        /** 门派图标_幽冥殿 */
        SceneBattleRes.EFFECT_YOUMING = "youmingdian_lyf";
        /** 门派图标_七星观 */
        SceneBattleRes.EFFECT_QIXING = "qixingguan_lyf";
        /** 门派图标_丹阳观 */
        SceneBattleRes.EFFECT_DANYANG = "danngyangguang_lyf";
        return SceneBattleRes;
    }());
    battle.SceneBattleRes = SceneBattleRes;
})(battle || (battle = {}));
//# sourceMappingURL=SceneBattleRes.js.map