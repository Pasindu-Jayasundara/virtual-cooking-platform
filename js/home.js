var countdownEnd = new Date('2024-05-31T23:59:59Z').getTime();

var countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
 
  var now = new Date().getTime();
  var distance = countdownEnd - now;

  if (distance <= 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdowncard').style.display = 'none';
  } else {

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    document.getElementById('countdowncardTime').innerHTML = `${days} : ${hours} : ${minutes} : ${seconds}`;
  }
}
