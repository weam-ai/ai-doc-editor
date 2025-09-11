# AI Docs - AI-Powered Document Editor

A modern, AI-powered document editor similar to Genspark AI Docs, built with Next.js 14, MongoDB, and OpenAI integration.

## ✨ Features

### 🚀 Core Functionality
- **AI-Powered Document Generation**: Create documents using natural language prompts
- **Dual Editor Mode**: Toggle between Rich Text and Markdown editors seamlessly
- **Smart Templates**: Pre-built templates for common document types
- **Real-time Sync**: Content stays synchronized between both editor modes

### 🎨 Rich Text Editor
- Full-featured toolbar with formatting options
- Support for headings, lists, blockquotes, and code blocks
- Image and link insertion
- Text alignment and color options
- Undo/redo functionality

### 📝 Markdown Editor
- Live preview with syntax highlighting
- Markdown toolbar for quick formatting
- GitHub Flavored Markdown support
- Responsive design for all screen sizes

### 📊 Pre-built Templates
- **Project Proposal**: Comprehensive business proposal template
- **Technical Report**: Structured technical documentation
- **Blog Post**: Engaging content creation template
- **Resume**: Professional career template

### 🔄 Import & Export
- **Export Options**: PDF, Word (.docx), and HTML formats
- **Content Import**: Paste existing content for AI-powered reformatting
- **Smart Formatting**: AI automatically improves document structure and readability

### 🔐 Authentication & Security
- **Iron Session**: Secure cookie-based authentication
- **User Isolation**: Each user's documents are private
- **MongoDB**: Robust data storage with Mongoose ODM

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Database**: MongoDB with Mongoose
- **Authentication**: Iron Session with secure cookies
- **AI Integration**: OpenAI GPT-4o-mini API
- **Rich Text Editor**: Tiptap with comprehensive extensions
- **Markdown**: React-Markdown with syntax highlighting
- **Export**: jsPDF, html-to-docx, custom HTML export

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB instance (local or cloud)
- OpenAI API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd aidocs
```

### 2. Install & Run (from project root)
You can install and run everything from the root folder (no need to install/run separately for client and server):

```bash
npm install
npm run dev
```

### 3. Environment Configuration

Set up two environment files:

1) Root `.env` (for shared/dev config)
```env
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_API_BASE_PATH=/ai-video
```

2) AI-VideoGen `AI-VideoGen/config.env` (video studio server + providers)
```env
# Required cookies
WEAM_COOKIE_NAME=weam
WEAM_COOKIE_PASSWORD=replace-with-32-characters-min

# Server
PORT=3004
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3001

# Providers (green dot in dropdown when set)
RUNWAY_API_KEY=
BANANA_API_KEY=
VEO3_API_KEY=

# Database
MONGODB_URI=mongodb://localhost:27017/ai-videogen

# Gemini (chat prompt analysis)
GEMINI_API_KEY=
```

Notes:
- The video model dropdown shows availability dots based on provider keys: `RUNWAY_API_KEY`, `BANANA_API_KEY`, `VEO3_API_KEY`.
- You can override database with your own Atlas URI.

### 4. Iron Session Setup
1. Generate a secure password for cookie encryption
2. Set the `NEXT_PUBLIC_COOKIE_PASSWORD` environment variable
3. Customize cookie name if needed via `NEXT_PUBLIC_COOKIE_NAME`

### 5. OpenAI API Setup
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add the key to your `.env.local` file

### 6. Database Setup
1. Start MongoDB instance
2. The app will automatically create collections on first run
3. (Optional) Seed default templates:
   ```bash
   node scripts/seed-templates.js
   ```

### 7. Run the Application
From the project root:
```bash
npm run dev
```

- AI Docs: `http://localhost:3000`
- AI Video Studio: `http://localhost:3001/ai-video`

## 📁 Project Structure

```
aidocs/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── documents/     # Document CRUD operations
│   │   ├── generate/      # AI document generation
│   │   └── templates/     # Template management
│   ├── auth/              # Authentication pages
│   ├── editor/            # Document editor
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard
├── components/             # React components
│   ├── editor/            # Editor components
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── models/                 # MongoDB schemas
├── scripts/                # Database seeding scripts
└── public/                 # Static assets
```

## 🔧 Configuration

### Customizing the Theme
The app uses the custom primary color `#6737ec`. To change it:

1. Update `tailwind.config.js`:
```js
primary: {
  DEFAULT: "#your-color-here",
  // ...
}
```

2. Update `app/globals.css`:
```css
--primary: 262 83% 58%; /* Update HSL values */
```

### Adding New Templates
1. Create template in `scripts/seed-templates.js`
2. Run the seeding script
3. Templates will be available in the editor

## 📱 Usage

### Creating Documents
1. **AI Prompt**: Describe what you want to create
2. **Template**: Choose from pre-built templates
3. **Manual**: Start with a blank document

### Editor Features
- **Rich Text Mode**: Use the toolbar for formatting
- **Markdown Mode**: Write in markdown with live preview
- **Auto-save**: Changes are automatically saved
- **Export**: Download in PDF, Word, or HTML formats

### AI Assistance
- **Smart Formatting**: AI automatically improves document structure
- **Content Generation**: Generate content from prompts
- **Style Consistency**: Maintains professional formatting

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure environment variables
4. Set up MongoDB connection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Issues**: Create GitHub issues for bugs or feature requests
- **Documentation**: Check the code comments and this README
- **Community**: Join our discussions for help and ideas

## 🔮 Roadmap

- [ ] Real-time collaboration
- [ ] Advanced AI features (summarization, translation)
- [ ] Mobile app
- [ ] Plugin system
- [ ] Advanced export options
- [ ] Document versioning
- [ ] Team workspaces

---

Built with ❤️ using Next.js, MongoDB, and OpenAI
