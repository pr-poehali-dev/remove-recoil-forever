import { leaderboard } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const medals = ["🥇", "🥈", "🥉"];

export default function Leaderboard() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background bg-mesh pb-24 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl mb-2">
          <span className="text-gradient-gold">Лидерборд</span>
        </h1>
        <p className="text-muted-foreground text-sm mb-8">Топ учеников этой недели</p>

        {/* Podium */}
        <div className="flex items-end justify-center gap-3 mb-8 px-4">
          {/* 2nd place */}
          <div className="flex-1 max-w-[140px]">
            <div className="flex flex-col items-center mb-2">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${top3[1].color} flex items-center justify-center text-2xl font-bold text-white mb-2 glass-strong border border-white/20`}>
                {top3[1].avatar}
              </div>
              <p className="text-sm font-semibold text-center leading-tight">{top3[1].name}</p>
              <p className="text-xs text-muted-foreground">{top3[1].points.toLocaleString()} XP</p>
            </div>
            <div className="bg-gradient-to-t from-gray-500/30 to-gray-400/50 rounded-t-2xl h-20 flex items-center justify-center">
              <span className="text-3xl">🥈</span>
            </div>
          </div>

          {/* 1st place */}
          <div className="flex-1 max-w-[160px]">
            <div className="flex flex-col items-center mb-2">
              <div className="relative">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${top3[0].color} flex items-center justify-center text-3xl font-bold text-white mb-2 glow-purple animate-pulse-glow`}>
                  {top3[0].avatar}
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</div>
              </div>
              <p className="text-sm font-bold text-center leading-tight">{top3[0].name}</p>
              <p className="text-xs text-yellow-400 font-semibold">{top3[0].points.toLocaleString()} XP</p>
            </div>
            <div className="bg-gradient-to-t from-yellow-500/30 to-yellow-400/50 rounded-t-2xl h-32 flex items-center justify-center">
              <span className="text-3xl">🥇</span>
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex-1 max-w-[140px]">
            <div className="flex flex-col items-center mb-2">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${top3[2].color} flex items-center justify-center text-2xl font-bold text-white mb-2 glass-strong border border-white/20`}>
                {top3[2].avatar}
              </div>
              <p className="text-sm font-semibold text-center leading-tight">{top3[2].name}</p>
              <p className="text-xs text-muted-foreground">{top3[2].points.toLocaleString()} XP</p>
            </div>
            <div className="bg-gradient-to-t from-orange-700/30 to-orange-600/50 rounded-t-2xl h-14 flex items-center justify-center">
              <span className="text-3xl">🥉</span>
            </div>
          </div>
        </div>

        {/* Full list */}
        <div className="glass border border-white/10 rounded-3xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">Участник</span>
            <span className="text-sm font-semibold text-muted-foreground">XP</span>
          </div>

          {leaderboard.map((user, i) => (
            <div
              key={user.rank}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/5 ${
                user.isMe ? "bg-primary/10 border-l-2 border-primary" : ""
              } ${i < leaderboard.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <div className="w-8 text-center">
                {user.rank <= 3 ? (
                  <span className="text-xl">{medals[user.rank - 1]}</span>
                ) : (
                  <span className={`text-sm font-bold ${user.isMe ? "text-primary" : "text-muted-foreground"}`}>
                    #{user.rank}
                  </span>
                )}
              </div>

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${user.color} flex items-center justify-center font-bold text-white flex-shrink-0`}>
                {user.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold ${user.isMe ? "text-primary" : ""}`}>
                    {user.name}
                    {user.isMe && <span className="ml-1 text-xs">(ты)</span>}
                  </p>
                  {user.change > 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-green-400">
                      <Icon name="TrendingUp" size={12} />
                      +{user.change}
                    </span>
                  )}
                  {user.change < 0 && (
                    <span className="flex items-center gap-0.5 text-xs text-red-400">
                      <Icon name="TrendingDown" size={12} />
                      {user.change}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="Flame" size={10} className="text-orange-400" />
                  {user.streak} дней
                </div>
              </div>

              <div className="text-right">
                <p className={`font-bold text-sm ${user.isMe ? "text-primary" : ""}`}>
                  {user.points.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly reset notice */}
        <div className="mt-4 glass border border-white/5 rounded-2xl p-4 flex items-center gap-3">
          <Icon name="RotateCcw" size={18} className="text-muted-foreground flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Лидерборд обновляется каждый понедельник. Набирай больше XP и поднимайся выше!
          </p>
        </div>
      </div>
    </div>
  );
}
