# Spot Cover

Spot Cover is a minimalist web application that enhances your music listening experience by displaying the album cover of the currently playing track from Spotify in a sleek, full-screen format.

## Features

- Displays album cover of the currently playing track from Spotify
- Full-screen, minimalist design

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/spot-cover.git
   cd spot-cover
   ```

2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add your Spotify API credentials:

   ```env
   NEXT_AUTH_SECRET=secret_string
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

## Usage

1. Run the development server:

   ```sh
   pnpm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To create a production build, run:

```sh
pnpm run build
```
