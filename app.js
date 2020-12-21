
class Sketch{
    constructor(){
        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight; 
        this.app = new PIXI.Application({
             backgroundColor: 0xffffff, 
             resolution:  1,
             resizeTo: window
        });
        console.log(document.body.clientWidth);
        document.body.appendChild(this.app.view);
        
        this.container = new PIXI.Container();

        this.phi = 0.5 + Math.sqrt(5)/2;
        this.center = 0.7237;
        
        this.app.stage.addChild(this.container);
        this.time = 0;
        this.add();
        this.addStuff();
        this.addLines();
        this.render();
    }


    getSprite(){
        let block = new PIXI.Sprite.from('./city.png');
        block.width = 1150;
        block.height = 1150;
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
        this.ctx.arc(lastLeft, tempVertical, lastRight - lastLeft, 1.5 * Math.PI, 0),

        this.container.addChild(this.ctx);
    }

    addStuff(){

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



