'use client';

interface ProductQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  unit: 'METRO' | 'KG' | 'UNIDADE';
  minQuantity?: number;
}

export function ProductQuantitySelector({
  quantity,
  onQuantityChange,
  unit,
  minQuantity = 1,
}: ProductQuantitySelectorProps) {
  const unitLabel = unit === 'METRO' ? 'metros' : unit === 'KG' ? 'kg' : 'unidades';
  const step = unit === 'KG' ? 5 : 1;

  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onQuantityChange(Math.max(minQuantity, quantity - step));
    }
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) return;

    if (unit === 'KG') {
      const roundedToStep = Math.round(value / step) * step;
      onQuantityChange(Math.max(minQuantity, roundedToStep));
    } else if (value >= minQuantity) {
      onQuantityChange(value);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Quantidade ({unitLabel})
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={quantity <= minQuantity}
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          -
        </button>
        <input
          type="number"
          min={minQuantity}
          step={step}
          value={quantity}
          onChange={handleChange}
          className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center focus:border-[#DD8A05] focus:outline-none"
        />
        <button
          onClick={handleIncrement}
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
}
