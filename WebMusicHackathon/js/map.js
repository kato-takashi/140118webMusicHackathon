var map;
var lat = 35.60784253639491;
var log = 139.64661866426468;
google.maps.event.addDomListener(window, 'load', function() {
			var mapID = document.getElementById("gmap");
			var options = {
				zoom: 16,
				center: new google.maps.LatLng(35.60784253639491, 139.64661866426468),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(mapID, options);
			/////copy/////copy/////copy/////copy
			var latlng = new google.maps.LatLng(lat, log);
			var gmarker = new google.maps.Marker({
		position: latlng,       // 緯度・経度は地図の中心
		title: "maker-test",     // ツールチップ
		draggable:true
	});
			// マーカーを地図の中心に表示
    gmarker.setMap(map);
// ドロップ時に緯度経度取得
    google.maps.event.addListener(gmarker,"dragend", function() {
      var MakerLat  = gmarker.getPosition().lat();
      var MakerLng  = gmarker.getPosition().lng();

      document.getElementById('latitude').value = MakerLat;
      document.getElementById('longitude').value = MakerLng;
      //console.log(p.lat);
      var num = MakerLat*100;
      var qNum = MakerLng/5;
      document.getElementById("freq").value = num;
      //document.getElementById("freqlabel").value = num;
      document.getElementById("q").value = qNum;
      //document.getElementById("qlabel").value = qNum;
      
      Setup(); //musicApi メソッドより
      gotoMap();
    } );

    /////copy/////copy/////copy/////copy
    ///

		});


function gotoMap(){
	var latParams1 = document.getElementById("freq").value;
	var logParams1 = document.getElementById("q").value;
	var zoomParams1 = parseFloat(document.getElementById("gain").value);
	var _lat = 35.60784253639491+latParams1*0.0001;
	var _log = 139.767036 + logParams1*0.01; 
	//console.log(zoomParams1);
	
	map.setZoom(zoomParams1);
	map.panTo(new google.maps.LatLng(_lat,_log));
	
}