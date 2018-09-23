var beiMiCommon = require("BeiMiCommon");
cc.Class({

    extends: beiMiCommon,

    properties: {
        mask: {
            default: null,
            type: cc.Node,
            displayName: '遮罩'
        },
    
        label: {
            default: null,
            type: cc.Node,
            displayName: '文本'
        },

        username: {
            default: null,
            type: cc.Label
        },
        goldcoins: {
            default: null,
            type: cc.Label
        },
        cards: {
            default: null,
            type: cc.Label
        },

        isRight:true,

        min:8,
        
    },
    
    // LIFE-CYCLE CALLBACKS:
    
     onLoad() {
        this.rollNotice();
        let self = this ;
        if(this.ready()){
            
            
            this.pva_format(cc.beimi.user.username,cc.beimi.user.goldcoins , cc.beimi.user.cards , self);
            this.pvalistener(self , function (context) {
                context.pva_format(cc.beimi.user.username,cc.beimi.user.goldcoins , cc.beimi.user.cards , context) ;
            });
        }
     },
      
     rollNotice:function(){
        var self = this;
        var action;
        if (self.label.width <= self.mask.width) {
            if(this.isRight){
                action=cc.moveTo(this.min, cc.v2(-self.mask.width-20, 0));
                this.min=16;
                //this.label.getComponent(cc.Label).string=this.sortString(this.label.getComponent(cc.Label).string);
                this.isRight=false;
            }else{
                action=cc.moveTo(this.min, cc.v2(self.mask.width+20, 0));
                this.isRight=true;
            }
        }else{
            if(this.isRight){
                action=cc.moveTo(this.min, cc.v2(-self.label.width-20, 0));
                this.min=16;
                //this.label.getComponent(cc.Label).string=this.sortString(this.label.getComponent(cc.Label).string);
                this.isRight=false;
            }else{
                action=cc.moveTo(this.min, cc.v2(self.label.width+20, 0));
                this.isRight=true;
            }
        }
        self.label.runAction(cc.sequence(
            action,
            cc.callFunc(function() {
                return self.rollNotice()
            })
        ));
      },
    
      sortString:function(str){
            var newStr = '', i = str.length;
            for(; i >= 0; i--) {
                newStr += str.charAt(i);
            }
            console.log(newStr);
            return newStr;
      },
      
      pva_format:function(username,coins, cards , object){
        if(coins > 9999){
            var num = coins / 10000  ;
            object.goldcoins.string = num.toFixed(2) + '万';
        }else{
            object.goldcoins.string = coins;
        }
        //console.log(username);
        if(username.length>10){
            username=username.substring(0,10);
        }
        this.username.string=username;
        object.cards.string = cards + "张" ;
    },
    
});

