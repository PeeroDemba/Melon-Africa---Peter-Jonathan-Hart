"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import { Label } from "./ui/label";

export interface FilterOptions {
  colors: string[];
  sizes: string[];
  priceRange: [number, number] | null;
  hasVariants: boolean | null;
}

interface SearchAndFilterBarProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  availableColors: string[];
  availableSizes: string[];
  minMaxPrice: [number, number];
}

export function SearchAndFilterBar({
  onSearchChange,
  onFilterChange,
  availableColors,
  availableSizes,
  minMaxPrice,
}: SearchAndFilterBarProps) {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    colors: [],
    sizes: [],
    priceRange: null,
    hasVariants: null,
  });

  const [tempFilters, setTempFilters] = useState<FilterOptions>(activeFilters);
  const [priceValues, setPriceValues] = useState<[number, number]>(minMaxPrice);
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);

  // Update price values when min/max price changes
  useEffect(() => {
    if (!isPriceFilterActive) {
      setPriceValues(minMaxPrice);
    }
  }, [minMaxPrice, isPriceFilterActive]);

  // Update temp filters when Card opens
  useEffect(() => {
    if (isFilterOpen) {
      if (activeFilters.priceRange) {
        setPriceValues(activeFilters.priceRange);
        setIsPriceFilterActive(true);
      } else {
        setPriceValues(minMaxPrice);
        setIsPriceFilterActive(false);
      }
    }
  }, [isFilterOpen, activeFilters.priceRange, minMaxPrice]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const handleFilterApply = () => {
    const newFilters = { ...tempFilters };

    // Only set price range if the filter is active
    if (isPriceFilterActive) {
      newFilters.priceRange = priceValues;
    } else {
      newFilters.priceRange = null;
    }

    setActiveFilters(newFilters);
    onFilterChange(newFilters);
    setIsFilterOpen(false);
  };

  const handleFilterReset = () => {
    const resetFilters = {
      colors: [],
      sizes: [],
      priceRange: null,
      hasVariants: null,
    };
    setTempFilters(resetFilters);
    setActiveFilters(resetFilters);
    setPriceValues(minMaxPrice);
    setIsPriceFilterActive(false);
    onFilterChange(resetFilters);
    setIsFilterOpen(false);
  };

  const toggleColorFilter = (color: string) => {
    setTempFilters((prev) => {
      if (prev.colors.includes(color)) {
        return {
          ...prev,
          colors: prev.colors.filter((c) => c !== color),
        };
      } else {
        return {
          ...prev,
          colors: [...prev.colors, color],
        };
      }
    });
  };

  const toggleSizeFilter = (size: string) => {
    setTempFilters((prev) => {
      if (prev.sizes.includes(size)) {
        return {
          ...prev,
          sizes: prev.sizes.filter((s) => s !== size),
        };
      } else {
        return {
          ...prev,
          sizes: [...prev.sizes, size],
        };
      }
    });
  };

  const setHasVariantsFilter = (value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      hasVariants: value === "with" ? true : value === "without" ? false : null,
    }));
  };

  const handlePriceChange = (values: number[]) => {
    setPriceValues([values[0], values[1]]);
  };

  const togglePriceFilter = () => {
    setIsPriceFilterActive(!isPriceFilterActive);
    if (!isPriceFilterActive) {
      setPriceValues(minMaxPrice);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const removeFilter = (type: keyof FilterOptions, value?: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      if (type === "colors" && value) {
        newFilters.colors = prev.colors.filter((c) => c !== value);
      } else if (type === "sizes" && value) {
        newFilters.sizes = prev.sizes.filter((s) => s !== value);
      } else if (type === "priceRange") {
        newFilters.priceRange = null;
      } else if (type === "hasVariants") {
        newFilters.hasVariants = null;
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const hasActiveFilters =
    activeFilters.colors.length > 0 ||
    activeFilters.sizes.length > 0 ||
    activeFilters.priceRange !== null ||
    activeFilters.hasVariants !== null;

  const activeFilterCount =
    activeFilters.colors.length +
    activeFilters.sizes.length +
    (activeFilters.priceRange ? 1 : 0) +
    (activeFilters.hasVariants !== null ? 1 : 0);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            setTempFilters(activeFilters);
            setIsFilterOpen(true);
          }}
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.colors.map((color) => (
            <Badge
              key={`color-${color}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color.toLowerCase() }}
              />
              {color}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("colors", color)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {color} filter</span>
              </Button>
            </Badge>
          ))}

          {activeFilters.sizes.map((size) => (
            <Badge
              key={`size-${size}`}
              variant="outline"
              className="flex items-center gap-1"
            >
              Size: {size}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("sizes", size)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove size {size} filter</span>
              </Button>
            </Badge>
          ))}

          {activeFilters.hasVariants !== null && (
            <Badge variant="outline" className="flex items-center gap-1">
              {activeFilters.hasVariants ? "Has variants" : "No variants"}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("hasVariants")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove variant filter</span>
              </Button>
            </Badge>
          )}

          {activeFilters.priceRange && (
            <Badge variant="outline" className="flex items-center gap-1">
              Price: {formatPrice(activeFilters.priceRange[0])} -{" "}
              {formatPrice(activeFilters.priceRange[1])}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("priceRange")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove price filter</span>
              </Button>
            </Badge>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={handleFilterReset}
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      {isFilterOpen && (
        <div className="fixed top-0 px-4 left-0 w-full h-full backdrop-blur-[4px] bg-black/50 flex justify-center items-center">
          <Card className="max-w-[450px] w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <p className="text-[18px]">Filter Products</p>
                <Button
                  onClick={() => {
                    setIsFilterOpen(false);
                  }}
                  variant="icon"
                >
                  <X color="#ccc" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <Badge
                        key={color}
                        variant={
                          tempFilters.colors.includes(color)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleColorFilter(color)}
                      >
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-3 h-3 rounded-full border border-gray-200 dark:border-gray-700"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          {color}
                        </div>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <Badge
                        key={size}
                        variant={
                          tempFilters.sizes.includes(size)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleSizeFilter(size)}
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="price-filter-toggle"
                        checked={isPriceFilterActive}
                        onChange={togglePriceFilter}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-950"
                      />
                      <label
                        htmlFor="price-filter-toggle"
                        className="text-sm text-gray-500"
                      >
                        Enable
                      </label>
                    </div>
                  </div>
                  <div
                    className={`space-y-4 ${
                      isPriceFilterActive
                        ? "opacity-100"
                        : "opacity-50 pointer-events-none"
                    }`}
                  >
                    <Slider
                      defaultValue={priceValues}
                      min={minMaxPrice[0]}
                      max={minMaxPrice[1]}
                      step={100}
                      value={priceValues}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        {formatPrice(priceValues[0])}
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(priceValues[1])}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="variants">Variants</Label>
                  <Select
                    value={
                      tempFilters.hasVariants === true
                        ? "with"
                        : tempFilters.hasVariants === false
                        ? "without"
                        : "all"
                    }
                    onValueChange={setHasVariantsFilter}
                  >
                    <SelectTrigger id="variants" className="w-full !h-10">
                      <SelectValue placeholder="Filter by variants" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-[#030712]">
                      <SelectItem value="all">All products</SelectItem>
                      <SelectItem value="with">
                        Products with variants
                      </SelectItem>
                      <SelectItem value="without">
                        Products without variants
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="secondary" onClick={handleFilterReset}>
                Reset
              </Button>
              <Button onClick={handleFilterApply}>Apply Filters</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
