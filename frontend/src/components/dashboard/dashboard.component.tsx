// import { useGetDashboardAnalysisQuery } from "../../redux/apis/analysis.api";
// import TopicsChart from "../chart/dashboard/bar_chart";
// import SubscriptionChart from "../chart/dashboard/doughnut_chart";
// import PostsPerMonthChart from "../chart/dashboard/line_chart";
// import UsersPieChart from "../chart/dashboard/pai_chart";
// import LoadingAnimation from "../loading/loading.component";

// const DashboardComponent = () => {
//   const { data, isLoading } = useGetDashboardAnalysisQuery(undefined);

//   if (isLoading) {
//     return <LoadingAnimation />;
//   }

//   const stats = data
//     ? [
//         {
//           title: "Total Users",
//           value: data.users.total,
//           icon: "fa-users",
//           gradient: "from-blue-600 to-cyan-500",
//           glow: "shadow-blue-500/20",
//           border: "border-blue-500/20",
//           bg: "bg-blue-500/8",
//           iconBg: "bg-blue-500/15",
//           iconColor: "text-blue-400",
//           badge: "Active platform",
//           badgeColor: "text-blue-400",
//         },
//         {
//           title: "Total Posts",
//           value: data.posts.total,
//           icon: "fa-newspaper",
//           gradient: "from-violet-600 to-purple-500",
//           glow: "shadow-violet-500/20",
//           border: "border-violet-500/20",
//           bg: "bg-violet-500/8",
//           iconBg: "bg-violet-500/15",
//           iconColor: "text-violet-400",
//           badge: "Published content",
//           badgeColor: "text-violet-400",
//         },
//         {
//           title: "Subscriptions",
//           value:
//             data.subscriptionTypes.free +
//             data.subscriptionTypes.pro +
//             data.subscriptionTypes.premium,
//           icon: "fa-credit-card",
//           gradient: "from-emerald-600 to-teal-500",
//           glow: "shadow-emerald-500/20",
//           border: "border-emerald-500/20",
//           bg: "bg-emerald-500/8",
//           iconBg: "bg-emerald-500/15",
//           iconColor: "text-emerald-400",
//           badge: "All tiers",
//           badgeColor: "text-emerald-400",
//         },
//         {
//           title: "Writer Applications",
//           value: data.users.applyForWriter,
//           icon: "fa-pen-nib",
//           gradient: "from-amber-500 to-orange-500",
//           glow: "shadow-amber-500/20",
//           border: "border-amber-500/20",
//           bg: "bg-amber-500/8",
//           iconBg: "bg-amber-500/15",
//           iconColor: "text-amber-400",
//           badge: "Pending review",
//           badgeColor: "text-amber-400",
//         },
//       ]
//     : [];

//   return (
//     <div className="space-y-6">
//       {data && <DashboardAnalysisHeader data={data} />}
//       {data && (
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//           <UsersPieChart data={data.users} />
//           <SubscriptionChart data={data.subscriptionTypes} />
//           <PostsPerMonthChart perMonth={data.posts.perMonth} />
//           <TopicsChart topics={data.posts.topics} />
//     <div className="space-y-8">
//       {/* HERO SECTION */}
//       <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1c3a] via-[#0d1a3a] to-[#111433] border border-white/[0.07] p-8 shadow-2xl">
//         {/* Decorative blobs */}
//         <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/15 rounded-full blur-[60px] pointer-events-none"></div>
//         <div className="absolute bottom-0 left-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none"></div>
//         <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-400/8 rounded-full blur-[40px] pointer-events-none"></div>

//         {/* Grid overlay */}
//         <div
//           className="absolute inset-0 opacity-[0.03] pointer-events-none"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
//             backgroundSize: "40px 40px",
//           }}
//         ></div>

//         <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
//               <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
//               <span className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold">
//                 Live Analytics Dashboard
//               </span>
//             </div>

//             <h1 className="text-4xl font-black text-white leading-tight mb-3 tracking-tight">
//               Welcome Back 👋
//             </h1>

//             <p className="text-slate-400 text-base max-w-xl leading-relaxed">
//               Monitor platform growth, track engagement, and manage your
//               ecosystem through a modern analytics experience.
//             </p>
//           </div>

