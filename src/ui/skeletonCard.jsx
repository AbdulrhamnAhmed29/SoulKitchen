import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="group relative flex flex-col h-full bg-transparent">
      
      {/* 1. Image Placeholder (البرواز بتاع الصورة) */}
      <div className="relative aspect-[3/4] overflow-hidden mb-8 rounded-sm bg-zinc-900/50 animate-pulse">
        {/* إضاءة خفيفة بتتحرك جوه البرواز */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>

      {/* 2. Content Placeholders */}
      <div className="flex flex-col items-start px-1 space-y-4">
        
        {/* Title Skeleton (العنوان) */}
        <div className="h-3 w-2/3 bg-zinc-800 animate-pulse rounded-full"></div>
        
        {/* Description Skeleton (الوصف - سطرين) */}
        <div className="w-full space-y-2">
          <div className="h-2 w-full bg-zinc-900 animate-pulse rounded-full"></div>
          <div className="h-2 w-4/5 bg-zinc-900 animate-pulse rounded-full"></div>
        </div>

        {/* Price Skeleton (السعر - لو عايز تخليه تحت) */}
        <div className="h-3 w-1/4 bg-zinc-800 animate-pulse rounded-full mt-2"></div>

        {/* Button Skeleton (الزرار) */}
        <div className="w-full h-10 bg-zinc-900/30 border border-white/5 animate-pulse mt-4 rounded-sm"></div>
      </div>
    </div>
  );
};

// لو حابب تعمل Grid كامل من السكيلتون مرة واحدة
export const SkeletonGrid = ({ items = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
      {[...Array(items)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCard;