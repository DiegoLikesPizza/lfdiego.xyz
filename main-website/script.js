// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Age and Birthday Calculator
function updateAgeAndBirthday() {
    const birthDate = new Date(2006, 11, 16); // December 16, 2006 (month is 0-indexed)
    const today = new Date();

    // Calculate current age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Calculate days until next birthday
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, 11, 16); // December 16 this year

    // If birthday already passed this year, calculate for next year
    if (today > nextBirthday) {
        nextBirthday = new Date(currentYear + 1, 11, 16);
    }

    const timeDiff = nextBirthday.getTime() - today.getTime();
    const daysUntilBirthday = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Update the display
    document.getElementById('current-age').textContent = age;
    document.getElementById('days-until-birthday').textContent = daysUntilBirthday;
}

// Update age and birthday on page load
updateAgeAndBirthday();

// Update daily at midnight
setInterval(updateAgeAndBirthday, 24 * 60 * 60 * 1000);

// CTA Button functionality
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

// Add some interactive hover effects
document.querySelectorAll('.project-link').forEach(link => {
    const card = link.querySelector('.project-card');
    link.addEventListener('mouseenter', function() {
        card.style.transform = 'translateY(-12px) scale(1.02)';
    });

    link.addEventListener('mouseleave', function() {
        card.style.transform = 'translateY(-8px) scale(1)';
    });
});

