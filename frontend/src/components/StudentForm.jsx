import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Hash, Mail, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardFooter } from '@/components/ui/Card';

const schema = z.object({
  name:       z.string().min(2, 'Name must be at least 2 characters'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  email:      z.string().email('Enter a valid email address'),
  course:     z.string().min(2, 'Course must be at least 2 characters'),
  age:        z.coerce.number({ invalid_type_error: 'Age must be a number' })
               .int('Age must be a whole number')
               .min(16, 'Age must be greater than 15')
               .max(100, 'Age must be realistic'),
});

const fields = [
  { name: 'name',       label: 'Full Name',    type: 'text',   icon: User,     placeholder: 'e.g. John Doe' },
  { name: 'rollNumber', label: 'Roll Number',  type: 'text',   icon: Hash,     placeholder: 'e.g. CS-101' },
  { name: 'email',      label: 'Email',        type: 'email',  icon: Mail,     placeholder: 'john@example.com' },
  { name: 'course',     label: 'Course',       type: 'text',   icon: BookOpen, placeholder: 'e.g. Computer Science' },
  { name: 'age',        label: 'Age',          type: 'number', icon: Calendar, placeholder: 'e.g. 20' },
];

const StudentForm = ({ initialData, onSubmit, submitLabel = 'Save', isLoading }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      name:       initialData.name       ?? '',
      rollNumber: initialData.rollNumber ?? '',
      email:      initialData.email      ?? '',
      course:     initialData.course     ?? '',
      age:        initialData.age        ?? '',
    } : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="overflow-hidden border border-slate-100 shadow-premium bg-white">
        <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-8">
          {fields.map(({ name, label, type, icon, placeholder }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25, ease: 'easeOut' }}
            >
              <Input
                type={type}
                label={label}
                placeholder={placeholder}
                icon={icon}
                error={errors[name]?.message}
                disabled={isLoading}
                {...register(name)}
              />
            </motion.div>
          ))}
        </CardBody>

        <CardFooter className="flex justify-end gap-3 bg-slate-50/50 py-4 px-6 border-t border-slate-100">
          <Button
            type="button"
            variant="secondary"
            size="md"
            disabled={isLoading}
            onClick={() => reset()}
            className="text-xs"
          >
            Reset Form
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            size="md" 
            isLoading={isLoading}
            className="text-xs shadow-md shadow-brand-500/10"
          >
            {submitLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default StudentForm;
