/*============================================================================================
    # Wrapper Overlay
============================================================================================*/
// document.getElementById("toggle-content").addEventListener("click", function () {
//     // Hide the overlay
//     const overlay = document.getElementById("overlay");
//     overlay.style.display = "none";

    // Play the audio
//    const audioPlayer = document.getElementById("audio-player");
//    audioPlayer.play();  // Start playing the audio
// });
// This runs as soon as the page is finished loading
window.addEventListener('load', function() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
        // A tiny delay (100ms) makes the start of the fade feel more intentional
        setTimeout(() => {
            wrapper.classList.add('visible');
      }, 100);
    }
});
// Your existing toggle-content code stays below this...
document.getElementById("toggle-content").addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper");
    var card = document.querySelector(".card");
    const audioPlayer = document.getElementById("audio-player");
    // 1. Play the audio immediately
    if (audioPlayer) {
        audioPlayer.play().catch(e => console.log("Audio play prevented"));
    }
    // 2. Unlock the body scroll immediately so the transition is fluid
    document.body.style.overflowY = "auto";
    document.body.classList.add("unlocked");
    // 3. Start the cross-fade
    // Wrapper fades out (via CSS .hidden class)
    wrapper.classList.add("hidden");
    // Card fades in (via CSS .show class)
    card.classList.add("show");
    // 4. Clean up: Only hide the wrapper from the DOM after it's fully invisible
   setTimeout(() => {
        wrapper.style.display = "none";
    }, 2000); // Matches the 1.2s transition time in your CSS
});
/** =====================================================
 *  Timer Countdown
  ======================================================= */

function setupCountdown(campaignSelector, startTimeMillis, endTimeMillis) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;

    function calculateRemaining() {
        var now = new Date().getTime();
        return now >= startTimeMillis && now < endTimeMillis ? endTimeMillis - now : 0;
    }

    var didRefresh = false;
    var previousGap = calculateRemaining();

    function countdown() {
        var gap = calculateRemaining();
        var shouldRefresh = previousGap > day && gap <= day || previousGap > 0 && gap === 0;

        previousGap = gap;

        var textDay = Math.floor(gap / day);
        var textHour = Math.floor((gap % day) / hour);
        var textMinute = Math.floor((gap % hour) / minute);
        var textSecond = Math.floor((gap % minute) / second);

        if (document.querySelector(campaignSelector + ' .timer')) {
            document.querySelector(campaignSelector + ' .day').innerText = textDay;
            document.querySelector(campaignSelector + ' .hour').innerText = textHour;
            document.querySelector(campaignSelector + ' .minute').innerText = textMinute;
            document.querySelector(campaignSelector + ' .second').innerText = textSecond;
        }

        if (shouldRefresh && !didRefresh) {
            didRefresh = true;
            setTimeout(function () {
                window.location.reload();
            }, 30000 + Math.random() * 90000);
        }
    }

    countdown();
    setInterval(countdown, 1000);
}

document.addEventListener("DOMContentLoaded", function (event) {
    if (!document.querySelectorAll || !document.body.classList) {
        return;
    }

});

setupCountdown(".campaign-0", new Date().getTime(), 1783742400000);





/** =====================================================
 *  Add to Calendar
  ======================================================= */
const event = {
    title: "Jemputan Kenduri Kahwin Putri & Amirul",
    startDate: "20260711T030000Z", // YYYYMMDDTHHmmssZ (UTC)
    endDate: "20260711T080000Z",
    location: "Kingsman Event Hall, Jalan Kontraktor U1/14, Hicom-glenmarie Industrial Park, 40150 Shah Alam, Selangor",
    description: "Kami menjemput tuan/puan hadir ke majlis perkahwinan anakanda kami.",
};

// Function to generate Google Calendar URL
function generateGoogleCalendarLink(event) {
    const { title, startDate, endDate, location, description } = event;

    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
        text: title,
        dates: `${startDate}/${endDate}`,
        details: description,
        location: location,
    });

    return `${baseUrl}&${params.toString()}`;
}

// Function to generate ICS file content (FIXED VERSION)
function generateICS(event) {
    const { title, startDate, endDate, location, description } = event;

    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//My Wedding Invitation//EN",
        "BEGIN:VEVENT",
        `SUMMARY:${title}`,
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n"); // Using join ensures there are no hidden spaces at the start of lines
}

