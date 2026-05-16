import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Progress from "@/pages/Progress";
import Profile from "@/pages/Profile";
import Leaderboard from "@/pages/Leaderboard";

const queryClient = new QueryClient();

const App = () => {
  const [activePage, setActivePage] = useState("home");

  const renderPage = () => {
    switch (activePage) {
      case "home": return <Home />;
      case "progress": return <Progress />;
      case "leaderboard": return <Leaderboard />;
      case "profile": return <Profile />;
      default: return <Home />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="relative min-h-screen">
          <Navigation activePage={activePage} onNavigate={setActivePage} />
          {renderPage()}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
