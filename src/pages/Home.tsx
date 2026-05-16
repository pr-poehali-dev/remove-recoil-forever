import { useState } from "react";
import { courses, userStats } from "@/data/mockData";
import Icon from "@/components/ui/icon";

const categories = ["Все", "Программирование", "Дизайн", "Маркетинг", "Финансы", "Языки"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);

  return (
    <div className="min-h-screen bg-background bg-mesh pb-24 md:pt-20">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-8 glass border border-white/10 p-6 md:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">👋</span>
              <p className="text-muted-foreground">Привет, {userStats.name}!</p>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl mb-4">
              Продолжай <span className="text-gradient-purple">учиться</span>
            </h1>

            <div className="flex flex-wrap gap-4">
              <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Icon name="Flame" size={20} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Серия</p>
                  <p className="font-bold text-lg">{userStats.streak} дней</p>
                </div>
              </div>
              <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Icon name="Coins" size={20} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Баллы</p>
                  <p className="font-bold text-lg">{userStats.points.toLocaleString()}</p>
                </div>
              </div>
              <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Уроков</p>
                  <p className="font-bold text-lg">{userStats.totalLessons}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue learning */}
        {inProgress.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Icon name="Play" size={20} className="text-primary" />
              Продолжить обучение
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {inProgress.map((course) => (
                <div key={course.id} className="min-w-[280px] glass border border-white/10 rounded-2xl p-4 card-hover cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-3`}>
                    <Icon name={course.icon} size={22} className="text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{course.lessons} уроков · {course.duration}</p>
                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <div
                      className="progress-bar h-2"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{course.progress}% завершено</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "btn-glow text-white"
                  : "glass border border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course, i) => (
            <div
              key={course.id}
              className="glass border border-white/10 rounded-2xl p-5 card-hover cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "both" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <Icon name={course.icon} size={22} className="text-white" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  course.level === "Новичок" ? "bg-green-500/20 text-green-400" :
                  course.level === "Средний" ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-red-500/20 text-red-400"
                }`}>
                  {course.level}
                </span>
              </div>

              <h3 className="font-semibold text-base mb-1">{course.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Icon name="BookOpen" size={12} />
                  {course.lessons} уроков
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Star" size={12} className="text-yellow-400" />
                  {course.rating}
                </span>
              </div>

              <div className="flex gap-1 mb-3">
                {course.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              {course.progress > 0 ? (
                <div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full mb-1">
                    <div className="progress-bar h-1.5" style={{ width: `${course.progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{course.progress}%</p>
                </div>
              ) : (
                <button className="w-full btn-glow text-white text-sm py-2 rounded-xl font-medium">
                  Начать курс
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
