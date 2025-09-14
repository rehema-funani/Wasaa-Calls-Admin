import type { User } from '../../types';

const mockUsers: User[] = [
  { id: 'usr_1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Online', activeCalls: 2, lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(), isVerified: true, createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), phoneNumber: '+254712345678', country: 'Kenya' },
  { id: 'usr_2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Moderator', status: 'Offline', activeCalls: 0, lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(), isVerified: false, createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), phoneNumber: '+254712345679', country: 'Kenya' },
  { id: 'usr_3', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'Host', status: 'Online', activeCalls: 5, lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(), isVerified: true, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), phoneNumber: '+256712345678', country: 'Uganda' },
  { id: 'usr_4', name: 'Mary Williams', email: 'mary.williams@example.com', role: 'User', status: 'Offline', activeCalls: 0, lastSeen: new Date(Date.now() - 60 * 60 * 1000).toISOString(), isVerified: false, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), phoneNumber: '+255712345678', country: 'Tanzania' },
  { id: 'usr_5', name: 'David Brown', email: 'david.brown@example.com', role: 'Business', status: 'Online', activeCalls: 1, lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(), isVerified: true, createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), phoneNumber: '+254712345680', country: 'Kenya' },
  { id: 'usr_6', name: 'Susan Davis', email: 'susan.davis@example.com', role: 'Host', status: 'Online', activeCalls: 0, lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(), isVerified: true, createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), phoneNumber: '+254712345681', country: 'Kenya' },
];

interface GetUsersParams {
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export const usersService = {
  getUsers: async (params: GetUsersParams) => {
    console.log(`Fetching users with params`, params);
    
    let filteredUsers = mockUsers;

    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.id.toLowerCase().includes(searchTerm)
      );
    }

    if (params.role && params.role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === (params.role as User['role']));
    }

    if (params.status && params.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === (params.status as User['status']));
    }

    return Promise.resolve({
      users: filteredUsers.slice(0, params.limit || 10),
      total: filteredUsers.length,
    });
  },
  suspendUser: async (userId: string, reason: string) => {
    console.log(`Suspending user ${userId} for reason: ${reason}`);
    return Promise.resolve();
  },
  updateUserRole: async (userId: string, newRole: User['role']) => {
    console.log(`Updating role for user ${userId} to ${newRole}`);
    return Promise.resolve();
  },
  addUser: async (userData: Omit<User, 'id' | 'createdAt' | 'lastSeen' | 'activeCalls' | 'status'>): Promise<User> => {
    console.log('Adding new user:', userData);
    const newUser: User = { ...userData, id: `usr_${Math.random().toString(36).substr(2, 9)}`, createdAt: new Date().toISOString(), lastSeen: new Date().toISOString(), activeCalls: 0, status: 'Offline' };
    mockUsers.unshift(newUser);
    return Promise.resolve(newUser);
  }
};