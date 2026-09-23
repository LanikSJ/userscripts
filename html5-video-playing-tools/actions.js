'use strict';

// Keyboard actions for playback and media controls.
const actList = new Map();
actList.set(90, () => { // key Z: toggle boosted speed
  if (v.playbackRate === 1 || v.playbackRate === 0) {
    v.playbackRate = +localStorage.mvPlayRate || 1.3;
  } else {
    // localStorage.mvPlayRate = v.playbackRate;
    v.playbackRate = 1;
  }
})
  .set(88, adjustRate.bind(null, -0.1)) // key X
  .set(67, adjustRate.bind(null, 0.1)) // key C
  .set(40, adjustVolume.bind(null, -0.1)) // down: lower volume
  .set(38, adjustVolume.bind(null, 0.1)) // up: raise volume
  .set(37, () => { v.currentTime -= 5 }) // key left arrow
  .set(37 + 1024, () => { v.currentTime -= 20 }) // key shift + left arrow
  .set(39, () => { v.currentTime += 5 }) // key right arrow
  .set(39 + 1024, () => { v.currentTime += 20 }) // key shift + right arrow
  .set(68, () => { v.currentTime -= 0.03; v.pause() }) // key D: previous frame
  .set(70, () => { v.currentTime += 0.03; v.pause() }) // key F: next frame
  .set(32, () => {  // key space
    if (cfg.btnPlay) clickDualButton(cfg.btnPlay);
    else if (v.paused) v.play();
    else v.pause();
  })
  .set(13, () => {  // Enter key. Full screen
    toggleFS();
  })
  .set(13 + 1024, () => { // web full screen
    if (self !== top) postToTop({ id: 'gm-h5-toggle-iframeWebFull' });
    else toggleFP();
  })
  .set(27 + 1024, noopFn)  // ignore key shift + esc
  .set(27, () => {  // key esc
    if (FullScreen.isFull()) {
      if (_fs) _fs.exit();
      else clickDualButton(cfg.btnFS);
    } else if (self !== top) {
      postToTop({ id: 'gm-h5-is-iframeWebFull' });
    } else if (FullPage.isFull(v)) {
      toggleFP();
    }
  })
  .set(73, () => { // key I: picture-in-picture mode
    if (!d.pictureInPictureElement) {
      v.requestPictureInPicture().catch(err => {
        alert(MSG.cantOpenPIP + err)
      });
    } else {
      d.exitPictureInPicture().catch(err => {
        alert(MSG.cantExitPIP + err)
      });
    }
  })
  .set(80, () => { // key P: screenshot
    const canvas = d.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext('2d').drawImage(v, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const dataURL = URL.createObjectURL(blob);
      const link = d.createElement('a');
      link.onclick = ev => { ev.stopPropagation() };
      link.href = dataURL;
      link.download = Date.now().toString(36) + '.png';
      link.style.display = 'none';
      d.body.appendChild(link);
      link.click();
      link.remove();
      await sleep(500);
      URL.revokeObjectURL(dataURL);
    });
  })
  .set(77, () => { // M: cache video
    if (cacheMV.cached) cacheMV.finish();
    else cacheMV.exec();
  })
  .set(78, () => { // N: next episode
    if (self !== top) postToTop({ id: 'gm-h5-play-next' });
    else if (cfg.btnNext) doClick(cfg.btnNext);
    else if (cfg.isNumURL) goNextMV();
  });
