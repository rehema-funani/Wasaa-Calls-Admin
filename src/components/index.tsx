// Add a simple export file for easier imports
// src/components/index.ts
export { Card } from './common/Card';
export { Badge } from './common/Badge';
export { Button } from './common/Button';
export { Modal } from './common/Modal';
export { Table } from './common/Table';
export { Avatar } from './common/Avatar';

// Dashboard components
export { KPICard } from './dashboard/KPICard';
export { ActivityFeed } from './dashboard/ActivityFeed';
export { CallsChart } from './dashboard/CallsChart';
export { LiveCallMap } from './dashboard/LiveCallMap';

// Call components
export { CallCard } from './calls/CallCard';
export { CallMonitor } from './calls/CallMonitor';
export { QoSChart } from './calls/QoSChart';
export { RecordingsList } from './calls/RecordingsList';

// Billing components
export { BillingChart } from './billing/BillingChart';
export { EscrowCard } from './billing/EscrowCard';
export { TransactionTable } from './billing/TransactionTable';

// User components
export { UserModal } from './users/UserModal';
export { RoleManager } from './users/RoleManager';

// Layout components
export { Layout } from './layout/Layout';
export { Header } from './layout/Header';
export { Sidebar } from './layout/Sidebar';