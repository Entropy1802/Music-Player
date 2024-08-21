const playlistSongs = document.getElementById("playlist-songs");
const previousButton = document.getElementById("previous");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat-0");
const startRepeatButton = document.getElementById("repeat-1");

const showVolume = document.getElementById("show-volume");
const volumeIcon = document.getElementById("volume-icon");
const muteIcon = document.getElementById("mute-icon");
const currentVolume = document.getElementById("volume");

const progressBar = document.getElementById("songProgress");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("songDuration");

const allSongs = [
  {
    id: 0,
    title: "In the Years to Come, I Wish You Peace",
    artist: "Linh",
    duration: "4:48",
    src: "resources/Năm Tháng Sau Này, Mong Người Bình Yên - Linh.mp3",
  },
  {
    id: 1,
    title: "Divorce in the Republic of Ghana",
    artist: "ZB ft YK",
    duration: "4:33",
    src: "resources/Ly Hôn Ở Cộng Hòa Ghana - Trương Bích Thần (Zhang Bi Chen), Dương Khôn (Yang Kun).mp3",
  },
  {
    id: 2,
    title: "Colorless Happiness",
    artist: "Khiem",
    duration: "3:25",
    src: "resources/Hạnh Phúc Không Sắc - Khiem.mp3",
  },
  {
    id: 3,
    title: "Cannot Give Up on You",
    artist: "Khiem",
    duration: "4:17",
    src: "resources/Chẳng Thể Từ Bỏ - Khiem.mp3",
  },
  {
    id: 4,
    title: "A World Without Pain",
    artist: "Khiem",
    duration: "4:19",
    src: "resources/Thế Giới Không Còn Niềm Đau - Khiem.mp3",
  },
  {
    id: 5,
    title: "The Other Half is Loneliness",
    artist: "Khiem",
    duration: "1:00",
    src: "resources/Demo Nửa kia là quạnh hiu-Khiem.mp3",
  },
  {
    id: 6,
    title: "I Just Need You To Know",
    artist: "Dani D",
    duration: "3:23",
    src: "resources/Chỉ Cần Em Biết - Dani D.mp3",
  },
  {
    id: 7,
    title: "Let You Go",
    artist: "Aioz",
    duration: "3:30",
    src: "resources/Let You Go-Aioz.mp3",
  },
  {
    id: 8,
    title: "Wish You All the Best",
    artist: "Aioz",
    duration: "3:00",
    src: "resources/Wish You All the Best-Aioz.mp3",
  },
  {
    id: 9,
    title: "If One Day I Forget Your Name",
    artist: "Khiem",
    duration: "2:46",
    src: "resources/Lỡ Một Mai Tôi Quên Tên Người - Khiem.mp3",
  },
  {
    id: 10,
    title: "Lily of the Valley",
    artist: "Daniel",
    duration: "5:00",
    src: "resources/Lily of the Valley - Daniel.mp3",
  },
  {
    id: 11,
    title: "Hidden in the Snow",
    artist: "YD ft DDP",
    duration: "3:32",
    src: "resources/Tuyêt tang - Y-D, Ngai Ngai Pha.mp3",
  },
  {
    id: 12,
    title: "Maybe",
    artist: "LBI",
    duration: "3:38",
    src: "resources/Có lẽ - LBI Lợi Bỉ .mp3",
  },
  {
    id: 13,
    title: "Eternal Sleep",
    artist: "Khiem",
    duration: "3:19",
    src: "resources/Khiem - Giấc Ngủ Dài Hạn.mp3",
  },
  {
    id: 14,
    title: "Keep",
    artist: "An LouXian",
    duration: "4:14",
    src: "resources/Giữ - An Lạc Hiền.mp3",
  },
  {
    id: 15,
    title: "I Have a Lover",
    artist: "Lee Eun Mi",
    duration: "4:06",
    src: "resources/I Have a Lover - Lee Eun Mi.mp3",
  },
  {
    id: 16,
    title: "Used to",
    artist: "Wren Evans",
    duration: "3:11",
    src: "resources/Từng Quen-Wren Evans.mp3",
  },
  {
    id: 17,
    title: "Remember",
    artist: "Vu ft TRANG",
    duration: "4:36",
    src: "resources/Anh Nhớ Ra - Vũ., TRANG.mp3",
  },
  {
    id: 18,
    title: "Muse",
    artist: "Hoang Dung",
    duration: "4:14",
    src: "resources/Nàng Thơ - Hoàng Dũng.mp3",
  },
];

