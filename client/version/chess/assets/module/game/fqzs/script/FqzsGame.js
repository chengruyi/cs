var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    properties: {

        chipIn:30,

        timerTwo:{
            default: null,
            type: cc.Node
        },
        timerOne:{
            default: null,
            type: cc.Node
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        player: {
            default: null,
            type: cc.Node
        },
        xz: {
            default: null,
            type: cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {
        let self = this ;
        cc.beimi.sroce =new Map();
        cc.beimi.socket.emit("joinFqzs","");
        cc.beimi.socket.on('joinFqzs', function (data) {
            self.chipIn=data.time;
            var two=Math.floor(data.time/10);
            var one=data.time%10;
            self.timerTwo.getComponent(cc.Sprite).spriteFrame = self.atlas.getSpriteFrame("倒计时-"+two);
            self.timerOne.getComponent(cc.Sprite).spriteFrame = self.atlas.getSpriteFrame("倒计时-"+one);
            if(self.chipIn==3){
                if(cc.beimi.openwin){
                    var  sroceBind=cc.beimi.openwin.getComponent("SroceBind");
                    sroceBind.setIsReady();
                }
                var data=new Array();
                for (var item of cc.beimi.sroce.entries()) {
                    var key=item[0];
                    var value=item[1]
                    data.push({key:key,value:value});
                }
                var param = {
                    token:cc.beimi.authorization,
                    orgi:cc.beimi.user.orgi,
                    data:data
                } ;
                cc.beimi.socket.emit("joinFqzs" , JSON.stringify(param));
            }
            if(data.status==2){
                var playerModel = self.player.getComponent("Player");
                playerModel.run();
            }
        });
       
    },

    onXzClick:function(){
        cc.beimi.openwin = cc.instantiate(this.xz);
        if(this.chipIn==0){
            var  sroceBind=cc.beimi.openwin.getComponent("SroceBind");
            sroceBind.setIsReady();
        }
        cc.beimi.openwin.parent = this.root();
    },




});
