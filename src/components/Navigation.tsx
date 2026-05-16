import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "progress", label: "Прогресс", icon: "TrendingUp" },
  { id: "leaderboard", label: "Топ", icon: "Trophy" },
  { id: "profile", label: "Профиль", icon: "User" },
];

export default function Navigation({ activePage, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10 px-4 py-2 md:top-0 md:bottom-auto md:border-b md:border-t-0">
      <div className="max-w-5xl mx-auto flex items-center justify-around md:justify-center md:gap-2">
        <div className="hidden md:flex items-center gap-2 mr-auto">
          <div className="w-8 h-8 rounded-xl btn-glow flex items-center justify-center">
            <Icon name="Zap" size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg text-gradient-purple">LearnUp</span>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              activePage === item.id
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-xs md:text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
