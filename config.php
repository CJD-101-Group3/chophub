<?php
$local_ips = ['127.0.0.1', '::1'];
$isLocal = in_array($_SERVER['REMOTE_ADDR'] ?? '', $local_ips, true) ||
    ($_SERVER['HTTP_HOST'] ?? '') === 'localhost';

if ($isLocal) {
    define("DB_HOST_LOCAL", "127.0.0.1");
    define("DB_USER_LOCAL", "root");
    define("DB_PSW_LOCAL", "");
    define("DB_NAME_LOCAL", "chophub");
    define("DB_PORT_LOCAL", 3306);
} else {
    define("DB_HOST", "127.0.0.1");
    define("DB_USER", "tibamefe_since2021");
    define("DB_PSW", "vwRBSb.j&K#E");
    define("DB_NAME", "tibamefe_cjd101g3");
    define("DB_PORT", 3306);
}
?>