/*TMODJS:{"version":1,"md5":"e346f1bc08991edc57e497fdf14cef97"}*/
template('client/adPlaceParticulars_topMenu',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,result=$data.result,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="topMenu"> ';
$each(result,function($value,$index){
$out+=' <li id=';
$out+=$escape($value.code);
$out+='>';
$out+=$escape($value.name);
$out+='</li> ';
});
$out+=' </ul>';
return new String($out);
});