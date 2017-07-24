


var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon



 var songs = [{
        'name': 'Tere Sang Yaara',
        'artist': 'Atif Aslam',
        'album': 'Rustom',
        'duration': '4:51',
       'fileName': 'song1.mp3',
	   		'image': 'song1.jpg'
    },
    {
        'name': 'Tankha',
        'artist': 'Ranjit Bawa',
        'album': 'Tankha',
        'duration': '2:58',
        'fileName': 'song2.mp3',
		'image': 'song2.jpg'
    },
    {
        'name': 'Tutti Yaari',
        'artist': 'A Kay',
        'album': 'Tutti Yaari',
        'duration': '3:56',
        'fileName': 'song3.mp3',
		'image': 'song3.jpg'
    },
    {
        'name': 'This is what you came for',
        'artist': 'Calvin Harris, Rihanna',
        'album': 'This is what you came for',
        'duration': '3:42',
        'fileName': 'song4.mp3',
		'image': 'song4.jpg'
    },
	{
        'name': 'Shape of You',
        'artist': 'Ed Sheeran',
        'album': 'Divide',
        'duration': '4:23',
        'fileName': 'song5.mp3',
		'image': 'song5.jpg'
    },
	{
        'name': 'Despacito',
        'artist': 'Luis Fonsi, Daddy Yankee',
        'album': 'Despacito & Mis Grandes Éxitos',
        'duration': '4:41',
        'fileName': 'song6.mp3',
		'image': 'song6.jpg'
    }];



	function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
	
	
	/*Humne ek function banaya, 
	usme code likha, ab hum function ko call kareingey, dobaara code likhne k bajaaye,
	jab bhi same code ka use fir se hoga*/
	function toggleSong() {
		var song = document.querySelector('audio');
		//== will compare the both sides
		if(song.paused === true) {
		//console also used to debug the code
		console.log('Playing');
		$('.play-icon').removeClass('fa-play').addClass('fa-pause');
		song.play();
		

		
			
		}
		else {
		console.log('Pausing');
		$('.play-icon').removeClass('fa-pause').addClass('fa-play');
		song.pause();
		}
		}
		
		function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image);
    $('.current-song-name').text(songObj.name);
    $('.current-song-album').text(songObj.album);
		}
		function updateCurrentTime() {
			var song = document.querySelector('audio');
			//console.log(song.currentTime);
			//console.log(song.duration);
			var currentTime = Math.floor(song.currentTime);
			/*we call the function called 'fancyTimeFormat'
			We pass it the currentTime
			Whatever value it returns,
			we catch it in the same variable*/
			currentTime = fancyTimeFormat(currentTime);
			var duration = Math.floor(song.duration);
			duration = fancyTimeFormat(duration);
			$('.time-elapsed').text(currentTime);
			$('.song-duration').text(duration);

			}
			
			
			function probarfill(){
									var elm = document.querySelector('audio');
									var cur = elm.currentTime;
									var dur = elm.duration;																					
									var percentage = (cur/dur)*100;
									$("#progress-filled").css('width',percentage + "%");												
			}
			
			
			
			
			function addSongNameClickEvent(songObj,position) {
			 var songName = songObj.fileName; // New Variable
				var id = '#song' + position;
			$(id).click(function() {
			var audio = document.querySelector('audio');
			var currentSong = audio.src;
			if(currentSong.search(songName) !== -1)
			{
			toggleSong();
			}
			else {
			audio.src = songName;
			toggleSong();
			  changeCurrentSongDetails(songObj); // Function Call
			}
			
			});
			}
			



