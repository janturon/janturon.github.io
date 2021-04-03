<?php

/**
 * Prints args into PHP output in browser-readable format:
 * - it is dumped into <pre class="dump"> block (to be styled)
 * - string contents replace < with &lt; to evade HTML interpretation
 * - it prepends (in bold) file:line and function(args) in which it is called
 */
function dump() {
  $stack = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT, 2);
  $repl = function($arg) {
    $result = str_replace(["\r","\n"," "],'',var_export($arg,1));
    $result = str_replace([",)","<",">"],[")","&lt;","&gt;"], $result);
    return $result;
  };
  $result = array('<pre class="dump"><b>'.$stack[0]["file"].':'.$stack[0]["line"]);
  if(isset($stack[1])) {
    $args = array_map($repl, $stack[1]["args"]);
    $result[] = '<br>function '.$stack[1]["function"].'('.implode(', ',$args).')';
  }
  $result[] = '</b>';
  $args = func_get_args();
  foreach($args as $key=>$var) {
    $result[] = '<br>'.stripslashes(str_replace(["<",">"],["&lt;","&gt;"],var_export($var,1)));
  }
  $result[] = '</pre>';
  return implode('', $result);
}

function log($file, $line) {
  $line = trim($line);
  if($line) file_put_contents($file, $line."\n", FILE_APPEND);
}


class debug {
  protected static $bars = [];
  protected static $atts = [];
  protected static $prepend = [];
  protected static $builds = [];

  static function bar($name, $value, $callback=null) {
    if(!isset(self::$bars[$name])) self::$bars[$name] = array();
    self::$bars[$name][] = $callback ? call_user_func($callback, $value) : $value;
  }

  static function attribute($name, $attribute, $value) {
    if(!isset(self::$atts[$name])) self::$atts[$name] = [];
    if(isset(self::$atts[$name][$attribute])) self::$atts[$name][$attribute].= ' '.$value;
    else self::$atts[$name][$attribute] = $value;
  }

  static function prepend($name, $code) {
    if(!isset(self::$prepend[$name])) self::$prepend[$name] = $code;
    else self::$prepend[$name].= $code;
  }

  static function build($name, $callback) {
    self::$builds[$name] = $callback;
  }

  static function show() {
    echo '<div id="debugbar">';
    foreach(self::$bars as $name=>$bar) {
      $bar = array_unique($bar);
      $items = count($bar);
      $atts = [];
      if(isset(self::$atts[$name])) foreach($atts[$name] as $key=>$val) $atts[] = "$key=\"$val\"";
      echo '<details><summary';
      if(!empty($atts)) echo ' '.implode(" ",$atts);
      echo '>';
      if(isset(self::$prepend[$name])) echo self::$prepend[$name];
      echo $name;
      if($items) echo " ($items)";
      echo '</summary>';
      if($items && isset(self::$builds[$name])) $items = call_user_func(self::$builds[$name], $bar);
      if(!$items) goto loop;
      echo '<div>';
      foreach($bar as $item) echo "<div>$item</div>";
      echo '</div>';
      loop:
      echo '</details>';
    }
    echo '</div>';
  }

  static function dump() {
    foreach(func_get_args() as $value) self::bar("Dumps", $value, dump);
  }

  static function log($file, $line="") {
    log($file, $line);
    self::bar("Logs", $file);
  }

  static function log_build($bars) {
    $result = [];
    foreach($bars as $bar) {
      $item = "<b>$file</b><br>";
      $contents = file_get_contents($file);
      $item.= nl2br(htmlspecialchars($contents,false));
      $result[] = $item;
    }
    return $result;
  }

  static function log_clear($file) {
    self::bar("Logs", $file);
    file_put_contents($file, "");
  }

}

debug::build("Logs", debug::log_build);
register_shutdown_function(debug::show);
?>