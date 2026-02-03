# TherMix Molecular Assistant

A molecular biology protocol assistant powered by Google Gemini.

## Prerequisites

- Node.js installed on your machine.
- A Google Gemini API Key. Get one [here](https://aistudio.google.com/app/apikey).

## Setup

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Configure Environment:**

    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        # OR on Windows Command Prompt:
        copy .env.example .env
        ```
    - Open `.env` and paste your Gemini API key:
        ```env
        GEMINI_API_KEY=your_actual_api_key_here
        ```

## Running the App

1.  **Start the Server:**

    ```bash
    npm start
    ```

2.  **Open in Browser:**

    Go to [http://localhost:3000](http://localhost:3000).

## Development

To run with hot-reloading:

```bash
npm run dev
```
