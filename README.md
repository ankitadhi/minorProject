# Resume Builder Application

A full-stack web application that helps users create, build, and manage professional resumes with ease. This application combines a modern React frontend with a powerful Django backend to provide a seamless resume creation and management experience.

## Features

- **User Authentication**: Secure login and registration system
- **Resume Builder**: Intuitive interface to create and customize resumes
- **Resume Parser**: Parse and extract information from existing resume files
- **PDF Generation**: Download resumes as PDF files
- **Multiple Templates**: Choose from various professional resume templates
- **Resume Upload**: Upload and parse existing resumes
- **Dashboard**: Centralized dashboard to manage all resumes
- **Details Forms**: Comprehensive forms to input resume details
- **ChatBot**: Interactive chatbot for user assistance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend

- **React** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - Tool for transforming CSS

### Backend

- **Django** - Python web framework
- **Django REST Framework** - Building REST APIs
- **SQLite** - Database management
- **spaCy** - Natural language processing for resume parsing

## Project Structure

```
loginAuth/
├── auth_frontend/          # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.jsx        # API integration
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
└── backend/               # Django backend application
    ├── api/               # API endpoints
    ├── details_api/       # Details API endpoints
    ├── resume_parser/     # Resume parsing service
    ├── template_api/      # Template management
    ├── my_app/            # Main Django app settings
    ├── manage.py          # Django management
    ├── requirements.txt   # Backend dependencies
    └── db.sqlite3        # Database
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment (optional but recommended):

```bash
# On Windows
python -m venv env
env\Scripts\activate

# On macOS/Linux
python -m venv env
source env/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run migrations:

```bash
python manage.py migrate
```

5. Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000/`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd auth_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173/` (Vite default port)

## Configuration

### Backend Configuration

- Update Django settings in `backend/my_app/settings.py`
- Configure database settings if needed
- Set up API endpoints in respective `urls.py` files

### Frontend Configuration

- API endpoints are configured in `src/api.jsx`
- Tailwind CSS configuration in `tailwind.config.js`
- ESLint configuration in `eslint.config.js`

## Usage

1. **Register**: Create a new account on the registration page
2. **Login**: Log in with your credentials
3. **Create Resume**: Use the resume builder to create a new resume
4. **Upload Resume**: Upload an existing resume for parsing
5. **Choose Template**: Select from available resume templates
6. **Preview**: Preview your resume before downloading
7. **Download PDF**: Export your resume as a PDF file
8. **Manage**: Access all your resumes from the dashboard

## API Endpoints

### Authentication

- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Resume Details

- `GET /api/details/` - Get all resume details
- `POST /api/details/` - Create new resume details
- `PUT /api/details/{id}/` - Update resume details
- `DELETE /api/details/{id}/` - Delete resume details

### Resume Parser

- `POST /api/parse/` - Parse resume file

### Templates

- `GET /api/templates/` - Get all templates
- `GET /api/templates/{id}/` - Get specific template

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or open an issue in the repository.

## Authors

- Ankit Adhikari
- Aeron Panta
- Aayush Nepal
- Bikrant Pudasaini

## Acknowledgments

- Django community for the excellent web framework
- React team for the UI library
- Vite for the fast build tool
- Tailwind CSS for the utility-first CSS framework

