'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import LocationPicker from '@/components/LocationPicker';
import ProductCard from '@/components/ProductCard';
import ProductSheet from '@/components/ProductSheet';
import SortMenu from '@/components/SortMenu';
import Skeletons from '@/components/Skeletons';
import EmptyState from '@/components/EmptyState';
import { ErrorCard, ErrorNote } from '@/components/ErrorState';
import { useLocation } from '@/hooks/useLocation';
import { searchPrices } from '@/lib/api';

function sortResults(results, sortBy) {
  if (!results || sortBy === 'relevance') return results;
  const sorted = [...results];
  switch (sortBy) {
    case 'price_asc':
      sorted.sort((a, b) => (a.prices?.[0]?.price ?? Infinity) - (b.prices?.[0]?.price ?? Infinity));
      break;
    case 'unit_price':
      sorted.sort((a, b) => {
        const ua = a.prices?.[0]?.price && a.size ? (a.prices[0].price / a.size) : Infinity;
        const ub = b.prices?.[0]?.price && b.size ? (b.prices[0].price / b.size) : Infinity;
        return ua - ub;
      });
      break;
    case 'most_stores':
      sorted.sort((a, b) => (b.prices?.length || 0) - (a.prices?.length || 0));
      break;
    default:
      break;
  }
  return sorted;
}

export default function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const abortRef = useRef(null);

  const {
    location, setLocation,
    isPickerOpen, openPicker, closePicker,
    geoLoading, geoError, requestGeolocation,
  } = useLocation();

  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [resultCount, setResultCount] = useState(0);

  const urlQuery = searchParams.get('q') || '';

  const doSearch = useCallback(async (query) => {
    if (!query || !location) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setFetchError(null);
    setResults(null);
    setErrors(null);

    try {
      const params = { q: query, signal: controller.signal };
      if (location.pincode) params.pincode = location.pincode;
      if (location.lat != null) params.lat = location.lat;
      if (location.lon != null) params.lon = location.lon;

      const data = await searchPrices(params);
      if (!controller.signal.aborted) {
        setResults(data.results || []);
        setResultCount(data.results?.length || 0);
        setErrors(data.errors || []);
      }
    } catch (err) {
      if (err.name !== 'AbortError') setFetchError(err.message);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [location]);

  const handleSearch = useCallback((query) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', query);
    router.replace(`?${params.toString()}`, { scroll: false });
    doSearch(query);
  }, [doSearch, router, searchParams]);

  useEffect(() => {
    if (urlQuery && location) doSearch(urlQuery);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const sorted = sortResults(results, sortBy);
  const hasResults = sorted && sorted.length > 0;
  const noResults = sorted && sorted.length === 0 && !loading && !fetchError;

  return (
    <div className="min-h-screen cream-grain">
      <Header location={location} onLocationClick={openPicker} />

      <main className="max-w-content mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-24">
        <div className="mb-6">
          <SearchBar initialQuery={urlQuery} onSearch={handleSearch} isLoading={loading} />
        </div>

        {(hasResults || loading) && (
          <div className="flex items-center justify-between mb-5 animate-fade-in">
            <div className="text-sm text-ink-soft dark:text-ink-soft-on-dark">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sage dark:text-sage-on-dark" strokeWidth={2.25} />
                  <span className="italic">Searching every shelf...</span>
                </span>
              ) : (
                <span>
                  <span className="font-serif text-lg font-semibold text-ink dark:text-ink-on-dark tabular-nums">{resultCount}</span>
                  <span className="ml-1.5">
                    {resultCount === 1 ? 'product' : 'products'} found for{' '}
                  </span>
                  <span className="italic text-ink dark:text-ink-on-dark">&ldquo;{urlQuery}&rdquo;</span>
                </span>
              )}
            </div>
            {hasResults && <SortMenu value={sortBy} onChange={setSortBy} />}
          </div>
        )}

        {errors && errors.length > 0 && !loading && (
          <div className="mb-4">
            <ErrorNote errors={errors} />
          </div>
        )}

        {loading && <Skeletons count={5} />}

        {fetchError && !loading && (
          <ErrorCard message={fetchError} onRetry={() => doSearch(urlQuery)} />
        )}

        {noResults && <EmptyState noResults query={urlQuery} onSearch={handleSearch} />}

        {hasResults && (
          <div className="space-y-3.5">
            {sorted.map((product, i) => (
              <div key={`${product.product}-${i}`} className="animate-rise" style={{ animationDelay: `${Math.min(i * 40, 240)}ms` }}>
                <ProductCard product={product} onSelect={setSelectedProduct} />
              </div>
            ))}
          </div>
        )}

        {!urlQuery && !loading && !results && (
          <EmptyState onSearch={handleSearch} />
        )}
      </main>

      <LocationPicker
        isOpen={isPickerOpen}
        onClose={closePicker}
        onSelect={setLocation}
        geoLoading={geoLoading}
        geoError={geoError}
        onRequestGeo={requestGeolocation}
        currentLocation={location}
      />

      {selectedProduct && (
        <ProductSheet product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