// Handler for Apple Calendar button
function addAppleCalendar() {
    const icsContent = generateICS(event);
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Jemputan_Putri_Amirul.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handler for Google Calendar button
function addGoogleCalendar() {
    const googleLink = generateGoogleCalendarLink(event);
    window.open(googleLink, "_blank");
}






/** =====================================================
 *  Location for Google and Waze
  ======================================================= */
function openGoogleMaps() {
    // Exact Place ID for Victoria Event Hall, Utropolis Glenmarie
    const placeId = "ChIJJe7mxZ9NzDEReyyIHgMHW4o";
    const url = `https://www.google.com/maps/search/?api=1&query=Victoria+Event+Hall&query_place_id=${placeId}`;
    window.open(url, "_blank");
}

function openWaze() {
    const lat = 3.0913915;
    const lng = 101.558229;
    // This deep link tells Waze to navigate exactly to those coordinates
    window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes&zoom=17`, "_blank");
}





/** =====================================================
    Contact
  ======================================================= */
function openWhatsApp(phoneNumber) {
    const message = "https://wedding-invitation-putri-amirul.vercel.app/\n\nHello, maaf menggangu. Saya ingin bertanyakan sesuatu berkenaan majlis perkahwinan ini.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");  // Opens WhatsApp in a new tab
}

function makePhoneCall(phoneNumber) {
    const callUrl = `tel:${phoneNumber}`;
    window.location.href = callUrl;  // Opens the phone dialer
}







/** =====================================================
 *  Animation
  ======================================================= */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 10;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);





/** =====================================================
 *  Background Animation
  ======================================================= */
const petalContainer = document.querySelector('.petal-container');

const maxPetals = 70; // Maximum number of petals allowed at once
const petalInterval = 100; // Interval for creating petals (100 milliseconds)

function createPetal() {
    if (petalContainer.childElementCount < maxPetals) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const startY = Math.random() * 100; // Randomized vertical start position
        const duration = 4 + Math.random() * 2; // Randomized animation duration (4 to 6 seconds)

        const petalSize = 5 + Math.random() * 10; // Random size between 5px and 20px

        // Randomize the opacity between 0.3 and 0.8 for varied transparency
        const petalOpacity = 0.3 + Math.random() * 0.5; // Randomized opacity

        petal.style.top = `${startY}%`; // Randomized starting vertical position
        petal.style.width = `${petalSize}px`;
        petal.style.height = `${petalSize}px`;
        petal.style.opacity = petalOpacity; // Set the random opacity
        petal.style.animationDuration = `${duration}s`; // Randomized animation duration

        // Randomize the final translation for X and Y for varied movement
        const translateX = 300 + Math.random() * 120; // TranslateX with some randomness
        const translateY = 300 + Math.random() * 120; // TranslateY with some randomness

        petal.style.setProperty('--translate-x', `${translateX}px`); // Set variable for translation X
        petal.style.setProperty('--translate-y', `${translateY}px`); // Set variable for translation Y

        petalContainer.appendChild(petal);

        // Ensure the petal is removed only after the animation completes
        setTimeout(() => {
            petalContainer.removeChild(petal);
        }, duration * 1000); // Convert duration to milliseconds
    }
}

// Create petals at a shorter interval with the defined interval time
setInterval(createPetal, petalInterval); // Create petals every 100 milliseconds




/** =====================================================
 *  Toggle Menu
  ======================================================= */
// ================================== Calendar ==================================
// Get all buttons and their corresponding menus
const toggleButtons = {
    'calendar-btn': 'calendar-menu',
    'location-btn': 'location-menu',
    'music-btn': 'music-menu',
    'rsvp-btn': 'rsvp-menu',
    'ucapan-btn': 'ucapan-menu',
    'contact-btn': 'contact-menu',
    'kehadiran-btn': 'rsvp-menu',
    'btn-hadir': 'success-menu'
    // Add other button-to-menu mappings here
};

// Function to toggle a menu open/close
function toggleMenu(menuId, event) {
    event.stopPropagation(); // Prevent click from propagating
    const menu = document.getElementById(menuId);

    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // Close the menu
    } else {
        // Close all other menus first
        closeAllMenus();
        menu.classList.add('open'); // Open the menu
    }
}

// Function to close all menus
function closeAllMenus() {
    for (const menuId of Object.values(toggleButtons)) {
        const menu = document.getElementById(menuId);
        if (menu.classList.contains('open')) {
            menu.classList.remove('open'); // Close the menu
        }
    }
}

// Add click event listeners to all toggle buttons
for (const [buttonId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(buttonId);
    button.addEventListener('click', (event) => toggleMenu(menuId, event));
}

// Add a global click handler to close all menus when clicking outside
document.addEventListener('click', () => closeAllMenus());

// Prevent clicks within menus from closing them
for (const menuId of Object.values(toggleButtons)) {
    const menu = document.getElementById(menuId);
    menu.addEventListener('click', (event) => event.stopPropagation());
}

// Function to close a specific menu
function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.classList.contains('open')) {
        menu.classList.remove('open'); // Close the menu
    }
}

// Add event listener for the close button inside the ucapan menu
const closeButton = document.querySelector('#ucapan-menu .tutup');
if (closeButton) {
    closeButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent this from propagating and triggering other closures
        closeMenu('ucapan-menu'); // Close the specific menu
    });
}

// Function to open RSVP
const kehadiranBtn = document.getElementById("kehadiran-btn");


/** =====================================================
 * Wish Card Board Handling (Google Sheets Version)
 * ===================================================== */
const wishApiUrl = "https://script.google.com/macros/s/AKfycbxHW_WAUJBE6yjUkFZB7yvC84XmCH5MDWS9OAUZC_XXiXofmXQxRKls-vcnkAU1tNMTmQ/exec"; 
let hasSubmittedWish = false;

// Helper function for Malaysian AM/PM Format
function getMalaysianTime() {
    const now = new Date();
    // Returns format: "17/02/2026, 12:30 PM"
    return now.toLocaleString('en-GB', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    }).toUpperCase();
}

/** =====================================================
 * Fetch and Display Wishes with Live Updates
 * ===================================================== */
async function loadWishes() {
    // We target the scrollable list wrapper inside your glass box
    const wishBoard = document.querySelector('.wish-list-wrapper') || document.querySelector('.container-message');
    
    try {
        const response = await fetch(wishApiUrl);
        const savedWishes = await response.json();
        
        const currentDisplayedCount = wishBoard.querySelectorAll('.content').length;
        
        if (savedWishes.length !== currentDisplayedCount) {
            wishBoard.innerHTML = ''; 
            // .reverse() ensures latest Google Sheet entries are at the top
            savedWishes.reverse().forEach(wish => {
                const wishHTML = `
                    <div class="content">
                        <div class="name">
                            <span>${wish.Pengirim}</span>
                            <span class="wish-time">${wish.Tarikh}</span>
                        </div>
                        <p class="message">${wish.Ucapan}</p>
                    </div>`;
                wishBoard.insertAdjacentHTML('beforeend', wishHTML);
            });
            console.log("Wish board updated.");
        }
    } catch (e) {
        console.log("Checking for wishes...");
    }
}

// 2. Handle sending a new wish
document.getElementById('form-ucapan').onsubmit = function(e) {
    e.preventDefault();
    if (hasSubmittedWish) return alert("Anda telah menghantar ucapan!");

    const nameInput = document.getElementById('wish-name');
    const messageInput = document.getElementById('wish-text');
    const btn = document.getElementById('btn-hantar-wish');
    
    // Use the new Malaysian AM/PM string
    const timeString = getMalaysianTime();

    btn.disabled = true;
    btn.innerHTML = "<span>Menghantar...</span>";

    const data = {
        Pengirim: nameInput.value,
        Ucapan: messageInput.value,
        Tarikh: timeString
    };

    // Sending data to Google Sheets
    fetch(wishApiUrl, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(() => {
        hasSubmittedWish = true;
        
        // Target the inner scrollable area
        const wishBoard = document.querySelector('.wish-list-wrapper') || document.querySelector('.container-message');
        
        // Add to board immediately at the top with your gold accent
        const newWishHTML = `
            <div class="content" style="border-left: 4px solid #d4af37; background: rgba(212, 175, 55, 0.05);">
                <div class="name">
                    <span>${data.Pengirim}</span>
                    <span class="wish-time">${data.Tarikh}</span>
                </div>
                <p class="message">${data.Ucapan}</p>
            </div>`;
            
        wishBoard.insertAdjacentHTML('afterbegin', newWishHTML);
        
        // Automatically scroll the box to the top to show the animation
        wishBoard.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show Success Menu
        const successMenu = document.getElementById("success-menu");
        successMenu.innerHTML = `
            <div class='success-message' style="text-align: center; padding: 20px;">
                <i class='bx bxs-heart' style='font-size: 50px; color: #d4af37;'></i>
                <p style='margin-top: 15px;'>Terima kasih <b>${data.Pengirim}</b>!</p>
                <p>Ucapan anda telah berjaya dihantar.</p>
                <button onclick="document.getElementById('success-menu').classList.remove('open')" 
                        style='margin-top:20px; padding: 8px 20px; background: #5a601f; color: white; border: none; border-radius: 10px;'>
                    Tutup
                </button>
            </div>`;
        successMenu.classList.add("open");

        // Clear inputs
        nameInput.value = '';
        messageInput.value = '';
        btn.disabled = false;
        btn.innerHTML = "<span>Hantar Ucapan</span>";
    })
    .catch(err => {
        console.error("Error sending wish:", err);
        btn.disabled = false;
        btn.innerHTML = "<span>Hantar Ucapan</span>";
    });
};

// Start loading when page is ready
document.addEventListener("DOMContentLoaded", loadWishes);



/** =====================================================
 * Handle Quick RSVP (Name, Pax & Anti-Spam Version)
 * ===================================================== */
// Add this variable at the very top of your main.js file to track submission status
let hasSubmittedRSVP = false;

/** =====================================================
 * Handle Quick RSVP (Name, Pax & Anti-Spam Version)
 * ===================================================== */
function sendQuickRSVP(status, successMessage, iconClass) {
    // 1. Check if they already submitted in this session
    if (hasSubmittedRSVP) {
        alert("Anda telah pun menghantar maklum balas. Terima kasih!");
        return;
    }

    const rsvpformspreeUrl = "https://formspree.io/f/xvzzpjgn";

    const nameInput = document.getElementById("guest-name-input");
    const guestName = nameInput ? nameInput.value.trim() : "";
    const paxValue = document.getElementById("pax-count").value;

    if (guestName === "") {
        alert("Sila masukkan nama anda sebelum klik hantar.");
        return;
    }

    // 2. Lock the buttons immediately
    const btnHadir = document.getElementById("btn-hadir");
    const btnTidakHadir = document.getElementById("btn-tidak-hadir");
    
    btnHadir.disabled = true;
    btnTidakHadir.disabled = true;
    const originalHadirText = btnHadir.innerHTML;
    btnHadir.innerHTML = "<span>Sila tunggu...</span>";

    const data = {
        Guest_Name: guestName,
        Attendance: status,
        Total_Pax: status === "Hadir" ? paxValue : "0",
        Message: "Quick RSVP from menu"
    };

    fetch(rsvpformspreeUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // 3. Set the global lock to true
            hasSubmittedRSVP = true;

            const successMenu = document.getElementById("success-menu");
            successMenu.innerHTML = `
                <div class='success-message'>
                    <i class='${iconClass}' style='font-size: 50px; color: #d4af37;'></i>
                    <p style='margin-top: 15px;'>Terima kasih <b>${guestName}</b>!</p>
                    <p>${successMessage}</p>
                    <button onclick="document.getElementById('success-menu').classList.remove('open')" style='margin-top:10px; padding: 5px 15px;'>Tutup</button>
                </div>`;
            successMenu.classList.add("open");
            
            const rsvpMenu = document.getElementById("rsvp-menu");
            if (rsvpMenu) rsvpMenu.classList.remove("open");

            // 4. Change the main RSVP button appearance (Optional but helpful)
            const mainRSVPBtn = document.getElementById("rsvp-btn");
            if (mainRSVPBtn) {
                mainRSVPBtn.style.opacity = "0.5";
                mainRSVPBtn.title = "Anda telah menghantar RSVP";
            }
        } else {
            alert("Maaf, sistem sedang sibuk.");
            btnHadir.disabled = false;
            btnTidakHadir.disabled = false;
            btnHadir.innerHTML = originalHadirText;
        }
    })
    .catch(error => {
        alert("Ralat sambungan.");
        btnHadir.disabled = false;
        btnTidakHadir.disabled = false;
        btnHadir.innerHTML = originalHadirText;
    });
}

// Keep your event listeners
document.getElementById("btn-hadir").onclick = function() {
    sendQuickRSVP("Hadir", "Kami menantikan kehadiran anda.", "bx bxs-smile");
};

document.getElementById("btn-tidak-hadir").onclick = function() {
    sendQuickRSVP("Tidak Hadir", "Terima kasih atas makluman anda.", "bx bxs-sad");
};

// Load wishes immediately when page opens
document.addEventListener("DOMContentLoaded", loadWishes);

// Check for new wishes every 10 seconds (10000 milliseconds)
setInterval(loadWishes, 10000);


/** =====================================================
 *  Image Carousel
  ======================================================= */

