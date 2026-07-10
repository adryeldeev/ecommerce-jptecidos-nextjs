'use client';

import { Header } from '@/features/catalog/presentation/components/header';
import { Footer } from '@/features/catalog/presentation/components/footer';
import { AddressForm } from '@/features/checkout/presentation/components/address-form';
import { type AddressFormData } from '@/lib/validations/address';
import { addressApi } from '@/features/account/infrastructure/address-api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { Address } from '@/lib/types';

export default function MyAddressesPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressApi.list(),
  });

  const createMutation = useMutation({
    mutationFn: addressApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) =>
      addressApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      setEditingAddress(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: addressApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });

  const handleAddAddress = (data: AddressFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdateAddress = (data: AddressFormData) => {
    if (editingAddress) {
      updateMutation.mutate({ id: editingAddress.id, data });
    }
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este endereço?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Meus Endereços
            </h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancelar' : 'Adicionar Endereço'}
            </button>
          </div>
          
          {showForm && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Novo Endereço</h2>
              <AddressForm onSubmit={handleAddAddress} />
            </div>
          )}

          {editingAddress && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Editar Endereço</h2>
              <AddressForm
                onSubmit={handleUpdateAddress}
                defaultValues={editingAddress}
              />
            </div>
          )}
          
          {isLoading ? (
            <p className="text-center text-gray-600">Carregando endereços...</p>
          ) : addresses.length === 0 ? (
            <p className="text-center text-gray-600">
              Nenhum endereço cadastrado
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-semibold">{address.rua}</p>
                      <p className="text-sm text-gray-600">
                        {address.numero}
                        {address.complemento && ` - ${address.complemento}`}
                      </p>
                      <p className="text-sm text-gray-600">{address.bairro}</p>
                      <p className="text-sm text-gray-600">
                        {address.cidade} - {address.estado}
                      </p>
                      <p className="text-sm text-gray-600">CEP: {address.cep}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingAddress(address)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
