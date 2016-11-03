/*TMODJS:{"version":1,"md5":"bff77a243ca75f72ba906b552ba4123e"}*/
template('client/adPlaceParticulars',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="adPlacePartiContainer"> ';
include('./adPlaceParticulars_topMenu');
$out+=' <ul class="subMenu"> <li class="viewCtrl"><a href="#" class="list_icon">列表视图</a></li> </ul> <div class="putInPlatform_ad"> <label class="platform_title">投放平台：</label> <label class="radio checked"><input type="radio" name="platform"></label><span>全部</span> <label class="radio"><input type="radio" name="platform"></label><span>IOS</span> <label class="radio"><input type="radio" name="platform"></label><span>Android</span> </div> <div class="putInTheRegion"> <h6>投放地区:</h6> <div class="region"> </div> <div class="regionCtrl"> <input type=\'button\' class="selectRegion" value=\'选择地区\'/>  </div> </div>  <div id="viewContainer"></div> <a class="putInAD" href="javascript:void(-1)" style="display:none;">投放广告</a> </div> ';
return new String($out);
});