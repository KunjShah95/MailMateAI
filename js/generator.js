// Email Generator JavaScript

// DOM elements
const emailForm = document.getElementById('email-form');
const generateBtn = document.getElementById('generate-btn');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const outputSection = document.getElementById('output-section');
const emailSubject = document.getElementById('email-subject');
const emailBody = document.getElementById('email-body');
const copyBtn = document.getElementById('copy-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const editBtn = document.getElementById('edit-btn');
const editSection = document.getElementById('edit-section');
const editableEmail = document.getElementById('editable-email');
const saveEditBtn = document.getElementById('save-edit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const successModal = document.getElementById('success-modal');
const closeModal = document.getElementById('close-modal');
const usageCount = document.getElementById('usage-count');
const themeToggle = document.getElementById('theme-toggle');
const exampleBtns = document.querySelectorAll('.example-btn');

// State
let currentEmailData = null;
let dailyUsage = parseInt(localStorage.getItem('dailyUsage') || '0');
let lastUsageDate = localStorage.getItem('lastUsageDate') || '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initUsageTracking();
    initExamples();
});

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

// Usage tracking
function initUsageTracking() {
    const today = new Date().toDateString();
    
    if (lastUsageDate !== today) {
        // Reset daily usage
        dailyUsage = 0;
        localStorage.setItem('dailyUsage', '0');
        localStorage.setItem('lastUsageDate', today);
    }
    
    updateUsageDisplay();
}

function updateUsageDisplay() {
    const remaining = Math.max(0, 5 - dailyUsage);
    usageCount.textContent = remaining;
    
    if (remaining === 0) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-lock mr-2"></i>Daily limit reached';
        generateBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function incrementUsage() {
    dailyUsage++;
    localStorage.setItem('dailyUsage', dailyUsage.toString());
    updateUsageDisplay();
}

// Example buttons functionality
function initExamples() {
    const examples = {
        'Internship Application': {
            emailType: 'internship',
            recipient: 'Hiring Manager at Google',
            content: 'I am a computer science student interested in applying for the summer software engineering internship program. I have experience with Python, JavaScript, and machine learning projects.',
            tone: 'professional'
        },
        'Professor Meeting': {
            emailType: 'professor',
            recipient: 'Professor Johnson, Computer Science Department',
            content: 'I am interested in discussing potential research opportunities in artificial intelligence and machine learning in your lab.',
            tone: 'professional'
        },
        'Interview Follow-up': {
            emailType: 'follow-up',
            recipient: 'Sarah Smith, Recruiting Manager',
            content: 'Thank you for the interview yesterday for the Marketing Associate position. I wanted to reiterate my enthusiasm for the role.',
            tone: 'grateful'
        }
    };
    
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.querySelector('.font-medium').textContent;
            const example = examples[title];
            
            if (example) {
                // Fill form with example data
                document.querySelector(`input[name="emailType"][value="${example.emailType}"]`).checked = true;
                document.getElementById('recipient').value = example.recipient;
                document.getElementById('content').value = example.content;
                document.querySelector(`input[name="tone"][value="${example.tone}"]`).checked = true;
                
                // Scroll to form
                emailForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (dailyUsage >= 5) {
        alert('You have reached your daily limit of 5 emails. Please upgrade to continue.');
        return;
    }
    
    // Get form data
    const formData = new FormData(emailForm);
    const emailData = {
        emailType: formData.get('emailType'),
        recipient: formData.get('recipient'),
        content: formData.get('content'),
        tone: formData.get('tone'),
        context: formData.get('context') || ''
    };
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Simulate API call (replace with actual API call)
        const generatedEmail = await generateEmail(emailData);
        
        // Show generated email
        displayGeneratedEmail(generatedEmail);
        incrementUsage();
        
    } catch (error) {
        console.error('Error generating email:', error);
        alert('Sorry, there was an error generating your email. Please try again.');
    } finally {
        setLoadingState(false);
    }
});

