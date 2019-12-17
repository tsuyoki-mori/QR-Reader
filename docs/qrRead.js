$(function() {
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
  scanner.addListener('scan', function (content) {
    document.getElementById( 'sound-file' ).play();
    if ($('#input-1').val() == "") {
      $('#input-1').val(content);
    }
    else if ($('#input-2').val() == "") {
      $('#input-2').val(content);

      if ($('#input-1').val() == $('#input-2').val()) {
        $('#text-result').text("QRが一致しました")
        .css("color", "black");
      }
      else {
        $('#text-result').text("QRが一致してません")
        .css("color", "red");
      }
    }

    console.log(content);
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length >= 2) {
      scanner.start(cameras[1]);
    }
    else if (cameras.length >= 1) {
      scanner.start(cameras[0]);
    }
    else {
      console.error('No cameras found.');
    }
  }).catch(function (e) {
    console.error(e);
  });

  $('#clear-button').on('click', function() {
    $('#input-1').val("");
    $('#input-2').val("");
  });

  
});
