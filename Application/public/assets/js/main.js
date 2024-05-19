document.addEventListener("DOMContentLoaded", function() {
  console.log('Document loaded, running main.js');
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(()=>{
      preloader.classList.add('fade-out');
    }, 1000)
    console.log('Hiding preloader');
    preloader.style.display = 'none';
  }
});
