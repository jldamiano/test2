

// starting audio as the page loads by using an onload function//

window.onload = firesfx();

function firesfx() {
  const audio = document.querySelector("audio");
  audio.volume = 0.9;
  audio.play();
}

//creating the stars function//

function stars (width, height){  //creating a function for the creation of the various stars, with width and height as parameters for each//
  class Star{
    constructor(size, x, y){
        this.size = size;
        this.x = x;
        this.y = y;
        this.imgSrc = '../images/star.png'; //setting the source//
        this.create(); //adding a function to it that is made later//
    }
  
    create() {
        let starImg = document.createElement("img");
        starImg.className = "star";  //pinning the styling to the function, which is declared in css//
        starImg.src = this.imgSrc;
        // size width and height
        starImg.style.width = this.size +'px';
        starImg.style.height = this.size +'px';
        //set position
        starImg.style.position = "absolute";
        starImg.style.left = this.x+'px';
        starImg.style.top = this.y+'px';

        document.body.append(starImg);
    }
  }
  
  for(let i = 0; i < 50; i++){
    const size = Math.random()*100; //the amount of stars//
    let x = Math.random()*width;
    let y = Math.random()*height;
  
    // create star
    const star = new Star(size, x, y);
  }

  // adding gsap animation for stars so that after they form, they come into the screen just like the rest of the homescreen//


  const starry = gsap.timeline();
  starry.from('.star', {
    opacity: 0,
    duration: 1,
    scale: 0,
    delay: 2,
    ease: "power4"
  }, '-=3');
}


// initial gsap for the text entering as the screen loads//
const fireStart = gsap.timeline();

fireStart.from('.fire-text' , {  
  duration: 6,
  scale: 0,
  opacity:0,
  ease: "expo.out",
  y:200,
  color: "rgb(255, 228, 130)",
});

// //grabbing the html parts from the DOM so that they can be used in the following function//
const stick = document.querySelector('.stick');
const fire = document.querySelector('.opening-scene');
const total = document.querySelector('.total');

//when the stick is clicked on the opening page, the proceeding events occur//
stick.addEventListener ('click', () => {

//   //creating timeline for the opening animation, where the text and image enlarge and fade to give the impression of zooming in after the stick has been clicked//
  const opening = gsap.timeline();
  opening.to('.image-content' , {  
    duration: 2,
    scale: 5,
    opacity:0,
  });

  opening.to('.fire-text', {  
    scale:0,
    duration: 2,
    ease: "power4",


  //using on complete function so that the next set of timelines play after the first one is completed, effectivly opening up the rest of the site
  onComplete: () => {
    total.style.display= "block";// changing the display of the div total. which houses all the content for the website as it was previously displayed as none to hide it from the opening screen//    
    scrolltStuff(); //running the function of scrolltrigger animations that are declared below to come into play once the total div turns to display block. without this, the page cant find the start location of each of the different scroll triggers as the display none of the entire total div was messing with it. thereofre, running this resets the location and allows scroll trigger to work//
    fire.remove(); //removing the fire opening div as it is no longer needed//
    heroTl.play(); //playing the timeline that uses gsap animation to make the title and nav bar zoom out from the centre//
    ScrollTrigger.refresh();
    
    //responsive stars//
    function responsiveFunction(x) {  
      if (x.matches) { // If media query matches x size, then change the width of the space the stars shine on. this is because in mobile. i want the stars to take up the whole width, but only hald the image on desktop for better readability//
        stars(220, window.innerHeight); //passing through the numbers in the parametrs set in the function previously//
      } else {
        stars(650, window.innerHeight); //using inner height to capture 100vh//
      }
    }

    const x = window.matchMedia("(max-width: 360px)"); //size being the parameter for the viewport width//
    responsiveFunction(x); // Call listener function at run time
    x.addListener(responsiveFunction); // Attach listener function on state changes

    const logo = document.querySelector('svg');  //grabbing the svg//
    setTimeout(() => {
      logo.classList.add('active');  //playing the svg by adding the active class to it//
    }, 1000);}

  }, '-=2');

});


