const images = ['url(assets/images/banner-01.png)', 'url(assets/images/banner-02.png)', 'url(assets/images/banner-03.png)'];
const banner = document.querySelector("[data-banner]");
let slides = document.querySelectorAll("[data-slide]"),
    buttons = document.querySelectorAll("[data-btn]"),
    index = 0,
    startX,
    startY,
    dist,
    threshold = 50, // distância mínima percorrida necessária para ser considerado slide
    allowedTime = 300, // tempo máximo permitido para percorre essa distância
    elapsedTime,
    startTime,
    isMove = false,
    currentImageIndex = 0,
    currentImage = '';

function changeImage(imageIndex) {
    const shouldDisplayFirstImage = imageIndex === images.length;
    const shouldDisplayLastImage = imageIndex < 0;

    if (shouldDisplayFirstImage) {
        imageIndex = 0;
    } else if (shouldDisplayLastImage) {
        imageIndex = images.length;
    }

    currentImage = images[imageIndex];
    if(window.innerWidth <= 600) {
        banner.setAttribute('style', 'background: '+currentImage+'; background-repeat: no-repeat; background-size: auto 45rem; background-position: top center;');
    } else {
        banner.setAttribute('style', 'background: '+currentImage+'; background-repeat: no-repeat; background-size: 100%; background-position: top center;');
    }
    currentImageIndex = imageIndex;
}

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            buttons[i].classList.remove("active");
        }
        slides[index].classList.add("active");
        buttons[index].classList.add("active");
        changeImage(index);
    });
});

slides.forEach(slide => {
    slide.addEventListener("mouseover", mouveOver);
    slide.addEventListener("mouseout", mouseOut);
    slide.addEventListener("touchstart", touchStart);
    slide.addEventListener("touchmove", touchMove);
    slide.addEventListener("touchend", touchEnd);
});

 
banner.addEventListener("mouseover", mouveOver);
banner.addEventListener("mouseout", mouseOut);

function toNext(event) {
    //Previne no caso do mobile que o menu seja aberto e fechado na sequência
    if (event.type === "touchstart") {
        event.preventDefault();
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        buttons[i].classList.remove("active");
    }
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
    buttons[index].classList.add("active");
    currentImageIndex = currentImageIndex+1;
    changeImage(currentImageIndex);
}

function toPrev(event) {
    //Previne no caso do mobile que o menu seja aberto e fechado na sequência
    if (event.type === "touchstart") {
        event.preventDefault();
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        buttons[i].classList.remove("active");
    }
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add("active");
    buttons[index].classList.add("active");
    currentImageIndex = currentImageIndex-1;
    changeImage(currentImageIndex);
}

function touchStart(event) {
    let touchobj = event.changedTouches[0];
    dist = 0;
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    startTime = new Date().getTime(); // o momento em que o dedo faz contato pela primeira vez com a tela
    isMove = true;
    // event.preventDefault();
    // evitar a rolagem quando dentro do div
}

function touchMove(event) {
    // event.preventDefault() // evitar a rolagem quando dentro do div
}

function touchEnd(event) {
    var touchobj = event.changedTouches[0];
    dist = touchobj.pageX - startX; // obter distância total percorrida com o dedo em contato com a tela
    elapsedTime = new Date().getTime() - startTime; // obter tempo decorrido
    // verifique se o tempo decorrido está dentro do especificado, distância horizontal percorrida> = limite e distância vertical percorrida <= 100
    var slideDirection = "";
    if (elapsedTime <= allowedTime) {
        if (Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100) {
            slideDirection = (dist < 0) ? "right" : "left";
        }
    }
    isMove = false;
    controllerSlider(slideDirection);
    event.preventDefault();
}

function mouveOver() {
    isMove = true;
}

function mouseOut() {
    isMove = false;
}

function controllerSlider(slideDirection) {
    if (slideDirection == "right") {
        toNext("click");
    } else if (slideDirection == "left") {
        toPrev("click");
    }
}

function autoplay() {
    if (!isMove) {
        toNext("click");
    }
}

window.addEventListener("resize", () => {
    console.log("funcionando");
    currentImageIndex = currentImageIndex;
    changeImage(currentImageIndex);
});
// Autoplay
setInterval(autoplay, 7000); //Slides mudam a cada 7 segundos