'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { readCart, writeCart, cartItemId, computeTotals } from '@/lib/cart';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => { setItems(readCart()); }, []);
  useEffect(() => { writeCart(items); }, [items]);

  const addProduct = useCallback((product) => {
    const id = cartItemId(product);
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], cartQty: next[i].cartQty + 1, prices: product.prices, image: product.image };
        return next;
      }
      return [...prev, {
        id,
        product: product.product,
        quantity: product.quantity ?? null,
        size: product.size ?? null,
        unit: product.unit ?? null,
        image: product.image ?? null,
        prices: product.prices,
        cartQty: 1,
      }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) => prev.flatMap((x) => {
      if (x.id !== id) return [x];
      return qty <= 0 ? [] : [{ ...x, cartQty: qty }];
    }));
  }, []);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => ({
    items,
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    addProduct,
    setQty,
    remove,
    clear,
    totals: computeTotals(items),
    count: items.reduce((n, x) => n + x.cartQty, 0),
    has: (product) => items.some((x) => x.id === cartItemId(product)),
    qtyOf: (product) => items.find((x) => x.id === cartItemId(product))?.cartQty ?? 0,
  }), [items, isOpen, addProduct, setQty, remove, clear]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
