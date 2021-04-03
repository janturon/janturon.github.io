<?
class Guarantee extends Exception {
  public $data;
  function __construct($code, $data) {
    parent::__construct("Guarantee Exception", $code);
    $this->data = $data;
  }
  static function check($assert, $code, $data) {
    if(!$assert) throw new Guarantee($code, $data);
  }
}
?>