"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminStore } from "@/lib/admin/adminStore";
import {
  TrendingUp,
  Package,
  Layers,
  Sparkles,
  AlertTriangle,
  Truck,
  Users,
  Tag,
  Star,
  FileText,
  Image as ImageIcon,
  BarChart3,
  ShieldCheck,
  Settings,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  Clock,
  Lock,
} from "lucide-react";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentAdmin,
    isAuthenticated,
    logout,
    canAccess,
    products,
    orders,
    inventory,
    reviews,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
  } = useAdminStore();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check auth and redirect if not on login page
  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [mounted, isAuthenticated, pathname, router]);

  // If on login page, render child without the admin shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Prevent hydration flash
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center text-slate-400 font-mono text-xs">
        Initializing Peachy Plate Enterprise Console...
      </div>
    );
  }

  if (!isAuthenticated || !currentAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-6 text-slate-100 font-mono">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#131B2E] border border-rose-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold font-sans text-white">401 • Staff Authentication Required</h2>
          <p className="text-xs text-slate-400">
            You must be signed in with authorized staff credentials to access the Peachy Plate control plane.
          </p>
          <Link
            href="/admin/login"
            className="inline-block px-5 py-2.5 bg-amber-500 text-black font-bold uppercase rounded-xl text-xs hover:bg-amber-400 transition-colors"
          >
            Go to Staff Login &rarr;
          </Link>
        </div>
      </div>
    );
  }

  const unreadNotifs = notifications.filter((n) => !n.isRead);
  const lowStockCount = inventory.filter((i) => i.stockOnHand < i.lowStockThreshold).length;
  const pendingReviewsCount = reviews.filter((r) => r.status === "pending").length;

  interface NavItem {
    label: string;
    href: string;
    icon: any;
    exact?: boolean;
    badge?: string;
    badgeColor?: string;
  }

  interface NavSection {
    group: string;
    items: NavItem[];
  }

  const navSections: NavSection[] = [
    {
      group: "Executive Radar",
      items: [
        {
          label: "Dashboard & KPIs",
          href: "/admin",
          icon: TrendingUp,
          exact: true,
        },
      ],
    },
    {
      group: "Catalog & Storefronts",
      items: [
        {
          label: "Products Catalog",
          href: "/admin/products",
          icon: Package,
          badge: products.length.toString(),
        },
        {
          label: "Pantry Categories",
          href: "/admin/categories",
          icon: Layers,
          badge: "6",
        },
        {
          label: "The 3 Concepts (Brands)",
          href: "/admin/brands",
          icon: Sparkles,
          badge: "3 Concepts",
        },
        {
          label: "Customer Reviews",
          href: "/admin/reviews",
          icon: Star,
          badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} new` : undefined,
          badgeColor: "bg-amber-500 text-black",
        },
      ],
    },
    {
      group: "Operations & Supply",
      items: [
        {
          label: "Inventory & Stock Ledger",
          href: "/admin/inventory",
          icon: AlertTriangle,
          badge: lowStockCount > 0 ? `${lowStockCount} alerts` : undefined,
          badgeColor: "bg-rose-500 text-white",
        },
        {
          label: "Orders & Fulfillment",
          href: "/admin/orders",
          icon: Truck,
          badge: orders.length.toString(),
        },
      ],
    },
    {
      group: "CRM & Experience",
      items: [
        {
          label: "Customer Patrons",
          href: "/admin/customers",
          icon: Users,
        },
        {
          label: "Promotions & Coupons",
          href: "/admin/coupons",
          icon: Tag,
        },
        {
          label: "Multi-Concept CMS",
          href: "/admin/content",
          icon: FileText,
          badge: "3 Fronts",
        },
        {
          label: "Media Asset Gallery",
          href: "/admin/gallery",
          icon: ImageIcon,
        },
      ],
    },
    {
      group: "Intelligence & Governance",
      items: [
        {
          label: "Analytics & Reports",
          href: "/admin/reports",
          icon: BarChart3,
        },
        {
          label: "Staff Team & RBAC",
          href: "/admin/staff",
          icon: ShieldCheck,
        },
        {
          label: "Store Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans flex antialiased selection:bg-amber-500 selection:text-black">
      {/* ========================================================
          DESKTOP SIDEBAR (w-64 fixed on left)
          ======================================================== */}
      <aside className="hidden lg:flex w-64 bg-[#0F172A] border-r border-slate-800/80 flex-col justify-between sticky top-0 h-screen z-30">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/admin" className="flex flex-col group">
              <span className="text-lg font-serif font-black tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors">
                PEACHY PLATE
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-bold">
                  ENTERPRISE 2.0
                </span>
                <span className="text-[9px] font-mono text-slate-500">v1.4</span>
              </div>
            </Link>
          </div>

          {/* Quick Concept Badges */}
          <div className="px-5 py-3 border-b border-slate-800/50 bg-slate-900/40">
            <div className="text-[9px] font-mono uppercase text-slate-400 tracking-wider mb-1.5 font-bold">
              Active Storefronts
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30" title="Concept A">
                Flavourverse
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" title="Concept B">
                Pure&Pantry
              </span>
              <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" title="Concept C">
                SnackAttack
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-5 text-xs font-mono">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1.5">
                  {section.group}
                </div>
                {section.items.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-amber-500 text-black font-bold shadow-md shadow-amber-500/10"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                            item.badgeColor || (isActive ? "bg-black text-amber-300" : "bg-slate-800 text-slate-400")
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Staff User Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0C1222] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {currentAdmin.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentAdmin.name}</div>
              <div className="text-[10px] font-mono text-amber-400 truncate">{currentAdmin.roleLabel}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign out of Staff Console"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER (Slide-over for small screens)
          ======================================================== */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
          <div className="relative z-10 w-[85%] max-w-xs h-full bg-[#0F172A] border-r border-slate-800 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-lg font-serif font-black text-amber-400">PEACHY PLATE</span>
                  <div className="text-[9px] font-mono text-amber-300">ENTERPRISE 2.0</div>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-4 text-xs font-mono">
                {navSections.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[9px] uppercase font-bold text-slate-500 mb-1">{section.group}</div>
                    {section.items.map((item) => {
                      const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileDrawerOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl ${
                            isActive ? "bg-amber-500 text-black font-bold" : "text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          {item.badge && <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded">{item.badge}</span>}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-slate-800 bg-[#0C1222] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{currentAdmin.name}</div>
                <div className="text-[10px] text-amber-400 font-mono">{currentAdmin.roleLabel}</div>
              </div>
              <button onClick={handleLogout} className="text-xs text-rose-400 hover:underline">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN CONTENT AREA & TOP BAR
          ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 h-16 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Page Title */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 hidden sm:inline">Peachy Plate Admin</span>
              <span className="text-slate-600 hidden sm:inline">&rsaquo;</span>
              <span className="font-bold text-white capitalize">
                {pathname === "/admin"
                  ? "Executive Dashboard"
                  : pathname.replace("/admin/", "").replace("-", " ")}
              </span>
            </div>
          </div>

          {/* Right Action Icons: Search, Notifications, Storefront Link, Staff Profile */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
            {/* Regulatory Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>FSSAI #10021011000428</span>
            </div>

            {/* Notifications Center Flyout */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 relative transition-colors"
                aria-label="Admin Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#131B2E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-40">
                  <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">Administrative Alerts</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                        {unreadNotifs.length} unread
                      </span>
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[10px] text-slate-400 hover:text-amber-400 underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-500 text-xs">No notifications.</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3.5 hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3 ${
                            !n.isRead ? "bg-amber-500/5" : ""
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-xs text-white truncate">{n.title}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</div>
                            <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-2">
                              <span>{n.createdAt}</span>
                              {n.link && (
                                <Link
                                  href={n.link}
                                  onClick={() => setIsNotificationsOpen(false)}
                                  className="text-amber-400 hover:underline"
                                >
                                  Open module &rarr;
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Launch Storefronts Shortcut Dropdown */}
            <div className="relative group">
              <button className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors text-xs">
                <span>Storefronts</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>

              <div className="absolute right-0 top-full pt-1.5 w-52 hidden group-hover:block z-40">
                <div className="p-2 rounded-xl bg-[#131B2E] border border-slate-700 shadow-2xl space-y-1">
                  <Link
                    href="/concept-a-flavourverse"
                    target="_blank"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <span>1. Flavourverse</span>
                    <span className="text-[9px] text-purple-400 font-mono">Editorial</span>
                  </Link>
                  <Link
                    href="/concept-b-purepantry"
                    target="_blank"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <span>2. Pure & Pantry</span>
                    <span className="text-[9px] text-emerald-400 font-mono">Organic</span>
                  </Link>
                  <Link
                    href="/concept-c-snackattack"
                    target="_blank"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <span>3. Snack Attack</span>
                    <span className="text-[9px] text-yellow-400 font-mono">Maximalist</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
