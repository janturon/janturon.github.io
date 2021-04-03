<?
// includes
$zen_pre[] = fn($_)=>preg_replace_callback('/\{include|require\s+([^\}]+)\}/',function($m){
  return file_get_contents(eval("return $m[1];"));
},$_);

// strip comments
$zen_pre[] = fn($_)=>preg_replace('/\{\*[^\}]*\}/s','',$_);

// strip empty tags with ! (i.e. <ul!>)
$zen_post[] = fn($_)=>strtr(preg_replace('~<([^\s!>]+)[^!>]*!>\s*</\1>~s','',$_),['!>'=>'>']);

// strip HTML attributes with empty contents (i.e. class="")
$zen_post[] = fn($_)=>preg_replace('/(\s*\w+="\s*")/','',$_);

// don't apply {} replacement inside <script> tags
$zen_script=[];
$zen_pre[] = fn($_)=>preg_replace_callback('~<script>.*</script>~su',fn($m)=>[$GLOBALS["zen_script"][]=$m[0],'§§§'][1],$_);
$zen_post[] = fn($_)=>preg_replace_callback('~§§§~su',fn($m)=>array_shift($GLOBALS["zen_script"]),$_);

// translations
$zen_pre[] = fn($_)=>preg_replace('/\{==([^\}]+)\}/',"{=_(\1)}",$_);

// loop
$zen_pre[] = fn($_)=>preg_replace_callback('/\{loop\(\s*(\$\w+)\s+as\s+(\$\w+)\s*\)\s*:\s*\}/',function($m){
  $var = "{$m[2]}_v"; $i = "{$m[2]}_i";
  return "{for($var=reset($m[1]),$m[2]=(object)['length'=>count($m[1])],$i=0;$var!==false;$var=next($m[1]),$i++):
    {$m[2]}->index=$i; {$m[2]}->order=$i+1; {$m[2]}->value=$var; {$m[2]}->key=key($m[1]); {$m[2]}->isFirst=$i==0; {$m[2]}->isLast=$i=={$m[2]}->length-1}";
},$_);
$zen_pre[] = fn($_)=>strtr($_,['{/loop'=>'{endfor','{endloop'=>'{endfor']);

// filters
function zen_if($cond,$echo) { return $cond?$echo:""; }
$zen_pre[] = fn($_)=>preg_replace_callback('/\{=(?!plain)([a-z]+):([^\}]+)\}/',
  fn($m)=>"{=zen_$m[1]($m[2])}",$_);

// blocks
$zen_pre[] = fn($_)=>strtr($_,['{save'=>'{ob_start()']);
$zen_pre[] = fn($_)=>preg_replace('/\{into\s+\$(\w+)/',"{\$\\1=ob_get_clean()",$_);

// htmlspecialchars by default, unless prefixed with plain: or present in <script>
$zen_pre[] = fn($_)=>preg_replace_callback('/\{=((?!html:)[^\}]+)\}([\s]+)/',fn($m)=>"{=htmlspecialchars($m[1]).'$m[2]'}",$_);
$zen_pre[] = fn($_)=>strtr($_,['{=html:'=>'{=']);

// encode curly braces
$zen_post[] = fn($_)=>strtr($_,['§['=>'{',']§'=>'}']);
