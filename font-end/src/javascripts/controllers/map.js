import map_template from '../views/map.html'
import not_allow_templat from '../views/not-allow.html'
import user_model from '../models/user-info'
const map = async(req, res) => {
    let _result = await user_model.check('/map');
    console.log(_result)
    if(_result.status==304){
        res.render(not_allow_templat);
        return false;
    }
    res.render(map_template)
    if (!window.AMap) {
        let $script = $('<script  src="https://webapi.amap.com/maps?v=1.4.10&key=4b03905b1ff241e6e8a1dc11450661f7&callback=onApiLoaded&plugin=AMap.Transfer,AMap.Geocoder" >')
        $('body').append($script)
    } else {
        window.onApiLoaded()
    }
    // 地图回调
    window.onApiLoaded = function () {
        var map = new AMap.Map('map-container', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 11, //初始化地图层级
            center: [116.370154, 40.037302] //初始化地图中心点
        });

        // 中心点
        var marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: [116.370154, 40.037302],
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);

        // 使用插件来进行定位
        AMap.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：5s
            });
            geolocation.getCurrentPosition(function (status, result) {
                if (status == 'complete') {
                    onComplete(result)
                } else {
                    onError(result)
                }
            });
        });
        //解析定位结果
        function onComplete(data) {
            console.log('定位结果：' + data.position);
            // 地理编码，将经纬度处理成地址
            regeoCode(data.position)
            // 移动到定位位置
            map.panTo(data.position);
            //    创建当前定位点
            var marker = new AMap.Marker({
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                position: data.position,
                offset: new AMap.Pixel(-13, -30)
            });
            marker.setMap(map);


            // 交通
            var transOptions = {
                map: map,
                city: '北京市',
                panel: 'map-panel',
                //cityd:'乌鲁木齐',
                policy: AMap.TransferPolicy.LEAST_TIME
            };
            //构造公交换乘类
            var transfer = new AMap.Transfer(transOptions);
            //根据起、终点坐标查询公交换乘路线
            transfer.search(new AMap.LngLat(data.position.lng, data.position.lat), new AMap.LngLat(116.370154, 40.037302), function (status, result) {
                // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
            });
        }
        //解析定位错误信息
        function onError(data) {
            console.log('定位失败', data.message)
        }
        // 获取详细地址
        function regeoCode(position) {
            console.log('正在处理')
            if (!geocoder) {
                var geocoder = new AMap.Geocoder({
                    radius: 1000 //范围，默认：500
                });
            }
            geocoder.getAddress([position.lng, position.lat], function (status, result) {
                if (status === 'complete' && result.regeocode) {
                    console.log(result)
                    // var address = result.regeocode.formattedAddress;
                } else {
                    alert(JSON.stringify(result))
                }
            });
        }


        // 定位到当前的用户所在的位置，从用户位置到marker做一条路线规划
    }
}
export default {
    map
}