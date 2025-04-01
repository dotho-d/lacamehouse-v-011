"use client";

import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Calculator, PlusCircle, MinusCircle } from 'lucide-react';

export default function CalculaConsos() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [items, setItems] = useState([
    { id: 1, name: '', quantity: 0, price: 0, frequency: 'daily' }
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: '',
      quantity: 0,
      price: 0,
      frequency: 'daily'
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const dailyAmount = item.quantity * item.price;
      switch (item.frequency) {
        case 'daily':
          return total + (dailyAmount * 365);
        case 'weekly':
          return total + (dailyAmount * 52);
        case 'monthly':
          return total + (dailyAmount * 12);
        default:
          return total + dailyAmount;
      }
    }, 0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0E232E] via-[#0E232E] to-[#134e5c]">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <Calculator className="w-16 h-16 text-[#D4A676] mx-auto mb-6" />
            <h1 className="text-[var(--font-size-habibi-h1)] font-heading mb-4">CalculaConsos</h1>
            <p className="text-foreground/80 max-w-[600px] mx-auto">
              Calculez le coût réel de vos consommations sur une année
            </p>
          </div>

          <div className="bg-[#132D3B] rounded-[30px] p-8">
            {items.map((item) => (
              <div key={item.id} className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-2">Produit/Service</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full bg-[#0E232E] rounded-lg p-3 border border-white/20"
                    placeholder="Ex: Cigarettes"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium mb-2">Quantité</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                    className="w-full bg-[#0E232E] rounded-lg p-3 border border-white/20"
                    min="0"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium mb-2">Prix €</label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                    className="w-full bg-[#0E232E] rounded-lg p-3 border border-white/20"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm font-medium mb-2">Fréquence</label>
                  <select
                    value={item.frequency}
                    onChange={(e) => updateItem(item.id, 'frequency', e.target.value)}
                    className="w-full bg-[#0E232E] rounded-lg p-3 border border-white/20"
                  >
                    <option value="daily">Par jour</option>
                    <option value="weekly">Par semaine</option>
                    <option value="monthly">Par mois</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-[#D4A676] hover:text-[#D4A676]/80 transition-colors"
                  >
                    <MinusCircle size={24} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/20">
              <button
                onClick={addItem}
                className="flex items-center gap-2 text-[#D4A676] hover:text-[#D4A676]/80 transition-colors"
              >
                <PlusCircle size={24} />
                <span>Ajouter un élément</span>
              </button>
              
              <div className="text-right">
                <div className="text-sm text-foreground/60 mb-1">Coût annuel estimé</div>
                <div className="text-2xl font-semibold">{calculateTotal().toFixed(2)}€</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}