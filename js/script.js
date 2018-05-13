$(document).ready(function () {
  console.log("script file is ready!");

  $(".round").arctext({radius: 120});

  $(".addanother").click(function () {
    let song = `
          <div class="row list">
            <div class="col">
                <input type="text" class="form-control" data-id="songUrl" placeholder="Song URL">
              </div>
              <div class="col">
                <input type="text" class="form-control" data-id="songName" placeholder="Song Name">
              </div>
          </div>`;
    $('#songListWrapper').append(song);

  });

// Add another line for new song on the edit modal

  $(".addanother").click(function () {
    let song = `
          <div class="row list">
            <div class="col">
                <input type="text" class="form-control" data-id="songUrl" placeholder="Song URL">
              </div>
              <div class="col">
                <input type="text" class="form-control" data-id="songName" placeholder="Song Name">
              </div>
          </div>`;
    $('#songSingleListWrapper').append(song);

  });

// END OF add another line for new song on the edit modal
  

  $(".nav-link").click(function () {
    $(".step2").hide();
    $(".step1").show();
  });

  $(".nextstep").click(function () {
    $(".step1").hide();
    $(".step2").show();
  });

 

  $("#allplaylist").on("click", ".playicon", function () {
    $(".showhideplayer").slideUp();
    $(".showhideplayer").slideDown();
  });

  $(".playicon").click(function () {
    $(".playiconbig").hide();
    $(".pauseiconbig").show();

    if ($('#rotate').attr('id') == 'rotate2') {
      $('#rotate').attr('id', 'rotate');
    }
  });

  $(".pauseiconbig").click(function () {
    if ($('#rotate').attr('id') == 'rotate') {
      $('#rotate').attr('id', 'rotate2');
    }
    $(".playiconbig").show();
    $(".pauseiconbig").hide();
  });


  $(".playiconbig").click(function () {
    $(".playiconbig").hide();
    $(".pauseiconbig").show();

    if ($('#rotate2').attr('id') == 'rotate2') {
      $('#rotate2').attr('id', 'rotate');
    }
  });

});

// show the placeholder image on modal

function displayImage(elem) {
  var image = document.getElementById("playlistImg");
  console.log(image.src);
  if (elem.value == "") {
    image.src = "images/placeholder.jpg";
  } else {
    image.src = elem.value;
  }
}

  