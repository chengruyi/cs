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
        cc.beimi.sroce = new Map();
        this.timer();
    },

    timer:function(){
        this.schedule(function() {
            if(this.chipIn>=0){
                this.chipIn--;
                var two=Math.floor(this.chipIn/10);
                var one=this.chipIn%10;
                //console.log("timer:"+two+one);
                this.timerTwo.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-"+two);
                this.timerOne.getComponent(cc.Sprite).spriteFrame = this.atlas.getSpriteFrame("倒计时-"+one);
                if(this.chipIn==0){
                    console.log(cc.beimi.openwin);
                    var  sroceBind=cc.beimi.openwin.getComponent("SroceBind");
                    sroceBind.setIsReady();
                    cc.beimi.socket.emit("pushScore" , JSON.stringify(cc.beimi.sroce));
                    var playerModel = this.player.getComponent("Player");
                    playerModel.run();
                }
            }
        }, 1);
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
