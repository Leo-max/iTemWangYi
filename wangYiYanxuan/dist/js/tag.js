define(["jquery"], function($){
    
    //小banner轮播图
    function tagBanner(){
        // console.log("载入成功")
        var iNum = 0;
        var timer = null;

        $(".welfareChild_bottom_left ul").find("li").css({
            opacity: 0
        }).eq(0).css({
            opacity: 1,
        })

        // 箭头隐藏
        $(".moveBtn").hide();

        

        
        

        timer = setInterval(function(){
            iNum++;
            if(iNum > 3){
                iNum = 0;
            }
            $(".welfareChild_bottom_left ul").find("li").animate({
                opacity: 0
            }).eq(iNum).animate({
                opacity: 1
            },);
        }, 3000)



        //移入banner_left容器暂停
        $(".welfareChild_bottom_left").on("mouseenter", function(){
            clearInterval(timer);
            $(".moveBtn").show();
        }).mouseleave(function(){
            clearInterval(timer);
            timer = setInterval(function(){
                iNum++;
                if(iNum > 3){
                    iNum = 0;
                }
                $(".welfareChild_bottom_left ul").find("li").animate({
                    opacity: 0
                }).eq(iNum).animate({
                    opacity: 1
                },);
            }, 3000)
            $(".moveBtn").hide();
        })

        //点击右箭头下标递增
        $(".moveBtn_right").on("click", function(){
            clearInterval(timer);
            iNum++;
            if(iNum > 3){
                iNum = 0;
            }
            $(".welfareChild_bottom_left ul").find("li").stop(true, true).animate({
                opacity: 0
            }).eq(iNum).stop(true, true).animate({
                opacity: 1
            })

        })

        //点击左箭头下标递减
        $(".moveBtn_left").on("click", function(){
            clearInterval(timer);
            // console.log(iNum-- + "，右箭头");
            iNum--;
            if(iNum < 0){
                iNum = 3;
            }
            $(".welfareChild_bottom_left ul").find("li").stop(true, true).animate({
                opacity: 0
            }).eq(iNum).stop(true, true).animate({
                opacity: 1
            },);
        })

        //移入ul li显示对应下标图片
        $(".welfareChild_bottom_left ol").on("mouseenter", "li", function(){
   
            clearInterval(timer);

            iNum = $(this).index();
            // console.log(iNum + ",three");

            $(".welfareChild_bottom_left ul").find("li").stop(true, true).animate({
                opacity: 0
            }).eq(iNum).stop(true, true).animate({
                opacity: 1
            });


            
        }).mouseleave(function(){

            clearInterval(timer);
            timer = setInterval(function(){
                iNum++;
                if(iNum > 3){
                    iNum = 0;
                }
                if(iNum < 0){
                    iNum = 3;
                }
                $(".welfareChild_bottom_left ul").find("li").animate({
                    opacity: 0
                }).eq(iNum).animate({
                    opacity: 1
                });
            }, 3000)

        })



        
    }

    return {
        tagBanner: tagBanner,
    }
})