//function that encompasses all of the scroll trigger animations so that it can be passed through once when the opening scene has been completed
function scrolltStuff(){   
  
  //creating a base function for the scroll trigger elements, using the paramaters as each property of the timelines so that they can be chnaged depending on what is being targeted//
  function scrollTriggerBaseFunction(theTrigger, triggered, o, yaxis, xaxis, d, e, s, r, timing, scal){ //all the paramter variables//
      const siteScrollTrigger = gsap.timeline({
        scrollTrigger: {
          trigger: theTrigger, //what initiates the scroll//
        }
      });
    
      siteScrollTrigger.from(triggered, { //what scrolls//
        opacity: o, 
        y: yaxis, 
        x: xaxis, 
        duration: d, 
        ease: e, 
        stagger: s, 
        rotate: r, 
        scale: scal, 
        onEnter: () => {
      }}, timing);
  }
    

    //running the base function for all the different sections in the page, passing through the necessary parameters//
    scrollTriggerBaseFunction(".products-textbox",'.products-textbox', 0, 100, 0, 2, "back.out(1.1)");
    scrollTriggerBaseFunction(".products-textbox",'.table-items', 0, 0, 0, 4, "power4", 0.4, 0, '+=1');
    scrollTriggerBaseFunction(".products-grid-layout",'.grid-textbox', 0, 100, 0, 2, "back.out(1.1)");

    scrollTriggerBaseFunction("#process-caro",'.process-textbox', 0, 100, 0, 2, "back.out(1.1)" );
    scrollTriggerBaseFunction(".caro-section",'.swiper', 0, 0, -500, 4, "elastic.out(1.5, 0.4)", 0, 5, '+=1');

    scrollTriggerBaseFunction(".tabbys",'.tabbys', 0, 0, 0, 1, "power4" );
    scrollTriggerBaseFunction(".tabbys",'.tab-header', 0, -50, 0, 2, "power4", 0, 0, '-=1' );
    scrollTriggerBaseFunction(".tabbys",'.tab-titles', 0, 0, 0, 3, "power4)", 0.3, 0, '-=1', 0 );
    scrollTriggerBaseFunction(".tabbys",'.tab1-text', 0, 100, 0, 2, "power4)", 0.3, 0, '-=3' );

    scrollTriggerBaseFunction("#about-us",'.about-textbox', 0, 200, 0, 1, "back.out(1.1)");
    scrollTriggerBaseFunction("#about-us",'.about-images', 0, 0, -300, 3, "power4");
    scrollTriggerBaseFunction("#about-us",'.circle-indicators', 0, 0, 0, 2, "back.out(1.9)", 0.3, 0, '+=2', 0 );

    scrollTriggerBaseFunction(".inq",'.inq-title', 0, 0, -300, 2, "power4");
    scrollTriggerBaseFunction(".inq",'.inq-text', 0, 0, -300, 2, "power4", 0, 0, '-=2', 0 );
    scrollTriggerBaseFunction(".inq",'.form-side', 0, 0, 500, 2, "power4", 0, 0, '-=1', 0 );

    scrollTriggerBaseFunction(".venice",'.ven1', 1, 500, 0, 3, "power4", 0, 0, 0, 1);
    scrollTriggerBaseFunction(".venice",'.ven2', 1, 500, 0, 3, "power4", 0, 0, '+=1', 1 );
    scrollTriggerBaseFunction(".venice",'.apresto', 1, 500, 0, 5, "power4", 0, 0, '+=1', 1);


    function cardScrolly (cardName){
      scrollTriggerBaseFunction(cardName,cardName, 0, 100, 0, 2, "power4");
    }   

    //running the function so the same scroll trigger is applied each card//
    cardScrolly (".scene--card1");
    cardScrolly (".scene--card2");
    cardScrolly (".scene--card3");
    cardScrolly (".scene--card4");
    cardScrolly (".scene--card5");
    cardScrolly (".scene--card6");
    cardScrolly (".scene--card7");

}

//scroll trigger timeline applied for homepage that opens up the whole website once the stic is clicked//

const heroTl = gsap.timeline();


