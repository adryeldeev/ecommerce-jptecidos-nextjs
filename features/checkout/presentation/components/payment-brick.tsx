'use client';

import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

if (publicKey) {
  initMercadoPago(publicKey, { locale: 'pt-BR' });
}

interface PaymentBrickProps {
  amount: number;
  onSubmit: (formData: Record<string, unknown>) => Promise<void>;
}

export function PaymentBrick({ amount, onSubmit }: PaymentBrickProps) {
  if (!publicKey) {
    return (
      <p className="text-sm text-red-600">
        Pagamento indisponível: chave pública do Mercado Pago não configurada.
      </p>
    );
  }

  if (amount <= 0) {
    return null;
  }

  return (
    <Payment
      initialization={{ amount }}
      customization={{
        paymentMethods: {
          creditCard: 'all',
          debitCard: 'all',
          ticket: 'all',
          bankTransfer: 'all',
        },
      }}
      onSubmit={async ({ formData }) => {
        await onSubmit(formData as unknown as Record<string, unknown>);
      }}
      onError={(error) => {
        console.error('Erro no Payment Brick:', error);
      }}
    />
  );
}
