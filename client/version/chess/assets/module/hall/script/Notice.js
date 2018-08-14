cc.Class({

    extends: cc.Component,

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

        isRight:true,

        min:8,
        
    },
    
    // LIFE-CYCLE CALLBACKS:
    
     onLoad() {
        this.rollNotice();
     },
      
     rollNotice:function(){
        var self = this;
        var action;
        if(this.isRight){
             action=cc.moveTo(this.min, cc.v2(-self.label.width-20, 0));
             this.min=16;
             //this.label.getComponent(cc.Label).string=this.sortString(this.label.getComponent(cc.Label).string);
             this.isRight=false;
        }else{
             action=cc.moveTo(this.min, cc.v2(self.label.width+20, 0));
             this.isRight=true;
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
    
});

