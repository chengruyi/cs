cc.Class({
    extends: cc.Component,

    properties: {
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,

        isUpdate:false,

        isDown:false,

        accLeft:false,

        accRight:false,

        isStart:false,
        
    },

    // use this for initialization
    onLoad: function () {
        // 主角当前水平方向速度
        this.xSpeed = 0;
        // X 轴最大值和最小值
        this.maxPosX= this.node.parent.width/2-this.node.width/2;
        this.minPosX = -this.node.parent.width/2+this.node.width/2;

        // Y 轴最大值和最小值
        this.maxPosY= this.node.parent.height/2-this.node.height/2;
        this.minPosY = -this.node.parent.height/2+this.node.height/2;
    },

    run: function(){
        this.isStart=true;
    },

    // called every frame
    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        if(this.isStart){
            this.moveDirection(this.node.x,this.node.y);
        
            //console.log("isUpdate:"+this.isUpdate+" isDown:"+this.isDown+" accLeft:"+ this.accLeft+" accRight:"+this.accRight+" x:"+this.node.x+" y:"+this.node.y+" xspeed:"+this.xSpeed);
            if(this.isUpdate){
                this.xSpeed += this.accel * dt;
            }else if(this.isDown){
                this.xSpeed -= this.accel * dt;
            }else if(this.accLeft){
                this.xSpeed = -this.accel * dt-Math.abs(this.xSpeed);
            }else if(this.accRight){
                this.xSpeed=Math.abs(this.xSpeed);
                this.xSpeed += Math.abs(this.xSpeed)+this.accel * dt;
            }

            // 限制主角的速度不能超过最大值
            if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
                // if speed reach limit, use max speed with current direction
                this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
            }
            // 根据当前速度更新主角的位置
            if(this.isUpdate||this.isDown){
                this.node.y += this.xSpeed;
            }
            if(this.accLeft||this.accRight){
                this.node.x += this.xSpeed;
            }
        
            // limit player position inside screen
            if (this.accRight&&this.node.x>=this.maxPosX) {
                this.node.x = this.maxPosX;
            } else if (this.accLeft&&this.node.x<=this.minPosX) {
                this.node.x = this.minPosX;
            }else if(this.isUpdate&&this.node.y>=this.maxPosY){
                this.node.y = this.maxPosY;
            }else if(this.isDown&&this.node.y<=this.minPosY){
                this.node.y = this.minPosY;
            }
        }
    },

    moveDirection:function(x,y){
        if(x>=this.maxPosX&&y<=this.minPosY){
            this.isUpdate=true;
            this.isDown=false;
            this.accLeft=false;
            this.accRight=false;
        }else if(x>=this.maxPosX&&y>=this.maxPosY){
            this.isUpdate=false;
            this.isDown=false;
            this.accLeft=true;
            this.accRight=false;
        }else if(x<=this.minPosX&&y>=this.maxPosY){
            this.isUpdate=false;
            this.isDown=true;
            this.accLeft=false;
            this.accRight=false;
        }else if( x<=this.minPosX&&y<=this.minPosY){
            this.isUpdate=false;
            this.isDown=false;
            this.accLeft=false;
            this.accRight=true;
        }else if(y==this.minPosY&&x>this.minPosX&&x<this.maxPosX){
            this.isUpdate=false;
            this.isDown=false;
            this.accLeft=false;
            this.accRight=true;
        }else if(y==this.maxPosY&&x>this.minPosX&&x<this.maxPosX){
            this.isUpdate=false;
            this.isDown=false;
            this.accLeft=true;
            this.accRight=false;
        }else if(x==this.minPosX&&y>this.minPosY&&y<this.maxPosY){
            this.isUpdate=false;
            this.isDown=true;
            this.accLeft=false;
            this.accRight=false;
        }else if(x==this.maxPosX&&y>this.minPosY&&y<this.maxPosY){
            this.isUpdate=true;
            this.isDown=false;
            this.accLeft=false;
            this.accRight=false;
        }
        
    },

});
