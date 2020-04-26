var map = new AMap.Map('container', {
    mapStyle: 'amap://styles/2f77fb7c818e6ca90f03ccb8916e0c7d' ,//设置地图的显示样式
    zoom: 10, //设置地图的缩放级别
});


map.setMapStyle('amap://styles/2f77fb7c818e6ca90f03ccb8916e0c7d');
//    //实时路况图层
// var trafficLayer = new AMap.TileLayer.Traffic({
//     zIndex: 10
// });

// trafficLayer.setMap(map);

// var isVisible = true;
// function toggle() {
//     if (isVisible) {
//         trafficLayer.hide();
//         isVisible = false;
//     } else {
//         trafficLayer.show();
//         isVisible = true;
//     }
// }




var weeknow = document.querySelector(".weeknow");
var datenow = document.querySelector(".datenow");
var areanow = document.querySelector(".areanow");
var temperature = document.querySelector(".temperature");
var desc = document.querySelector(".desc");
var infoheadertem = document.querySelector("#infoheadertem");
var winddirection = document.querySelector("#winddirection");
var windpower = document.querySelector("#windpower");

var forecaweek1 = document.querySelector("#forecaweek1");
var forecatemday1 = document.querySelector("#forecatemday1");
var forecatemnight1 = document.querySelector("#forecatemnight1");

var forecaweek2 = document.querySelector("#forecaweek2");
var forecatemday2 = document.querySelector("#forecatemday2");
var forecatemnight2 = document.querySelector("#forecatemnight2");

var forecaweek3 = document.querySelector("#forecaweek3");
var forecatemday3 = document.querySelector("#forecatemday3");
var forecatemnight3 = document.querySelector("#forecatemnight3");

var forecaweek4 = document.querySelector("#forecaweek4");
var forecatemday4 = document.querySelector("#forecatemday4");
var forecatemnight4 = document.querySelector("#forecatemnight4");

var main_icon = document.querySelector("#main_icon");
var forcasicon1 = document.querySelector("#forcasicon1");
var forcasicon2 = document.querySelector("#forcasicon2");
var forcasicon3 = document.querySelector("#forcasicon3");
var forcasicon4 = document.querySelector("#forcasicon4");

var forecass = document.querySelectorAll(".forecas");



//点击预测的某一天， 左边获取对应的天气
var num, addr , timer;
for (var i = 0; i < forecass.length; i++) {

    forecass[i].num = i;
    forecass[i].onclick = function () {

        for (var j = 0; j < i; j++) {
            forecass[j].className = "forecas"; //将其他天气背景去掉
        }
        this.className += " forecasbgc"; //设置当前背景
        //alert(this.num);
        var index = this.num;
        AMap.plugin('AMap.Weather', function () {
            //创建天气查询实例
            // alert(index);

            var weather = new AMap.Weather();
            var areanow = document.querySelector(".areanow");
            var area = areanow.innerHTML;
            //执行实时天气信息查询
            weather.getForecast(area, function (err, data) {
                main_icon.className = "";
                main_icon.className = geticon(data.forecasts[index].dayWeather);
                weeknow.innerHTML = getweek((data.forecasts[index].week) * 1);
                datenow.innerHTML = data.forecasts[index].date;
                areanow.innerHTML = data.city;
                temperature.innerHTML = data.forecasts[index].dayTemp;
                desc.innerHTML = data.forecasts[index].dayWeather;
                infoheadertem.innerHTML = data.forecasts[index].dayTemp;
                winddirection.innerHTML = data.forecasts[index].dayWindDir;
                windpower.innerHTML = data.forecasts[index].dayWindPower;
            });
        });

    }
}

var sub = document.getElementById('submit');

sub.onclick = function () {
    sub.style.animation = "";
    clearInterval(timer);
    timer = setInterval(function () {
        sub.style.animation = "rabbit 0.5s";
    },10);
    
    //alert(sub.style.transform);
    search();

}

function search() {
    
    initicon();
    AMap.plugin('AMap.Weather', getWeather);
}

function getWeather() {
    var city = document.getElementById('city');
    var val = city.value;
    if (val == "") {
        return alert("请输入城市名进行查询！");
    }

    var weather = new AMap.Weather();
    //执行实时天气信息查询
    weather.getForecast(val, getdata);
}

function getdata(err, data) {
    //console.log(data);
    // var span = document.getElementById('spa');
    // spa.innerHTML = data.province + ' ' + data.reportTime + ' ' + data.forecasts[0].dayWeather;
    //var now = data.forecasts[0];
    //alert(getweek(data.forecasts[0].week));
    // alert(getweek(1));
    var now = data.forecasts[0];
    weeknow.innerHTML = getweek(now.week * 1); //data中的week是string类型，要转换成number类型
    datenow.innerHTML = now.date;
    areanow.innerHTML = data.city;
    temperature.innerHTML = now.dayTemp;
    desc.innerHTML = now.dayWeather;
    infoheadertem.innerHTML = now.dayTemp;
    winddirection.innerHTML = now.dayWindDir;
    windpower.innerHTML = now.dayWindPower;

    forecaweek1.innerHTML = getweek(now.week * 1);
    forecatemday1.innerHTML = now.nightTemp;
    forecatemnight1.innerHTML = now.dayTemp;

    forecaweek2.innerHTML = getweek((data.forecasts[1].week) * 1);
    forecatemday2.innerHTML = data.forecasts[1].nightTemp;
    forecatemnight2.innerHTML = data.forecasts[1].dayTemp;

    forecaweek3.innerHTML = getweek((data.forecasts[2].week) * 1);
    forecatemday3.innerHTML = data.forecasts[2].nightTemp;
    forecatemnight3.innerHTML = data.forecasts[2].dayTemp;

    forecaweek4.innerHTML = getweek((data.forecasts[3].week) * 1);
    forecatemday4.innerHTML = data.forecasts[3].nightTemp;
    forecatemnight4.innerHTML = data.forecasts[3].dayTemp;
    main_icon.className = "";
    forcasicon1.className = "";
    forcasicon2.className = "";
    forcasicon3.className = "";
    forcasicon4.className = "";
    main_icon.className = geticon(now.dayWeather);
    forcasicon1.className = main_icon.className;
    forcasicon2.className = geticon(data.forecasts[1].dayWeather);
    forcasicon3.className = geticon(data.forecasts[2].dayWeather);
    forcasicon4.className = geticon(data.forecasts[3].dayWeather);
};