heroTl.pause(); //having it paused at first since it isn't needed until the user clicks the opening stick. once the stick is clicked, the function with remove the pause attribute and play//

  heroTl.from('.glass-bg', {  
     opacity: 0,
     duration: 2,
     scale: 0,
     ease: "slow(0.7, 0.5, false)",
  });

   heroTl.from('.info-box', {
         opacity: 0,
         duration: 1.5,
         delay: 0.5,
         scale: 0,
         ease: "back.out(1.5)"
    }, '-=1.5');

    heroTl.from('.svg-wrapper', {
      opacity: 0,
      duration: 1.5,
      scale: 0,
      ease: "back.out(1.5)"
    }, '-=1');

    heroTl.from('.nav-option', { 
      opacity:0, 
      scale: 0,
      duration: 3, 
      ease: 'back.out(7)',
      delay: 2, 
      stagger: 0.9,

    }, '-=2');

  heroTl.from('.star', { 
      opacity:0, 
      scale: 0,
      duration: 3, 
      ease: 'back.out(7)',
      delay: 2, 
      stagger: 0.5,

    }, '-=2');




//creating a floating nav that only appears when the user scroll back up//

const navbar = document.querySelector('.navbar'); //grabbing the nav bar//
const navPoints = document.querySelectorAll('.nav-menu a'); 
const headerLogo = document.querySelector('.header-logo');


function scrollynav (){ //creating function for scrolling navigation bar//
    const showAnim = gsap.from('.navbar', { 
        yPercent: -110, //setting direction and duration of the scrolling animation for the nav bar//
        paused: true,
        duration: 0.2,
      }).progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: 99999,
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();  //depending on when the top of the screen is scrolling, the animation will either play or reverse, depending on scroll direction//
          
          //changing the backgroound colour of the nav bar depending on screen size so that contrast is enhanced to improve viewability//
          function navFollow(x) {  
            if (x.matches) { 
              navbar.style.backgroundColor="rgba(78, 17, 17, 0)";
            } else {
              navbar.style.backgroundColor="rgba(78, 17, 17, 0.6)";
              headerLogo.style.display="block";
              navbar.style.width="100%";
            }
          }
      
          //running the function//
          const x = window.matchMedia("(max-width: 768px)"); 
          navFollow(x); 
          x.addListener(navFollow);

          //using for each to grab each navigation item in the list and changing colour of it so it is more obvious to the user //
          navPoints.forEach(function(navPoints){
            navPoints.style.color="white"; 
          });
        }
      });
}

scrollynav (); //runing function//


//product table//

// create a NodeList for all the images of products on table//
const item = document.querySelectorAll('.product-images img');

// converting this to an array//
const tableItems = Array.from(item);

// create a NodeList for all the respective dialog boxes//
const popUpDialogs = document.querySelectorAll('.dialog-overview');

// converting this to an array so that each one can be called from its place in the array instead to having to query selector every single one//
const tableItemDialogs = Array.from(popUpDialogs);


//creating function that opens the dialg box depending on what item is clicked//
function openDialogue (productNumber, dialogueNumber){
  productNumber.addEventListener('click', () => dialogueNumber.show()); //when the user clicks on an image, a corresponsing dialogue box with the repsective content will show//
}

//running the function with the different items and dialogs, using their placement in the array//
openDialogue (tableItems[0], tableItemDialogs[0]);
openDialogue (tableItems[1], tableItemDialogs[1]);
openDialogue (tableItems[2], tableItemDialogs[2]);
openDialogue (tableItems[3], tableItemDialogs[3]);
openDialogue (tableItems[4], tableItemDialogs[4]);
openDialogue (tableItems[5], tableItemDialogs[5]);
openDialogue (tableItems[6], tableItemDialogs[6]);


//since clicking to inquiry is independent to which item is displayed, using query select all to grab all the close buttons, regardless of which dialog box it is in, and using for each to say that for every time each of the buttons is clicked, close all the dialog boxes and scroll to 'x'//
const closeTest = document.querySelectorAll('.closetest');
const dialogBoxes = document.querySelectorAll('.dialog-overview');

