/*TMODJS:{"version":1,"md5":"eb718cd7de35a82765da6cbd48729b53"}*/
template('client/commonPart',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('../common/header');
$out+=' ';
include('../common/leftNav');
return new String($out);
});