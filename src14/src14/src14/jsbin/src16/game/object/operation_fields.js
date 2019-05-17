var Operation_Fields = /** @class */ (function () {
    function Operation_Fields() {
    }
    //操作错误类型
    Operation_Fields.OPRATE_LOGIN = 1; //登录操作错误类型
    Operation_Fields.OPRATE_LOGIN_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_LOGIN_SIGN_ERR = 2; //sign错误
    Operation_Fields.OPRATE_LOGIN_TIMEOUT = 3; //超时
    Operation_Fields.OPRATE_LOGIN_ACCOUNT_ERR = 4; //账号错误
    Operation_Fields.OPRATE_LOGIN_SEX_ERR = 5; //性别错误
    Operation_Fields.OPRATE_LOGIN_NAME_ERR = 6; //昵称错误
    Operation_Fields.OPRATE_LOGIN_NAME_FUCK_PINGBI = 7; //昵称有非法词
    Operation_Fields.OPRATE_LOGIN_NAME_EXIST = 8; //昵称已存在
    Operation_Fields.OPRATE_LOGIN_OTHER_ONLINE = 9; //其他在线中
    Operation_Fields.OPRATE_LOGIN_RECONNECTION = 10; //断线重连
    Operation_Fields.OPRATE_LOGIN_TELEPORT_FAIL = 11; //传送失败
    Operation_Fields.OPRATE_LOGIN_KICK_PLAYER = 12; //踢下线
    Operation_Fields.OPRATE_LOGIN_LOCK_IP = 13; //封IP
    Operation_Fields.OPRATE_LOGIN_LOCK_INFO = 14; //封账号
    Operation_Fields.OPRATE_LOGIN_NOTICE_OTHER_LOGIN1 = 15; //提示他人自己登陆当前账号
    Operation_Fields.OPRATE_LOGIN_NOTICE_OTHER_LOGIN2 = 16; //提示自己其他人登陆当前账号
    Operation_Fields.OPRATE_LOGIN_FORCE_RELOGIN = 17; //允许强制重新登陆
    //操作错误类型
    Operation_Fields.OPRATE_QUSET = 2; //任务操作错误类型
    Operation_Fields.OPRATE_QUSET_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_QUSET_ALREADY_HAD_QUEST = 2; //已经有这个任务了
    Operation_Fields.OPRATE_QUSET_COMPLETED = 3; //已经完成过的
    Operation_Fields.OPRATE_QUSET_SLOT_FULL = 4; //任务槽满了
    Operation_Fields.OPRATE_QUSET_ACCOUNT_ERR = 5; //账号错误
    Operation_Fields.OPRATE_QUSET_TEMP_NIL = 6; //找不到任务模板
    Operation_Fields.OPRATE_QUSET_NEED_PREV = 7; //需要前置任务
    Operation_Fields.OPRATE_QUSET_STATUS_ERROR = 8; //任务状态不对
    Operation_Fields.OPRATE_QUSET_PARM_ERROR = 9; //参数错误
    Operation_Fields.OPRATE_QUSET_LEVEL_LESS = 10; //等级太低
    Operation_Fields.OPRATE_QUSET_HAS_DALIY = 11; //已经有了
    Operation_Fields.OPRATE_QUSET_TEN_STAR = 12; //已经十星了
    Operation_Fields.OPRATE_QUSET_MONEY_LESS = 13; //钱不够
    Operation_Fields.OPRATE_QUSET_NOT_DALIY = 14; //没有日常
    Operation_Fields.OPRATE_QUSET_PROGRESS_LESS = 15; //进度少了
    Operation_Fields.OPRATE_QUSET_TIMES_FULL = 16; //次数满了
    Operation_Fields.OPRATE_QUSET_TEN_STAR_SUCCESS = 17; //满星成功
    Operation_Fields.OPRATE_QUSET_ACCEPT_SUCCESS = 18; //接受日环任务成功
    Operation_Fields.OPRATE_QUSET_ADD_PROESS_SUCCESS = 19; //加任务进度成功
    Operation_Fields.OPRATE_QUSET_NO_PROESS_QUEST = 20; //不是可以加进度的任务
    //操作错误类型
    Operation_Fields.OPRATE_ITEM = 3; //物品操作错误类型
    Operation_Fields.OPRATE_ITEM_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_ITEM_BAG_FULL = 2; //背包已满
    Operation_Fields.OPRATE_ITEM_BAG_NIL = 3; //包裹不存在
    Operation_Fields.OPRATE_ITEM_TEMPLATE_ERROR = 4; //找不到模板数据
    Operation_Fields.OPRATE_ITEM_COUNT_ERROR = 5; //操作数量错误
    Operation_Fields.OPRATE_ITEM_NOT_BUY = 6; //无法购买
    Operation_Fields.OPRATE_ITEM_MONEY_NOT_ENOUGH = 7; //金钱不足
    Operation_Fields.OPRATE_ITEM_BAG_TYPE_ERROR = 8; //背包类型不对
    Operation_Fields.OPRATE_ITEM_ITEM_NIL = 9; //物品不存在
    Operation_Fields.OPRATE_ITEM_NOT_SELL = 10; //无法出售
    Operation_Fields.OPRATE_ITEM_POS_ERR = 11; //位置错误
    Operation_Fields.OPRATE_ITEM_POPO_REWARD = 12; //奖励弹窗
    Operation_Fields.OPRATE_ITEM_WEAR_SUCCESS = 13; //穿戴成功
    Operation_Fields.OPRATE_ITEM_POPO_REWARD_NOT_CLOSE = 14; //奖励弹窗_不自动关闭
    Operation_Fields.OPRATE_ITEM_NOT_ENOUGH = 15; //材料不足，操作失败
    Operation_Fields.OPRATE_ITEM_SELL_SUCCESS = 16; //出售成功
    //操作错误类型
    Operation_Fields.OPRATE_MAIL = 4; //邮件操作操作错误类型
    Operation_Fields.OPRATE_MAIL_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_MAIL_ATTACH_NOT_NULL = 2; //附件没空
    Operation_Fields.OPRATE_MAIL_BAG_POS_NOT_ENOUGH = 3; //包裹位置不够
    Operation_Fields.OPRATE_MAIL_INDEX_EEROR = 4; //包裹索引错误
    Operation_Fields.OPRATE_MAIL_TIME_OVER = 5; //到期了
    Operation_Fields.OPRATE_MAIL_NOT_BEGIN = 6; //没到时间
    //操作错误类型
    Operation_Fields.OPRATE_USE_ITEM = 5; //使用物品操作错误类型
    Operation_Fields.OPRATE_USE_ITEM_BAG_TYPE_ERROR = 1; //只能在主包裹使用物品
    Operation_Fields.OPRATE_USE_ITEM_EMPTY_POS = 2; //这个位置没有物品
    Operation_Fields.OPRATE_USE_ITEM_TEMP_NIL = 3; //找不到模板
    Operation_Fields.OPRATE_USE_ITEM_NOT_XIAOHAO = 4; //不是消耗品
    Operation_Fields.OPRATE_USE_ITEM_USE_FAIL = 5; //没有使用物品的函数
    Operation_Fields.OPRATE_USE_ITEM_EMPTY_POS_NOT_ENOUGH = 6; //空位不足
    Operation_Fields.OPRATE_USE_ITEM_CANT_BATCH_USE = 7; //不能批量使用的物品
    Operation_Fields.OPRATE_USE_ITEM_LEVEL_NOT_ENOUGH = 8; //等级不足
    //操作错误类型
    Operation_Fields.OPRATE_HECHENG = 6; //合成操作错误类型
    Operation_Fields.OPRATE_HECHENG_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_HECHENG_ITEM_TEMP_NIL = 2; //物品模板找不到
    Operation_Fields.OPRATE_HECHENG_EMPTY_POS_NOT_ENOUGH = 3; //空位不足
    Operation_Fields.OPRATE_HECHENG_TEMP_NIL = 4; //找不到模板
    Operation_Fields.OPRATE_HECHENG_SUIPIAN_LESS = 5; //碎片不够
    Operation_Fields.OPRATE_HECHENG_NOT_SUIPIAN = 6; //这玩意就不是碎片
    //操作错误类型
    Operation_Fields.OPRATE_SOCIAL = 7; //社交操作错误类型
    //操作错误类型
    Operation_Fields.OPRATE_KUAFU = 8; //跨服相关操作错误类型
    Operation_Fields.OPRATE_KUAFU_1V1_RESULT = 1; //1V1胜负
    Operation_Fields.OPRATE_KUAFU_REG_CANEL_FAIL = 2; //取消失败
    Operation_Fields.OPRATE_KUAFU_REG_CANEL_SUCESS = 3; //取消成功
    Operation_Fields.OPRATE_KUAFU_REG_TIME_ERROR = 4; //不在活动时间内
    Operation_Fields.OPRATE_KUAFU_MAX_COUNT = 5; //参加次数已满
    Operation_Fields.OPRATE_KUAFU_LEVEL_LESS = 6; //等级不足
    //操作错误类型
    Operation_Fields.OPRATE_CHAT = 9; //聊天操作错误类型
    Operation_Fields.OPRATE_CHAT_ERROR_TYPE = 1; //发言类型不对
    Operation_Fields.OPRATE_CHAT_ERROR_LEVEL = 2; //等级不足
    Operation_Fields.OPRATE_CHAT_ERROR_GANG = 3; //没有帮派
    Operation_Fields.OPRATE_CHAT_ERROR_CONTENT = 4; //无发言内容
    Operation_Fields.OPRATE_CHAT_SHUTUP = 5; //禁言
    Operation_Fields.OPRATE_CHAT_COOLING = 6; //发言冷却中
    //操作错误类型
    Operation_Fields.OPRATE_ZHAOMU = 10; //招募操作错误类型
    Operation_Fields.OPRATE_ZHAOMU_POS_LESS = 1; //武将空位不够
    Operation_Fields.OPRATE_ZHAOMU_ZHAOMU_LOW_NOT_TEN = 2; //低级抽没有十连抽
    Operation_Fields.OPRATE_ZHAOMU_CAILIAO_LESS = 3; //招募材料不够
    //操作错误类型
    Operation_Fields.OPRATE_CLOSE = 11; //关闭客户端操作错误类型
    Operation_Fields.OPRATE_CLOSE_LOCK_INFO = 1; //封账号
    Operation_Fields.OPRATE_CLOSE_LOCK_IP = 2; //封IP
    Operation_Fields.OPRATE_CLOSE_KICK_PLAYER = 3; //踢下线
    Operation_Fields.OPRATE_CLOSE_SIGN_ERR = 4; //sign错误
    Operation_Fields.OPRATE_CLOSE_ACCOUNT_ERR = 5; //账号错误
    Operation_Fields.OPRATE_CLOSE_TO_SERVER_ERR = 6; //进入的服务器错误
    Operation_Fields.OPRATE_CLOSE_MERGE = 7; //本服已经被合服
    Operation_Fields.OPRATE_CLOSE_TIMEOUT = 8; //超时
    Operation_Fields.OPRATE_CLOSE_FORCE_RELOGIN = 9; //允许强制重新登陆
    Operation_Fields.OPRATE_CLOSE_OTHER_ONLINE = 10; //其他在线中
    Operation_Fields.OPRATE_CLOSE_JOIN_MAP_FAIL = 11; //进入地图失败
    Operation_Fields.OPRATE_CLOSE_TELEPORT_NOT_DATA = 12; //传送找不到玩家或者找不到地图
    Operation_Fields.OPRATE_CLOSE_RESET_PLAYER_DATA = 13; //玩家被回档
    //操作错误类型
    Operation_Fields.OPRATE_MERGE = 12; //合服操作错误类型
    Operation_Fields.OPRATE_MERGE_MERGING = 1; //合服中
    //操作错误类型
    Operation_Fields.OPRATE_GAME_UPDATE = 13; //游戏更新操作错误类型
    Operation_Fields.OPRATE_GAME_UPDATE_SUCCESS = 1; //更新成功，需要刷新
    //操作错误类型
    Operation_Fields.OPRATE_EQUIP = 14; //装备相关操作错误类型
    Operation_Fields.OPRATE_EQUIP_STRENG_SUCCESS = 1; //强化成功
    Operation_Fields.OPRATE_EQUIP_JINGLIAN_SUCCESS = 2; //精炼成功
    Operation_Fields.OPRATE_EQUIP_CAILIAO_NOT_ENOUGH = 3; //材料不足
    Operation_Fields.OPRATE_EQUIP_EQUIPMENT_SUCCESS = 4; //操作成功
    Operation_Fields.OPRATE_EQUIP_INDEX_NIL = 5; //没有该位置
    Operation_Fields.OPRATE_EQUIP_EQUIP_NIL = 6; //没有该装备
    Operation_Fields.OPRATE_EQUIP_TEMP_NIL = 7; //找不到模板
    Operation_Fields.OPRATE_EQUIP_PLAYLV_LESS = 8; //玩家等级不够
    Operation_Fields.OPRATE_EQUIP_LV_MAX = 9; //等级达到上限
    Operation_Fields.OPRATE_EQUIP_BAOWU_EXP_LESS = 10; //消耗宝物经验不足
    Operation_Fields.OPRATE_EQUIP_BAOWU_EXP_ADD = 11; //经验增加
    //操作错误类型
    Operation_Fields.OPRATE_WUJIANG = 15; //武将相关操作错误类型
    Operation_Fields.OPRATE_WUJIANG_BUZHEN_SUCCESS = 1; //布阵成功
    Operation_Fields.OPRATE_WUJIANG_IS_BUZHEN = 2; //该武将已经上阵
    Operation_Fields.OPRATE_WUJIANG_UPGRADE_SUCCESS = 3; //升级成功
    Operation_Fields.OPRATE_WUJIANG_TUOP_SUCCESS = 4; //突破成功
    //操作错误类型
    Operation_Fields.OPRATE_JJC = 16; //竞技场相关操作错误类型
    Operation_Fields.OPRATE_JJC_TEMP_NIL = 1; //找不到模板
    Operation_Fields.OPRATE_JJC_RANK_LESS = 2; //玩家排名不符合条件
    Operation_Fields.OPRATE_JJC_LIMIT_MAX = 3; //达到道具购买上限
    Operation_Fields.OPRATE_JJC_SHENGWANG_LESS = 4; //达到道具购买上限
    Operation_Fields.OPRATE_JJC_JINGLI_LESS = 5; //精力不够
    Operation_Fields.OPRATE_JJC_SUCCESS = 6; //挑战成功
    Operation_Fields.OPRATE_JJC_BAG_LESS = 7; //背包空间不足
    Operation_Fields.OPRATE_JJC_BUY_SUCCESS = 8; //购买成功
    Operation_Fields.OPRATE_JJC_LV_LESS = 9; //等级不足
    Operation_Fields.OPRATE_JJC_DATA_WRONG = 10; //数据异常
    Operation_Fields.OPRATE_JJC_TIME_LOCK = 11; //该排名玩家正在被挑战
    //操作错误类型
    Operation_Fields.OPRATE_FUBEN = 17; //副本操作错误类型
    Operation_Fields.OPRATE_FUBEN_SUCCESS = 1; //挑战成功
    Operation_Fields.OPRATE_FUBEN_SAODANG_SUCCESS = 2; //扫荡挑战成功
    Operation_Fields.OPRATE_FUBEN_FAIL = 3; //挑战失败
    Operation_Fields.OPRATE_FUBEN_RC_SUCCESS = 4; //日常副本挑战成功
    Operation_Fields.OPRATE_FUBEN_RC_SAODANG_SUCCESS = 5; //日常副本扫荡挑战成功
    Operation_Fields.OPRATE_FUBEN_RC_FAIL = 6; //日常副本挑战失败
    Operation_Fields.OPRATE_FUBEN_AWARE_SUCCESS = 7; //领取成功
    Operation_Fields.OPRATE_FUBEN_RESET_SUCCESS = 8; //重置成功
    //操作错误类型
    Operation_Fields.OPRATE_TUJIAN = 18; //图鉴操作错误类型
    Operation_Fields.OPRATE_TUJIAN_AWARE_SUCCESS = 1; //领取成功
    Operation_Fields.OPRATE_TUJIAN_HAS_AWARE_FAIL = 2; //已领取过奖励
    Operation_Fields.OPRATE_TUJIAN_NO_WUJIANG_FAIL = 3; //没有足够的武将
    //操作错误类型
    Operation_Fields.OPRATE_DUOBAO = 19; //夺宝操作错误类型
    Operation_Fields.OPRATE_DUOBAO_SUCCESS = 1; //挑战成功
    Operation_Fields.OPRATE_DUOBAO_FAIL = 2; //挑战失败
    //操作错误类型
    Operation_Fields.OPRATE_HUISHOU = 20; //回收操作错误类型
    Operation_Fields.OPRATE_HUISHOU_NOT_RESOLVE_MIAN = 1; //主将不能分解
    Operation_Fields.OPRATE_HUISHOU_NOT_RESOLVE_SHANGZHEN = 2; //上阵武将不能分解
    Operation_Fields.OPRATE_HUISHOU_NOT_RESOLVE_EQUIP = 3; //已装备不能分解
    Operation_Fields.OPRATE_HUISHOU_TEMP_NIL = 4; //找不到模板
    Operation_Fields.OPRATE_HUISHOU_WUJIANG_NIL = 5; //该位置没有武将
    Operation_Fields.OPRATE_HUISHOU_EQUIP_NIL = 6; //该位置没有装备
    Operation_Fields.OPRATE_HUISHOU_BAOWU_NIL = 7; //该位置没有宝物
    //操作错误类型
    Operation_Fields.OPRATE_PEIYANG = 21; //回收操作错误类型
    Operation_Fields.OPRATE_PEIYANG_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_PEIYANG_PARMS_ERROR = 2; //参数错误
    Operation_Fields.OPRATE_PEIYANG_WUJIANG_NIL = 3; //该位置没有武将
    Operation_Fields.OPRATE_PEIYANG_TEMP_NIL = 4; //找不到模板
    Operation_Fields.OPRATE_PEIYANG_LEVEL_LESS = 5; //等级不够
    Operation_Fields.OPRATE_PEIYANG_ATTR_FULL = 6; //属性满了
    Operation_Fields.OPRATE_PEIYANG_CAILIAO_LESS = 7; //材料
    //操作错误类型
    Operation_Fields.OPRATE_PEIYANGAPPLY = 22; //培养操作错误类型
    Operation_Fields.OPRATE_PEIYANGAPPLY_SUCCESS = 1; //成功
    Operation_Fields.OPRATE_PEIYANGAPPLY_PARMS_ERROR = 2; //参数错误
    Operation_Fields.OPRATE_PEIYANGAPPLY_TEMP_NIL = 3; //找不到模板
    Operation_Fields.OPRATE_PEIYANGAPPLY_WUJIANG_NIL = 4; //该位置没有武将
    //操作错误类型
    Operation_Fields.OPRATE_GANG = 23; //家族操作错误类型
    Operation_Fields.OPRATE_GANG_LEVEL_ERROR = 1; //等级不足
    Operation_Fields.OPRATE_GANG_GOLD_NOT_ENOUGH = 2; //金钱不足
    Operation_Fields.OPRATE_GANG_CREATE_NAME_LEN_ERROR = 3; //名字长度
    Operation_Fields.OPRATE_GANG_CREATE_NAME_REPEAT = 4; //名字重复
    Operation_Fields.OPRATE_GANG_NAME_ERROR = 5; //名字内屏蔽词
    Operation_Fields.OPRATE_GANG_CREATE_SUCCESS = 6; //帮派创建成功
    Operation_Fields.OPRATE_GANG_HAS_GANG = 7; //已有帮派
    Operation_Fields.OPRATE_GANG_JOIN_CD = 8; //加入CD
    Operation_Fields.OPRATE_GANG_NIL = 9; //帮派不存在
    Operation_Fields.OPRATE_GANG_FORCE_ERROR = 10; //战斗力不足
    Operation_Fields.OPRATE_GANG_GANG_FULL = 11; //帮派已满
    Operation_Fields.OPRATE_GANG_EXIT_GANG_HUIZHANG = 12; //帮主·别瞎搞
    Operation_Fields.OPRATE_GANG_EXIT_SUCCESS = 13; //退出成功
    Operation_Fields.OPRATE_GANG_NOT_MASTER = 14; //没有权限
    Operation_Fields.OPRATE_GANG_NOTICE_TOO_LONG = 15; //公告太长
    Operation_Fields.OPRATE_GANG_NOTICE_ERROR = 16; //公告内容有屏蔽词
    Operation_Fields.OPRATE_GANG_EDIT_NOTICE_SUCCESS = 17; //编辑成功
    Operation_Fields.OPRATE_GANG_PARMS_ERROR = 18; //数据异常
    Operation_Fields.OPRATE_GANG_EDIT_ZHIWEI_SAME = 19; //职位相同
    Operation_Fields.OPRATE_GANG_EDIT_NOT_GANG_HUIZHANG = 20; //不是帮主
    Operation_Fields.OPRATE_GANG_NO_PLAYER = 21; //没有玩家
    Operation_Fields.OPRATE_GANG_EDIT_ZHIWEI_LOW = 22; //职位太低
    Operation_Fields.OPRATE_GANG_EDIT_ZHIWEI_FULL = 23; //职位已满
    Operation_Fields.OPRATE_GANG_EDIT_ZHI_WEI_SUCCESS = 24; //任命成功
    Operation_Fields.OPRATE_GANG_VIP_LEVEL = 25; //vip等级不足
    Operation_Fields.OPRATE_GANG_MONEY_LOW = 26; //货币不足
    Operation_Fields.OPRATE_GANG_DONATE_SUCCESS = 27; //捐献成功
    Operation_Fields.OPRATE_GANG_NOT_JUANXIAN = 28; //没有捐献
    Operation_Fields.OPRATE_GANG_IS_TO_DAY_JOIN = 29; //入帮当天不能操作
    Operation_Fields.OPRATE_GANG_GANG_LEVEL_ERROR = 30; //家族等级不足
    Operation_Fields.OPRATE_GANG_BUY_COUNT_LOW = 31; //购买次数不足
    Operation_Fields.OPRATE_GANG_GONGXIAN_LOW = 32; //贡献不足
    Operation_Fields.OPRATE_GANG_INDEX_ITEM_NIL = 33; //没有商品
    Operation_Fields.OPRATE_GANG_TEMP_NIL = 34; //未找到表数据
    Operation_Fields.OPRATE_GANG_JUNTUAN_DIE = 35; //军团已死亡
    Operation_Fields.OPRATE_GANG_TIAOZHAO_COUNT = 36; //挑战次数不足
    Operation_Fields.OPRATE_GANG_TIME_ERROR = 37; //不在活动时间内
    Operation_Fields.OPRATE_GANG_FUBEN_ERROR = 38; //副本错误
    Operation_Fields.OPRATE_GANG_TIMES_LOW = 39; //次数不足
    Operation_Fields.OPRATE_GANG_CHAPTER_ERROR = 40; //章节未通关
    Operation_Fields.OPRATE_GANG_NOT_BONUS = 41; //奖励已被瓜分完
    Operation_Fields.OPRATE_GANG_YILINGQU = 42; //已领取
    return Operation_Fields;
}());
//# sourceMappingURL=operation_fields.js.map