<?php

    include "phpqrcode/qrlib.php"; 
 
// nama folder tempat penyimpanan file qrcode
$penyimpanan = "temp/";
 
// membuat folder dengan nama "temp"
if (!file_exists($penyimpanan))
 mkdir($penyimpanan);
 
// isi qrcode yang ingin dibuat. akan muncul saat di scan
$isi = 'https://www.malasngoding.com'; 
 
// perintah untuk membuat qrcode dan menyimpannya dalam folder temp
QRcode::png($isi, $penyimpanan."qrcode_saya.png","H"); 
 
echo '<h2>Tutorial Membuat QR Code Dengan PHP</h2>';
 // menampilkan qrcode 
echo '<img src="'.$penyimpanan.'qrcode_saya.png">';
?>