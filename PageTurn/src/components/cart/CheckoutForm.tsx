import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import type { CustomerDetails } from '../../types';
import { Button } from '../ui/Button';

interface CheckoutFormProps {
  onSubmit: (customer: CustomerDetails) => void;
  onBack: () => void;
  processing: boolean;
}

type Errors = Partial<Record<keyof CustomerDetails, string>>;

const EMPTY: CustomerDetails = { name: '', email: '', phone: '', address: '', city: '', pincode: '' };

function validate(values: CustomerDetails): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Enter your full name.';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!/^\d{10}$/.test(values.phone.replace(/\s/g, ''))) errors.phone = 'Enter a 10-digit phone number.';
  if (values.address.trim().length < 5) errors.address = 'Enter your street address.';
  if (!values.city.trim()) errors.city = 'Enter your city.';
  if (!/^\d{6}$/.test(values.pincode)) errors.pincode = 'Enter a 6-digit PIN code.';
  return errors;
}

export function CheckoutForm({ onSubmit, onBack, processing }: CheckoutFormProps) {
  const [values, setValues] = useState<CustomerDetails>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const baseId = useId();

  const field = (key: keyof CustomerDetails) => `${baseId}-${key}`;

  const update = (key: keyof CustomerDetails, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  };

  const input = (key: keyof CustomerDetails, label: string, type = 'text', autoComplete?: string) => {
    const id = field(key);
    const errorId = `${id}-error`;
    const error = errors[key];
    return (
      <div className="min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-slate-800">
          {label}
        </label>
        <input
          id={id}
          name={key}
          type={type}
          autoComplete={autoComplete}
          value={values[key]}
          onChange={(event) => update(key, event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 aria-[invalid=true]:border-rose-600"
        />
        {error && (
          <p id={errorId} className="mt-1 text-xs text-rose-700">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4 p-5" aria-label="Delivery details">
      <h3 className="font-serif text-base font-bold text-slate-900">Delivery details</h3>
      {input('name', 'Full name', 'text', 'name')}
      {input('email', 'Email', 'email', 'email')}
      {input('phone', 'Phone (10 digits)', 'tel', 'tel')}
      {input('address', 'Street address', 'text', 'street-address')}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {input('city', 'City', 'text', 'address-level2')}
        {input('pincode', 'PIN code', 'text', 'postal-code')}
      </div>
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onBack} disabled={processing}>
          Back to cart
        </Button>
        <Button type="submit" disabled={processing}>
          {processing ? 'Processing payment…' : 'Place order'}
        </Button>
      </div>
    </form>
  );
}
