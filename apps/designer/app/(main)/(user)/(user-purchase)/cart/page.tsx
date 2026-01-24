'use client';

import { X, Trash2 } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart, useRemoveFromCart } from '@/queries/useCart';
import { useCreateOrder } from '@/queries/useOrder';
import { Spinner } from '@workspace/ui/components/spinner';
import { formatCurrency } from '@/lib/utils';
import PaymentDialog from '@/app/(main)/(user)/(user-purchase)/cart/PaymentDialog';

interface CartItem {
  id: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  license: string;
}

export default function MyCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'MV2 Layered Long-Sleeve Tee',
      brand: 'CONNECT Official',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      price: 0.0,
      license: 'Free Item',
    },
    {
      id: '2',
      title: "Men's Jacket",
      brand: '3dstitch',
      image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
      price: 8.0,
      license: 'Basic License',
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const {data: cart, isLoading: loadingCart} = useCart();

  const removeItemMutation = useRemoveFromCart();
  const placeOderMutation = useCreateOrder();

  const toggleItemSelect = (id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
  };

  const onRemoveItem = async (id: string) => {
    if(removeItemMutation.isPending)
      return;
    try{
      const result = await removeItemMutation.mutateAsync(id);
    }
    catch(err) {
      console.log(err);
    }
  };

  const onPlaceOrder = () => {
    //  if(placeOderMutation.isPending) return;

    // try{
    //   const result = placeOderMutation.mutateAsync({paymentMethod: "paypal"});
    // } catch(err) {
    //   console.error(err);
    // }
    // Open payment dialog instead of directly placing order
    setShowPaymentDialog(true);
  }

  useEffect(()=>{console.log(cart?.totalAmount)},[cart])
  const handlePaymentSuccess = async () => {
    if(placeOderMutation.isPending) return;

    try{
      await placeOderMutation.mutateAsync({paymentMethod: "stripe"});
      setShowPaymentDialog(false);
    } catch(err) {
      console.error(err);
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 0;
  const tax = 0;
  const total = subtotal - discount + tax;
  if(loadingCart || !cart)
    return (<>
    loading...</>)
  return (
    <div className="min-h-screen bg-zinc-950">

      <main className="container mx-auto ">

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-zinc-900 rounded-lg p-4 flex items-center justify-between border border-zinc-800">
                    <span className="text-white/70 text-sm">
                      ITEM
                    </span>
                  <span className="text-white/50 text-sm">PRICE</span>
                </div>

                {cart.items.map((item) => (
                  <div
                    key={item.productId}
                    className="bg-zinc-900 rounded-lg p-4 flex items-start gap-4 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                  >
                    {/* <Checkbox
                      checked={selectedItems.has(item.id)}
                      onCheckedChange={() => toggleItemSelect(item.id)}
                      className="w-5 h-5 mt-1"
                    /> */}
                    <Link href={`/detail/${item.productId}`}>
                     <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    </Link>
                   

                    <div className="flex-1 min-w-0">
                      {/* <p className="text-white/60 text-xs mb-1">{item.license}</p> */}
                      <Link href={`/portfolio/${item.designer.userId}`}>
                          <h3 className="text-white/90 mb-1">{item.designer.name}</h3>

                      </Link>
                      <Link href={`/detail/${item.productId}`}>
                                            <p className="text-white font-bold text-lg hover:text-cyan-400 transition-colors line-clamp-1">{item.title}</p>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-white font-bold">{formatCurrency(item.price)}</span>
                      <button
                        onClick={() => onRemoveItem(item.productId)}
                        className="p-2 text-white/50 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800 space-y-6 sticky top-24">
                  <div>
                    <h3 className="text-white font-bold mb-4">ORDER SUMMARY</h3>
                    {/* <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-white/70">
                        <span>Subtotal</span>
                        <span className="text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Discount</span>
                        <span className="text-white">-${discount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>TAX</span>
                        <span className="text-white">${tax.toFixed(2)}</span>
                      </div>
                    </div> */}
                  </div>

                  <div className="border-t border-zinc-700 pt-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-white font-bold">TOTAL</span>
                      <span className="text-white text-2xl font-bold">
                        { formatCurrency(cart.totalAmount)}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        {/* <Checkbox
                          checked={termsAccepted}
                          onCheckedChange={(checked) =>
                            setTermsAccepted(checked === true)
                          }
                          className="w-4 h-4 mt-1"
                        /> */}
                        {/* <label className="text-white/60 text-xs cursor-pointer">
                          CONNECT Terms of Service
                        </label> */}
                      </div>
                    </div>

                    {/* <div className="mb-4">
                      <p className="text-white/70 text-xs font-medium mb-3">PAYMENT</p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 text-white cursor-pointer">
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 bg-cyan-400" />
                          <span className="text-sm font-semibold">stripe</span>
                        </label>
                        <label className="flex items-center gap-3 text-white/50 cursor-pointer">
                          <div className="w-4 h-4 rounded-full border-2 border-white/30" />
                          <span className="text-sm">PayPal</span>
                        </label>
                      </div>
                    </div> */}

                    <Button
                      disabled={ cart.items.length === 0}
                      onClick={onPlaceOrder}
                      className="w-full bg-zinc-700 hover:bg-zinc-600 text-white rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {placeOderMutation.isPending ? (
                        <Spinner />
                      ) :
                      (<span>PLACE ORDER</span>)}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PaymentDialog
            open={showPaymentDialog}
            onOpenChange={setShowPaymentDialog}
            amount={cart.totalAmount}
            onSuccess={handlePaymentSuccess}
          />

          {/* <TabsContent value="purchase" className="mt-8">
            <div className="text-center py-12">
              <p className="text-white/50 text-lg">No purchases yet</p>
            </div>
          </TabsContent>

          <TabsContent value="invoice" className="mt-8">
            <div className="text-center py-12">
              <p className="text-white/50 text-lg">No invoices yet</p>
            </div>
          </TabsContent>
       */}
      </main>
    </div>
  );
}
