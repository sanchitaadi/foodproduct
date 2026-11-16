"use client";

import React, { useState } from "react";

export type SupportedConcept =
  | "pop-cult"
  | "pure-co"
  | "crunch-mode"
  | "happy-bites"
  | "pop-snacks"
  | "goodness-co"
  | "crave-cult"
  | "snack-attack"
  | "good-mood-foods"
  | "crunch-cult"
  | "happy-cravings"
  | "flavourverse"
  | "purepantry"
  | "snackattack"
  | "concept-a-flavourverse"
  | "concept-b-purepantry"
  | "concept-c-snackattack";

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  concept?: SupportedConcept;
  fallbackSrc?: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function SafeImage({
  src,
  alt = "Artisanal Indian packaged food snack",
  concept = "pop-cult",
  fallbackSrc,
  className = "",
  wrapperClassName = "",
  priority = false,
  fill = false,
  width,
  height,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  // Concept-tailored default fallbacks
  const defaultFallback: Record<SupportedConcept, string> = {
    "pop-cult": "/images/products/kettle-cooked-sea-salt-crisps.jpg",
    "pure-co": "/images/products/spiced-millet-crackers.jpg",
    "crunch-mode": "/images/products/malabar-dark-chocolate-74.jpg",
    "happy-bites": "/images/products/cocoa-hazelnut-cookies.jpg",
    "pop-snacks": "/images/products/kettle-cooked-sea-salt-crisps.jpg",
    "goodness-co": "/images/products/spiced-millet-crackers.jpg",
    "crave-cult": "/images/products/malabar-dark-chocolate-74.jpg",
    "snack-attack": "/images/products/kettle-cooked-sea-salt-crisps.jpg",
    "good-mood-foods": "/images/products/spiced-millet-crackers.jpg",
    "crunch-cult": "/images/products/malabar-dark-chocolate-74.jpg",
    "happy-cravings": "/images/products/cocoa-hazelnut-cookies.jpg",
    flavourverse: "/images/products/kettle-cooked-sea-salt-crisps.jpg",
    "concept-a-flavourverse": "/images/products/kettle-cooked-sea-salt-crisps.jpg",
    purepantry: "/images/products/spiced-millet-crackers.jpg",
    "concept-b-purepantry": "/images/products/spiced-millet-crackers.jpg",
    snackattack: "/images/products/malabar-dark-chocolate-74.jpg",
    "concept-c-snackattack": "/images/products/malabar-dark-chocolate-74.jpg",
  };

  const chosenFallback = fallbackSrc || defaultFallback[concept] || "/images/products/kettle-cooked-sea-salt-crisps.jpg";
  const currentSrc = hasError ? chosenFallback : src || chosenFallback;

  if (fill) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${wrapperClassName}`}>
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ${className}`}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setHasError(true)}
      className={`transition-opacity duration-300 ${className}`}
      width={width}
      height={height}
      {...props}
    />
  );
}

export default SafeImage;
