var options = {
    accessibility: true,
    prevNextButtons: true,
    pageDots: true,
    setGallerySize: false,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 60,
      y2: 45,
      x3: 15
    }
  };
  
  var carousel = document.querySelector('[data-carousel]');
  var slides = document.getElementsByClassName('carousel-cell');
  var flkty = new Flickity(carousel, options);
  
  flkty.on('scroll', function () {
    flkty.slides.forEach(function (slide, i) {
      var image = slides[i];
      var x = (slide.target + flkty.x) * -1/3;
      image.style.backgroundPosition = x + 'px';
    });
  });


  const wrapper=document.querySelector(".wrap8 .wrapper");
  const carousels=document.querySelector(".wrap8 .carousel");
  const arrowBtns=document.querySelectorAll(".wrap8 .wrapper i");
  const firstCardWidth=carousels.querySelector(".wrap8 .cards").offsetWidth;
  const carouselChildrens=[...carousels.children]
  
  let isDragging = false, startX, startScrollLeft, timeoutId;
  
  let cardPerView = Math.round(carousels.offsetWidth / firstCardWidth);
  
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousels.insertAdjacentHTML("afterbegin", card.outerHTML)
  })
  carouselChildrens.slice(0, cardPerView).forEach(card => {
      carousels.insertAdjacentHTML("beforeend", card.outerHTML)
  })
  
  arrowBtns.forEach(btn =>{
      btn.addEventListener("click", () =>{
          // console.log(btn.id)
          carousels.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
      })
  })
  
  const dragStart = (e) =>{
      isDragging = true;
      carousels.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousels.scrollLeft
  }
  
  const dragging = (e)=>{
      // console.log(e.pageX);
      if(!isDragging) return;
      carousels.scrollLeft=startScrollLeft - (e.pageX - startX)
  }
  
  const dragStop = () =>{
      isDragging=false;
      carousels.classList.remove("dragging");
  }
  const autoPlay = ()=>{
      if(window.innerWidth < 800) return;
      timeoutId = setTimeout(() => carousels.scrollLeft += firstCardWidth, 1000);
  }
  autoPlay();
  
  const infiniteScroll = () =>{
      if(carousels.scrollLeft === 0){
          // console.log("hii")
          carousels.classList.add("no-transition");
          carousels.scrollLeft=carousels.scrollWidth - (2 * carousels.offsetWidth)
          carousels.classList.remove("no-transition");
      }
      else if(Math.ceil(carousels.scrollLeft) === carousels.scrollWidth -carousels.offsetWidth){
          // console.log("Bii")
          carousels.classList.add("no-transition");
          carousels.scrollLeft=carousels.offsetWidth;
          carousels.classList.remove("no-transition");
      }
      clearTimeout(timeoutId);
      if(!wrapper.matched(":hover")) autoPlay();
  }
  carousels.addEventListener("mousedown", dragStart);
  carousels.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousels.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);
  
  document.querySelector(".click-form .reg").addEventListener("click", function(){
      document.querySelector(".click-form .register").style.display="block"
  }) 