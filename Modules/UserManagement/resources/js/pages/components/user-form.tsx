import React from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export interface UserFormProps {
  data: UserFormData;
  errors: Record<string, string | string[]>;
  processing: boolean;
  roles: { value: string; label: string }[];
  isEdit?: boolean;
  submitLabel: string;
  setData: (key: keyof UserFormData, value: any) => void;
  onSubmit: (e: FormEvent) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  data,
  errors,
  processing,
  roles,
  isEdit = false,
  submitLabel,
  setData,
  onSubmit,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files && files[0]) {
      setData(name as keyof UserFormData, files[0]);
    } else {
      setData(name as keyof UserFormData, value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Nama */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
          Nama
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name[0]}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required={!isEdit}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email[0]}</p>}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="role">
          Peran
        </label>
        <select
          id="role"
          name="role"
          value={data.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
        {errors.role && <p className="text-sm text-red-600">{errors.role[0]}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
          {isEdit ? 'Password Baru (opsional)' : 'Password'}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password[0]}</p>}
      </div>

      {/* Password Confirmation */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password_confirmation">
          Konfirmasi Password
        </label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.password_confirmation && (
          <p className="text-sm text-red-600">{errors.password_confirmation[0]}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {processing ? 'Menyimpan...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

// Export the type for external usage
export interface UserFormData {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
}
