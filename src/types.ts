export interface User {
  id: string;
  name: string;
  email: string;
  role: 'User' | 'Host' | 'Moderator' | 'Admin' | 'Business';
  status: 'Online' | 'Offline';
  activeCalls: number;
  avatar?: string;
  createdAt: string;
  lastSeen: string;
  isVerified: boolean;
  country?: string;
  phoneNumber?: string;
}