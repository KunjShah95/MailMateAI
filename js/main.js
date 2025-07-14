// Main JavaScript for MailMate AI Landing Page

// DOM elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const faqQuestions = document.querySelectorAll('.faq-question');
const typingDemo = document.querySelector('#typing-demo .typing-content');

// Dark mode functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile menu functionality
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// FAQ functionality
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Close other FAQ items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherQuestion.querySelector('i');
                
                otherAnswer.classList.add('hidden');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Toggle current FAQ item
        answer.classList.toggle('hidden');
        const isOpen = !answer.classList.contains('hidden');
        icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});

// Typing animation for hero section
function startTypingAnimation() {
    const emails = [
        "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Software Engineering Internship position at your company...",
        "Dear Professor Johnson,\n\nI hope this email finds you well. I am reaching out to inquire about potential research opportunities in your lab...",
        "Dear Ms. Smith,\n\nThank you for taking the time to interview me yesterday for the Marketing Associate position. I wanted to follow up...",
        "Dear Scholarship Committee,\n\nI am writing to apply for the Merit-Based Scholarship program. As a dedicated computer science student..."
    ];
    
    let currentEmailIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        if (!typingDemo) return;
        
        const currentEmail = emails[currentEmailIndex];
        
        if (!isDeleting) {
            // Typing forward
            typingDemo.textContent = currentEmail.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentEmail.length) {
                // Finished typing, wait then start deleting
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 2000);
                return;
            }
        } else {
            // Deleting
            typingDemo.textContent = currentEmail.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                // Finished deleting, move to next email
                isDeleting = false;
                currentEmailIndex = (currentEmailIndex + 1) % emails.length;
                setTimeout(type, 500);
                return;
            }
        }
        
        // Continue typing/deleting
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    // Start the animation
    setTimeout(type, 1000);
}

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card-hover, .faq-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    startTypingAnimation();
    initScrollAnimations();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .card-hover {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
    }
    
    .card-hover.animate-fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
