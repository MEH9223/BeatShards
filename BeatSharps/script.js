function saveProgress(percent, win = false) {
    const levelKey = location.pathname.split('/').pop().split('.')[0];
    const old = JSON.parse(localStorage.getItem(levelKey)) || { stars: 0, percent: 0 };
  
    const stars = win ? 3 : percent >= 75 ? 2 : percent >= 40 ? 1 : 0;
    const newPercent = Math.max(old.percent, percent);
    const newStars = Math.max(old.stars, stars);
  
    localStorage.setItem(levelKey, JSON.stringify({
      percent: newPercent,
      stars: newStars
    }));
  }
  
  function getPercent(currentTime) {
    return Math.min(100, Math.floor((currentTime / 120) * 100));
  }
  