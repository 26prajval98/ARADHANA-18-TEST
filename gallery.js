var x = 0;
var a = document.querySelectorAll(".slideshow");
console.log(a);
setInterval(function () {
	x %= 5;
	for (var i = 0; i < a.length; i++) {
	  a[i].classList.add("w3-hide");
	 }
	 a[x].classList.remove("w3-hide"); 
	 x++;
	 console.log(x);
}, 5000, false);