function getweek(week) {
    var x;
    switch (week) {
        case 7:
            x = "星期日";
            break;
        case 1:
            x = "星期一";
            break;
        case 2:
            x = "星期二";
            break;
        case 3:
            x = "星期三";
            break;
        case 4:
            x = "星期四";
            break;
        case 5:
            x = "星期五";
            break;
        case 6:
            x = "星期六";
            break;
    }
    return x;
}

//获取天气图标
function geticon(dayWeather) {
    var iclass;
    switch (dayWeather) {
        case "阴":
            iclass = "icon-tianqi2";
            break;
        case "晴":
            iclass = "icon-tianqi6";
            break;
        case "多云":
            iclass = "icon-tianqi2";
            break;
        case "晴转多云":
            iclass = "icon-tianqi5";
            break;
        case "多云转晴":
            iclass = "icon-tianqi5";
            break;
        case "多云转阴":
            iclass = "icon-tianqi2";
            break;
        case "转阴多云":
            iclass = "icon-tianqi2";
            break;
        case "小雨":
            iclass = "icon-xiaoyu";
            break;
        case "中雨":
            iclass = "icon-xiaoyu";
            break;
        case "阵雨":
            iclass = "icon-xiaoyu";
            break;
        case "大雨":
            iclass = "icon-xue";
            break;
        case "暴雨":
            iclass = "icon-xue";
            break;
        case "雪":
            iclass = "icon-xue";
            break;
        case "小雪":
            iclass = "icon-xue";
            break;
        case "中雪":
            iclass = "icon-xue";
            break;
        case "大雪":
            iclass = "icon-xue";
            break;
        case "雷电":
            iclass = "icon-leidian";
            break;
        case "小雨转中雨":
            iclass = "icon-xiaoyu";
            break;
        case "中雨转小雨":
            iclass = "icon-xiaoyu";
            break;
        case "小雨转大雨":
            iclass = "icon-xue";
            break;
        case "大雨转小雨":
            iclass = "icon-xiaoyu";
            break;
        case "中雨转大雨":
            iclass = "icon-xue";
            break;
        case "大雨转中雨":
            iclass = "icon-xue";
            break;
        case "小雨转晴":
            iclass = "icon-xiaoyu";
            break;
        case "晴转小雨":
            iclass = "icon-tianqi5";
            break;
        case "中雨转晴":
            iclass = "icon-xiaoyu";
            break;
        case "晴转中雨":
            iclass = "icon-tianqi5";
            break;
    }
    return iclass;
}
// var s = "晴";
// alert(geticon(s));


//初始化图标给第一个添加背景选中状态
function initicon() {
    for (var s in forecass) {
        forecass[s].className = "forecas";
        forecass[0].className += " forecasbgc";
    }
}

//鼠标点击获取经纬度，逆地址解析出citycode然后执行search函数获取天气
map.on('click', function (ev) {

    var lnglat = ev.lnglat;
    var lng = lnglat.lng;
    var lat = lnglat.lat;
    // console.log(lng + ":" + lat);

    AMap.plugin('AMap.Geocoder', function () {
        var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city: '全国'
        });

        var lnglat = [lng, lat];
        geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                console.log(result.regeocode.addressComponent.adcode);
                var addr = result.regeocode.addressComponent.adcode;
                var city = document.getElementById('city');
                city.value = addr; //将解析到的citycode赋值给文本框执行search函数 ， 然后清空文本框
                search();
                city.value = '';
            }
        })
    })
});


//浏览器一加载就定位获取天气
AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(result.adcode);
            var addr = result.adcode;
            var city = document.getElementById('city');
            city.value = addr;
            search();
            city.value = '';
        }
    })
});





AMap.plugin('AMap.Driving', function() {
    var driving = new AMap.Driving({
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_TIME
    })
    
    var points = [
      { keyword: '北京市地震局（公交站）',city:'北京' },
      { keyword: '亦庄文化园（地铁站）',city:'北京' }
    ]
    
    driving.search(points, function (status, result) {
      // 未出错时，result即是对应的路线规划方案
      console.log(result);
    })
  })



  AMap.plugin('AMap.Driving', function() {
    var driving = new AMap.Driving({
      // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      policy: AMap.DrivingPolicy.LEAST_TIME
    })
    
    var startLngLat = [116.379028, 39.865042]
    var endLngLat = [116.427281, 39.903719]
    
    driving.search(startLngLat, endLngLat, function (status, result) {
      // 未出错时，result即是对应的路线规划方案
      console.log(result);
    })
  })