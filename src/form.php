<?php
/**
 * Return trimmed $_POST[$key], default if it doesn't exist
 * Values should be only strings, but PHP servers oftentimes interpret var[] as an array
 * @param array $post used internally only for recursion for array values
 * can be used in pattern if($login=POST("login")) ...
 * the above code won't pass the condition for '0', spaces-only, '' and [] values
 * if these values should be accepted, the pattern could be if($data=POST("data") or $data!==null) ...
 */
function POST($key, $default=null, $post=null) {
  if($post===null) $post = $_POST;
  if(!isset($post[$key])) return $default;
  if(is_array($post[$key])) {
    foreach($post[$key] as $k=>$v) $post[$key][$k] = POST($k, $default, $post[$key]);
    return $post[$key];
  }
  else return trim($post[$key]);
}

/**
 * Return trimmed $_POST[$key] validated against $pattern, null if it doesn't exist or doesn't pass
 * @param string $pattern = <P>[<from>][to<to>][<value>]
 *  P: I=integer, N=natural, F=float, S=string, C=CSV, R=regex; lowercase (infs) means falsy values allowed
 *  from: for INF minimal numeric value, for S minimal string length, for CR not applicable
 *  to:   for INF maximal numeric value, for S maximal string length, for CR not applicable
 *  value: for INFS not applicable, for C comma separated allowed values, for R regex to match against
 * @param array $post used internally only for recursion for array values
 */
function POST_validate($key, $pattern, $post=null) {
  // handle arrays
  if($post===null) $post = $_POST;
  if(!isset($post[$key])) return null;
  if(is_array($post[$key])) {
    foreach($post[$key] as $k=>$v) $post[$key][$k] = POST_validate($k, $pattern, $post[$key]);
    return $post[$key];
  }

  // handle strings: $value, $type, $empty_ok
  $value = trim($post[$key]);
  $type = $pattern[0];
  $empty_ok = ctype_lower($type);
  if(!$empty_ok && empty($value)) return null;
  $type = strtolower($type);
  $pattern = substr($pattern, 1);

  // read $from and $to (not applicable in csv or regex)
  if($type!="c" && $type!="r") {
    $from = $to = $pos = 0;
    if(sscanf($pattern, "%d%n", $from, $pos)==2) $pattern = substr($pattern, $pos);
    if(sscanf($pattern, "to%d%n", $to, $pos)==2) $pattern = substr($pattern, $pos+2);
  }

  // validate POST value
  switch($type) {
    case "i": // integer
    case "n": // natural
    case "f": // float
      if($value!=(float)$value) return null;
      if($from && $value<$from) return null;
      if($to!==false && $value>$to) return null;
      if($type=="i" && $value!=(int)$value) return null;
      if($type=="n" && $value<($empty_ok?0:1)) return null;
      break;
    case "s": // string
      $len = strlen($value);
      if($from && $len<$from) return null;
      if($to && $len>$to) return null;
      if(!$empty_ok && $len==0) return null;
      break;
    case "c": // csv
      $values = str_getcsv($pattern);
      if(!in_array($value, $values)) return null;
      break;
    case "r": // regex
      if(!preg_match("/$pattern/", $value)) return null;
      break;
  }
  return $value;
}

/**
 * Process POST data
 * @param string arg[0] value of $_POST["form"]
 * @param string arg[1+] keys for POST data to validate in format [<pattern>:]<key>
 *  <key> validates if POST[key] was sent
 *  <pattern> if provided, validates iff POST[key] validates against pattern (see POST_validate function)
 *  validated keys are exported into global context
 * @param bool|string arg[last]
 *  false=ignore
 *  true=print MD5 hash (and validate as false)
 *  string[32]=validate form also against MD5 hash
 *  string[not(32)]=treat as arg[1+] and don't validate against MD5 hash
 * @return true iff all data for given form are validated, false iff form was not sent, array if invalid:
 *  int code: 1=invalid POST data, 2=invalid form hash
 *  string form: the name of invalid form
 *  IP ip: IP from which the invalid form came from
 *  int time: unix timestamp of the invalid request
 *  string key (for code=1): the name of the first invalid POST variable
 *  string val (for code=1): the value of the first invalid POST variable
 *  string hash (for code=2): the hash of the invalid form
 */
function FORM() {
  if(empty($_POST)) return false;
  $args = func_get_args();
  $form = array_shift($args);
  if(POST("form")!=$form) return false;
  $last = end($args);
  $hash = empty($last) ? false : strlen($last)==32 ? array_pop($args) : true;
  $imprint = [];
  foreach($args as $arg) if(!is_bool($arg)) foreach($_POST as $key=>$val) {
    $hashed = strpos($key,":")!==false;
    if($hashed) list($type,$name) = explode(":", $key, 2);
    else $name = $key;
    if($name!=$arg) continue;
    if($hashed) $imprint[] = $key;
    $val = $hashed ? POST_validate($key,$type) : POST($key);
    Guarantee::check($val===null, PWF_INVALID_REQUEST, ["code"=>1,"form"=>$form,"ip"=>$_SERVER["REMOTE_ADDR"],"time"=>time(),"key"=>$key,"val"=>POST($key)]);
    $GLOBALS[$name] = $val;
  }
  if($hash) {
    $code = md5(implode(";", $imprint));
    if($hash===true) print_r($code);
    Guarantee::check($code!=$hash, PWF_INVALID_REQUEST, ["code"=>2,"form"=>$form,"ip"=>$_SERVER["REMOTE_ADDR"],"time"=>time(),"hash"=>$code]);
  }
  return true;
}
?>