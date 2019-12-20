$(function() {
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });
  let resultTxt = [];
  scanner.addListener('scan', function (content) {
//    let vals = content.split("\n");
    let seiban = "";
    seiban = content.match(/\d{2}-\w\d{4}-\d{2}\w?/)

    //    vals.forEach(function(elm){
//      seiban = elm.match(/\w{2}-\w{5}-\w{2,3}/)
//      console.log(seiban);
//    });
    if (seiban == null) {
      $('#text-result').text("QRから製番を抽出できません")
      .css("color", "red");
      return;
    }

    document.getElementById( 'sound-file' ).play();
    if ($('#input-1').val() == "") {
      $('#input-1').val(seiban);
    }
    else if ($('#input-2').val() == "") {
      $('#input-2').val(seiban);

      if ($('#input-1').val() == $('#input-2').val()) {
        $('#text-result').text("QRが一致しました")
        .css("color", "white");
        resultTxt.unshift(seiban);
        console.log(resultTxt.join('<br>'));
        $('.result-codes').html(resultTxt.join('<br>'));
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
      alert('カメラが見つかりません');
      console.error('No cameras found.');
    }
  }).catch(function (e) {
    console.error(e);
  });

  $('#clear-button').on('click', function() {
    $('#input-1').val("");
    $('#input-2').val("");
    $('#text-result').text("QRが読み込めます")
  });
  $('#save-button').on('click', function() {
    var blob = new Blob([ resultTxt.join('') ], { "type" : "text/plain" });
    window.URL = window.URL || window.webkitURL;
    console.log("save");
    $(this).attr("href", window.URL.createObjectURL(blob));
  });

  
});
