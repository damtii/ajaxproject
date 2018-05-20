$(document).ready(function () {
  console.log("api script file is ready!");


  $(".showhideplayer").hide(); // hiding the main player by default. 





    function showAllPlaylist () {

  $.get("http://localhost:8080/ajaxproject/api/playlist", function (data, status) {
    let myresults = "";
    let mainPlayerContent = '';
    let name = '';
    let image = '';
    let id = 0;
    let songs = 'songs';
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
                                        <i class="fas fa-play-circle" data-id=${id}></i>                        
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

      mainPlayerContent = `
  <!-- start of main player -->
  
    <div class="playerEditDeleteIcons"></div>
    <div class="mainplayer">
        <div class="row">
            <div class="col-sm-4">  
                    <div class="playiconbig">
                        <a href="#play">
                            <i class="fas fa-play-circle"></i>                        
                        </a>
                    </div>                 
                    <div class="col-sm-12 mx-auto pauseiconbig">
                        <a href="#pause">
                            <i class="fas fa-pause-circle"></i>                       
                        </a>
                    </div> 
  
                    <div class="roundimage" id="rotate"></div>             
            </div>
            <div class="col-sm-8 playerRightSide">
                
            </div>
        </div>
    </div>
  <!-- end of main player -->
  `;
    }

    $('.showhideplayer').html(mainPlayerContent); // loading the main player to the HTML 
    $("#allplaylist").html(myresults); // Loading the playlists to the HTML

    // make the title round
    $(".round").arctext({radius: 120});


    // change the play icon to pause icon
    $(".playicon").click(function () {        
      $(".playiconbig").hide();
      $(".pauseiconbig").show();
    });

    // show on the player the right info of the selected playlist

    $('.arc-wrapper').click(function () {

        let id = $(this).find('.editicon a').attr('data-id');
        let idToChange = `
        <span class="myplayericons" data-toggle="modal" data-id="${id}" data-target="#editPlaylistSongs">                   
            <i class="fas fa-pencil-alt" data-id='${id}'></i>                                             
        </span>
        <br>
        <span class="myplayericons" data-toggle="modal" data-id="${id}" data-target="#deletePopup">                                           
            <i class="fas fa-trash" data-id="${id}"></i>                        
        </span>        
        `;
        $('.playerEditDeleteIcons').html(idToChange);

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

    $('input').val(""); //reset the values of the fields 

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

// edit the playlist info

$( "div" ).on( "click", ".fa-edit", function() {  
    var id = $(this).attr('data-id');
    var myresults = "";
    var name = '';
    var image = '';
               
    $.get(`http://localhost:8080/ajaxproject/api/playlist/${id}`, function (data, status) {   
            
        name = data['data']['name'];
        image = data['data']['image'];         
        id = data['data']['id'];   
       
        $('#playlistSingleName').val(name);
        $('#playlistSingleUrl').val(image);
        $('#playlistSingleImg').attr('src', image);

        });   
  });

   // End of edit the playlist info


// updating the playlist name and image and saving in DB

$( "div" ).on( "click", ".fa-edit", function() {  
    var id = $(this).attr('data-id');

$('#updatePlaylist').click(function () {
    let playlistSingleName = $('#playlistSingleName').val();
    let playlistSingleUrl = $('#playlistSingleUrl').val();   
    let data = {
      "name": playlistSingleName,
      "image": playlistSingleUrl      
    };
$.ajax({
    type: "POST",
    url: `http://localhost:8080/ajaxproject/api/playlist/${id}`,
    data: data,      
    success: function (data, status){      

//adding the get call in order to see the new added playlist

    $('input').val(""); //reset the values of the fields 
    showAllPlaylist();
    },     
    failure: function(errMsg) {
      alert("error on sending JSON");     
  }
  });    
}); 
}); 



// END OF updating the playlist name and image

// appending song to the last line

function appendSong(songFromApi){

    let song = `
          <div class="row list">
            <div class="col">
                <input type="text" class="form-control" value="${songFromApi.url}" data-id="songUrl" placeholder="Song URL">
              </div>
              <div class="col">
                <input type="text" class="form-control" value="${songFromApi.name}" data-id="songName"  placeholder="Song Name">
              </div>
          </div>`;

    $('#songSingleListWrapper').append(song);
}

// Update the song list of a single playlist

$( "div" ).on( "click", ".fa-pencil-alt", function() {  
    let id = $(this).attr('data-id');
    $('#songSingleListWrapper').html(''); // removing the input fields so there won't be first empty line.
    let songName = '';
    let songUrl = '';
          
    $.get(`http://localhost:8080/ajaxproject/api/playlist/${id}/songs`, function (data, status) {           
        for (let item in data['data']['songs']) {
        let mydata = data['data']['songs'][item];       
        appendSong(mydata); //using the function to append the songs. 
        }
    });             
// END OF Update the song list of a single playlist

// saving the updated songs list
$('#saveSinglePlayList').click(function () {

let songs = [];
$('#songSingleListWrapper').children().each(function (index) {
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
  "songs": songs
};

$.ajax({
    type: "POST",
    url: `http://localhost:8080/ajaxproject/api/playlist/${id}/songs`,
    data: data,      
    success: function (data, status){      
    },     
    failure: function(errMsg) {
      alert("error on sending JSON");     
  }
        });
    });
});


// END OF saving the updated songs list




function PauseSong() {
    $('#audio').trigger('Pause');
}


// Update the song list of a single playlist

$( "div" ).on( "click", ".fa-play-circle", function() {     
    let id = $(this).attr('data-id');
    let songName = '';
    let songUrl = '';
    let allSongs = [];

    function appendSongList(songFromData){
        var songDetails = `<li class="playThisSong" songItemUrl='${songFromData.url}' songItemName='${songFromData.name}'>${songFromData.name}</li>`;
        $('.songsOfPlaylist').append(songDetails);
    }

          
    $.get(`http://localhost:8080/ajaxproject/api/playlist/${id}/songs`, function (data, status) {           
        
        let firstSongUrl = data['data']['songs'][0].url; 
        let firstSongName = data['data']['songs'][0].name; 

        let results = `
        <div class="myplayer">
            <audio id="audio" controls autoplay>
                <source id="src" src="${firstSongUrl}" type="audio/mpeg">             
                Your browser does not support the audio element.
            </audio>
        </div>  

        <div class="belowplayer">                                
            <p id="songName">Now Playing: ${firstSongName}</p>
                <ol class="songsOfPlaylist"></ol> 
        </div>        
        `;

        $('.playerRightSide').html(results);
        
        $('#audio').bind('ended', function(){
            // alert('song end!!!');
        });        

        for (let item in data['data']['songs']) {
            allSongs = data['data']['songs'][item];   
            appendSongList(allSongs);
            }
        
    });
// END OF Update the song list of a single playlist

//  on click on any item, the right song will be played. 

$( "div" ).on( "click", ".playThisSong", function() {     
    let href = $(this).attr('songItemUrl');    
    let name = $(this).attr('songItemName'); 

    $('audio').attr('src', href) //changing song URL
    $('#songName').text(`Now Playing: ${name}`);    // changing song name

    
    $('#audio').bind('ended', function(){
        // alert('song end!!!');         
    });        

});

}); 
    
// search box functions 

$('#searchBox').keyup(function(){

    if($('#searchBox').val().length >2){
    $('#allplaylist').html('');
    let searchTextByUser = $('#searchBox').val();
    let expression = new RegExp(searchTextByUser, 'i');
    $.get("http://localhost:8080/ajaxproject/api/playlist", function (data, status) {

        for (let item in data['data']) {            
            name = data['data'][item]['name'];
            image = data['data'][item]['image'];
            songs = data['data'][item]['songs'];
            id = data['data'][item]['id'];           
            let myresults='';
        
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
                                    <i class="fas fa-play-circle" data-id=${id}></i>                        
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
        if(name.search(expression) != -1) {                        
            $('#allplaylist').append(myresults);
        } 
    }      
    });

}else {
    showAllPlaylist();
}
});



});