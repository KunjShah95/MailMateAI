# MailMate AI - Professional Email Writing Assistant

![MailMate AI Logo](https://img.shields.io/badge/MailMate-AI-blue?style=for-the-badge&logo=email)

A modern, minimalistic SaaS application that helps students and young professionals write perfect professional emails using AI. Built with clean design principles, mobile-first approach, and optimized for user experience.

## 🌟 Features

### Core Functionality
- **AI-Powered Email Generation** - Multiple LLM providers with fallback logic
- **Multiple Email Types** - Internships, Professor outreach, Job applications, Follow-ups, Scholarships
- **Tone Control** - Professional, Friendly, Grateful, Assertive options
- **Real-time Preview** - See your email before copying
- **Copy to Clipboard** - One-click copying with success feedback
- **Edit Before Sending** - Inline editing capabilities

### User Experience
- **Mobile-First Design** - Responsive across all devices
- **Dark/Light Mode** - Automatic theme switching with persistence
- **Usage Tracking** - Daily limits for free tier
- **Example Templates** - Quick-start with pre-filled examples
- **FAQ Section** - Comprehensive help and support

### Technical Features
- **Pure HTML/CSS/JS** - No framework dependencies
- **Tailwind CSS** - Utility-first styling
- **Local Storage** - Client-side state persistence
- **Modern UI Components** - Cards, modals, animations
- **Accessibility** - WCAG compliant design
- **SEO Optimized** - Semantic HTML structure

## 🎨 Design System

### Colors
- **Primary**: Blue-Purple gradient (#667eea to #764ba2)
- **Background**: Clean white with subtle gray accents
- **Text**: High contrast dark grays
- **Accents**: Soft blues and purples

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from 14px to 60px
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Rounded corners** - 12px to 24px radius
- **Soft shadows** - Multiple layers for depth
- **Hover animations** - Smooth transitions
- **Card-based layout** - Clean separation

## 📁 Project Structure

```
MailMateAI/
├── index.html              # Landing page
├── generator.html           # Email generator dashboard
├── pricing.html            # Pricing page
├── css/
│   └── styles.css          # Additional custom styles
├── js/
│   ├── main.js             # Landing page functionality
│   └── generator.js        # Email generator logic
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or download** the project files
```bash
git clone <repository-url>
cd MailMateAI
```

2. **Open in browser**
   - Double-click `index.html` for basic viewing
   - Or serve via local server for full functionality:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. **Access the application**
   - Navigate to `http://localhost:8000`
   - Start with the landing page and explore

## 📱 Pages Overview

### Landing Page (`index.html`)
- **Hero section** with animated typing demo
- **How it Works** - 3-step process explanation
- **Use Cases** - Different email scenarios
- **Testimonials** - Student success stories
- **Pricing** - Tiered pricing plans
- **FAQ** - Common questions and answers

### Email Generator (`generator.html`)
- **Input form** with email type selection
- **Recipient and content fields**
- **Tone selection options**
- **Real-time generation** with loading states
- **Email preview and editing**
- **Copy functionality** with success feedback

### Pricing Page (`pricing.html`)
- **Detailed plan comparison**
- **Monthly/Yearly toggle** with savings indicator
- **Feature comparison table**
- **FAQ section** specific to pricing

## 🎯 User Flow

1. **Landing** → User discovers MailMate AI
2. **Try Free** → Navigate to email generator
3. **Select Type** → Choose email category
4. **Input Details** → Describe recipient and content
5. **Generate** → AI creates professional email
6. **Review/Edit** → Modify if needed
7. **Copy** → One-click clipboard copy
8. **Success** → Confirmation and usage tracking

## 💡 Key Features Implementation

### AI Email Generation
```javascript
// Mock implementation - replace with actual API
async function generateEmail(emailData) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
    });
    return response.json();
}
```

### Dark Mode Toggle
```javascript
// Theme persistence with system preference detection
function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}
```

### Usage Tracking
```javascript
// Daily limit enforcement for free tier
function updateUsageDisplay() {
    const remaining = Math.max(0, 5 - dailyUsage);
    if (remaining === 0) {
        generateBtn.disabled = true;
        // Show upgrade prompt
    }
}
```

## 🎨 Customization

### Tailwind Configuration
The project uses Tailwind CSS with custom configuration:

```javascript
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    500: '#667eea',
                    600: '#5a67d8',
                    700: '#4c51bf',
                }
            }
        }
    }
}
```

### Custom Animations
```css
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
```

## 📊 Performance Optimization

- **Lazy loading** for images and content
- **Minified assets** for production
- **CDN resources** for fonts and icons
- **Local storage** for state management
- **Optimized animations** with CSS transforms

## 🔒 Security Considerations

- **Client-side only** - No sensitive data transmission
- **Local storage encryption** for user preferences
- **XSS prevention** with input sanitization
- **HTTPS enforcement** for production

## 🧪 Testing

### Manual Testing Checklist
- [ ] All links work correctly
- [ ] Forms submit and validate properly
- [ ] Dark/light mode toggle functions
- [ ] Mobile responsive design
- [ ] Copy to clipboard works
- [ ] Usage tracking accurate
- [ ] FAQ accordion works
- [ ] Modal dialogs function

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🚀 Deployment

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Enable in repository settings
- **AWS S3**: Upload files and configure bucket

### Configuration for Production
1. **Update API endpoints** in JavaScript files
2. **Enable HTTPS** for secure operation
3. **Configure CDN** for better performance
4. **Set up analytics** tracking
5. **Add error monitoring**

## 🛠 Development

### Local Development Setup
```bash
# Install dependencies (if using build tools)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Code Style Guidelines
- **Semantic HTML** for accessibility
- **BEM methodology** for CSS classes
- **ES6+ JavaScript** with async/await
- **Mobile-first** responsive design
- **Progressive enhancement** approach

## 📈 Future Enhancements

### Phase 1
- [ ] User authentication system
- [ ] Email template library
- [ ] Advanced AI customization
- [ ] Email scheduling feature

### Phase 2
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] API for third-party integration
- [ ] Advanced usage analytics

### Phase 3
- [ ] Mobile app development
- [ ] Enterprise features
- [ ] White-label solutions
- [ ] Advanced AI training

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support and questions:
- **Email**: support@mailmate.ai
- **Documentation**: [docs.mailmate.ai]
- **Community**: [discord.gg/mailmate]

## 🏆 Credits

- **Design**: Inspired by modern SaaS applications
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Framework**: Tailwind CSS
- **Images**: Unsplash (for testimonials)

---

*Built with ❤️ for students and young professionals*
