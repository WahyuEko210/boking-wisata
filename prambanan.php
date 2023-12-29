<?php 
    require "koneksi.php";
    include "phpqrcode/qrlib.php"; 

    $query = mysqli_query($con, "SELECT * FROM tiket");
    $jumlahtiket = mysqli_num_rows($query);

    $queryKategori = mysqli_query($con, "SELECT * FROM Kategori");
    $data = mysqli_fetch_array($queryKategori);

	$queryBoking = mysqli_query($con, "SELECT * FROM boking");
  $bo = mysqli_fetch_array($queryBoking);

  function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString='';
    for ($i=0; $i < $length; $i++) { 
        $randomString .=$characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Prambanan Ticket</title>
<link rel="shortcut icon" type="image/x-icon" href="https://borobudurpark.com/wp-content/themes/borobudurvillage/assets/images/twc-fav.png" />
<link href="assets/css/bootstrap.css" rel="stylesheet">
<script src="assets/js/jquery.js"></script>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="fontawesome/css/fontawesome.min.css">
</head>

<style>
  .deskop {
    background: #FFF3B0;
    top:0px;
  }

  .warna {
    color: #6c4380;        
  }

  .rectangle-16 {
    background: #4a4848;
    height: 10px;
  }

  .bgr {
    background: #65cef1;
  }

  .nwd {
    left: 500px;
    height: 70px;
  }

  form div{
    margin-bottom: 10px;
  }

  .decoration{
    text-decoration: none;
  }

  .f {
	margin-left: 320px;
  }

  .table {
    width: 300px;
  }
   
    
</style>

<body class="bgr">
<div class="deskop">
		<div class="container">
			<div class="mt-3 d-flex justify-content-between">
			<H1>Candi Prambanan - Pelataran</H1>
			<a class="mt-3">
			<img class="nwd" src="images/wi.png" />
			</a>
			</div>
		<h3 class="warna">Prambanan Temple</h3>
		</div>
		<div class="rectangle-16 col-12"></div>
  	</div>

<div class="mt-5">
<form class="form-horizontal" action="" method="post" enctype="multipart/form-data">

<div class="form-group">
  <label class="col-lg-3 control-label"><b>Nama</b></label>
  <div class="col-lg-4">
    <input type="text" step="any" min="0" name="nama" id="nama" class="form-control" >
  </div>
</div>

<div class="form-group">
          <label class="col-lg-3 control-label"><b>Tanggal: </b></label> 
    <div class="col-lg-4">
          <input type="date" step="any" name="tanggal" id="tanggal" class="form-control">
    </div>
</div>

<div class="form-group">
  <label class="col-lg-3 control-label"><b>Harga</b></label>
  <div class="col-lg-4">
    <input type="text" step="any"  name="harga" id="harga" class="form-control" value=" <?php echo $data['harga']; ?>" Readonly >
  </div>
</div>

<div class="form-group">
  <label class="col-lg-3 control-label"><b>Jumlah Tiket</b></label>
  <div class="col-lg-4">
    <input type="text" step="any" min="0" name="qty" id="qty" class="form-control" value="0">
  </div>
</div>

<div class="form-group">
  <label class="col-lg-3 control-label"><b> Total</b></label>
  <div class="col-lg-4">
    <input type="text" name="total" id="total" class="form-control" Readonly value="0">
  </div>
</div>

<div class="f">
  <div class="col-lg-5">
    <div class="d-flex justify-content-between">
      <a href="home/index.php" class="text-black decoration">
      <i class="fa fa-arrow-circle-left"></i><b> Kembali</b></a>
      <div>
      <button type="submit" class="btn btn-success" name="pesan" > Pesan</button>
      </div>
    </div>
  </div>
  
</form>

<?php
                        if (isset($_POST['pesan'])) {

                                $nama = htmlspecialchars($_POST['nama']);
                                $tanggal = htmlspecialchars($_POST['tanggal']);
                                $harga = htmlspecialchars($_POST['harga']);
                                $qty = htmlspecialchars($_POST['qty']);
                                $total = htmlspecialchars($_POST['total']);

                                $query= mysqli_query($con, "INSERT INTO boking (nama, tanggal, harga, qty, total) VALUE ('$nama','$tanggal','$harga','$qty','$total')");

                                  ?>
                                <meta http-equiv="refresh" content="1; url=prambanan.php">
                                <?php
                                
                        }
        ?>

</div>
<div class="table-responsive">
  <table class="table" >
    <thead>
      <tr> 
      <th>Nama</th>
      <th>Action</th>
      </tr>
    </thead>
    <tbody>

    <?php  
     
    while ($bo = mysqli_fetch_array($queryBoking)){
    ?>
      <tr>
        <td><?php echo $bo['nama']; ?></td>
        <td><a href="detail.php?p=<?php echo $bo['nama']; ?>"
        class="btn btn-info"><i class="fa fa-angle-double-right"></i></a></td>      
      </tr>
    <?php
    }
    ?>

    </tbody>
  </table>
</div>
<div class="qr container mt-12 col-12">
  <?php
  $penyimpanan = "temp/";
  if (!file_exists($penyimpanan))
   mkdir($penyimpanan);

    $qty = 'http://localhost/Wisata%20Online/home/index.php';
    $name=generateRandomString(20);
    QRcode::png("$qty","$name".".png","H",4,4);
  ?>
</div>
<script src="bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="fontawesome/js/all.min.js"></script>
</body>
</html>

<script type="text/javascript">
 $("#harga").keyup(function(){   
   var a = parseFloat($("#harga").val());
   var b = parseFloat($("#qty").val());
   var c = a*b;
   $("#total").val(c);
 });
 
 $("#qty").keyup(function(){
   var a = parseFloat($("#harga").val());
   var b = parseFloat($("#qty").val());
   var c = a*b;
   $("#total").val(c);
 });
</script>