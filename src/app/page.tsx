import { auth } from "@/auth";
import { CurrentSong } from "@/components/current-song";
import { Landing } from "@/components/landing";
import { SettingsDropDown } from "@/components/settings-drop-down";
import { AppContextProvider } from "@/hooks/use-app-context";

const Page = async () => {
  const session = await auth();

  if (!session) return <Landing />;

  return (
    <AppContextProvider>
      <SettingsDropDown />
      <CurrentSong user={session.user} />
    </AppContextProvider>
  );
};

export default Page;
