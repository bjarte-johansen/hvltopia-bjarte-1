<?
	require_once("less.inc.php");
	
	$less = new lessc;
	$less->compileFile("merged.less", "merged.css");
	
	header('Content-Type: text/css');
	include("merged.css");
?>