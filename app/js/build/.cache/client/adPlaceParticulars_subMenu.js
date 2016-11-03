/*TMODJS:{"version":1,"md5":"b93081a25ff732641771339f12a7d33f"}*/
template('client/adPlaceParticulars_subMenu',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,postions=$data.postions,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(postions,function($value,$index){
$out+=' <li id=';
$out+=$escape($value.postionId);
$out+=' data-type=';
$out+=$escape($value.typeCode);
$out+='> <a href="">';
$out+=$escape($value.posNum);
$out+='号广告位</a></li> ';
});
$out+=' ';
return new String($out);
});