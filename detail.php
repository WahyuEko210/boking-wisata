<?php
$id = $_GET['p'];

    require "koneksi.php";
    include "phpqrcode/qrlib.php"; 

	$queryBoking = mysqli_query($con, "SELECT * FROM boking WHERE nama='$id'");
    $bo = mysqli_fetch_array($queryBoking);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ticket</title>
<link rel="shortcut icon" type="image/x-icon" href="https://borobudurpark.com/wp-content/themes/borobudurvillage/assets/images/twc-fav.png" />
<link href="assets/css/bootstrap.css" rel="stylesheet">
<script src="assets/js/jquery.js"></script>
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="fontawesome/css/fontawesome.min.css">
</head>

<style>
    .sukses {
        margin-left: 500px;
    }
</style>

<body>

<div class=" border mt-5">
<form class="form-horizontal" action="home/index.php" method="post">
  <div class="form-group">
		<label class="col-lg-3 control-label"><b>Nama</b></label>
		<div class="col-lg-4">
			<input type="text" step="any" min="0" name="nama" id="nama" class="form-control" value=" <?php echo $bo['nama']; ?>" Readonly>
		</div>
	</div>
	<div class="form-group">
            <label class="col-lg-3 control-label"><b>Tanggal: </b></label> 
			<div class="col-lg-4">
            <input type="text" step="any" name="tanggal" id="tanggal" class="form-control" value=" <?php echo $bo['tanggal']; ?>" Readonly>
			</div>
          </div>
	<div class="form-group">
		<label class="col-lg-3 control-label"><b>Harga</b></label>
		<div class="col-lg-4">
			<input type="text" step="any" min="0" name="harga" id="harga" class="form-control" value=" <?php echo $bo['harga']; ?>" Readonly >
		</div>
	</div>
	<div class="form-group">
		<label class="col-lg-3 control-label"><b>Jumlah Tiket</b></label>
		<div class="col-lg-4">
			<input type="text" step="any" min="0" name="qty" id="qty" class="form-control" value=" <?php echo $bo['qty']; ?>" Readonly>
		</div>
	</div>
	<div class="form-group">
		<label class="col-lg-3 control-label"><b> Total</b></label>
		<div class="col-lg-4">
			<input type="text" name="total" id="total" class="form-control" value=" <?php echo $bo['total']; ?>"  Readonly >
		</div>
	</div>
    <center class="container">
    <div class="col-lg-6">
    <?php
     echo '<img src="p.png">';
     ?>
     </div>
     </center>

     <div class="sukses container mt-5">
	<button class=" btn btn-success" type="submit">Selesai</button>
    </div>
     
</form>
</div>
<script src="bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="fontawesome/js/all.min.js"></script>
</body>
</html>