closeTest.forEach(function(closeTest){
  closeTest.addEventListener ('click', () => {  //when the close button is clicked, for each dialog box, close it//

    dialogBoxes.forEach(function(dialogBoxes){ //commanding all the boxes to be dialog boxes to be closed//
      dialogBoxes.hide();
    });
      document.querySelector(".inq").scrollIntoView(); //scrolling to the inquiries section//
    });
  
});


//grabbing the images and the colour select cirlces for each image and all the schowcased imaged. using their common class name to turn them into an array

const cols = document.querySelectorAll('.col');
const colourSwacthesItems = Array.from(cols);

const displayItem = document.querySelectorAll('.swapped-colour');
const changedDisplayColour = Array.from(displayItem);



//creating function that implements the changing of the image source depending on what coloured vase it clicked//

function changeImageColour (colourCircle, displayedImage, imageSrc){  
  colourCircle.addEventListener ('click', () => {
    displayedImage.src = imageSrc;     //when the user clicks on one of the different coloured swatches, the image source of that item will change//
  });
}

//running function for each circle, using the array position for each respective swatch and item


//item 1//
changeImageColour (colourSwacthesItems[0], changedDisplayColour[0], "../images/v1.png");
changeImageColour (colourSwacthesItems[1], changedDisplayColour[0], "../images/../images/v1b.png");
changeImageColour (colourSwacthesItems[2], changedDisplayColour[0], "../images/../images/v1c.png");

//item 2//
changeImageColour (colourSwacthesItems[3], changedDisplayColour[1], "../images/../images/v2.png");
changeImageColour (colourSwacthesItems[4], changedDisplayColour[1], "../images/../images/v2b.png");
changeImageColour (colourSwacthesItems[5], changedDisplayColour[1], "../images/../images/v2c.png");

//item 3//
changeImageColour (colourSwacthesItems[6], changedDisplayColour[2], "../images/../images/v3.png");
changeImageColour (colourSwacthesItems[7], changedDisplayColour[2], "../images/../images/v3b.png");
changeImageColour (colourSwacthesItems[8], changedDisplayColour[2], "../images/../images/v3c.png");

//item 4//
changeImageColour (colourSwacthesItems[9], changedDisplayColour[3], "../images/../images/v4.png");
changeImageColour (colourSwacthesItems[10], changedDisplayColour[3], "../images/../images/v4b.png");
changeImageColour (colourSwacthesItems[11], changedDisplayColour[3], "../images/../images/v4c.png");

//item 5//
changeImageColour (colourSwacthesItems[12], changedDisplayColour[4], "../images/../images/v5.png");
changeImageColour (colourSwacthesItems[13], changedDisplayColour[4], "../images/../images/v5b.png");
changeImageColour (colourSwacthesItems[14], changedDisplayColour[4], "../images/../images/v5c.png");

//item 6//
changeImageColour (colourSwacthesItems[15], changedDisplayColour[5], "../images/../images/v6.png");
changeImageColour (colourSwacthesItems[16], changedDisplayColour[5], "../images/../images/v6b.png");
changeImageColour (colourSwacthesItems[17], changedDisplayColour[5], "../images/../images/v6c.png");

//item 7//
changeImageColour (colourSwacthesItems[18], changedDisplayColour[6], "../images/../images/v7.png");
changeImageColour (colourSwacthesItems[19], changedDisplayColour[6], "../images/../images/v7b.png");
changeImageColour (colourSwacthesItems[20], changedDisplayColour[6], "../images/../images/v7c.png");




//using the same process, by using the function for the coloured icons but for the repsonsive view of the flip cards //

const gridImages = document.querySelectorAll('.grid-images');
const changinGridImages = Array.from(gridImages);

//card 1//
changeImageColour (colourSwacthesItems[21], changinGridImages[0], "../images/v1.png");
changeImageColour (colourSwacthesItems[22], changinGridImages[0], "../images/v1b.png");
changeImageColour (colourSwacthesItems[23], changinGridImages[0], "../images/v1c.png");

