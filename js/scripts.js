var reveal = function() {
	var reveals = document.querySelectorAll(".panel");
	var windowHeight = window.innerHeight;
	for(var i=0; i < reveals.length; i++) {
		var elementTop = reveals[i].getBoundingClientRect().top;
		if (elementTop < windowHeight - 100) {
		  reveals[i].classList.add("active");
		} else {
		  reveals[i].classList.remove("active");
		}
	}
};