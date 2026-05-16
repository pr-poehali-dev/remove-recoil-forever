import { badges, courses, userStats } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const achievements = [
  { label: "Уроков пройдено", value: userStats.totalLessons, icon: "BookOpen", color: "text-cyan-400", bg: "bg-cyan-500/20" },
  { label: "Курсов завершено", value: userStats.coursesCompleted, icon: "GraduationCap", color: "text-purple-400", bg: "bg-purple-500/20" },
  { label: "Серия дней", value: userStats.streak, icon: "Flame", color: "text-orange-400", bg: "bg-orange-500/20" },
  { label: "Место в топе", value: `#${userStats.rank}`, icon: "Trophy", color: "text-yellow-400", bg: "bg-yellow-500/20" },
];

export default function Profile() {
  const xpPercent = Math.round((userStats.points / userStats.nextLevelPoints) * 100);
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <div className="min-h-screen bg-background bg-mesh pb-24 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Profile header */}
        <div className="glass border border-white/10 rounded-3xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl btn-glow flex items-center justify-center text-4xl font-bold text-white animate-pulse-glow">
                {userStats.name[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-yellow-500 flex items-center justify-center text-xs font-bold text-black">
                {userStats.level}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display font-bold text-2xl mb-1">{userStats.name}</h1>
              <p className="text-muted-foreground text-sm mb-3">
                На платформе с {userStats.joinDate}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {earnedBadges.slice(0, 4).map((badge) => (
                  <span
                    key={badge.id}
                    className="text-lg px-2 py-1 glass rounded-xl border border-white/10"
                    title={badge.name}
                  >
                    {badge.icon}
                  </span>
                ))}
                {earnedBadges.length > 4 && (
                  <span className="text-sm px-2 py-1 glass rounded-xl border border-white/10 text-muted-foreground">
                    +{earnedBadges.length - 4}
                  </span>
                )}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Баллы</p>
              <p className="font-display font-bold text-3xl text-gradient-gold">
                {userStats.points.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>

          {/* Level progress */}
          <div className="relative z-10 mt-5">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Уровень {userStats.level}</span>
              <span>Уровень {userStats.level + 1}</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="progress-bar h-3" style={{ width: `${xpPercent}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {userStats.points.toLocaleString()} / {userStats.nextLevelPoints.toLocaleString()} XP · {xpPercent}%
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {achievements.map((a) => (
            <div key={a.label} className="glass border border-white/10 rounded-2xl p-4 text-center card-hover">
              <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center mx-auto mb-2`}>
                <Icon name={a.icon} size={20} className={a.color} />
              </div>
              <p className="font-bold text-xl">{a.value}</p>
              <p className="text-xs text-muted-foreground">{a.label}</p>
            </div>
          ))}
        </div>

        {/* Badges collection */}
        <div className="glass border border-white/10 rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Icon name="Award" size={20} className="text-yellow-400" />
              Коллекция значков
            </h2>
            <span className="text-sm text-muted-foreground">
              {earnedBadges.length}/{badges.length}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.map((badge, i) => (
              <div
                key={badge.id}
                className={`relative p-4 rounded-2xl transition-all duration-300 cursor-pointer group ${
                  badge.earned
                    ? "glass-strong border border-white/15 badge-shine hover:scale-105"
                    : "glass border border-white/5 opacity-50"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 ${
                    badge.earned ? `bg-gradient-to-br ${badge.color}` : "bg-white/10"
                  }`}
                >
                  {badge.earned ? badge.icon : "🔒"}
                </div>
                <p className="text-sm font-semibold text-center">{badge.name}</p>
                <p className="text-xs text-muted-foreground text-center mt-0.5">{badge.desc}</p>
                {badge.earned && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Completed courses */}
        <div className="glass border border-white/10 rounded-3xl p-6">
          <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
            <Icon name="CheckCircle" size={20} className="text-green-400" />
            Активные курсы
          </h2>
          <div className="space-y-3">
            {courses.filter((c) => c.progress > 0).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 glass rounded-2xl border border-white/5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={course.icon} size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{course.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                      <div className="progress-bar h-1.5" style={{ width: `${course.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                  </div>
                </div>
                {course.progress === 100 && (
                  <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Icon name="Check" size={16} className="text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
