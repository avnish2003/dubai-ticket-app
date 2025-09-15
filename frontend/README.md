# Latin Notion Bachata Festival Website

A modern, responsive website for the Latin Notion Bachata Festival in Dubai, featuring a complete ticketing system and admin panel.

## 🎭 Features

### 🏠 Homepage
- **Hero Section** with animated countdown timer to festival start
- **Phase 1 Banner** with special discount offers
- **Festival Highlights** showcasing key features
- **Artist Showcase** featuring world-class bachata artists
- **Notion Cup Preview** for the competition
- **Quick Info** section with festival statistics

### 🎫 Ticketing System
- **Multiple Ticket Types**: Early Bird, Standard, VIP, Workshop-only
- **Real-time Availability** tracking with visual indicators
- **Secure Booking Form** with validation
- **Payment Integration** ready for implementation
- **Booking Confirmation** system

### 👨‍💼 Admin Panel
- **Dashboard Overview** with key statistics
- **Ticket Management** - create, edit, delete ticket types
- **Booking Management** - view and manage all bookings
- **Export Functionality** for booking data
- **Settings Panel** for festival configuration

### 🎨 Design Features
- **Responsive Design** - works on all devices
- **Modern UI/UX** with glassmorphism effects
- **Smooth Animations** using Framer Motion
- **Interactive Elements** with hover effects
- **Accessibility** features built-in

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dubai/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.tsx & Header.css
│   │   ├── Footer.tsx & Footer.css
│   │   ├── CountdownTimer.tsx & CountdownTimer.css
│   │   ├── PhaseOneBanner.tsx & PhaseOneBanner.css
│   │   ├── ArtistShowcase.tsx & ArtistShowcase.css
│   │   ├── FestivalHighlights.tsx & FestivalHighlights.css
│   │   └── NotionCupPreview.tsx & NotionCupPreview.css
│   ├── pages/
│   │   ├── Home.tsx & Home.css
│   │   ├── Festival.tsx & Festival.css
│   │   ├── Artists.tsx & Artists.css
│   │   ├── NotionCup.tsx & NotionCup.css
│   │   ├── About.tsx & About.css
│   │   ├── Contact.tsx & Contact.css
│   │   ├── Ticketing.tsx & Ticketing.css
│   │   └── AdminPanel.tsx & AdminPanel.css
│   ├── App.tsx & App.css
│   ├── index.tsx & index.css
│   └── package.json
```

## 🎯 Key Pages

### 🏠 Home (`/`)
- Festival overview with countdown timer
- Featured artists and highlights
- Call-to-action sections

### 🎪 Festival (`/festival`)
- Detailed festival information
- Complete schedule and timeline
- What's included in tickets

### 👥 Artists (`/artists`)
- Featured bachata artists
- Artist profiles and achievements
- Social media links

### 🏆 Notion Cup (`/notion-cup`)
- Competition details and rules
- Prize information
- Registration process

### ℹ️ About (`/about`)
- Festival story and mission
- Team information
- Values and principles

### 📞 Contact (`/contact`)
- Contact information
- Contact form with validation
- FAQ section

### 🎫 Ticketing (`/tickets`)
- Ticket selection and booking
- Secure payment form
- Booking confirmation

### 👨‍💼 Admin Panel (`/admin`)
- Dashboard with statistics
- Ticket and booking management
- Export and settings

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **Lucide React** - Modern icons
- **CSS3** - Custom styling with animations

## 🎨 Design System

### Colors
- **Primary Purple**: `#6B46C1`
- **Dark Purple**: `#4C1D95`
- **Gold**: `#F59E0B`
- **White**: `#FFFFFF`
- **Dark**: `#1F2937`

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- **Buttons**: Multiple variants with hover effects
- **Cards**: Glassmorphism design with borders
- **Forms**: Validated inputs with error states
- **Modals**: Overlay components for forms

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## 🔧 Customization

### Adding New Artists
1. Edit `src/pages/Artists.tsx`
2. Add artist data to the `artists` array
3. Include image, bio, and social media links

### Modifying Ticket Types
1. Edit `src/pages/Ticketing.tsx`
2. Update the `ticketTypes` array
3. Adjust pricing and features

### Updating Festival Information
1. Edit relevant page components
2. Update dates, locations, and descriptions
3. Modify countdown timer target date

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Configure environment variables if needed

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically build and deploy
3. Configure custom domain if needed

## 🔐 Security Features

- **Form Validation** - Client-side validation for all forms
- **Input Sanitization** - Protection against XSS attacks
- **Secure Headers** - CSP and security headers
- **Environment Variables** - Sensitive data protection

## 📊 Performance

- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - Optimized images and placeholders
- **Bundle Analysis** - Optimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Email: info@latinnotion.com
- Phone: +971 521 430271
- WhatsApp: +971 521 430271

---

**Latin Notion Bachata Festival** - Bringing the world's best bachata to Dubai! 🇦🇪💃🕺
