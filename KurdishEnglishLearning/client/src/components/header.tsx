import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [location] = useLocation();
  const [isKurdish, setIsKurdish] = useState(true);

  const navigation = [
    { href: "/", label: "ماڵەوە", labelEn: "Home" },
    { href: "/lessons", label: "وانان", labelEn: "Lessons" },
    { href: "/vocabulary", label: "وشان", labelEn: "Vocabulary" },
    { href: "/progress", label: "پێشڤەچوون", labelEn: "Progress" },
  ];

  return (
    <header className="bg-white shadow-lg border-b-4 border-[hsl(45,78%,53%)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[hsl(45,78%,53%)] rounded-lg flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-lg md:text-xl"></i>
              </div>
              <span className="mr-2 md:mr-3 text-sm md:text-lg lg:text-xl font-bold text-gray-800 font-kurdish hidden sm:block">
                {isKurdish ? "فێربوونا ئینگلیزی" : "English Learning"}
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="mr-10 flex items-baseline space-x-reverse space-x-4">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors",
                      location === item.href
                        ? "text-gray-800 text-[hsl(45,78%,53%)]"
                        : "text-gray-500 hover:text-[hsl(45,78%,53%)]"
                    )}
                  >
                    {isKurdish ? item.label : item.labelEn}
                  </a>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-reverse space-x-2 md:space-x-4">
            {/* Language Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={isKurdish ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsKurdish(true)}
                className={cn(
                  "px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium transition-colors",
                  isKurdish ? "bg-[hsl(45,78%,53%)] text-white" : "text-gray-600 hover:text-gray-800"
                )}
              >
                کوردی
              </Button>
              <Button
                variant={!isKurdish ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsKurdish(false)}
                className={cn(
                  "px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium transition-colors font-english",
                  !isKurdish ? "bg-[hsl(45,78%,53%)] text-white" : "text-gray-600 hover:text-gray-800"
                )}
              >
                English
              </Button>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-[hsl(120,60%,35%)] rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-xs md:text-sm"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-reverse space-x-2 overflow-x-auto">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                    location === item.href
                      ? "bg-[hsl(45,78%,53%)] text-white"
                      : "text-gray-500 hover:text-[hsl(45,78%,53%)]"
                  )}
                >
                  {isKurdish ? item.label : item.labelEn}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
