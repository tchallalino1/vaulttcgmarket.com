'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: string;
  paymentMethod?: string;
  paymentStatus: string;
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); });
  }, []);

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status } : null);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const statusOptions = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <span className="text-sm text-gray-500">{orders.length} total orders</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">Orders will appear here once customers start purchasing through the Vault TCG Market storefront.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Order</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Customer</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Items</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Total</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-purple-600">{order.orderNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => setSelectedOrder(order)} className="text-purple-600 hover:text-purple-700 text-xs font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Order {selectedOrder.orderNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Customer</p>
                <p className="text-sm font-medium">{selectedOrder.customerName}</p>
                <p className="text-xs text-gray-500">{selectedOrder.customerEmail}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Status</p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[selectedOrder.status] || 'bg-gray-100 text-gray-700'}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Payment</p>
                <p className="text-sm">{selectedOrder.paymentMethod || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-medium mb-1">Date</p>
                <p className="text-sm">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase font-medium mb-2">Shipping Address</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}<br />
                {selectedOrder.shippingAddress.address}<br />
                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase font-medium mb-2">Order Items</p>
              <div className="space-y-3">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                    <div className="w-12 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0 relative">
                      {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" /> : <div className="w-full h-full flex items-center justify-center text-sm">🃏</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Subtotal</span><span className="font-medium">${selectedOrder.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Shipping</span><span className="font-medium">${selectedOrder.shipping.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span>Total</span><span>${selectedOrder.total.toFixed(2)}</span></div>
            </div>

            <div className="flex gap-2 mt-6">
              <button onClick={() => setSelectedOrder(null)} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
