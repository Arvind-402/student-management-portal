import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, MoreHorizontal, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/Dialog';
import {
  DropdownMenu, DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator
} from '@/components/ui/Dropdown';
import { getInitials, getAvatarColor } from '@/lib/utils';

const StudentTable = ({ students, onDelete, basePath = '' }) => {
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleConfirmDelete = async () => {
    if (!confirmId) return;
    setDeletingId(confirmId);
    await onDelete(confirmId);
    setDeletingId(null);
    setConfirmId(null);
  };

  const confirmStudent = students.find((s) => s._id === confirmId);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 shadow-premium bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 sticky top-0 backdrop-blur-md z-10">
                {['Student Profile', 'Roll Code', 'Email Address', 'Course Program', 'Age', ''].map((h) => (
                  <th 
                    key={h} 
                    className="px-6 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence initial={false}>
                {students.map((student, idx) => {
                  const initials = getInitials(student.name);
                  const avatarColor = getAvatarColor(student.name);
                  return (
                    <motion.tr
                      key={student._id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.22, delay: idx * 0.02, ease: 'easeOut' }}
                      className="group hover:bg-slate-50/50 transition-colors duration-150"
                    >
                      {}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-[11px] font-bold shadow-sm shadow-black/5 ring-2 ring-white ${avatarColor}`}>
                            {initials}
                          </div>
                          <span className="font-semibold text-slate-900 text-sm tracking-tight group-hover:text-brand-600 transition-colors">
                            {student.name}
                          </span>
                        </div>
                      </td>

                      {}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/40">
                          {student.rollNumber}
                        </span>
                      </td>

                      {}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium text-xs">
                        {student.email}
                      </td>

                      {}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge course={student.course}>{student.course}</Badge>
                      </td>

                      {}
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-semibold text-xs">
                        {student.age}
                      </td>

                      {}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 focus:bg-slate-100">
                              <MoreHorizontal size={15} />
                            </button>
                          </DropdownMenuTrigger>
                          
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`${basePath}/edit/${student._id}`} className="flex items-center gap-2 font-medium">
                                <Edit2 size={13} className="text-slate-400" /> Edit Profile
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem destructive onClick={() => setConfirmId(student._id)} className="font-medium">
                              <Trash2 size={13} className="text-red-400" /> Delete Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {}
      <Dialog open={!!confirmId} onOpenChange={(open) => !open && setConfirmId(null)}>
        <DialogContent
          className="max-w-sm"
          title=""
          description=""
        >
          <div className="flex flex-col items-center text-center p-2">
            <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4 shadow-sm">
              <AlertTriangle size={22} />
            </div>
            
            <h4 className="text-base font-bold text-slate-900 mb-1">Delete Student Profile?</h4>
            <p className="text-slate-500 text-xs max-w-[260px] leading-relaxed mb-6">
              Are you sure you want to delete <strong className="text-slate-950 font-semibold">{confirmStudent?.name}</strong>? This action will permanently wipe this record.
            </p>

            <div className="flex items-center gap-2.5 w-full">
              <DialogClose asChild>
                <Button variant="secondary" className="flex-1 text-xs">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="danger"
                className="flex-1 text-xs shadow-md shadow-red-500/10"
                isLoading={!!deletingId}
                onClick={handleConfirmDelete}
              >
                Delete Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StudentTable;
