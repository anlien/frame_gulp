/*TMODJS:{"version":1,"md5":"a82f3113745e1247b163aff2eefdb2aa"}*/
template('client/adPlaceParticulars_capital',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,region=$data.region,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(region,function($value,$index){
$out+=' <div class="capital"> <strong>';
$out+=$escape($value.area);
$out+=' ';
if(!$value.regionIsFill){
$out+='/';
}
$out+=' </strong> ';
if(!$value.regionIsFill){
$out+=' <span>';
$out+=$escape($value.detail);
$out+='</span> ';
}
$out+=' </div> ';
});
return new String($out);
});