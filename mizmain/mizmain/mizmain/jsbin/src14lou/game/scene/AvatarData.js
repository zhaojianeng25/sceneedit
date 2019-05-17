/**
* name
*/
var game;
(function (game) {
    var scene;
    (function (scene) {
        var AvatarData = /** @class */ (function () {
            function AvatarData() {
            }
            AvatarData.getImageData = function (direct) {
                return AvatarData.IMAGE_TABLE[direct];
            };
            /**
             * 获得角色
             */
            AvatarData.getRace = function (occ, sex) {
                var key = (occ << 4) + (sex & 0x0F);
                return AvatarData.RACE_TABLE[key];
            };
            AvatarData.setRace = function (occ, sex, value) {
                var key = (occ << 4) + (sex & 0x0F);
                AvatarData.RACE_TABLE[key] = value;
            };
            /**
             * 通过动作状态得到动作素材
             * @param actionStatus 动作状态，请参见SharedDef里的枚举Action_STATE_X
             * @return
             *
             */
            AvatarData.ConvertAction = function (actionStatus, isRiding) {
                if (isRiding === void 0) { isRiding = false; }
                return isRiding ? AvatarData.RIDING_ACTION[actionStatus] : AvatarData.SINGLE_ACTION[actionStatus];
            };
            /**
             * 通过动作状态得到层级排序
             * @param actionStatus 动作状态，请参见SharedDef里的枚举Action_STATE_X
             * @return
             *
             */
            AvatarData.ConvertActionSort = function (actionStatus, isRiding) {
                if (isRiding === void 0) { isRiding = false; }
                return isRiding ? AvatarData.RIDING_ACTION_SORT[actionStatus] : AvatarData.SINGLE_ACTION[actionStatus];
            };
            /**
             * 获得帧信息的起始地址
             * @param race 角色id
             * @param action 动作id
             * @return
             *
             */
            AvatarData.GetFrameInfoPos = function (race, action) {
                return (race << 8) + (action << 3);
            };
            /**
             * 获取帧数据
             * @param pos 地址
             * @return
             *
             */
            AvatarData.GetFrameInfo = function (pos) {
                return AvatarData._frameInfo[pos];
            };
            /**
             * 获得排序起始位置
             * @param race 角色
             * @param action 动作
             * @param direct 方向
             * @param frameIndex 帧索引位置
             * @return
             *
             */
            AvatarData.getSortStartPos = function (race, action, direct, frameIndex) {
                return (race << 16)
                    + (action << 11)
                    + (direct << 8)
                    + (frameIndex << 4);
            };
            /**
             * 获得
             * @param pos
             * @return
             *
             */
            AvatarData.Get = function (pos) {
                return AvatarData._sorts[pos];
            };
            /**
             * 设置排序
             * @param race 角色
             * @param action 动作
             * @param direct 方向
             * @param frameIndex 帧索引位置
             * @param sortIndex 排序索引位置
             * @param itemValue 装备值
             *
             */
            AvatarData.setSort = function (race, action, direct, frameIndex, sortIndex, itemValue) {
                //先获得一维数组的位置
                var pos = AvatarData.getSortStartPos(race, action, direct, frameIndex) + sortIndex;
                AvatarData._sorts[pos] = itemValue;
            };
            AvatarData.init = function (data) {
                this.IMAGE_TABLE = new Array(Direct.MAX_DIRECT);
                //////////////////////// 镜像数据 ///////////////////////////////
                AvatarData.IMAGE_TABLE[Direct.UP] = [Direct.UP, false];
                AvatarData.IMAGE_TABLE[Direct.UPPER_RIGHT] = [Direct.UPPER_RIGHT, false];
                AvatarData.IMAGE_TABLE[Direct.RIGHT] = [Direct.RIGHT, false];
                AvatarData.IMAGE_TABLE[Direct.BOTTOM_RIGHT] = [Direct.BOTTOM_RIGHT, false];
                AvatarData.IMAGE_TABLE[Direct.BOTTOM] = [Direct.BOTTOM, false];
                //镜像
                AvatarData.IMAGE_TABLE[Direct.UPPER_LEFT] = [Direct.UPPER_RIGHT, true];
                AvatarData.IMAGE_TABLE[Direct.LEFT] = [Direct.RIGHT, true];
                AvatarData.IMAGE_TABLE[Direct.BOTTOM_LEFT] = [Direct.BOTTOM_RIGHT, true];
                AvatarData.RES_PACKET[AvatarData.ACTION_STAND] = AvatarData.RES_PACKET_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_RUNNING] = AvatarData.RES_PACKET_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_JUMPPING] = AvatarData.RES_PACKET_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_LEISURE] = AvatarData.RES_PACKET_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKREADY] = AvatarData.RES_PACKET_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO] = AvatarData.RES_PACKET_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO2] = AvatarData.RES_PACKET_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO3] = AvatarData.RES_PACKET_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_BEATEN] = AvatarData.RES_PACKET_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_STAND_RIDE] = AvatarData.RES_PACKET_RIDE_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_RUNNING_RIDE] = AvatarData.RES_PACKET_RIDE_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_JUMPPING_RIDE] = AvatarData.RES_PACKET_RIDE_MOVE;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKREADY_RIDE] = AvatarData.RES_PACKET_RIDE_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO_RIDE] = AvatarData.RES_PACKET_RIDE_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO2_RIDE] = AvatarData.RES_PACKET_RIDE_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO3_RIDE] = AvatarData.RES_PACKET_RIDE_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_BEATEN_RIDE] = AvatarData.RES_PACKET_RIDE_FIGHT;
                AvatarData.RES_PACKET[AvatarData.ACTION_DIING] = AvatarData.RES_PACKET_OTHER;
                AvatarData.RES_PACKET[AvatarData.ACTION_WALK] = AvatarData.RES_PACKET_OTHER;
                AvatarData.RES_PACKET[AvatarData.ACTION_SIT] = AvatarData.RES_PACKET_OTHER;
                AvatarData.RES_PACKET[AvatarData.ACTION_GATHER] = AvatarData.RES_PACKET_OTHER;
                ////////////////////////////////// 角色定义 //////////////////////////////////////////////
                AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_NONE, 0); //战士未定义性别
                AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_MAN, 1); //战士男
                AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_WOMAN, 2); //战士女
                AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_GAY, 0); //战士无
                AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_NONE, 0); //法师未定义性别
                AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_MAN, 3); //法师男
                AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_WOMAN, 4); //法师女
                AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_GAY, 0); //法师无
                AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_NONE, 0); //道士无未定义性别
                AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_MAN, 5); //道士男
                AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_WOMAN, 6); //道士女
                AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_GAY, 0); //道士无
                ///////////////////////////////////////////////////////////////////////////////////////////
                /*普通状态下的动作表*/
                AvatarData.SINGLE_ACTION[AvatarData.STATE_STAND] = AvatarData.ACTION_STAND;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_RUNNING] = AvatarData.ACTION_RUNNING;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_JUMP] = AvatarData.ACTION_JUMPPING;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTACKGO] = AvatarData.ACTION_ATTACKGO;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTCKREADY] = AvatarData.ACTION_ATTACKREADY;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_MACSAVING] = AvatarData.ACTION_ATTACKREADY;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_MACGO] = AvatarData.ACTION_ATTACKGO;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_CRITICALHIT] = AvatarData.ACTION_ATTACKGO;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_DEFENSE] = AvatarData.ACTION_ATTACKGO3;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_DIING] = AvatarData.ACTION_DIING;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_DIED] = AvatarData.ACTION_DIING;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_BEATEN] = AvatarData.ACTION_BEATEN;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_WALK] = AvatarData.ACTION_WALK;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_LEISURE] = AvatarData.ACTION_LEISURE;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_GECAO] = AvatarData.ACTION_ATTACKGO;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_GECAO_2] = AvatarData.ACTION_ATTACKGO;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTACKGO2] = AvatarData.ACTION_ATTACKGO2;
                AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTACKGO3] = AvatarData.ACTION_ATTACKGO3;
                /*骑马状态下的动作表*/
                AvatarData.RIDING_ACTION[AvatarData.STATE_STAND] = AvatarData.ACTION_STAND_RIDE;
                AvatarData.RIDING_ACTION[AvatarData.STATE_RUNNING] = AvatarData.ACTION_STAND_RIDE;
                AvatarData.RIDING_ACTION[AvatarData.STATE_JUMP] = AvatarData.ACTION_JUMPPING;
                AvatarData.RIDING_ACTION[AvatarData.STATE_ATTACKGO] = AvatarData.ACTION_ATTACKGO;
                AvatarData.RIDING_ACTION[AvatarData.STATE_ATTCKREADY] = AvatarData.ACTION_ATTACKREADY;
                AvatarData.RIDING_ACTION[AvatarData.STATE_MACSAVING] = AvatarData.ACTION_ATTACKREADY;
                AvatarData.RIDING_ACTION[AvatarData.STATE_MACGO] = AvatarData.ACTION_ATTACKGO;
                AvatarData.RIDING_ACTION[AvatarData.STATE_CRITICALHIT] = AvatarData.ACTION_ATTACKGO;
                AvatarData.RIDING_ACTION[AvatarData.STATE_DEFENSE] = AvatarData.ACTION_ATTACKGO3;
                AvatarData.RIDING_ACTION[AvatarData.STATE_DIING] = AvatarData.ACTION_DIING;
                AvatarData.RIDING_ACTION[AvatarData.STATE_DIED] = AvatarData.ACTION_DIING;
                AvatarData.RIDING_ACTION[AvatarData.STATE_BEATEN] = AvatarData.ACTION_BEATEN;
                AvatarData.RIDING_ACTION[AvatarData.STATE_WALK] = AvatarData.ACTION_WALK;
                AvatarData.RIDING_ACTION[AvatarData.STATE_LEISURE] = AvatarData.ACTION_LEISURE;
                AvatarData.RIDING_ACTION[AvatarData.STATE_GECAO] = AvatarData.ACTION_ATTACKGO3;
                AvatarData.RIDING_ACTION[AvatarData.STATE_GECAO_2] = AvatarData.ACTION_ATTACKGO2;
                /*骑马态下的层级排序表*/
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_STAND] = AvatarData.ACTION_STAND_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_RUNNING] = AvatarData.ACTION_RUNNING_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_JUMP] = AvatarData.ACTION_JUMPPING;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_ATTACKGO] = AvatarData.ACTION_ATTACKGO_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_ATTCKREADY] = AvatarData.ACTION_ATTACKGO_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_MACSAVING] = AvatarData.ACTION_ATTACKREADY;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_MACGO] = AvatarData.ACTION_ATTACKGO_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_CRITICALHIT] = AvatarData.ACTION_ATTACKGO_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_DEFENSE] = AvatarData.ACTION_ATTACKGO3;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_DIING] = AvatarData.ACTION_DIING;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_DIED] = AvatarData.ACTION_DIING;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_BEATEN] = AvatarData.ACTION_BEATEN_RIDE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_WALK] = AvatarData.ACTION_WALK;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_LEISURE] = AvatarData.ACTION_LEISURE;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_GECAO] = AvatarData.ACTION_ATTACKGO3;
                AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_GECAO_2] = AvatarData.ACTION_ATTACKGO2;
                if (!data)
                    return;
                /*解压*/
                //data.inflate();
                /*上次读取的针数*/
                var prev_f;
                /*角色id,动作id,方向id,针id*/
                var r_id, a_id, d_id, f_id, p_id;
                /*角色个数,动作个数,方向个数,针数, 贴图数*/
                var r_len, a_len, d_len, f_len, p_len;
                r_len = data.readShort();
                var i, j, k, l, m;
                for (i = 0; i < r_len; i++) {
                    //todo:小张这边的角色id没有按照SharedDef的来，要改掉
                    r_id = data.readShort() + 1; //角色
                    a_len = data.readShort(); //动作长度
                    for (j = 0; j < a_len; j++) {
                        a_id = data.readShort(); //动作
                        /*读取针数针率*/
                        var fiPos = AvatarData.GetFrameInfoPos(r_id, a_id);
                        AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_EXITS] = 1; //定义是否存在
                        AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_COUNT] = data.readShort(); //总帧数
                        AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_RATE] = data.readShort(); //帧率
                        AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_LOOP] = data.readShort(); //循环
                        AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_MOVESPEED] = data.readShort(); //像素
                        d_len = data.readShort(); //方向长度
                        for (k = 0; k < d_len; k++) {
                            d_id = data.readShort(); //方向
                            d_id = Direct.GetDirect2(d_id); //转下方向
                            f_len = data.readShort(); //帧长度
                            /*重置前一针*/
                            prev_f = 0;
                            for (l = 0; l < f_len; l++) {
                                f_id = data.readShort(); //帧
                                p_len = data.readShort(); //装备长度
                                /*补针*/
                                if (p_len == 0) { //不是关键帧
                                    AvatarData.fillNeedle(r_id, a_id, d_id, prev_f, f_id);
                                }
                                else {
                                    //按顺序设置装备值
                                    for (m = 0; m < p_len; m++) {
                                        p_id = data.readShort(); //装备
                                        if (p_id == 11)
                                            p_id = 9; //工具翅膀的枚举 要换成9 暂时处理  工具要改 todo by小张
                                        AvatarData.setSort(r_id, a_id, d_id, f_id, m, p_id);
                                    }
                                    //接下去继续循环，补上-1
                                    for (; m < AvatarData.MAX_ITEMS; m++) {
                                        AvatarData.setSort(r_id, a_id, d_id, f_id, m, -1);
                                        break;
                                    }
                                    prev_f = f_id;
                                }
                                //主手、副手变形
                                data.readUTF();
                                data.readUTF();
                                //主手变形
                                //							_table[r_id][a_id][d_id][f_id].matrixMain = stringToMatrix(data.readUTF());
                                //副手
                                //							_table[r_id][a_id][d_id][f_id].matrixVice = stringToMatrix(data.readUTF());
                            }
                        }
                    }
                }
                data.clear();
            };
            /*补针*/
            AvatarData.fillNeedle = function (race, action, direct, prev_f, cur_f) {
                //上一帧的位置
                var prevPos = AvatarData.getSortStartPos(race, action, direct, prev_f);
                //当前帧的位置
                var curPos = AvatarData.getSortStartPos(race, action, direct, cur_f);
                //从上一帧的所有排序拷贝到当前帧里
                for (var i = 0; i < AvatarData.MAX_ITEMS; i++) {
                    AvatarData._sorts[curPos + i] = AvatarData._sorts[prevPos + i];
                }
            };
            /**
             * 将变形字符串值转换成matrix
             * @param value
             * @return
             *
             */
            AvatarData.stringToMatrix = function (value) {
                //把括号去掉
                value = value.replace("(", "").replace(")", "");
                //把abcdtxty去掉
                value = value.replace("a=", "").replace("b=", "").replace("c=", "").replace("d=", "").replace("tx=", "").replace("ty=", "");
                var arr = value.split(',');
                return new Matrix(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]);
            };
            /**
             * 根据攻击类型 选择攻击动作
             * @param atype
             */
            AvatarData.getAttackActionByType = function (atype) {
                if (atype == 2) {
                    return AvatarData.STATE_ATTACKGO2;
                }
                else if (atype == 3) {
                    return AvatarData.STATE_ATTACKGO3;
                }
                return AvatarData.STATE_ATTACKGO;
            };
            /******************************************************************************* */
            //性别
            AvatarData.SEX_NONE = 0; //预留
            AvatarData.SEX_MAN = 1; //男
            AvatarData.SEX_WOMAN = 2; //女
            AvatarData.SEX_GAY = 3; //无
            //职业
            AvatarData.OCC_NONE = 0; //预留
            AvatarData.OCC_FIRE_MAN = 1; //战士
            AvatarData.OCC_EGG_MAN = 2; //法师
            AvatarData.OCC_DOG_MAN = 3; //道士
            //数据结构[occ<<4 + (sex&0x0F)]
            AvatarData.RACE_TABLE = new Array();
            /***********************************************************************************/
            /***********************************************************************************/
            //动作状态
            /***********************************************************************************/
            //  [1] : AvatarData.STATE_STAND,
            // [5] : AvatarData.STATE_RUNNING,//"run",
            // [7] : AvatarData.STATE_BEATEN,//"attacked",
            // [8] : AvatarData.STATE_ATTACKGO,//"attack",
            // [9] : AvatarData.STATE_ATTACKGO2,//"magic",
            // [11] : AvatarData.STATE_DEFENSE,//"defend",
            // [14] : AvatarData.STATE_DIED,//"death",
            AvatarData.STATE_STAND = 0x1; //站立
            AvatarData.STATE_WALK = 0x2; //走动
            AvatarData.STATE_RUNNING = 0x3; //跑动
            AvatarData.STATE_LEISURE = 0x4; //休闲
            AvatarData.STATE_GECAO = 0x5; //打坐
            AvatarData.STATE_BEATEN = 0x6; //受击被打
            AvatarData.STATE_DIING = 0x7; //死亡中
            AvatarData.STATE_DIING1 = 0x8; //死亡中
            AvatarData.STATE_DIED = 0x9; //已死亡
            AvatarData.STATE_JUMP = 0xA; //跳开始
            AvatarData.STATE_RETREAT = 0xB; //后撤
            AvatarData.STATE_DEFENSE = 0xC; //防御
            AvatarData.STATE_ENTER = 0xD; //入场
            AvatarData.STATE_SPRINT = 0xE; //冲刺
            AvatarData.STATE_ATTACKGO = 0xF; //物理攻击
            AvatarData.STATE_ATTACKGO2 = 0x10; //物理攻击2
            AvatarData.STATE_ATTACKGO3 = 0x11; //物理攻击3
            AvatarData.STATE_ATTCKREADY = 0x12; //物理攻击准备
            AvatarData.STATE_MACSAVING = 0x13; //魔法攻击蓄力
            AvatarData.STATE_MACGO = 0x14; //魔法攻击发出
            AvatarData.STATE_CRITICALHIT = 0x15; //暴击发出
            AvatarData.STATE_GECAO_2 = 0x16; //(割草测试-非移动)
            AvatarData.MAX_STATE = 0x17; //动作长度
            /**
             * 由于为了节省素材资源，采用5方向，其中3个方向可以用左边的水平翻转来完成，故：方向只有5个。
             */
            AvatarData.MAX_DIRECT = 5; //方向数量		
            AvatarData.ACTION_STAND = 0x0; //站立 
            AvatarData.ACTION_RUNNING = 0x1; //跑动
            AvatarData.ACTION_JUMPPING = 0x2; //跳
            AvatarData.ACTION_ATTACKREADY = 0x3; //攻击准备
            AvatarData.ACTION_ATTACKGO = 0x3; //攻击 
            AvatarData.ACTION_ATTACKGO2 = 0x4; //攻击2 
            AvatarData.ACTION_ATTACKGO3 = 0x5; //攻击3 (现在整成防御动作)
            AvatarData.ACTION_BEATEN = 0x7; //被打
            AvatarData.ACTION_STAND_RIDE = 0x8; //站立—骑马
            AvatarData.ACTION_RUNNING_RIDE = 0x9; //跑动-骑马
            AvatarData.ACTION_JUMPPING_RIDE = 0xA; //跳-骑马
            AvatarData.ACTION_ATTACKREADY_RIDE = 0xB; //攻击准备-骑马
            AvatarData.ACTION_ATTACKGO_RIDE = 0xC; //攻击-骑马
            AvatarData.ACTION_ATTACKGO2_RIDE = 0xD; //攻击2-骑马
            AvatarData.ACTION_ATTACKGO3_RIDE = 0xE; //攻击3-骑马
            AvatarData.ACTION_BEATEN_RIDE = 0xF; //被打-骑马
            AvatarData.ACTION_DIING = 0x10; //死亡中
            AvatarData.ACTION_WALK = 0x11; //步行
            AvatarData.ACTION_LEISURE = 0x12; //休闲
            AvatarData.ACTION_SIT = 0x13; //打坐
            AvatarData.ACTION_GATHER = 0x14; //采集
            AvatarData.MAX_ACTION = 0x15; //动作长度
            /////////////////////// 关于资源分包的问题 ////////////////////////////////
            AvatarData.RES_PACKET = new Array(AvatarData.MAX_ACTION);
            AvatarData.MAX_RES_PACKET = 5;
            //1、索引文件——body.idx		
            //2、非坐骑移动状态文件『站立、跑动、跳、休闲』-> 0
            //3、非坐骑战斗状态文件『攻击准备、攻击、攻击2、攻击3、被打』-> 1
            //4、坐骑移动状态文件  『坐骑站立，坐骑跑动，坐骑跳』-> 2
            //5、坐骑战斗状态文件  『坐骑攻击准备，坐骑攻击、坐骑攻击2、坐骑攻击3、坐骑被打』 -> 3
            //6、特殊动作状态文件	  『死亡中、步行、打坐、采集』(NPC刚好没有死亡动作，普通角色刚好没有休闲动作)	-> 4
            AvatarData.RES_PACKET_FIGHT = 1;
            AvatarData.RES_PACKET_MOVE = 0;
            ///////////////////////////// 针数针率表 ////////////////////////////
            /*
                名称：角色5 动作21 参数
                位：  111   11111  111
                最大：7     31     7
                偏移：<<8   <<3     +
                与操：&0x07 &0x1F  &0x07
                2,047长度
            */
            AvatarData.FRAMEINFO_COUNT = 0; //帧长
            AvatarData.FRAMEINFO_RATE = 1; //帧速
            AvatarData.FRAMEINFO_LOOP = 2; //是否循环播放
            AvatarData.FRAMEINFO_MOVESPEED = 3; //原始动画对应的原始移动速度
            AvatarData.FRAMEINFO_RESERVE1 = 4; //预留参数1
            AvatarData.FRAMEINFO_RESERVE2 = 5; //预留参数2
            AvatarData.FRAMEINFO_EXITS = 6; //是否存在
            AvatarData.MAX_FRAMEINFO = 7; //属性长度
            AvatarData._frameInfo = new Array(2047);
            AvatarData.RES_PACKET_RIDE_MOVE = 2;
            AvatarData.RES_PACKET_RIDE_FIGHT = 3;
            AvatarData.RES_PACKET_OTHER = 4;
            AvatarData.SINGLE_ACTION = new Array(AvatarData.MAX_STATE);
            /*骑马状态下的动作表*/
            AvatarData.RIDING_ACTION = new Array(AvatarData.MAX_STATE);
            /*骑马状态下的层级排序表*/
            AvatarData.RIDING_ACTION_SORT = new Array(AvatarData.MAX_STATE);
            //////////////////////////// 排序相关 //////////////////////////////////////////
            //////////////////////////// 排序相关 //////////////////////////////////////////
            AvatarData.IDX_RIDE = 0; //坐骑
            AvatarData.IDX_MAINHAND = 1; //主手手掌
            AvatarData.IDX_VICEHAND = 2; //副手手掌
            AvatarData.IDX_HAIR = 3; //发型
            AvatarData.IDX_MAINARMS = 4; //主手武器
            AvatarData.IDX_VICEARMS = 5; //副手武器
            AvatarData.IDX_CLOTHES = 6; //衣服	
            AvatarData.IDX_CLOAK = 7; //披风
            AvatarData.IDX_RIDEHAIR = 8; //坐骑头
            AvatarData.IDX_WINGS = 9; //翅膀
            AvatarData.IDX_UNKNOW = 10; //预留
            AvatarData.MAX_ITEMS = 11;
            /*支持的最大帧数*/
            AvatarData.MAX_FRAME = 10;
            /*
            名称     	英文   	   编号
            坐骑		ride		0
            主手手掌 	mainHand  	1
            副手手掌 	viceHand  	2
            发型	 	hair    	3
            主手武器 	mainArms    4
            副手武器 	viceArms    5
            衣服	 	clothes     6
            披风	 	cloak       7
            
            排序表 = 排序总表[角色][动作][朝向][帧索引]
            排序表结构 - 举例
            Array<uint>[0] = IDX_RIDE;
            Array<uint>[1] = IDX_CLOTHES;
            Array<uint>[2] = IDX_VICEARMS;
            ....
            
            名称：角色5 动作21 方向5 帧数10 装备9
            位：  111   11111  111   1111   1111
            最大：7     31     7     15	    15
            偏移：<<16  <<11   <<8   <<4    +
            与操：&0x07 &0x1F  &0x07 &0x0F  0x0F
            524287长度
            */
            /*排序一维信息表*/
            AvatarData._sorts = new Array(524287);
            return AvatarData;
        }());
        scene.AvatarData = AvatarData;
    })(scene = game.scene || (game.scene = {}));
})(game || (game = {}));
//# sourceMappingURL=AvatarData.js.map