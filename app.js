
class Sketch{
    constructor(){
        this.width = window.innerWidth;
        this.height = window.innerHeight; 
        this.app = new PIXI.Application({
             backgroundColor: 0xffffff, 
             resolution: window.devicePixelRatio || 1,
             resizeTo: window
        });
        
        document.body.appendChild(this.app.view);
        
        this.container = new PIXI.Container();
        // the spiral stays on so its a different container
        this.containerSpiral = new PIXI.Container();

        this.phi = 0.5 + Math.sqrt(5)/2;
        this.center = 0.7237595499957939;  //0.7213595499957939
        
        this.app.stage.addChild(this.container);
        this.app.stage.addChild(this.containerSpiral);
        this.time = 0;
        this.add();
        this.addStuff();
        this.addLines();
        this.render();
    }


    getSprite(){
        let block = new PIXI.Sprite.from('./river_1s.png');
        block.width = 500;
        block.height = 500;
        return block;
    }



    addLines(){
        this.ctx = new PIXI.Graphics;
        this.ctx.lineStyle(2, 0xff0000, 0.3);
        
        let lastRight = this.width;
        let lastBottom = lastRight / this.phi;
        let tempHorizontal,tempVertical;

     
        this.ctx.moveTo(0, lastBottom),
        this.ctx.lineTo(lastRight, lastBottom),
        this.ctx.moveTo(lastRight, lastBottom),
        this.ctx.arc(lastRight, lastBottom, lastRight, .5 * Math.PI, Math.PI);

        let lastLeft = lastRight / this.phi;
        this.ctx.moveTo(lastLeft, 0),
        this.ctx.lineTo(lastLeft, lastBottom),
        this.ctx.moveTo(lastLeft, lastBottom),
        this.ctx.arc(lastLeft, lastBottom, lastLeft, Math.PI, 1.5 * Math.PI);
        let lastTop = lastBottom / this.phi;

        this.ctx.moveTo(lastLeft, lastTop),
        this.ctx.lineTo(lastRight, lastTop),
        this.ctx.moveTo(lastLeft, lastTop),
        this.ctx.arc(lastLeft, lastTop, lastTop, 1.5 * Math.PI, 0);

        lastRight = lastRight - (lastRight - lastLeft) / this.phi;
        this.ctx.moveTo(lastRight, lastTop),
        this.ctx.lineTo(lastRight, lastBottom),
        this.ctx.moveTo(lastRight, lastTop),
        this.ctx.arc(lastRight, lastTop, lastBottom - lastTop, 0, .5 * Math.PI);

        tempVertical = lastBottom - (lastBottom - lastTop) / this.phi;
        this.ctx.moveTo(lastLeft, tempVertical),
        this.ctx.lineTo(lastRight, tempVertical),
        this.ctx.moveTo(lastRight, tempVertical),
        this.ctx.arc(lastRight, tempVertical, lastBottom - tempVertical, .5 * Math.PI, Math.PI);
        lastBottom = tempVertical;

        tempHorizontal = lastLeft + (lastRight - lastLeft) / this.phi;
        this.ctx.moveTo(tempHorizontal, lastTop),
        this.ctx.lineTo(tempHorizontal, lastBottom),
        this.ctx.moveTo(tempHorizontal, lastBottom),
        this.ctx.arc(tempHorizontal, lastBottom, tempHorizontal - lastLeft, Math.PI, 1.5 * Math.PI);
        lastLeft = tempHorizontal;

        tempVertical = lastTop + (lastBottom - lastTop) / this.phi;
        this.ctx.moveTo(lastLeft, tempVertical),
        this.ctx.lineTo(lastRight, tempVertical),
        this.ctx.moveTo(lastLeft, tempVertical),
        this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0);
        lastTop = tempVertical;

        tempHorizontal = lastRight - (lastRight - lastLeft) / this.phi;
        this.ctx.moveTo(tempHorizontal, lastTop),
        this.ctx.lineTo(tempHorizontal, lastBottom),
        this.ctx.moveTo(tempHorizontal, lastTop),
        this.ctx.arc(tempHorizontal, lastTop, lastRight - tempHorizontal, 0, .5 * Math.PI);
        lastRight = tempHorizontal;

        tempVertical = lastBottom - (lastBottom - lastTop) / this.phi;
        this.ctx.moveTo(lastLeft, tempVertical),
        this.ctx.lineTo(lastRight, tempVertical),
        this.ctx.moveTo(lastRight, tempVertical),
        this.ctx.arc(lastRight, tempVertical, lastRight - lastLeft, .5 * Math.PI, Math.PI);
        lastBottom = tempVertical;

        tempHorizontal = lastLeft + (lastRight - lastLeft) / this.phi;
        this.ctx.moveTo(tempHorizontal, lastTop),
        this.ctx.lineTo(tempHorizontal, lastBottom),
        this.ctx.moveTo(tempHorizontal, lastBottom),
        this.ctx.arc(tempHorizontal, lastBottom, tempHorizontal - lastLeft, Math.PI, 1.5 * Math.PI);
        lastLeft = tempHorizontal;

        tempVertical = lastTop + (lastBottom - lastTop) / this.phi;
        this.ctx.moveTo(lastRight, tempVertical),
        this.ctx.lineTo(lastLeft, tempVertical),
        this.ctx.moveTo(lastLeft, tempVertical),
        this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0)
        console.log(lastLeft/this.width)
        // this spiral wont rotate 
        this.containerSpiral.addChild(this.ctx);
    }

    getBlock(){
        let block = new PIXI.Sprite(PIXI.Texture.WHITE);
        block.tint = 0xff0000*Math.random();
        block.alpha = 0.5;
        block.width = 10;
        block.height = 10;
        return block;
    
    }
    addStuff(){
        // calculate the center 
        this.centerX = this.width*this.center;
        this.centerY = this.height*this.center/this.phi;

        let blockSec = new PIXI.Sprite(PIXI.Texture.WHITE);
        blockSec.tint = 0xff0000;
        blockSec.width = 10;
        blockSec.height = 10;
        blockSec.position.set(this.centerX, this.centerY)

        this.container.addChild(blockSec);

        for(let i = 0; i < 5; i++){
            let container = new PIXI.Container();
            let bl = this.getSprite(); 
            bl.width = this.width/this.phi;
            bl.height = this.width/this.phi;
            let angle = i*Math.PI/2;
            let scale = Math.pow(1/(this.phi), i);
            
            // align the container to the center
            container.position.set(this.centerX,this.centerY);
            bl.position.set(-this.centerX,-this.centerY);
            // bl.rotation = 0.5;

            container.rotation = angle;
            container.scale.set(scale);


            container.addChild(bl);
            this.container.addChild(container);
        } 
    }

    add(){
        let river = this.getSprite();

        this.container.addChild(river); 

    }

    render(){

        this.app.ticker.add((delta) => {
          this.time += 0.5;
        //   console.log(this.time);
        });

    }

}





new Sketch(); 







