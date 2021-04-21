/*TMODJS:{"version":1,"md5":"a66ee36443b989a0a4e93bce527a0d62"}*/
template('common/region',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,result=$data.result,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' <div class="promptBox"> <h3>选择地区<span id="promptClose">×</span></h3> <div class="promptBoxContent"> <div class="ctrlCheck"><label><input type="checkbox" name="select"></label><span>全国</span></div> <ul class="areaProvince"> ';
$each(result,function($value,$index){
$out+=' <li id=';
$out+=$escape($value.provinceId);
$out+='><label><input type="checkbox" name="select"/></label><span>';
$out+=$escape($value.name);
$out+='</span></li> ';
});
$out+=' </ul> <ul class="areaCity"> </ul> </div> <div class="promptBoxCtrl"> <input type="button" value="完成" /> </div> </div> ';
return new String($out);
});