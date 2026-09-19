import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/store/useUIStore';
import { submitLead } from '@/lib/firebase';
import Button from '@/components/ui/Button';

interface FormValues {
  agencyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormValues = {
  agencyName: '',
  contactName: '',
  email: '',
  phone: '',
  message: ''
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const status = useUIStore((state) => state.contactFormStatus);
  const setStatus = useUIStore((state) => state.setContactFormStatus);

  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  const handleChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    (['agencyName', 'contactName', 'email', 'message'] as const).forEach((field) => {
      if (!values[field].trim()) {
        nextErrors[field] = t('contact.required');
      }
    });
    if (values.email && !emailPattern.test(values.email)) {
      nextErrors.email = t('contact.invalidEmail');
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      await submitLead({ ...values, locale: i18n.resolvedLanguage ?? 'fr' });
      setStatus('success');
      setValues(emptyForm);
    } catch (error) {
      console.error('Lead submission failed', error);
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-navy/20 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30';

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t('contact.fields.agencyName')}
          placeholder={t('contact.placeholders.agencyName')}
          value={values.agencyName}
          onChange={handleChange('agencyName')}
          error={errors.agencyName}
          className={inputClasses}
          name="agencyName"
        />
        <Field
          label={t('contact.fields.contactName')}
          placeholder={t('contact.placeholders.contactName')}
          value={values.contactName}
          onChange={handleChange('contactName')}
          error={errors.contactName}
          className={inputClasses}
          name="contactName"
        />
        <Field
          label={t('contact.fields.email')}
          placeholder={t('contact.placeholders.email')}
          value={values.email}
          onChange={handleChange('email')}
          error={errors.email}
          className={inputClasses}
          type="email"
          name="email"
        />
        <Field
          label={t('contact.fields.phone')}
          placeholder={t('contact.placeholders.phone')}
          value={values.phone}
          onChange={handleChange('phone')}
          className={inputClasses}
          type="tel"
          name="phone"
        />
      </div>

      <label className="grid gap-1.5 text-sm font-medium text-navy">
        {t('contact.fields.message')}
        <textarea
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange('message')}
          placeholder={t('contact.placeholders.message')}
          className={inputClasses}
        />
        {errors.message && <span className="text-xs font-normal text-red-600">{errors.message}</span>}
      </label>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button as="button" type="submit" variant="secondary" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('contact.submitting') : t('contact.submit')}
        </Button>

        {status === 'success' && <p className="text-sm font-medium text-emerald-700">{t('contact.success')}</p>}
        {status === 'error' && <p className="text-sm font-medium text-red-600">{t('contact.error')}</p>}
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className: string;
  type?: string;
  name: string;
}

function Field({ label, placeholder, value, onChange, error, className, type = 'text', name }: FieldProps) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-navy">
      {label}
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}