//           <div className="flex flex-col gap-2 shrink-0">
//             <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl">
//               <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
//                 <i className="fas fa-circle-check text-emerald-400 text-sm"></i>
//               </div>
//               <div>
//                 <p className="text-[10px] text-slate-500 uppercase tracking-wider">System Status</p>
//                 <p className="text-sm font-semibold text-emerald-400">All Systems Operational</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl">
//               <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
//                 <i className="fas fa-clock text-blue-400 text-sm"></i>
//               </div>
//               <div>
//                 <p className="text-[10px] text-slate-500 uppercase tracking-wider">Last Updated</p>
//                 <p className="text-sm font-semibold text-white">Just now</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STATS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
//         {data
//           ? stats.map((item, index) => (
//               <div
//                 key={item.title}
//                 className={`group relative overflow-hidden rounded-2xl border ${item.border} ${item.bg} backdrop-blur-xl p-5 shadow-xl ${item.glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
//               >
//                 {/* Top gradient bar */}
//                 <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${item.gradient} opacity-60`}></div>

//                 {/* Glow on hover */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`}></div>

//                 <div className="relative z-10">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${item.iconBg} border border-white/[0.07]`}>
//                       <i className={`fas ${item.icon} ${item.iconColor} text-sm`}></i>
//                     </div>
//                     <span className={`text-[10px] font-medium ${item.badgeColor} bg-current/10 px-2 py-1 rounded-full opacity-70`}
//                       style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
//                       {item.badge}
//                     </span>
//                   </div>

//                   <p className="text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">{item.title}</p>
//                   <h2 className="text-4xl font-black text-white tracking-tight mb-4">
//                     {item.value.toLocaleString()}
//                   </h2>

//                   <div className={`flex items-center gap-1.5 text-xs font-medium ${item.iconColor}`}>
//                     <i className="fas fa-arrow-trend-up text-[10px]"></i>
//                     <span>Active tracking</span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           : [1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
//               >
//                 <div className="h-10 w-10 rounded-xl bg-white/[0.06] animate-pulse mb-4"></div>
//                 <div className="h-2.5 w-20 rounded bg-white/[0.06] animate-pulse mb-2"></div>
//                 <div className="h-9 w-16 rounded-lg bg-white/[0.06] animate-pulse mb-4"></div>
//                 <div className="h-2 w-full rounded bg-white/[0.06] animate-pulse"></div>
//               </div>
//             ))}
//       </div>

//       {/* EMPTY STATE */}
//       {!data && (
//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-20 text-center shadow-2xl">
//           <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/8 border border-blue-500/15">
//             <i className="fas fa-chart-line text-3xl text-blue-400"></i>
//           </div>
//           <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
//             Analytics Not Available
//           </h2>
//           <p className="mx-auto max-w-xl text-slate-400 leading-relaxed">
//             Dashboard insights are currently unavailable. Once data becomes
//             available, charts and platform analytics will automatically appear here.
//           </p>
//         </div>
//       )}

