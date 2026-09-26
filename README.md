# Morse Code Audio & Signal Trainer

A complete, production-ready static website for learning and practicing International Morse Code through audio-based training methods.

## Features

- **Audio Practice**: Listen to Morse code and test your recognition skills with random characters
- **Letter Practice**: Focused A-Z practice with beginner, intermediate, and challenge modes
- **Number Practice**: Dedicated practice for Morse code numbers 0-9
- **Alphabet Reference**: Complete International Morse Code reference with audio playback
- **Signals Guide**: Common procedural signals (SOS, CQ, AR, SK, etc.) and their meanings
- **Learning Resources**: Comprehensive beginner's guide for learning Morse code
- **Examples**: Sample words, phrases, and sentences with audio playback
- **Adjustable Settings**: Control WPM (5-35), tone frequency (300-1000Hz), and volume
- **Score Tracking**: Monitor your progress with built-in scoring and accuracy tracking

## Technology

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Modern, responsive design with mobile-first approach
- **Vanilla JavaScript**: No frameworks, using browser-native APIs
- **Web Audio API**: Programmatic Morse audio generation (no external audio files)
- **localStorage**: Client-side storage for settings and progress

## Project Structure

```
/
├── index.html
├── audio-practice.html
├── letter-practice.html
├── number-practice.html
├── morse-code-alphabet.html
├── morse-code-signals.html
├── learn-morse-code.html
├── morse-code-examples.html
├── faq.html
├── about.html
├── privacy-policy.html
├── terms.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── deno.json
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── audio.js
│       ├── main.js
│       └── practice.js
│
└── README.md
```

## Local Development

### Option 1: Simple HTTP Server

Use any static file server to serve the files:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server installed)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 2: Deno

If you have Deno installed:

```bash
deno run --allow-net --allow-read https://deno.land/std/http/file_server.ts
```

## Deployment to Deno Deploy

### Prerequisites

1. A GitHub account with this repository pushed to it
2. A Deno Deploy account (free tier available)

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/morse-code-audio-trainer.git
   git push -u origin main
   ```

2. **Deploy to Deno Deploy**
   - Go to [deno.com/deploy](https://deno.com/deploy)
   - Click "New Project"
   - Select "GitHub" as the source
   - Choose your repository
   - Deno Deploy will automatically detect it as a static site
   - Click "Deploy"

3. **Update URLs**
   - After deployment, update the canonical URLs in:
     - All HTML files (search for `https://morse-audio-trainer.deno.dev/`)
     - `sitemap.xml`
     - `robots.txt`
   - Replace with your actual Deno Deploy URL

### Deno Deploy Configuration

The `deno.json` file is included for Deno Deploy compatibility. This project is designed as a static site, so Deno Deploy will serve the files directly without any server-side processing.

## SEO Features

- Unique titles and meta descriptions for each page
- Semantic HTML with proper heading hierarchy
- Canonical URLs
- Open Graph metadata
- JSON-LD structured data (WebSite, WebPage, FAQPage, BreadcrumbList)
- Mobile-friendly responsive design
- robots.txt and sitemap.xml

## Accessibility

- Semantic HTML structure
- Keyboard-accessible controls
- Visible focus states
- Labels for all form inputs
- Accessible buttons with ARIA labels where needed
- Good color contrast
- Responsive tables for mobile

## Browser Support

- Modern browsers with Web Audio API support
- Chrome, Firefox, Safari, Edge (recent versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Audio Implementation

The Morse audio is generated programmatically using the Web Audio API:

- No external audio files required
- Accurate timing based on standard Morse ratios
- Dot = 1 time unit
- Dash = 3 time units
- Gap between elements = 1 unit
- Gap between characters = 3 units
- Gap between words = 7 units

## Privacy

- No personal data collection
- No tracking cookies
- localStorage used only for settings and progress (stored on user's device)
- No third-party analytics or advertising

## License

This project is provided as-is for educational purposes.

## Support

For issues or questions about Morse code learning, please refer to the FAQ section on the website.

## External Link

This website includes one contextual external link to a morse code translator tool for educational purposes, placed in a relevant learning context as specified in the project requirements.
# pro-morse-code
