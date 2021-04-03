<?php
/**
 * HELL Licensed Template System, enjoy!
 */
function zen($žf,$žd=[]) {
	extract($žd);
	$ž=file_get_contents($žf);
	$žq='?php';
	ob_start();
	foreach($GLOBALS["zen_pre"] as $ž1) $ž=$ž1($ž);
	$ž=strtr($ž,['{='=>"<$žq echo ",'{/'=>"<$žq end",'{'=>"<$žq ",'}'=>'?'.'>']);
	try {eval('?'.'>'.$ž);}
	catch(Throwable $že) {
		$GLOBALS["zen_error"](["file"=>$žf,"line"=>$že->getLine(),"message"=>$že->getMessage(),"parsed"=>$ž,"data"=>$žd]);
	}
	finally {$ž=ob_get_clean();}
	foreach($GLOBALS["zen_post"] as $ž2) $ž=$ž2($ž);
	return $ž;
}
$zen_error=function($e) {
	echo "$e[file]:$e[line] $e[message]";
};
$zen_pre=$zen_post=[];