//       {/* CHARTS GRID */}
//       {data && (
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {[
//             {
//               title: "Users Distribution",
//               subtitle: "Active vs inactive breakdown",
//               icon: "fa-users",
//               iconColor: "text-blue-400",
//               iconBg: "bg-blue-500/10",
//               border: "border-blue-500/15",
//               chart: <UsersPieChart data={data.users} />,
//             },
//             {
//               title: "Subscription Overview",
//               subtitle: "Free, Pro & Premium tiers",
//               icon: "fa-credit-card",
//               iconColor: "text-emerald-400",
//               iconBg: "bg-emerald-500/10",
//               border: "border-emerald-500/15",
//               chart: <SubscriptionChart data={data.subscriptionTypes} />,
//             },
//             {
//               title: "Monthly Posts",
//               subtitle: "Publication trends over time",
//               icon: "fa-chart-line",
//               iconColor: "text-violet-400",
//               iconBg: "bg-violet-500/10",
//               border: "border-violet-500/15",
//               chart: <PostsPerMonthChart perMonth={data.posts.perMonth} />,
//             },
//             {
//               title: "Topics Analytics",
//               subtitle: "Content distribution by category",
//               icon: "fa-tags",
//               iconColor: "text-amber-400",
//               iconBg: "bg-amber-500/10",
//               border: "border-amber-500/15",
//               chart: <TopicsChart topics={data.posts.topics} />,
//             },
//           ].map((card) => (
//             <div
//               key={card.title}
//               className={`group rounded-2xl border ${card.border} bg-white/[0.02] backdrop-blur-xl p-6 shadow-xl hover:bg-white/[0.03] transition-all duration-300`}
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${card.iconBg} border border-white/[0.06]`}>
//                   <i className={`fas ${card.icon} ${card.iconColor} text-sm`}></i>
//                 </div>
//                 <div>
//                   <h2 className="text-base font-bold text-white leading-none mb-0.5">{card.title}</h2>
//                   <p className="text-[11px] text-slate-500">{card.subtitle}</p>
//                 </div>
//               </div>
//               {card.chart}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardComponent;

import { useGetDashboardAnalysisQuery } from "../../redux/apis/analysis.api";
import TopicsChart from "../chart/dashboard/bar_chart";
import SubscriptionChart from "../chart/dashboard/doughnut_chart";
import PostsPerMonthChart from "../chart/dashboard/line_chart";
import UsersPieChart from "../chart/dashboard/pai_chart";
import LoadingAnimation from "../loading/loading.component";

const DashboardComponent = () => {
  const { data, isLoading } = useGetDashboardAnalysisQuery(undefined);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const stats = data
    ? [
        {
          title: "Total Users",
          value: data.users.total,
          icon: "fa-users",
          gradient: "from-blue-600 to-cyan-500",
          glow: "shadow-blue-500/20",
          border: "border-blue-500/20",
          bg: "bg-blue-500/8",
          iconBg: "bg-blue-500/15",
          iconColor: "text-blue-400",
          badge: "Active platform",
          badgeColor: "text-blue-400",
        },
        {
          title: "Total Posts",
          value: data.posts.total,
          icon: "fa-newspaper",
          gradient: "from-violet-600 to-purple-500",
          glow: "shadow-violet-500/20",
          border: "border-violet-500/20",
          bg: "bg-violet-500/8",
          iconBg: "bg-violet-500/15",
          iconColor: "text-violet-400",
          badge: "Published content",
          badgeColor: "text-violet-400",
        },
        {
          title: "Subscriptions",
          value:
            data.subscriptionTypes.free +
            data.subscriptionTypes.pro +
            data.subscriptionTypes.premium,
          icon: "fa-credit-card",
          gradient: "from-emerald-600 to-teal-500",
          glow: "shadow-emerald-500/20",
          border: "border-emerald-500/20",
          bg: "bg-emerald-500/8",
          iconBg: "bg-emerald-500/15",
          iconColor: "text-emerald-400",
          badge: "All tiers",
          badgeColor: "text-emerald-400",
        },
        {
          title: "Writer Applications",
          value: data.users.applyForWriter,
          icon: "fa-pen-nib",
          gradient: "from-amber-500 to-orange-500",
          glow: "shadow-amber-500/20",
          border: "border-amber-500/20",
          bg: "bg-amber-500/8",
          iconBg: "bg-amber-500/15",
          iconColor: "text-amber-400",
          badge: "Pending review",
          badgeColor: "text-amber-400",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1c3a] via-[#0d1a3a] to-[#111433] border border-white/[0.07] p-8 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/15 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-[50px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold">
                Live Analytics Dashboard
              </span>
            </div>

            <h1 className="text-4xl font-black text-white leading-tight mb-3">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 text-base max-w-xl">
              Monitor platform growth, track engagement, and manage your
              ecosystem through a modern analytics experience.
            </p>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl border ${item.border} ${item.bg} p-5 shadow-xl ${item.glow}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl ${item.iconBg}`}
              >
                <i className={`fas ${item.icon} ${item.iconColor} text-sm`}></i>
              </div>

              <span className={`text-[10px] ${item.badgeColor}`}>
                {item.badge}
              </span>
            </div>

            <p className="text-slate-400 text-xs mb-2">{item.title}</p>

            <h2 className="text-4xl font-black text-white">
              {item.value.toLocaleString()}
            </h2>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!data && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-20 text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Analytics Not Available
          </h2>

          <p className="text-slate-400">
            Dashboard insights are currently unavailable.
          </p>
        </div>
      )}

      {/* CHARTS GRID */}
      {data && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-blue-500/15 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Users Distribution
            </h2>

            <UsersPieChart data={data.users} />
          </div>

          <div className="rounded-2xl border border-emerald-500/15 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Subscription Overview
            </h2>

            <SubscriptionChart data={data.subscriptionTypes} />
          </div>

          <div className="rounded-2xl border border-violet-500/15 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white mb-4">Monthly Posts</h2>

            <PostsPerMonthChart perMonth={data.posts.perMonth} />
          </div>

          <div className="rounded-2xl border border-amber-500/15 bg-white/[0.02] p-6">
            <h2 className="text-lg font-bold text-white mb-4">
              Topics Analytics
            </h2>

            <TopicsChart topics={data.posts.topics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardComponent;
