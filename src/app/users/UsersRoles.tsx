// // src/app/users/UsersRoles.tsx
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { 
//   Search,
//   Plus
// } from 'lucide-react';
// import { Card } from '../../components/ui/card';
// import { Button } from '../../components/ui/button';
// import { UserTable } from '../../components/users/UserTable';
// import { UserModal } from '../../components/users/UserModal';
// import type { User } from '../../types';
// import { RoleManager } from '../../components/users/RoleManager';
// import { useUsers } from '../../hooks/useUsers';

// const UsersRoles: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [roleFilter, setRoleFilter] = useState<string>('all');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddMode, setIsAddMode] = useState(false);

//   const { users, isLoading: loading, suspendUser, updateRole, addUser } = useUsers({
//     search: searchTerm,
//     role: roleFilter,
//     status: statusFilter,
//   });

//   const handleSuspendUser = (userId: string) => {
//     suspendUser({ userId });
//   };

//   const handleUpdateRole = (userId: string, role: User['role']) => {
//     updateRole({ userId, role });
//   };

//   const handleViewUser = (user: User) => {
//     setSelectedUser(user);
//     setIsModalOpen(true);
//     setIsAddMode(false);
//   };

//   const handleAddUserClick = () => {
//     setSelectedUser(null);
//     setIsModalOpen(true);
//     setIsAddMode(true);
//   };

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={
//           <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   Users & Roles
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 mt-1">
//                   Manage user accounts and role permissions
//                 </p>
//               </div>
//               <Button variant="primary" onClick={handleAddUserClick}>
//                 <Plus size={16} className="mr-2" />
//                 Add User
//               </Button>
//             </div>

//             {/* Filters */}
//             <Card className="p-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="relative">
//                   <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by name, email, or ID..."
//                     className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   value={roleFilter}
//                   onChange={(e) => setRoleFilter(e.target.value)}
//                   className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 >
//                   <option value="all">All Roles</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Moderator">Moderator</option>
//                   <option value="Business">Business</option>
//                   <option value="Host">Host</option>
//                   <option value="User">User</option>
//                 </select>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="Online">Online</option>
//                   <option value="Offline">Offline</option>
//                 </select>
//               </div>
//             </Card>

//             {/* Users Table */}
//             <Card className="overflow-hidden">
//               <UserTable
//                 users={users}
//                 loading={loading}
//                 onViewUser={handleViewUser}
//                 onSuspendUser={handleSuspendUser}
//                 onUpdateRole={handleUpdateRole}
//               />
//             </Card>
//           </div>
//         } />
//         <Route path="/roles" element={<RoleManager />} />
//         <Route path="/verification" element={<div>Business Verification Page</div>} />
//       </Routes>
//       <UserModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         user={selectedUser}
//         onAddUser={addUser}
//         isAddMode={isAddMode}
//         onUpdateRole={handleUpdateRole}
//         onSuspendUser={handleSuspendUser}
//       />
//     </>
//   );
// };

// export default UsersRoles;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Search,
  Plus,
  Filter,
  Users
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { UserTable } from '../../components/users/UserTable';
import { UserModal } from '../../components/users/UserModal';
import type { User } from '../../types';
import { RoleManager } from '../../components/users/RoleManager';
import { useUsers } from '../../hooks/useUsers';

const UsersRoles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);

  const { users, isLoading: loading, suspendUser, updateRole, addUser } = useUsers({
    search: searchTerm,
    role: roleFilter,
    status: statusFilter,
  });

  const handleSuspendUser = (userId: string) => {
    suspendUser({ userId });
  };

  const handleUpdateRole = (userId: string, role: User['role']) => {
    updateRole({ userId, role });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsAddMode(false);
  };

  const handleAddUserClick = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
    setIsAddMode(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Routes>
          <Route path="/" element={
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    Users & Roles
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    Manage user accounts and role permissions
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <Users size={18} className="text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-700 dark:text-blue-400 font-semibold">
                      {users.length} Total Users
                    </span>
                  </div>
                  <Button variant="primary" onClick={handleAddUserClick}>
                    <Plus size={16} className="mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Filter size={20} className="text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or ID..."
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Business">Business</option>
                    <option value="Host">Host</option>
                    <option value="User">User</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">All Status</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </Card>

              {/* Users Table */}
              <Card className="overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    User Accounts ({users.length})
                  </h3>
                </div>
                
                <UserTable
                  users={users}
                  loading={loading}
                  onViewUser={handleViewUser}
                  onSuspendUser={handleSuspendUser}
                  onUpdateRole={handleUpdateRole}
                />
              </Card>
            </>
          } />
          <Route path="/roles" element={<RoleManager />} />
          <Route path="/verification" element={<div>Business Verification Page</div>} />
        </Routes>
      </div>
      
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onAddUser={addUser}
        isAddMode={isAddMode}
        onUpdateRole={handleUpdateRole}
        onSuspendUser={handleSuspendUser}
      />
    </div>
  );
};

export default UsersRoles;