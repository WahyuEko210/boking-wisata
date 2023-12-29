<div class="qr container mt-12 col-12">
  <?php
  $penyimpanan = "temp/";
  if (!file_exists($penyimpanan))
   mkdir($penyimpanan);

    $qty = 'Tiket Wisata';
    $name=generateRandomString(20);
    QRcode::png("$qty","$name".".png","H"); 
    move_uploaded_file($_FILES["qr"]["tmp_name"],"$name".".png" );
 
  echo '<img src="p.png">';
  ?>
</div>