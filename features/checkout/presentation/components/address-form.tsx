'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, type AddressFormData } from '@/lib/validations/address';

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
}

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CEP
        </label>
        <input
          type="text"
          {...register('cep')}
          placeholder="00000-000"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        />
        {errors.cep && (
          <p className="text-sm text-red-600 mt-1">{errors.cep.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rua
        </label>
        <input
          type="text"
          {...register('rua')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        />
        {errors.rua && (
          <p className="text-sm text-red-600 mt-1">{errors.rua.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número
          </label>
          <input
            type="text"
            {...register('numero')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
          />
          {errors.numero && (
            <p className="text-sm text-red-600 mt-1">{errors.numero.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complemento
          </label>
          <input
            type="text"
            {...register('complemento')}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Bairro
        </label>
        <input
          type="text"
          {...register('bairro')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        />
        {errors.bairro && (
          <p className="text-sm text-red-600 mt-1">{errors.bairro.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cidade
        </label>
        <input
          type="text"
          {...register('cidade')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
        />
        {errors.cidade && (
          <p className="text-sm text-red-600 mt-1">{errors.cidade.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Estado
        </label>
        <input
          type="text"
          {...register('estado')}
          placeholder="SP"
          maxLength={2}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none uppercase"
        />
        {errors.estado && (
          <p className="text-sm text-red-600 mt-1">{errors.estado.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
      >
        Salvar Endereço
      </button>
    </form>
  );
}
