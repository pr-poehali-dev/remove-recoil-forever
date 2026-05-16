import { courses, weeklyActivity, badges, userStats } from "@/data/mockData";
import Icon from "@/components/ui/icon";

export default function Progress() {
  const maxLessons = Math.max(...weeklyActivity.map((d) => d.lessons));
  const completedBadges = badges.filter((b) => b.earned);
  const xpPercent = Math.round((userStats.points / userStats.nextLevelPoints) * 100);

  return (
    <div className="min-h-screen bg-background bg-mesh pb-24 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl mb-6">
          Твой <span className="text-gradient-purple">прогресс</span>
        </h1>

        {/* Level & XP */}
        <div className="glass border border-white/10 rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Текущий уровень</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl text-gradient-purple">{userStats.level}</span>
                  <span className="text-muted-foreground text-sm">уровень</span>
                </div>
              </div>
              <div className="w-20 h-20 rounded-2xl btn-glow flex flex-col items-center justify-center animate-pulse-glow">
                <span className="text-2xl font-bold text-white">{userStats.level}</span>
                <span className="text-xs text-white/70">LVL</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">{userStats.points.toLocaleString()} XP</span>
              <span className="text-muted-foreground">{userStats.nextLevelPoints.toLocaleString()} XP</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="progress-bar h-3 rounded-full"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              До следующего уровня: {(userStats.nextLevelPoints - userStats.points).toLocaleString()} XP
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Серия", value: `${userStats.streak}д`, icon: "Flame", color: "text-orange-400", bg: "bg-orange-500/20" },
            { label: "Курсов", value: userStats.coursesCompleted, icon: "GraduationCap", color: "text-cyan-400", bg: "bg-cyan-500/20" },
            { label: "Место в топе", value: `#${userStats.rank}`, icon: "Trophy", color: "text-yellow-400", bg: "bg-yellow-500/20" },
          ].map((stat) => (
            <div key={stat.label} className="glass border border-white/10 rounded-2xl p-4 text-center">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <p className="font-bold text-xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly activity chart */}
        <div className="glass border border-white/10 rounded-3xl p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="BarChart2" size={20} className="text-primary" />
            Активность за неделю
          </h2>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyActivity.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground">{day.lessons}</span>
                <div className="w-full rounded-t-lg overflow-hidden" style={{ height: `${(day.lessons / maxLessons) * 100}px` }}>
                  <div
                    className={`w-full h-full bg-gradient-to-t ${
                      i === 6
                        ? "from-primary/60 to-primary"
                        : "from-primary/30 to-primary/60"
                    } rounded-t-lg animate-fade-up`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Всего за неделю:</span>
            <span className="font-semibold">
              {weeklyActivity.reduce((s, d) => s + d.lessons, 0)} уроков ·{" "}
              {weeklyActivity.reduce((s, d) => s + d.points, 0)} XP
            </span>
          </div>
        </div>

        {/* Course progress */}
        <div className="glass border border-white/10 rounded-3xl p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={20} className="text-cyan-400" />
            Прогресс по курсам
          </h2>
          <div className="space-y-4">
            {courses.filter((c) => c.progress > 0).map((course) => (
              <div key={course.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={course.icon} size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{course.title}</span>
                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <div className="progress-bar h-2" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="glass border border-white/10 rounded-3xl p-6">
          <h2 className="font-semibold text-lg mb-1 flex items-center gap-2">
            <Icon name="Award" size={20} className="text-yellow-400" />
            Значки
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {completedBadges.length} из {badges.length} получено
          </p>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, i) => (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${
                  badge.earned
                    ? "glass-strong border border-white/15 badge-shine"
                    : "opacity-40 glass border border-white/5"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                    badge.earned
                      ? `bg-gradient-to-br ${badge.color} animate-bounce-in`
                      : "bg-white/10"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {badge.earned ? badge.icon : "🔒"}
                </div>
                <span className="text-xs text-center font-medium leading-tight">{badge.name}</span>
                <span className="text-xs text-muted-foreground text-center leading-tight hidden md:block">{badge.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
