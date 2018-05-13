$(document).ready(function () {
  console.log("api script file is ready!");

    function showAllPlaylist () {

  $.get("http://localhost:8080/ajaxproject/api/playlist", function (data, status) {
    var myresults = "";
    var name = '';
    var image = '';
    var id = 0;
    var songs = 'songs';
    for (let item in data['data']) {
      name = data['data'][item]['name'];
      image = data['data'][item]['image'];
      songs = data['data'][item]['songs'];
      id = data['data'][item]['id'];

      myresults += `       
                <div class="col-sm-3 mx-auto">
                    <div class="container text-center">
                        <div class="arc-wrapper">
                            <h3 class="round">${name}</h3>                 
                            <div class="overlay">  
                                <div class="row">                                                                      
                                    <div class="col-sm-6 mx-auto editicon">                                                                        
                                        <a href="#edit" data-toggle="modal" data-id=${id} data-target="#editPlaylist">                   
                                            <i class="far fa-edit" data-id=${id}></i>                                           
                                        </a>                                        
                                    </div> 
                                    <div class="col-sm-6 mx-auto deleteicon"> 
                                        <a href="#delete" data-toggle="modal" data-id=${id} data-target="#deletePopup">                                           
                                            <i class="fas fa-trash" data-id=${id}></i>                        
                                        </a>
                                    </div>  
                                </div>                  
                                <div class="col-sm-12 mx-auto playicon">
                                    <a href="#play">
                                        <i class="fas fa-play-circle"></i>                        
                                    </a>
                                </div> 
                                
                                
                            </div>
                            <div class="image">
                                <img src="${image}" class="rounded-circle" alt="${name}" >
                            </div>                
                        </div>
                    </div> 
                </div>               
                `;
    }
    $("#allplaylist").html(myresults);

    // make the title round
    $(".round").arctext({radius: 120});


    // change the play icon to pause icon
    $(".playicon").click(function () {        
      $(".playiconbig").hide();
      $(".pauseiconbig").show();
    });

    // show on the player the image of the playlist

    $('.arc-wrapper').click(function () {
      let image = $(this).find('.image img').attr('src');
      let imageToChange = `<img src="${image}">`;
      $('#rotate').html(imageToChange);
      if ($('#rotate2')) {
        $('#rotate2').html(imageToChange);
        $('#rotate2').attr('id', 'rotate');
      }
    });

  });
};
showAllPlaylist();

//   saving new playlist

  $('#savePlayList').click(function () {

    let playListName = $('#playlistName').val();
    let playListUrl = $('#playlistUrl').val();
    let songs = [];
    $('#songListWrapper').children().each(function (index) {

      let songName = '';
      let songUrl = '';
      $('input', $(this)).each(function () {
        if ($(this).data("id") === 'songUrl') {
          songUrl = $(this).val();
        }
        if ($(this).data("id") === 'songName') {
          songName = $(this).val();
        }
      });
      songs.push({"name": songName, "url": songUrl});
    });


    let data = {
      "name": playListName,
      "image": playListUrl,
      "songs": songs
    };


    $.ajax({
      type: "POST",
      url: 'http://localhost:8080/ajaxproject/api/playlist',
      data: data,      
      success: function (data, status){
        console.log(data);

//adding the get call in order to see the new added playlist

        showAllPlaylist();

      },     
      failure: function(errMsg) {
        alert("error on sending JSON");     
    }
    });    

  });



// Delete single playlist
      

      $( "div" ).on( "click", ".fa-trash", function() {          
        let id = $(this).attr('data-id');
        // alert(id);
        
        function deletePlaylist(){

        $.ajax({
            url: `http://localhost:8080/ajaxproject/api/playlist/${id}`,
            type: 'DELETE',
            success: function(result) {                  
                showAllPlaylist();                            
            }
        });
    }
    $('.deletePlaylist').click(function () { 
        deletePlaylist();
    });
});

//End Of Delete single playlist



$( "div" ).on( "click", ".fa-edit", function() {  
    let id = $(this).attr('data-id');
        //  alert(id); 
    $.get(`http://localhost:8080/ajaxproject/api/playlist/${id}`, function (data, status) {
        console.log(data);
        let myresults = "";
        let name = '';
        let image = '';
        let id = 0;        
        
        name = data['data']['name'];
        image = data['data']['image'];         
        id = data['data']['id'];                
        });        
  });


















});