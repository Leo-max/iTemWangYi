// console.log("载入成功");

require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie"
    },
    shim: {
        "jquery-cookie": ["jquery"],
    }
})

require(["index", "tag"], function(index, tag){
    index.download();
    tag.tagBanner();
})