const audio = new Audio(); // Creates and returns a new HTMLAudioElement object, optionally starting the process of loading an audio file into it if the file URL is given
audio.volume = 15 / 100;

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const renderSongs = (array) => {
  const songsHTML = array
    .map((song) => {
      return `<li id="song-${song.id}" class="playlist-song">
    <button class="playlist-song-info">
      <span class="playlist-song-title" onclick="playSong(${song.id})">${song.title}</span>
      <span class="playlist-song-artist">${song.artist}</span>
      <span class="playlist-song-duration">${song.duration}</span>
    </button>

    <button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick="deleteSong(${song.id})"><i class="fa-regular fa-trash-can"></i></button>
    </li>`;
    })
    .join("");
  playlistSongs.innerHTML = songsHTML;
};

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return userData?.songs;
};
renderSongs(sortSongs());

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
};

// Voume Adjustment
const muteSound = () => {
  audio.volume = 0;
  showVolume.textContent = 0;
  currentVolume.value = 0;
  volumeIcon.style.display = "none";
  muteIcon.style.display = "block";
};

const changeVolume = () => {
  showVolume.textContent = currentVolume.value;
  audio.volume = currentVolume.value / 100;
  volumeIcon.style.display = "block";
  muteIcon.style.display = "none";

  if (currentVolume.value == 0) {
    volumeIcon.style.display = "none";
    muteIcon.style.display = "block";
  }
};

volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);

/*------- FUNCTIONS -------*/
// Play
const playSong = (id) => {
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src;
  audio.title = song.title;

  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }

  userData.currentSong = song;

  highlightCurrentSong();
  setPlayButtonAccessibleText();
  setPlayerDisplay();
  audio.play();

  playButton.style.display = "none";
  pauseButton.style.display = "block";
};

// Shuffle Playlist
const shuffle = () => {
  userData?.songs.sort(() => {
    return Math.random() - 0.5;
  });
  userData.currentSong = null;
  userData.songCurrentTime = 0;

  renderSongs(userData?.songs);
  setPlayerDisplay();
  setPlayButtonAccessibleText();

  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  }
};

// Auto Play When Song Ends
audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

// Adjust Song's Progress
const formatTime = (seconds) => {
  const minute = Math.floor(seconds / 60);
  const secondsRemaining = Math.floor(seconds % 60);
  return `${minute}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
};

const updateProgressBar = () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressPercentage = (currentTime / duration) * 100;

  progressBar.value = progressPercentage;
  currentTimeDisplay.textContent = formatTime(currentTime);
};

const setAudioProgress = () => {
  const progress = progressBar.value;
  const duration = audio.duration;
  audio.currentTime = (progress / 100) * duration;
};

// Pause
const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  audio.pause();
};

// Repeat
repeatButton.addEventListener("click", () => {
  audio.loop = true;
  repeatButton.style.display = "none";
  startRepeatButton.style.display = "block";
});

startRepeatButton.addEventListener("click", () => {
  audio.loop = false;
  startRepeatButton.style.display = "none";
  repeatButton.style.display = "block";
});

// Next Song
const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

// Previous Song
const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

// Song's Display
const setPlayerDisplay = () => {
  const playingSong = document.getElementById("player-song-title");
  const songArtist = document.getElementById("player-song-artist");
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;

  playingSong.textContent = currentTitle ? currentTitle : "";
  songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song");
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`);

  playlistSongElements.forEach((songEl) => {
    songEl.removeAttribute("aria-current");
  });

  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true");
  }
};

// Delete Song
const deleteSong = (id) => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    audio.currentTime = 0;

    pauseSong();
    setPlayerDisplay();

    pauseButton.style.display = "none";
    playButton.style.display = "block";
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement("button");
    const resetText = document.createTextNode("Reset Playlist");

    resetButton.id = "reset";
    resetButton.ariaLabel = "Reset playlist";
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs];
      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

/*------- BUTTONS -------*/
// Play Button
playButton.addEventListener("click", () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
  playButton.style.display = "none";
  pauseButton.style.display = "block";
});

// Adjust Song's Progress Bar
audio.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("input", setAudioProgress);

// Pause Button
pauseButton.addEventListener("click", () => {
  pauseSong();
  pauseButton.style.display = "none";
  playButton.style.display = "block";
});

// Next Button
nextButton.addEventListener("click", playNextSong);

// Previous Button
previousButton.addEventListener("click", playPreviousSong);

// Shuffle Button
shuffleButton.addEventListener("click", shuffle);
