<?php
/**
 * HELL Licensed Template System, enjoy!
 */
function zen($�f,$�d=[]) {
	extract($�d);
	$�=file_get_contents($�f);
	$�q='?php';
	ob_start();
	foreach($GLOBALS["zen_pre"] as $�1) $�=$�1($�);
	$�=strtr($�,['{='=>"<$�q echo ",'{/'=>"<$�q end",'{'=>"<$�q ",'}'=>'?'.'>']);
	try {eval('?'.'>'.$�);}
	catch(Throwable $�e) {
		$GLOBALS["zen_error"](["file"=>$�f,"line"=>$�e->getLine(),"message"=>$�e->getMessage(),"parsed"=>$�,"data"=>$�d]);
	}
	finally {$�=ob_get_clean();}
	foreach($GLOBALS["zen_post"] as $�2) $�=$�2($�);
	return $�;
}
$zen_error=function($e) {
	echo "$e[file]:$e[line] $e[message]";
};
$zen_pre=$zen_post=[];
