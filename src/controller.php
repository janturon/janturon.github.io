<?php
define(SPOOFED_REFERER, 1);
define(SPOOFED_TARGET, 2);
define(SPOOFED_POST, 3);
define(SPOOFED_VALIDATION, 4);

// defend against form hijacking
$referer = $_SERVER['HTTP_REFERER']??'';
$sameDomain = strtolower(parse_url($referer, PHP_URL_HOST)) == strtolower($_SERVER['HTTP_HOST']);
$target = $_REQUEST['target']??'';
$targetOut = (bool)strpos($target, "://");
if(!$sameDomain && $referer) return attack(SPOOFED_REFERER, $referer);
if($targetOut && $target) return attack(SPOOFED_TARGET, $target);

// form validation
$FORM = $_POST["form"] ?? null;
if(!$FORM) return attack(SPOOFED_POST, $_POST);
$formAuth = [
  "login" => "ed54378776bca02f8d5fd984f34475b4",
]
$attack = formAuth($formAuth);
if($attack) return attack(SPOOFED_VALIDATION, $attack);

// handle valid form data
switch($_POST["form"] ?? null):

case "login":
  formData("login", "pass"); // $login is not empty and $pass is at least 6 chars long
  // handle login form
  $_SESSION["flash"] = "login successfull";
break;

case "register":
  // handle register form
break;

endswitch;

// redirect to requested target (also prevents F5 to resend data)
$redirect = $target ?: $referer ?: "/index.php";
header("Location: $redirect");
?>