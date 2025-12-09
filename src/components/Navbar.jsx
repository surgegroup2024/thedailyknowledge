import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  // Take the first 5 categories for the top-level menu
  const featuredCategories = categories.slice(0, 5);

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#A8B8A8]/20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#2C2C2C] p-1.5 rounded-lg group-hover:bg-[#C97C5C] transition-colors duration-300">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-[#2C2C2C] tracking-tight">The Daily <span className="text-[#C97C5C]">Knowledge</span></span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-[#2C2C2C]/80 hover:text-[#C97C5C] transition-colors">Home</Link>
          
          {/* Display first 5 categories directly */}
          {featuredCategories.map((category) => (
            <Link 
              key={category.slug} 
              to={`/category/${category.slug}`} 
              className="text-sm font-medium text-[#2C2C2C]/80 hover:text-[#C97C5C] transition-colors"
            >
              {category.name}
            </Link>
          ))}

          {/* Dropdown for all topics */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-[#2C2C2C]/80 hover:text-[#C97C5C] transition-colors focus:outline-none">
              Topics <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-[#A8B8A8]/20">
              <div className="max-h-[60vh] overflow-y-auto py-1">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.slug} asChild>
                    <Link 
                      to={`/category/${category.slug}`}
                      className="w-full cursor-pointer hover:bg-[#F5F1E8] focus:bg-[#F5F1E8] text-[#2C2C2C]"
                    >
                      <category.icon className="w-4 h-4 mr-2" style={{ color: category.color }} />
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button variant="ghost" className="md:hidden">
          <span className="sr-only">Menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;