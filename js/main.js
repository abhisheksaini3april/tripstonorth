(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // International Tour carousel
    $(".InternationalTour-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : false,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // packages carousel
    $(".packages-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    }); 

})(jQuery);


 document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const datetime = document.getElementById("datetime").value;
    const destination = document.getElementById("select1").options[document.getElementById("select1").selectedIndex].text;
    const persons = document.getElementById("SelectPerson").options[document.getElementById("SelectPerson").selectedIndex].text;
    const category = document.getElementById("CategoriesSelect").options[document.getElementById("CategoriesSelect").selectedIndex].text;
    const message = document.getElementById("message").value;

    const whatsappMessage = `*TripToNorth Booking Request*%0A
Name: ${name}%0A
Email: ${email}%0A
Date & Time: ${datetime}%0A
Destination: ${destination}%0A
No. of Persons: ${persons}%0A
Category: ${category}%0A
Special Request: ${message}`;

    const whatsappNumber = "6396044262";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");
  });



  const prices = {
    oneway: {
        "Delhi to Haridwar": { sedan: 3300, ertiga: 4500, innova: 6000 },
        "Chandigarh to Haridwar": { sedan: 3500, ertiga: 4500, innova: 6000 },
        "Chandigarh to Delhi": { sedan: 3800, ertiga: 5000, innova: 6500 },
        "Haridwar to Mussoorie": { sedan: 2500, ertiga: 3500, innova: 4500 },
        "Haridwar to Vikas Nagar": { sedan: 3200, ertiga: 4000, innova: 5000 }
    },
    daily: {
        "Haridwar to Mussoorie Darshan by Bus": { bus: 700 }
    },
    roundtrip: {
        "Haridwar to Delhi": { sedan: 6000, ertiga: 8000, innova: 11000 },
        "Haridwar to Chandigarh": { sedan: 6000, ertiga: 8000, innova: 11000 },
        "Haridwar to Kaichi Dham Darshan": { sedan: 9000, ertiga: 12000, innova: 15000 }
    }
};

const tripTypeSelect = document.getElementById("tripType");
const locationSelect = document.getElementById("location");
const carTypeSelect = document.getElementById("carType");
const priceDisplay = document.getElementById("priceDisplay");
const bookBtn = document.getElementById("bookBtn");

tripTypeSelect.addEventListener("change", () => {
    locationSelect.innerHTML = '<option value="">Select Location</option>';
    carTypeSelect.innerHTML = '<option value="">Select Car Type</option>';
    carTypeSelect.disabled = true;
    priceDisplay.textContent = "";
    bookBtn.style.display = "none";

    const tripType = tripTypeSelect.value;
    if (tripType) {
        locationSelect.disabled = false;
        Object.keys(prices[tripType]).forEach(loc => {
            let option = document.createElement("option");
            option.value = loc;
            option.textContent = loc;
            locationSelect.appendChild(option);
        });
    } else {
        locationSelect.disabled = true;
    }
});

locationSelect.addEventListener("change", () => {
    carTypeSelect.innerHTML = '<option value="">Select Car Type</option>';
    priceDisplay.textContent = "";
    bookBtn.style.display = "none";

    const tripType = tripTypeSelect.value;
    const location = locationSelect.value;
    if (location) {
        carTypeSelect.disabled = false;
        Object.keys(prices[tripType][location]).forEach(car => {
            let option = document.createElement("option");
            option.value = car;
            option.textContent = car.charAt(0).toUpperCase() + car.slice(1);
            carTypeSelect.appendChild(option);
        });
    } else {
        carTypeSelect.disabled = true;
    }
});

carTypeSelect.addEventListener("change", () => {
    const tripType = tripTypeSelect.value;
    const location = locationSelect.value;
    const carType = carTypeSelect.value;
    if (carType) {
        const price = prices[tripType][location][carType];
        priceDisplay.textContent = `Price: ₹${price}`;
        bookBtn.style.display = "block";
    } else {
        priceDisplay.textContent = "";
        bookBtn.style.display = "none";
    }
});

bookBtn.addEventListener("click", () => {
    const tripType = tripTypeSelect.value;
    const location = locationSelect.value;
    const carType = carTypeSelect.value;
    const price = prices[tripType][location][carType];
    window.open(`https://wa.me/6396044262?text=Booking%20Request%3A%20${tripType}%20-%20${location}%20-%20${carType}%20-%20Price%3A%20₹${price}`, "_blank");
});