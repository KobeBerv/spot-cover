import { SignInWithSpotify } from "@/components/sign-in-with-spotify";

export const Landing = () => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className="text-4xl font-bold text-white">Spot Cover</h1>
      <p className="max-w-[800px] text-center text-white/50">
        A minimalist web application that enhances your music listening
        experience by displaying the album cover of the currently playing track
        from Spotify in a sleek, full-screen format.
      </p>
      <SignInWithSpotify />
    </div>
  );
};
