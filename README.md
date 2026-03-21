# 🔗 ShortIt: Simplify Your Links

ShortIt is a web application designed to transform lengthy URLs into concise, shareable links, making it easier to share and manage your links.

## ✨ Key Features

- 🌐 **User-Friendly Interface:** Intuitive design for seamless URL shortening.
- 📈 **Analytics Dashboard:** Monitor the performance of your shortened links.
- 🔒 **Secure Sharing:** Ensure your links are shared safely and privately.
- 🛠️ **Customizable Links:** Personalize your shortened URLs to match your branding.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Database:** supabase

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)


### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/nitesh2920/shortIt.git
    ```

2. Navigate to the project directory:

    ```bash
    cd shortIt
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables. Create a `.env` file in the root directory and add the following:

    ```
    DATABASE_URL=your_database_url
    ```

5. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```

6. Start the development server:

    ```bash
    npm run dev
    ```

7. Access the application at `http://localhost:5173`.