// Loading state management
function setLoadingState(isLoading) {
    if (isLoading) {
        btnText.classList.add('hidden');
        btnLoading.classList.remove('hidden');
        generateBtn.disabled = true;
    } else {
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// Mock API call (replace with actual implementation)
async function generateEmail(emailData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock email generation based on type
    const emailTemplates = {
        internship: {
            subject: `Application for ${emailData.recipient.includes('Google') ? 'Google' : 'Software Engineering'} Internship Position`,
            body: `Dear ${emailData.recipient},

I hope this email finds you well. I am writing to express my strong interest in the Software Engineering Internship position at your company.

${emailData.content}

I am particularly drawn to your company's commitment to innovation and would love the opportunity to contribute to your team while gaining valuable industry experience. I have attached my resume for your review and would welcome the chance to discuss my qualifications further.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]`
        },
        professor: {
            subject: `Request for Meeting - Research Opportunities`,
            body: `Dear ${emailData.recipient},

I hope you are doing well. I am reaching out to inquire about potential research opportunities in your laboratory.

${emailData.content}

I would be grateful for the opportunity to discuss how I might contribute to your research while furthering my academic goals. Would you be available for a brief meeting at your convenience?

Thank you for your time and consideration.

Respectfully,
[Your Name]`
        },
        job: {
            subject: `Application for [Position Title]`,
            body: `Dear ${emailData.recipient},

I am writing to express my interest in the [Position Title] role at your organization.

${emailData.content}

I believe my background and enthusiasm make me a strong candidate for this position. I have attached my resume and would welcome the opportunity to discuss how I can contribute to your team.

Thank you for your consideration.

Sincerely,
[Your Name]`
        },
        'follow-up': {
            subject: `Thank you for the interview - [Position Title]`,
            body: `Dear ${emailData.recipient},

${emailData.content}

The conversation reinforced my excitement about the opportunity and the possibility of contributing to your team. Please let me know if you need any additional information from me.

I look forward to hearing about the next steps in the process.

Best regards,
[Your Name]`
        },
        scholarship: {
            subject: `Application for [Scholarship Name]`,
            body: `Dear Scholarship Committee,

I am writing to apply for the [Scholarship Name] and would like to be considered for this opportunity.

${emailData.content}

This scholarship would significantly support my educational goals and allow me to focus more fully on my studies. I have attached all required documents for your review.

Thank you for your consideration.

Sincerely,
[Your Name]`
        },
        custom: {
            subject: `[Subject Line]`,
            body: `Dear ${emailData.recipient},

${emailData.content}

Thank you for your time and consideration.

Best regards,
[Your Name]`
        }
    };
    
    const template = emailTemplates[emailData.emailType] || emailTemplates.custom;
    
    // Adjust tone
    if (emailData.tone === 'friendly') {
        template.body = template.body.replace('Dear', 'Hi').replace('Sincerely', 'Best').replace('Respectfully', 'Best');
    } else if (emailData.tone === 'assertive') {
        template.body = template.body.replace('I hope this email finds you well. ', '');
    }
    
    return template;
}

// Display generated email
function displayGeneratedEmail(email) {
    currentEmailData = email;
    emailSubject.textContent = email.subject;
    emailBody.textContent = email.body;
    
    // Show output section
    outputSection.classList.remove('hidden');
    outputSection.scrollIntoView({ behavior: 'smooth' });
}

// Copy functionality
copyBtn.addEventListener('click', async () => {
    const fullEmail = `Subject: ${emailSubject.textContent}\n\n${emailBody.textContent}`;
    
    try {
        await navigator.clipboard.writeText(fullEmail);
        showSuccessModal();
    } catch (error) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = fullEmail;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showSuccessModal();
    }
});

// Regenerate functionality
regenerateBtn.addEventListener('click', () => {
    if (dailyUsage >= 5) {
        alert('You have reached your daily limit of 5 emails. Please upgrade to continue.');
        return;
    }
    
    emailForm.dispatchEvent(new Event('submit'));
});

// Edit functionality
editBtn.addEventListener('click', () => {
    const fullEmail = `Subject: ${emailSubject.textContent}\n\n${emailBody.textContent}`;
    editableEmail.value = fullEmail;
    editSection.classList.remove('hidden');
    editBtn.style.display = 'none';
});

saveEditBtn.addEventListener('click', () => {
    const editedContent = editableEmail.value;
    const lines = editedContent.split('\n');
    const subjectLine = lines[0].replace('Subject: ', '');
    const bodyContent = lines.slice(2).join('\n');
    
    emailSubject.textContent = subjectLine;
    emailBody.textContent = bodyContent;
    
    editSection.classList.add('hidden');
    editBtn.style.display = 'inline';
});

cancelEditBtn.addEventListener('click', () => {
    editSection.classList.add('hidden');
    editBtn.style.display = 'inline';
});

// Success modal
function showSuccessModal() {
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
}

closeModal.addEventListener('click', () => {
    successModal.classList.add('hidden');
    successModal.classList.remove('flex');
});

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    }
});
