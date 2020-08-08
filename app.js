window.onload = function start()
{

   var canvas = document.querySelector("canvas");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    var c = canvas.getContext("2d");



    var mouse={
        x:undefined,
        y:undefined
    }

    var maxR=40;
    var circleTotal=200;//Колличество шариков

    var colorArr=[
        "#ffa700",
        "rgb(173, 31, 235)",
        "rgb(5, 94, 170)",
        "rgb(255, 7, 188)",
        ];

    window.addEventListener("mousemove",function(event){
        mouse.x=event.x;
        mouse.y=event.y;
    });

    window.addEventListener("resize",function(){
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
    });



    function Circle(x,y,xW,yW,radius)
    {
        this.x      = x;
        this.y      = y;
        this.xW     = xW;
        this.yW     = yW;
        this.radius = radius;
        this.minR   = radius;
        this.color  = colorArr[Math.floor(Math.random()*colorArr.length)];

        this.draw   = function()
        {
            c.beginPath();
            c.arc(this.x,this.y,this.radius,Math.PI*2,false);
            c.fillStyle=this.color;
            c.fill();
            //c.stroke();

        }

        this.update = function()
        {
            if(this.x+this.radius>innerWidth||this.x-this.radius<0)
                {
                    this.xW=-this.xW;
                }
            if(this.y+this.radius>innerHeight||this.y-this.radius<0)
                {
                   this.yW=-this.yW;
                }
            this.x+=this.xW;
            this.y+=this.yW;

            //interactivity

            if (mouse.x-this.x<50 && mouse.x-this.x>-50&&mouse.y-this.y<50 && mouse.y-this.y>-50)
                {
                    if (this.radius<maxR)
                        {
                            this.radius+=1;
                        }
                }
            else if(this.radius>this.minR)
                    {
                        this.radius-=1;
                    }

            this.draw();
        }
    }



    var cArr=[];




    function init()////Заполнить массив cArr и перезаполнять шариками пространство при resize окна
    {
         cArr=[];
         for (var i=0; i<circleTotal; i++)//Заполнить массив cArr
            {
                var radius = Math.random()*10+1;
                var x      = Math.random()*(innerWidth-radius*2)+radius; // позиция x
                var y      = Math.random()*(innerHeight-radius*2)+radius;
                var yW     =(Math.random()-0.5)*4;
                var xW     =(Math.random()-0.5)*4;// скорость по x


                cArr.push(new Circle(x,y,xW,yW,radius));

            }



    }
     init();

    function animate()
    {
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth,innerHeight);

        for (var i=0;i<cArr.length;i++)
        {
            cArr[i].update();

        }



    }

    animate();




}