//card 2//
changeImageColour (colourSwacthesItems[24], changinGridImages[1], "../images/v2.png");
changeImageColour (colourSwacthesItems[25], changinGridImages[1], "../images/v2b.png");
changeImageColour (colourSwacthesItems[26], changinGridImages[1], "../images/v2c.png");

//card 3//
changeImageColour (colourSwacthesItems[27], changinGridImages[2], "../images/v3.png");
changeImageColour (colourSwacthesItems[28], changinGridImages[2], "../images/v3b.png");
changeImageColour (colourSwacthesItems[29], changinGridImages[2], "../images/v3c.png");

//card 4//
changeImageColour (colourSwacthesItems[30], changinGridImages[3], "../images/v4.png");
changeImageColour (colourSwacthesItems[31], changinGridImages[3], "../images/v4b.png");
changeImageColour (colourSwacthesItems[32], changinGridImages[3], "../images/v4c.png");

//card 5//
changeImageColour (colourSwacthesItems[33], changinGridImages[4], "../images/v5.png");
changeImageColour (colourSwacthesItems[34], changinGridImages[4], "../images/v5b.png");
changeImageColour (colourSwacthesItems[35], changinGridImages[4], "../images/v5c.png");

//card 6//
changeImageColour (colourSwacthesItems[36], changinGridImages[5], "../images/v6.png");
changeImageColour (colourSwacthesItems[37], changinGridImages[5], "../images/v6b.png");
changeImageColour (colourSwacthesItems[38], changinGridImages[5], "../images/v6c.png");

//card 7//
changeImageColour (colourSwacthesItems[39], changinGridImages[6], "../images/v7.png");
changeImageColour (colourSwacthesItems[40], changinGridImages[6], "../images/v7b.png");
changeImageColour (colourSwacthesItems[41], changinGridImages[6], "../images/v7c.png");


//OUR PROCESS SECTION//


//code from https://swiperjs.com///

const swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});