/*This means, 1. Wait for the website to load
2. Once it has loaded, run everything that is in the function
time will be  updated after every second*/
			window.onload = function() {

			changeCurrentSongDetails(songs[1]);
			
			updateCurrentTime();
			setInterval(function(){
			updateCurrentTime();
			probarfill();
			},1000);
			
			
			
			
			$('#songs').DataTable({
        paging: false
			});
			};
			
		/*///////////////////////////////////////////////////////// added class to backward song code /////////////////////////////////////////////////	
			$('.fa-step-backward').on('click',function() {
			if (current-duration===duration){}
			else
			x =	current-duration;
			y = duration;
			for(x<y;x=y){	
			timejump();
			}
			}
			
			///////////////////////////////////////////////////////////////   ending   ////////////////////////////////////////////////////////////////*/
			$('.fa-repeat').on('click',function() {
         $('.fa-repeat').toggleClass('disabled');
        willLoop = 1 - willLoop;
            });
			
			$('.fa-random').on('click',function() {
         $('.fa-random').toggleClass('disabled');
         willShuffle = 1 - willShuffle;
           });
		   
		   function timeJump() {
    var song = document.querySelector('audio');
    song.currentTime = song.duration - 5;
}
		   
		   
		  $('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if(currentSongNumber < 4) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop === 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
});

var nextSongNumber = randomExcluded(1,4,currentSongNumber);
function randomExcluded(min, max, excluded) {
    var n = Math.floor(Math.random() * (max-min) + min);
    if (n >= excluded) n++;
    return n;
}





/* as soon as our website is loaded, 
updateCurrentTime runs and 
then after every second, 
setInterval makes it run again*/
			

    for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
       addSongNameClickEvent(obj,i+1);
    }
			
			
			

	/* jquery ne kisi tag ki welcome-screen
	ke andar kisi button class ko dhundha aur uspe on click 
	function lgaya mtlb click krne pe kuch hoga*/
		$('.welcome-screen button').on('click', function() {
	/*jquery ne kisi id name-input ki value ek message 
	naam ke variable me store kar di*/
        var name = $('#name-input').val();
	/*agr name ki length 2 se jada hai
	tab ek message show hoga welcome "name"*/
        if (name.length > 2) {
            var message = "Welcome, " + name; 
			$('.main .user-name').text(message);
	/*jquery ne kisi main class me user-name class 
	ke text me message ki value daal di*/
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
        } else {
	/*agr name ki length 2 se kam hai to
	input pe ek red color ka border aa jayega mtlb error*/
            $('#name-input').addClass('error');
        }
    });
	
	
    $('.play-icon').on('click', function() {
        toggleSong(); 
    });
	
	/*jQuery ne puri body pe keypress event lgaya
	jis se ab space dbane pe bhi gana play or 
	pause ho skta hai*/
        /* $('body').on('keypress', function(event) {
	//keycode of space bar in javascript is 32
                if (event.keyCode == 32) {
                  toggleSong();   
				  
            }
			}); */
		$('body').on('keypress',function(event) {
			var target = event.target;
			if (event.keyCode === 32 && target.tagName !=='INPUT')
			{
				toggleSong();
			}
				});	











		////////////////////////////////////////////////////////////////////// vegas setup/////////////////////////////////////







				
				
			$(function() {
  $.vegas({
    src:'img/b11.jpg'
  })('overlay', {
    src:'vegas/overlays/13.png'
  });
});








$.vegas('slideshow', {
backgrounds:[
{ src:'img/b11.jpg' },
{ src:'img/song2.jpg' },
{ src:'img/song3.jpg' }
]
})('overlay');



	$.vegas.defaults ={
  background: {
    src:         null, // defined by Css
    align:       'center',
    valign:      'center',
    fade:        0,
    loading:      true,
    load:        function(){},
    complete:    function(){}
	},
  slideshow: {
    step:        0,
    delay:       5000,
    backgrounds: [],
    preload:     true,
    walk:        function(){}
  },
  overlay: {
    src:         "vegas/jquery.vegas.css", // defined by Css 
    opacity:     null  // defined by Css 
  }
}












// its vegas plugin//////////////////////////////////////////////////////////////////////////*/	
/*	$(function() {
  $.vegas({
    src:'img/b11.jpg'
  });
  $.vegas('overlay', {
    src:'vegas/overlays/13.png'
  });
});			
			


$.vegas.defaults = {
  background: {
    src:         null, // defined by Css
    align:       'center',
    valign:      'center',
    fade:        0,
    loading:      true,
    load:        function(){},
    complete:    function(){}
  },
  slideshow: {
    step:        0,
    delay:       5000,
    backgrounds: [],
    preload:     false,
    walk:        function(){}
  },
  overlay: {
    src:         null, // defined by Css 
    opacity:     null  // defined by Css 
  }
} */
			