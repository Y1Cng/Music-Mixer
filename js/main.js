console.log("Music Mixer JavaScript Loaded");

// Variables
const disks = document.querySelectorAll(".disks-image");
const dropZones = document.querySelectorAll(".drop-zone");
const playButton = document.querySelector("#playButton");
const pauseButton = document.querySelector("#pauseButton");
const stopButton = document.querySelector("#stopButton");
const resetButton = document.querySelector("#resetButton");
const volSlider = document.querySelector("#volumeControl");
const howToUseBtn = document.querySelector("#howToUseBtn");
const lightbox = document.querySelector("#lightbox1");
const lightboxClose = document.querySelector(".lightbox_close");

// State variables
let dragPiece;
let playingAudios = [];
let isPlaying = false;

// Functions
function handleStartDrag() {
  dragPiece = this;
  this.style.opacity = '0.5'; // I make it transparent when dragging
}

function handleDragEnd() {
  this.style.opacity = '1'; // I make it back to normal
  this.style.transform = 'scale(1)';
}

function handleOver(event) {
  // I need to allow the drop to work
  if (event.preventDefault) {
    event.preventDefault();
  }
  this.classList.add('active');
}

function handleLeave() {
  this.classList.remove('active');
}

function handleDrop(event) {
  // I need to handle the drop properly
  if (event.preventDefault) {
    event.preventDefault();
  }
  
  dragPiece.style.opacity = '1';
  dragPiece.style.transform = 'scale(1)';

  // I remove active class from all drop zones
  dropZones.forEach(function(zone) {
    zone.classList.remove('active');
  });

  // I check if zone already has disk
  if (this.querySelector('.disks-image')) return;
  
  const trackId = dragPiece.getAttribute("data-track");
  const audioElement = document.querySelector("#" + trackId);
  
  // I move the disk to drop zone
  this.appendChild(dragPiece);
  
  this.classList.add('has-disk');
  
  const icon = this.querySelector('i');
  if (icon) icon.style.display = 'none';

  if (audioElement) {
    // I reset all audio times
    playingAudios.forEach(function(audio) {
      audio.currentTime = 0;
    });

    // I add to playing audios if not already there
    let alreadyAdded = false;
    playingAudios.forEach(function(audio) {
      if (audio === audioElement) {
        alreadyAdded = true;
      }
    });
    if (!alreadyAdded) {
      playingAudios.push(audioElement);
    }
    
    audioElement.loop = true;
    audioElement.currentTime = 0;
    audioElement.play();
    
    if (!isPlaying) {
      isPlaying = true;
      playButton.classList.add('active');
      pauseButton.classList.remove('active');
    }
  }
}

function playAudio() {
  // I make the audios play in the array
  playingAudios.forEach(function(audio) {
    audio.loop = true;
    audio.play();
  });
  
  if (!isPlaying) {
    isPlaying = true;
    playButton.classList.add('active');
    pauseButton.classList.remove('active');
  }
}

function pauseAudio() {
  // I make all the audios pause
  playingAudios.forEach(function(audio) {
    audio.pause();
  });
  
  if (isPlaying) {
    isPlaying = false;
    pauseButton.classList.add('active');
    playButton.classList.remove('active');
  }
}

function restartAudio() {
  // I restart all audios
  playingAudios.forEach(function(audio) {
    audio.loop = true;
    audio.currentTime = 0;
    audio.play();
  });
  
  if (!isPlaying) {
    isPlaying = true;
    playButton.classList.add('active');
    pauseButton.classList.remove('active');
  }
}

function setVolume() {
  // I set volume for all playing audios
  const volumeValue = this.value / 100;
  playingAudios.forEach(function(audio) {
    audio.volume = volumeValue;
  });
}

function resetPositions() {
  // I reset everything

  // I reset all drop zones
  const disksContainer = document.querySelector("#Disks");
  
  dropZones.forEach(function(zone) {
    const diskImage = zone.querySelector(".disks-image");
    if (diskImage) {
      // I get the track ID to know which card it belongs to
      const trackId = diskImage.getAttribute("data-track");
      
      // I find the correct card and put the image back
      if (trackId === "disk1") {
        const card1 = disksContainer.querySelector(".disk-card:nth-child(1)");
        card1.appendChild(diskImage);
      }
      if (trackId === "disk2") {
        const card2 = disksContainer.querySelector(".disk-card:nth-child(2)");
        card2.appendChild(diskImage);
      }
      if (trackId === "disk3") {
        const card3 = disksContainer.querySelector(".disk-card:nth-child(3)");
        card3.appendChild(diskImage);
      }
      if (trackId === "disk4") {
        const card4 = disksContainer.querySelector(".disk-card:nth-child(4)");
        card4.appendChild(diskImage);
      }
      if (trackId === "disk5") {
        const card5 = disksContainer.querySelector(".disk-card:nth-child(5)");
        card5.appendChild(diskImage);
      }
      if (trackId === "disk6") {
        const card6 = disksContainer.querySelector(".disk-card:nth-child(6)");
        card6.appendChild(diskImage);
      }
    }
    
    zone.classList.remove("has-disk");
    const icon = zone.querySelector("i");
    if (icon) icon.style.display = "block";
  });

  // I reset image styles
  const disk1Image = document.querySelector("[data-track='disk1']");
  const disk2Image = document.querySelector("[data-track='disk2']");
  const disk3Image = document.querySelector("[data-track='disk3']");
  const disk4Image = document.querySelector("[data-track='disk4']");
  const disk5Image = document.querySelector("[data-track='disk5']");
  const disk6Image = document.querySelector("[data-track='disk6']");
  
  if (disk1Image) {
    disk1Image.style.opacity = "1";
    disk1Image.style.transform = "scale(1)";
  }
  if (disk2Image) {
    disk2Image.style.opacity = "1";
    disk2Image.style.transform = "scale(1)";
  }
  if (disk3Image) {
    disk3Image.style.opacity = "1";
    disk3Image.style.transform = "scale(1)";
  }
  if (disk4Image) {
    disk4Image.style.opacity = "1";
    disk4Image.style.transform = "scale(1)";
  }
  if (disk5Image) {
    disk5Image.style.opacity = "1";
    disk5Image.style.transform = "scale(1)";
  }
  if (disk6Image) {
    disk6Image.style.opacity = "1";
    disk6Image.style.transform = "scale(1)";
  }

  // I stop all audios
  playingAudios.forEach(function(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.loop = false;
  });
  
  playingAudios = [];
  
  isPlaying = false;
  playButton.classList.remove("active");
  pauseButton.classList.remove("active");
}

function openLightbox() {
  // I open the instructions
  lightbox.classList.add("active");
  return false;
}

function closeLightbox() {
  // I close the instructions
  lightbox.classList.remove("active");
  return false;
}

// Event listeners

// I add event listeners to disks
disks.forEach(function(disk) {
  disk.addEventListener("dragstart", handleStartDrag);
  disk.addEventListener("dragend", handleDragEnd);
});

// I add event listeners to drop zones
dropZones.forEach(function(zone) {
  zone.addEventListener("dragover", handleOver);
  zone.addEventListener("dragleave", handleLeave);
  zone.addEventListener("drop", handleDrop);
});

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
stopButton.addEventListener("click", restartAudio);
resetButton.addEventListener("click", resetPositions);
volSlider.addEventListener("input", setVolume);
howToUseBtn.addEventListener("click", openLightbox);
lightboxClose.addEventListener("click", closeLightbox);