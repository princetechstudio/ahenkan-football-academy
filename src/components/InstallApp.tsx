import { useEffect, useState } from "react";
import { Download } from "lucide-react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export default function InstallApp() {
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setInstalled(window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function install() {
    if (installed) return;
    if (!installPrompt) {
      window.alert("Install AFA is available from your browser menu. Open the menu and choose Install AFA.");
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setInstallPrompt(null);
  }

  if (installed) return null;

  return (
    <button
      type="button"
      onClick={install}
      className="inline-flex items-center gap-1.5 border border-gold-500 px-2.5 py-2 font-cond text-[11px] font-bold uppercase tracking-[0.08em] text-gold-400 transition-colors hover:bg-gold-500 hover:text-pitch-950 sm:px-3 sm:text-xs"
      aria-label="Install AFA app"
      title="Install AFA app"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      <span>Install AFA</span>
    </button>
  );
}