const productsSwiper = new Swiper(".products-mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});



//DROP DOWN TABS//


//creating timeline for pop up images in the tabs//

const dopAppear = gsap.timeline();
dopAppear.pause(); //pausing it so that it only plays once the tab gets opened

dopAppear.from('.tab2-header', {  
  opacity: 0, 
  y: -50, 
  duration: 2, 
  ease: "power4",
});

dopAppear.from('.dop', {  
  opacity: 0, 
  scale: 0, 
  stagger: 1, 
  duration: 3, 
  ease: "back.out(1.4)",
}, '-=1');


dopAppear.from('.tab2-text', {  
  opacity: 0, 
  duration: 1, 
  ease: "power4)",
}, '-=4'); 

const tab2 = document.querySelector('.tab2'); //grabbing the select tab//
tab2.addEventListener ('click', () => { //once you open the tab, the timeline will run//
  dopAppear.play();
});


//creating a from-to timelines to create the illusion of the gondola repeating starting at one side and moving across to the other side

const movingGondola = gsap.fromTo(".gondola", 10, {
  x:-1000}, //inital spot//
  {x:1200,  //end spot//
  ease:Linear.easeNone, 
  repeat:-1, //so it keeps repeating//
}); 

movingGondola.progress(0.5).pause();

document.onclick=function() { //since its the first tab and is open by default first, having the timelines start once the document is opened means it runs instantly//
  movingGondola.play();
};
    

//timteline for third tab//
const thirdTab = gsap.timeline();
thirdTab.pause(); 

thirdTab.from('.tab-header3', {  
  opacity: 0, 
  y: -50, 
  duration: 2, 
  ease: "power4",
});

thirdTab.from('.block', {  
  opacity: 0, 
  y: 200, 
  duration: 3, 
  ease: "power4",
}, '-=2');

const tab3 = document.querySelector('.tab3');
tab3.addEventListener ('click', () => {
  thirdTab.play();
});



//ABOUT US SECTION//

// grabbing all the elements that can be clicked and the text boxes and turning them into arraus//  

const CircleIndicators = document.querySelectorAll('.circle-indicators');
const circleFrameButtons = Array.from(CircleIndicators);

const aboutTextBoxes = document.querySelectorAll('.about-texts');
const swappingAboutText = Array.from(aboutTextBoxes);

const aboutScrollToLocation = document.querySelector('.about-images');
const normalaboutScrollToLocation = document.querySelector('.about-instructions');

// creating an initial function that includes having the text animate in and out to make it look like its fading when it changes//

function boxFades(boxNumber,size){  

  gsap.to('.about-texts', {
    opacity:0,    
    duration: 2,
    ease:"power1",
  });

  gsap.to(boxNumber, {
    opacity:1,    
    duration: 2,
    ease:"power1",
  });

  //creating a function that runs a media query in it
  
  function responsiveFunction(x) {  
    if (x.matches) { // If media query matches x size, then scroll the screen to the previously declared varibale, which scrolls to the about images//
      aboutScrollToLocation.scrollIntoView();
    } else {
      normalaboutScrollToLocation.scrollIntoView(); //otherwise scroll to the other decalred variable which scrolls to the variable - this is done as the different widths mean the ratio of the image/textbox on the screen at the same time differs, so changing the scroll location means both can still be visible regardless of screen sie//
    }
  }
  
  const x = window.matchMedia(size); 
  responsiveFunction(x); 
  x.addListener(responsiveFunction); 
  
}

//creating another function that runs the fade in and out function once a certain box is clicked

function changingAboutUsText (frameSelected, boxNumber){
  frameSelected.addEventListener('click', function (){
    boxFades (boxNumber, "(max-width: 768px)"); //running the above function and passing through parameters, including the responsive width//
  });
}

//running the changing function with the different boxes and text//
changingAboutUsText (circleFrameButtons[0], swappingAboutText[0]);
changingAboutUsText (circleFrameButtons[1], swappingAboutText[1]);
changingAboutUsText (circleFrameButtons[2], swappingAboutText[2]);
changingAboutUsText (circleFrameButtons[3], swappingAboutText[3]);
changingAboutUsText (circleFrameButtons[4], swappingAboutText[4]);
changingAboutUsText (circleFrameButtons[5], swappingAboutText[5]);



//INQUIRY SECTIONS //
    
//grabbing all the options avaiable in the drop down option menu in the form//

const menuSelect = document.querySelectorAll('.menu-select');
const dropDownOptions = Array.from(menuSelect);

//grabbing the different options for the colour selections in the input form//
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');

// creating a function that changes the text of the options in the colour selection drop down menu depending on what vase is selected before it//
function inquiryColourName (vaseSelected, colourA, colourB, colourC){
  vaseSelected.addEventListener ('click', () => {
    option1.innerHTML = colourA;
    option2.innerHTML = colourB; //changing the html to the different options by making them different parameters/
    option3.innerHTML = colourC;
  });
}

//running the function//
inquiryColourName (dropDownOptions[0], "Blue", "Purple", "Green");
inquiryColourName (dropDownOptions[1], "Pink", "Blue", "Yellow");
inquiryColourName (dropDownOptions[2], "Pink", "Purple", "Black");
inquiryColourName (dropDownOptions[3], "Teal", "Blue", "Green");
inquiryColourName (dropDownOptions[4], "Pink", "Teal", "Purple");
inquiryColourName (dropDownOptions[5], "Teal", "Purple", "Green");
inquiryColourName (dropDownOptions[6], "Orange", "Pink", "Yellow");


// grabbing the input form button//
const form = document.querySelector('.input-validation-required');
const thanks = document.querySelector('.thankyou-message');
const thanksButton = document.querySelector('.thanks-button');


form.addEventListener('sl-submit', () => {
  thanks.style.display="block";
  thanks.scrollIntoView();
});

thanksButton.addEventListener('click', () => {

  gsap.to(thanks, { 
   opacity: 0,
   duration: 5,
  });

  thanks.style.display="none";
});



//HAMBURGER MENU//       

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");


//when the hamburger menu is clicked, change the class to active to make the hamburger turn into a cross//

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// closing the hamburger menu for when each item is clicked//

//grabbing each link//
const productJump = document.querySelector('.nav-products');
const processJump = document.querySelector('.nav-process');
const aboutJump = document.querySelector('.nav-about');
const inqJump = document.querySelector('.nav-inq');

// creating function to remove the active class that closes the hamburger menu and then making it scroll to a certain section//
function hamburgerJumps (menuItem, jumpLocation){
  menuItem.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    document.querySelector(jumpLocation).scrollIntoView();
  });
}

