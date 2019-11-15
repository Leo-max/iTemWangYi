define(["jquery", "jquery-cookie"], function($){
    
    
    function download(){
        $.ajax({
            type: "get",
            url: "data/data.json",
            success: function(arr){

                // 搜索
                // 左侧动态图
                var node = `<img src="${arr[0].child[0].img}" alt="">`
                $(node).appendTo($("#Search_box_left"))
                
                // 导航栏,下拉菜单
                list(arr);

                //加载banner图
                bannerShow(arr);
                
                // 11·11再续狂欢
                bannerBottom(arr)

                // 品牌制造商
                brand(arr)

                //新品首发
                brand2(arr)

                //人气推荐
                recommend(arr)

                //福利社
                // welfare(arr)
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    // 导航栏
    // 下拉菜单
    function list(arr){
        var newArr0 = arr[1].child;
        
        for(var i = 0; i < $(newArr0).size(); i++){
            var tiTle = newArr0[i].title;
            var node = $(`
                            <li id="list_li" class="list_li${i}">
                                <a href="#" id="list_a">${tiTle}</a>
                                <div class="List_Bigbox List_Bigbox${i}"></div>
                            </li>
                        `) 
            node.appendTo($("#Nav"));
        } 

        $("#Nav").on("mouseenter", "li", function(){
            $(".List_Bigbox").css({
                display: "block"
            });
            var inDex = $(this).index();
            
            if(inDex > 0 && inDex < 9){
                $(`.List_Bigbox`).empty();
                var newArr = newArr0[inDex].child;
            
                for(var j = 0; j < newArr.length; j++){
                    var node1 = `
                            <div id = List_box class = "List_box${j}">
                                <h2>${newArr[j].title}</h2>
                            </div>
                            `
                    $(node1).appendTo($(`.List_Bigbox${inDex}`));

                    for(var k = 0; k < newArr[j].child.length; k++){
                        var node2 = 
                                `
                                    <div id="List_box_child" class="List_box_child${k}">
                                        <a href="#">
                                            <img src="${newArr[j].child[k].img}" alt="" id="List_img">
                                            <span>${newArr[j].child[k].title}</span>
                                        </a>
                                    </div>
                                `

                        $(node2).appendTo($(`.List_box${j}`));
                    }
                }
                
            }else{
                $(".List_Bigbox").css({
                    display: "none"
                });       
                return false;
            }
        }).mouseleave(function(){
            $(`.List_Bigbox`).empty();
            $(".List_Bigbox").css({
                display: "none"
            });             
        })
        
    }    

    // 加载banner图
    function bannerShow(arr){
        var newArr = arr[2].child;
        for(var i = 0; i < newArr.length; i++){
            var node = ` <li>
                            <img src="${newArr[i].img}" alt="">
                        </li>`
            $(node).appendTo($("#Banner_box ul"));
        }

        var iNum = 0;
        var timer = null;
        timer = setInterval(function(){
            iNum++;
            if(iNum > 7){
                iNum = 0;
            }
            $("#Banner_box ul li").siblings().fadeOut().eq(iNum).fadeIn();
        }, 3000)
        


        $("#Banner_box ol").stop(true).on("mouseenter", "li", function(){
            var inDex = $(this).index();
            $("#Banner_box ul li").siblings("li").stop(true).fadeOut(1).eq(inDex).fadeIn(500);
        })

        //鼠标移入停止动画
        $("#Banner").on("mouseenter", function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNum++;
                if(iNum > 7){
                    iNum = 0;
                }
                $("#Banner_box ul li").siblings().fadeOut().eq(iNum).fadeIn();
            }, 3000)
        })
    }

    // 11·11再续狂欢
    function bannerBottom(arr){
        var newArr = arr[3].child;
        // console.log(arr[2].child);
        for(var i = 0; i < $(newArr).size(); i++){
            var newArrI = newArr[i];
            var node = `
                            <a href="#">
                                <div class="cont cont${i}">
                                    <div class="title">
                                        <h3>${newArrI.title}</h3>
                                        <p>${newArrI.describe}</p>
                                    </div>
                                </div>
                            </a>
                        `
            $(node).appendTo($("#banBotbottom"));
            if(!newArrI.img){
                $(`.cont${i}`).css({
                    backgroundImage: `url(${newArrI.bgimg})`,
                });
            }else{
                var img = 
                        `
                            <img src="${newArrI.img}" alt="">
                        `
                $(img).appendTo($(`.cont${i}`));
                $(`.cont${i}`).css({
                    backgroundImage: `url(${newArrI.bgimg})`,
                });
            }
        }
    }

    // 品牌制造商
    function brand(arr){
        var newArr = arr[4];
        // console.log(newArr);
        var node1 = `
                    <div id="brandChild_top">
                        <h2>${newArr.title}</h2>
                        <span>${newArr.describe}</span>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#brandBox"))
        // console.log(node1);

        var node2 = `
                        <div id="brandChild_bottom"></div>
                    `
        $(node2).appendTo($("#brandBox"))
        var childArr = newArr.child;
        // console.log(childArr);
        for(var i = 0; i < $(childArr).size(); i++){
            var node2_child = 
                                `
                                <a href="">
                                    <span>${childArr[i].title}</span>
                                    <div id="brand_price">${childArr[i].price}</div>
                                    <img src="${childArr[i].img}" alt="">
                                </a>
                                `
            $(node2_child).appendTo($("#brandChild_bottom"))
            // console.log(node2_child);
        }
    }
    
    //新品首发
    function brand2(arr){
        var newArr = arr[5];
        // console.log(newArr);
        var node1 = `
                    <div id="brand2Child_top">
                        <h2>${newArr.title}</h2>
                        <span>${newArr.describe}</span>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#brandBox2"))


        var node2 = `
                        <div id="brand2Child_bottom"></div>
                    `
        $(node2).appendTo($("#brandBox2"))
        var childArr = newArr.child;
    
        for(var i = 0; i < $(childArr).size(); i++){
            var node2_child = 
                                `
                                <a href="">
                                    <p id="brand2Child_bottom_top" class="brand2Child_bottom_top${i}">
                                        
                                    </p>
                                    <span id="brand2Child_bottom_title">${childArr[i].title}</span>
                                    <div id="brand2_price">${childArr[i].price}<del id="brand2_delPrice">${childArr[i].delPrice}</del></div>
                                    <img src="${childArr[i].img1}" alt="">
                                </a>
                                `
            $(node2_child).appendTo($("#brand2Child_bottom"));
            
        }
        // console.log(childArr);
        isSpan(childArr, `.brand2Child_bottom_top`);

    }
    
    //人气推荐
    function recommend(arr){
        var newArr = arr[6];
        // console.log(newArr);

        
        
        var node1 = `
                    <div id="recommendChild_top">
                        <h2>${newArr.title}</h2>
                        <ul id="recommendChild_top_title_box">
                            
                             
                        </ul>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#recommendBox"))

        for(var j = 0; j < $(newArr.child).size(); j++){
            // console.log(j);
            var bottomNode = 
                            `
                            <li id="recommendChild_top_title" class="recommendChild_top_title${j}">
                                <a href="javascript:;" id="recommendChild_top_title_a" class="recommendChild_top_title_a${j}">${newArr.child[j].title}</a>
                            </li>
                            `
            $(bottomNode).appendTo($("#recommendChild_top_title_box"))
            
            var node2 = `
                            <div id="recommendChild_bottom_box" class="recommendChild_bottom_box${j}">
                                <div id="recommendChild_bottom" class="recommendChild_bottom${j}"></div>
                            </div>
                        `
            $(node2).appendTo($("#recommendBox"))
            
            var childArr = newArr.child[j].child;
            // console.log($(childArr).size()); 7, 7
            for(var i = 0; i < $(childArr).size(); i++){
                var node2_child = 
                                    `
                                    <a href="">
                                        <p id="recommendChild_bottom_top" class="recommendChild_bottom_top${j}_child${i} recommendChild_bottom_top${i}">
                                            
                                        </p>
                                        <span id="recommendChild_bottom_title">${childArr[i].title}</span>
                                        <div id="recommend_price">${childArr[i].price}<del id="recommend_delPrice">${childArr[i].delPrice}</del></div>
                                        <img src="${childArr[i].img}" alt="">
                                    </a>
                                    `
                $(node2_child).appendTo($(`.recommendChild_bottom${j}`));
            }
            
            isSpan(childArr, `.recommendChild_bottom_top${j}_child`)
        }
        //添加span1(促销标题1) span2(促销标题2) span3(促销标题3);
        var spanArr1 = arr[6].child[0].child;//编辑推荐内的span
        var spanArr2 = arr[6].child[1].child;//热销总榜内的span
        /* console.log(spanArr1);
        console.log(spanArr2);
        console.log(childArr); */
        /* isSpan(spanArr1, `.recommendChild_bottom_top${0}_child${0}`);
        isSpan(spanArr2, `.recommendChild_bottom_top${1}_child${1}`); */
        
        //默认:编辑推荐有class名active
        $(".recommendChild_top_title0").addClass("active");
        
        // 编辑推荐/热销总榜 切换事件
        $("#recommendChild_top_title_box").on("click", "li", function(){
            var inDex = $(this).index();
            $("#recommendChild_top_title_box li").removeClass("active").eq(inDex).addClass("active");
            
            //编辑推荐和热销总榜下的内容
            /* $(".recommendChild_bottom_bigBox").css("display", "none") */
            if(inDex == 0){
                $(`.recommendChild_bottom_box1`).css({
                    display: "none"
                })
                $(`.recommendChild_bottom_box0`).css({
                    display: "block"
                })
            }

            if(inDex == 1){
                $(`.recommendChild_bottom_box0`).css({
                    display: "none"
                })
                $(`.recommendChild_bottom_box1`).css({
                    display: "block"
                })
            }

            /* console.log($(this).index());//index得到的下标是在父元素下排队排出来的
            console.log($(this).eq());//eq是在整个文档下大排队 */
        })
        
        /* console.log($("#recommendChild_top_title_box").children().size()); */

    }

    //福利社
    function welfare(arr){
        var newArr = arr[7];
        // console.log(newArr);

        
        
        var node1 = `
                    <div id="welfareChild_top">
                        <h2>${newArr.title}</h2>
                        <a href="#">${newArr.right}</a>
                    </div>
                    `
        $(node1).appendTo($("#welfareBox"))

        var node2 = `
                            <div id="welfareChild_bottom_box" class="welfareChild_bottom_box">
                                <div id="welfareChild_bottom" class="welfareChild_bottom"></div>
                            </div>
                        `
        $(node2).appendTo($("#welfareBox"))
        


       
    }






    //判断childArr对象中是否有span1(促销标题1) span2(促销标题2) span3(促销标题3);
    //childArr为数组对象,nodeName为class字符串名
    function isSpan(arr, insertName){
        // insertName 自动字符串拼接 => $(`${insertName}${i}`)
        
        //注意  insertName必须为字符串;如果是选择器则要加选择器符号(例如: "#insertName")

        //arr为数组对象,$(`${insertName}${i}`为被插入的节点名
        for(var i = 0; i < $(arr).size(); i++){
            //遍历该数组下的一个或多个含有span的对象
            if(!arr[i].span1 == false && !arr[i].span2 == false &&!arr[i].span3 == false){
                var node = 
                            `
                                <span id="span" class="span1">${arr[i].span1}</span>
                                <span id="span" class="span2">${arr[i].span2}</span>
                                <span id="span" class="span3">${arr[i].span3}</span>
                            `
                $(node).appendTo($(`${insertName}${i}`))//每遍历一组，便把span插入该组
                }else if(!arr[i].span1 == false && !arr[i].span2 == false){
                    var node = 
                                `
                                    <span id="span" class="span1">${arr[i].span1}</span>
                                    <span id="span" class="span2">${arr[i].span2}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span1 == false && !arr[i].span3 == false){
                    var node = 
                                `
                                    <span id="span" class="span1">${arr[i].span1}</span>
                                    <span id="span" class="span3">${arr[i].span3}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span2 == false &&!arr[i].span3 == false){
                    var node = 
                                `
                                    <span id="span" class="span2">${arr[i].span2}</span>
                                    <span id="span" class="span3">${arr[i].span3}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span1 == false){
                    var node = 
                                `
                                    <span id="span" class="span1">${arr[i].span1}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span2 == false){
                    var node = 
                                `
                                    <span id="span" class="span2">${arr[i].span2}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }else if(!arr[i].span3 == false){
                    var node = 
                                `
                                    <span id="span" class="span3">${arr[i].span3}</span>
                                `
                    $(node).appendTo($(`${insertName}${i}`))
                }
            }
        }
    
    

    return {
        download: download,
    }
})