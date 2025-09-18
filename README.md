# 📝 Todo Application

A full-stack todo application built with React and Node.js, featuring a modern UI and robust backend API.

## 🌐 Live Demo

**[View Live Application](https://dhanashri-salunkhe25.github.io/todos/)**

## ✨ Features

- ✅ **Add, Edit, Delete** todos
- 🔄 **Mark as Complete/Pending** 
- 🔍 **Filter** todos (All, Pending, Done)
- 💾 **Persistent Storage** with MongoDB
- 🎨 **Modern UI** with React
- 🚀 **Real-time Updates** 
- 📱 **Responsive Design**

## 🛠️ Tech Stack

### Frontend
- **React 19** - User interface
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **JavaScript ES6+** - Logic

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

## 🏗️ Project Structure

```
todos/
├── backend/              # Node.js API server
│   ├── server.js        # Main server file
│   ├── package.json     # Backend dependencies
│   └── .env            # Environment variables
├── frontend/            # React application
│   ├── src/
│   │   ├── App.jsx     # Main React component
│   │   ├── App.css     # Styles
│   │   └── main.jsx    # Entry point
│   ├── package.json    # Frontend dependencies
│   └── vite.config.js  # Vite configuration
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhanashri-salunkhe25/todos.git
   cd todos
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your MongoDB connection string
   echo "MONGO_URI=your_mongodb_connection_string" > .env
   echo "PORT=5000" >> .env
   
   # Start the backend server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env file with backend URL
   echo "VITE_API_URL=http://localhost:5000" > .env
   
   # Start the frontend development server
   npm run dev
   ```

4. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Fetch all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| DELETE | `/todos/:id` | Delete a todo |

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoDB
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Frontend (GitHub Pages)
```bash
cd frontend
npm run deploy
```

### Backend
The backend can be deployed to platforms like:
- Heroku
- Vercel
- Railway
- DigitalOcean

## 🐛 Troubleshooting

### Common Issues

1. **JSON Parsing Errors**
   - ✅ Fixed: Updated MongoDB driver API usage
   - ✅ Fixed: Added proper error handling in API responses

2. **CORS Issues**
   - ✅ Fixed: Configured CORS middleware properly

3. **Environment Variables**
   - Ensure `.env` files are created in both frontend and backend directories
   - Check that MongoDB connection string is valid

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Author

**Dhanashri Salunkhe**
- GitHub: [@dhanashri-salunkhe25](https://github.com/dhanashri-salunkhe25)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing fast build tool
- MongoDB for the flexible database solution
- Express.js for the minimalist web framework