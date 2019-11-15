//冒泡排序(从小到大)
function bubbleSort(arr){
    for(i = 1; i <= arr.length - 1; i++){
        for(j = 0; j < arr.length - i; j++){
            if(arr[j] > arr[j + 1]){
                var sum = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = sum;
            }
        }
    }
}

//冒泡排序(从大到小)
function bubbleSortAsc(arr){
    for(i = 1; i <= arr.length - 1; i++){
        for(j = 0; j < arr.length - i; j++){
            if(arr[j] < arr[j + 1]){
                var sum = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = sum;
            }
        }
    }
}

// 选择排序法(从小到大)
function changeSort(arr){
    for(i = 0; i < arr.length - 1; i++){
        for(j = i + 1; j < arr.length - i; j++){
            if(arr[i] > arr[j]){
                var sum = arr[i];
                arr[i] = arr[j];
                arr[j] = sum;
            }
        }
    }
}

// 选择排序法(从大到小)
function changeSortAsc(arr){
    for(i = 0; i < arr.length - 1; i++){
        for(j = i + 1; j < arr.length - i; j++){
            if(arr[i] < arr[j]){
                var sum = arr[i];
                arr[i] = arr[j];
                arr[j] = sum;
            }
        }
    }
}

//随机rgba的颜色;
function randomColor(){
    return 'rgba(' + (parseInt(Math.random() * 256)) + ',' + (parseInt(Math.random() * 256)) + ',' + (parseInt(Math.random() * 256)) + ',' + 1 + ')';
}

//快速获取元素ID
function $(Id){
    return document.getElementById(Id);
}

//拖拽
function drag(node){
    //拖拽开始
    obox.onmousedown = function(ev){
        var e = ev || window.Event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;
            document.onmousemove = function(ev){
                var e = ev || window.Event;
                obox.style.left = e.clientX - offsetX - 140 + 'px';
                obox.style.top = e.clientY - offsetY - 130 + 'px';
            }
    }
    //拖拽结束
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

 //拖拽限制出界
 function limitDrag(node){
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var offsetX = e.clientX - node.offsetLeft;
        var offsetY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            var l = e.clientX - offsetX;
            if(l <= 0){
                l = 0;
            }
            var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
            
            if(l >= windowWidth - node.offsetWidth){
                l = windowWidth - node.offsetWidth;
            }

            var t = e.clientY - offsetY;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if(t <= 0){
                t = 0;
            }
            if(t >= windowHeight - node.offsetHeight){
                t = windowHeight - node.offsetHeight;
            }

            node.style.left = l + 'px';
            node.style.top = t + 'px';
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

//随鼠标移动限制边界
function moves(node){
    document.onmousemove = function(ev){
        var e = ev || window.event;
        var l = e.clientX;
        if(l <= 0){
            l = 0;
        }
        var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
        if(l >= windowWidth - obox.offsetWidth){
            l = windowWidth - obox.offsetWidth;
        }
        var t = e.clientY;
        if(t <= 0){
            t = 0;
        }
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(t >= windowHeight - obox.offsetHeight){
            t = windowHeight - obox.offsetHeight;
        }

        obox.style.left = l + 'px';
        obox.style.top = t + 'px';
    }
}

//阻止事件冒泡
function StopBubble(ev){
    if(ev.stopPropagation){
        ev.stopPropagation();
    }else{
        ev.cancelBubble = true;
    }
}

//封装一个验证码
function verification(n){
    var arr = [];
    for(i = 0; i <= n; i++){
        var tmp = parseInt(Math.random() * 123);
        if(tmp >= 0 && tmp <= 9){
            arr.push(tmp);
        }else if(tmp >= 65 && tmp <= 90){
            arr.push(String.fromCharCode(tmp));
        }else if(tmp >= 97 && tmp <= 122){
            arr.push(String.fromCharCode(tmp));
        }else{
            i--;
        }
    }
    return arr.join('');//n位验证码
}
//验证码样式
function draw(testCode){    //注意：使用方法：draw(verification(n)); //需用canvas标签放置验证码;
    var canvas_width=document.getElementById('canvas').clientWidth;
    var canvas_height=document.getElementById('canvas').clientHeight;
    var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
    var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
    canvas.width = 22 * testCode.length;
    canvas.height = canvas_height;
    

    //有n位验证，可以绘制n位字符
    for (var i = 0; i < testCode.length; i++){
        var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
        var txt = testCode[i];//得到随机的一个内容
        // show_num[i] = txt;
        var x = 10 + i * 20;//文字在canvas上的x坐标
        var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
        context.font = "bold 23px 微软雅黑";

        context.translate(x, y);
        context.rotate(deg);

        context.fillStyle = randomColor();
        context.fillText(txt, 0, 0);

        context.rotate(-deg);
        context.translate(-x, -y);
    }
    for (var i = 0; i <= 5; i++){ //验证码上显示线条
        context.strokeStyle = randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++){ //验证码上显示小点
        context.strokeStyle = randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }
    return testCode;//返回n验证码内容
}