//running function//
hamburgerJumps (productJump, ".products-grid-layout");
hamburgerJumps (processJump, "#process-caro");
hamburgerJumps (aboutJump, "#about-us");
hamburgerJumps (inqJump, "#inquiries");
   

//GRID VIEW FLIP CARDS FOR REPSONSIVE//

//grabbing all the cards//
const cardFlipping = document.querySelectorAll('.card-style');

//using a for each, saying that for when the each card is flipped, perform the the flip//
cardFlipping.forEach(function(cardFlipping){
  cardFlipping.addEventListener( 'click', function(e) { //when the card is clicked, check the position on the screen the user clicks//
    if(e.target.classList.contains('col')){ //if they click on one of the colour swatches, terminate the function//
      return;
    }else{
      cardFlipping.classList.toggle('is-flipped'); //otherwise flip the card by adding the is flipped class to it//
    }
  });  
});


//grabbing all the close buttons for the cards// 
const cardClosing = document.querySelectorAll('.table-closebutton');

//using a for each, saying that for when the each card is flipped, perform the the flip//
cardClosing.forEach(function(cardClosing){
  cardClosing.addEventListener( 'click', function() {
    document.querySelector(".inq").scrollIntoView();
  });
});



//RESPONSIVE DESIGN//
//changing the image of the caroseul frames for repsonsive for better sizing//

//grabbing all the frames//
const aboutframes = document.querySelector('.f2');
const changingCaroFrames = document.querySelectorAll('.caro-pic');
const caroFrames = Array.from(changingCaroFrames);

//creating function that states, when the screen size is x, change the before frame to the new image of the frame, otherwise leave it as it was//
function responsiveFrames (width, beforeFrame,afterTallFrame,original ) {

  function responsiveFunction(x) {
    if (x.matches) { // If media query matches
      beforeFrame.src = afterTallFrame;
    } else {
      beforeFrame.src = original;
    }
  }

  const x = window.matchMedia(width);
  responsiveFunction(x) ;// Call listener function at run time
  x.addListener(responsiveFunction); // Attach listener function on state changes

}

//running function at differnt media queries//
responsiveFrames ("(max-width: 768px)", caroFrames[0], "../images/repsonsiveframe1.png", "../images/frame1.png" );
responsiveFrames ("(max-width: 768px)", caroFrames[1], "../images/repsonsiveframe2.png", "../images/frame2.png" );
responsiveFrames ("(max-width: 768px)", caroFrames[2], "../images/repsonsiveframe3.png", "../images/frame3.png" );
responsiveFrames ("(max-width: 768px)", caroFrames[3], "../images/repsonsiveframe4.png", "../images/frame4.png" );
responsiveFrames ("(max-width: 768px)", caroFrames[4], "../images/repsonsiveframe5.png", "../images/frame5.png" );
responsiveFrames ("(max-width: 768px)", caroFrames[5], "../images/repsonsiveframe6.png", "../images/frame6.png" );
responsiveFrames ("(max-width: 768px)", aboutframes, "../images/360about.png", "../images/allframes.png" );

responsiveFrames ("(max-width: 360px)", caroFrames[0], "../images/360frame1.png", "../images/frame1.png" );
responsiveFrames ("(max-width: 360px)", caroFrames[1], "../images/360frame2.png", "../images/frame2.png" );
responsiveFrames ("(max-width: 360px)", caroFrames[2], "../images/360frame3.png", "../images/frame3.png" );
responsiveFrames ("(max-width: 360px)", caroFrames[3], "../images/360frame4.png", "../images/frame4.png" );
responsiveFrames ("(max-width: 360px)", caroFrames[4], "../images/360frame5.png", "../images/frame5.png" );
responsiveFrames ("(max-width: 360px)", caroFrames[5], "../images/360frame6.png", "../images/frame6.png" );

