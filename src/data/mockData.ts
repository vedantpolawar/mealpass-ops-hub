export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  hasActiveSubscription: boolean;
  joinedDate: string;
  subscriptions: UserSubscription[];
  orderHistory: OrderHistory[];
}

export interface UserSubscription {
  messId: string;
  messName: string;
  startDate: string;
  endDate: string;
  mealsRemaining: number;
  totalMeals: number;
}

export interface OrderHistory {
  id: string;
  date: string;
  messName: string;
  mealType: string;
  scanned: boolean;
}

export interface Mess {
  id: string;
  name: string;
  ownerName: string;
  city: string;
  address: string;
  status: 'pending' | 'live' | 'suspended';
  totalSubscribers: number;
  monthlyRevenue: number;
  subscriptionPrice: number;
  fssaiLicense: string;
  fssaiVerified: boolean;
  locationVerified: boolean;
  providerType: 'mess' | 'tiffin';
  foodCategory: string;
  contact: string;
  platformCommission: number;
  createdAt: string;
}

export interface Subscriber {
  id: string;
  userId: string;
  userName: string;
  startDate: string;
  endDate: string;
  mealsUsed: number;
  totalMeals: number;
  status: 'active' | 'expired' | 'cancelled';
}

export interface ProviderApplication {
  id: string;
  businessName: string;
  ownerName: string;
  contact: string;
  email: string;
  address: string;
  city: string;
  providerType: 'mess' | 'tiffin';
  foodCategory: string;
  pricing: number;
  fssaiLicense: string;
  fssaiDocumentUrl: string;
  locationCoords: { lat: number; lng: number };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  notes: string;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  action: string;
  entityType: 'user' | 'mess' | 'provider' | 'system';
  entityName: string;
  timestamp: string;
  details: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    hasActiveSubscription: true,
    joinedDate: '2024-01-15',
    subscriptions: [
      { messId: 'm1', messName: 'Sharma Ji Ka Dhaba', startDate: '2024-12-01', endDate: '2025-01-01', mealsRemaining: 18, totalMeals: 30 }
    ],
    orderHistory: [
      { id: 'o1', date: '2024-12-28', messName: 'Sharma Ji Ka Dhaba', mealType: 'Lunch', scanned: true },
      { id: 'o2', date: '2024-12-27', messName: 'Sharma Ji Ka Dhaba', mealType: 'Dinner', scanned: true },
    ]
  },
  {
    id: 'u2',
    name: 'Priya Patel',
    email: 'priya.patel@outlook.com',
    phone: '+91 87654 32109',
    city: 'Pune',
    hasActiveSubscription: true,
    joinedDate: '2024-02-20',
    subscriptions: [
      { messId: 'm2', messName: 'Annapurna Tiffin', startDate: '2024-12-15', endDate: '2025-01-15', mealsRemaining: 22, totalMeals: 30 }
    ],
    orderHistory: [
      { id: 'o3', date: '2024-12-28', messName: 'Annapurna Tiffin', mealType: 'Lunch', scanned: true },
    ]
  },
  {
    id: 'u3',
    name: 'Amit Kumar',
    email: 'amit.kumar@yahoo.com',
    phone: '+91 76543 21098',
    city: 'Delhi',
    hasActiveSubscription: false,
    joinedDate: '2024-03-10',
    subscriptions: [],
    orderHistory: []
  },
  {
    id: 'u4',
    name: 'Sneha Reddy',
    email: 'sneha.r@gmail.com',
    phone: '+91 65432 10987',
    city: 'Hyderabad',
    hasActiveSubscription: true,
    joinedDate: '2024-04-05',
    subscriptions: [
      { messId: 'm3', messName: 'Hyderabad House', startDate: '2024-12-01', endDate: '2025-01-01', mealsRemaining: 5, totalMeals: 30 }
    ],
    orderHistory: []
  },
  {
    id: 'u5',
    name: 'Vikram Singh',
    email: 'vikram.s@gmail.com',
    phone: '+91 54321 09876',
    city: 'Bangalore',
    hasActiveSubscription: false,
    joinedDate: '2024-05-12',
    subscriptions: [],
    orderHistory: []
  },
];

// Mock Messes
export const mockMesses: Mess[] = [
  {
    id: 'm1',
    name: 'Sharma Ji Ka Dhaba',
    ownerName: 'Ramesh Sharma',
    city: 'Mumbai',
    address: '45, Andheri West, Mumbai 400053',
    status: 'live',
    totalSubscribers: 156,
    monthlyRevenue: 234000,
    subscriptionPrice: 1500,
    fssaiLicense: 'FSSAI2024MH00123',
    fssaiVerified: true,
    locationVerified: true,
    providerType: 'mess',
    foodCategory: 'North Indian Veg',
    contact: '+91 98765 00001',
    platformCommission: 23400,
    createdAt: '2024-01-10',
  },
  {
    id: 'm2',
    name: 'Annapurna Tiffin',
    ownerName: 'Lakshmi Devi',
    city: 'Pune',
    address: '23, Kothrud, Pune 411038',
    status: 'live',
    totalSubscribers: 89,
    monthlyRevenue: 133500,
    subscriptionPrice: 1500,
    fssaiLicense: 'FSSAI2024MH00456',
    fssaiVerified: true,
    locationVerified: true,
    providerType: 'tiffin',
    foodCategory: 'South Indian',
    contact: '+91 98765 00002',
    platformCommission: 13350,
    createdAt: '2024-02-15',
  },
  {
    id: 'm3',
    name: 'Hyderabad House',
    ownerName: 'Mohammed Irfan',
    city: 'Hyderabad',
    address: '78, Banjara Hills, Hyderabad 500034',
    status: 'live',
    totalSubscribers: 203,
    monthlyRevenue: 405000,
    subscriptionPrice: 2000,
    fssaiLicense: 'FSSAI2024TS00789',
    fssaiVerified: true,
    locationVerified: true,
    providerType: 'mess',
    foodCategory: 'Hyderabadi Non-Veg',
    contact: '+91 98765 00003',
    platformCommission: 40500,
    createdAt: '2024-03-20',
  },
  {
    id: 'm4',
    name: 'Delhi Darbar',
    ownerName: 'Suresh Gupta',
    city: 'Delhi',
    address: '12, Lajpat Nagar, New Delhi 110024',
    status: 'pending',
    totalSubscribers: 0,
    monthlyRevenue: 0,
    subscriptionPrice: 1800,
    fssaiLicense: 'FSSAI2024DL00234',
    fssaiVerified: false,
    locationVerified: false,
    providerType: 'mess',
    foodCategory: 'Mughlai',
    contact: '+91 98765 00004',
    platformCommission: 0,
    createdAt: '2024-12-20',
  },
  {
    id: 'm5',
    name: 'Bangalore Bites',
    ownerName: 'Venkatesh K',
    city: 'Bangalore',
    address: '56, Koramangala, Bangalore 560034',
    status: 'suspended',
    totalSubscribers: 45,
    monthlyRevenue: 0,
    subscriptionPrice: 1600,
    fssaiLicense: 'FSSAI2024KA00567',
    fssaiVerified: true,
    locationVerified: true,
    providerType: 'tiffin',
    foodCategory: 'Karnataka Cuisine',
    contact: '+91 98765 00005',
    platformCommission: 0,
    createdAt: '2024-06-10',
  },
];

// Mock Subscribers for a mess
export const mockSubscribers: Subscriber[] = [
  { id: 's1', userId: 'u1', userName: 'Rahul Sharma', startDate: '2024-12-01', endDate: '2025-01-01', mealsUsed: 12, totalMeals: 30, status: 'active' },
  { id: 's2', userId: 'u2', userName: 'Priya Patel', startDate: '2024-12-05', endDate: '2025-01-05', mealsUsed: 8, totalMeals: 30, status: 'active' },
  { id: 's3', userId: 'u3', userName: 'Amit Kumar', startDate: '2024-11-01', endDate: '2024-12-01', mealsUsed: 30, totalMeals: 30, status: 'expired' },
  { id: 's4', userId: 'u4', userName: 'Sneha Reddy', startDate: '2024-12-10', endDate: '2025-01-10', mealsUsed: 5, totalMeals: 30, status: 'active' },
  { id: 's5', userId: 'u5', userName: 'Vikram Singh', startDate: '2024-11-15', endDate: '2024-12-15', mealsUsed: 15, totalMeals: 30, status: 'cancelled' },
];

// Mock Provider Applications
export const mockApplications: ProviderApplication[] = [
  {
    id: 'a1',
    businessName: 'Chennai Express Tiffin',
    ownerName: 'Muthu Kumar',
    contact: '+91 98765 11111',
    email: 'muthu@chennaiexpress.com',
    address: '89, T. Nagar, Chennai 600017',
    city: 'Chennai',
    providerType: 'tiffin',
    foodCategory: 'South Indian Veg',
    pricing: 1400,
    fssaiLicense: 'FSSAI2024TN00111',
    fssaiDocumentUrl: '/documents/fssai-chennai.pdf',
    locationCoords: { lat: 13.0411, lng: 80.2339 },
    status: 'pending',
    submittedAt: '2024-12-25',
    notes: '',
  },
  {
    id: 'a2',
    businessName: 'Kolkata Kitchen',
    ownerName: 'Debashish Banerjee',
    contact: '+91 98765 22222',
    email: 'deba@kolkatakitchen.com',
    address: '34, Salt Lake, Kolkata 700091',
    city: 'Kolkata',
    providerType: 'mess',
    foodCategory: 'Bengali Cuisine',
    pricing: 1700,
    fssaiLicense: 'FSSAI2024WB00222',
    fssaiDocumentUrl: '/documents/fssai-kolkata.pdf',
    locationCoords: { lat: 22.5726, lng: 88.3639 },
    status: 'pending',
    submittedAt: '2024-12-26',
    notes: '',
  },
  {
    id: 'a3',
    businessName: 'Rajasthani Rasoi',
    ownerName: 'Mahendra Singh',
    contact: '+91 98765 33333',
    email: 'mahendra@rajrasoi.com',
    address: '67, MI Road, Jaipur 302001',
    city: 'Jaipur',
    providerType: 'mess',
    foodCategory: 'Rajasthani Thali',
    pricing: 1600,
    fssaiLicense: 'FSSAI2024RJ00333',
    fssaiDocumentUrl: '/documents/fssai-jaipur.pdf',
    locationCoords: { lat: 26.9124, lng: 75.7873 },
    status: 'approved',
    submittedAt: '2024-12-20',
    notes: 'All documents verified. Ready for launch.',
  },
];

// Mock Activity Logs
export const mockActivityLogs: ActivityLog[] = [
  { id: 'l1', adminName: 'Admin User', action: 'Approved provider', entityType: 'provider', entityName: 'Rajasthani Rasoi', timestamp: '2024-12-28 14:30', details: 'Provider approved and made live' },
  { id: 'l2', adminName: 'Admin User', action: 'Suspended mess', entityType: 'mess', entityName: 'Bangalore Bites', timestamp: '2024-12-27 10:15', details: 'Suspended due to compliance issues' },
  { id: 'l3', adminName: 'Admin User', action: 'Verified FSSAI', entityType: 'provider', entityName: 'Hyderabad House', timestamp: '2024-12-26 16:45', details: 'FSSAI license verified successfully' },
  { id: 'l4', adminName: 'Admin User', action: 'Viewed user profile', entityType: 'user', entityName: 'Rahul Sharma', timestamp: '2024-12-26 09:00', details: 'Reviewed subscription details' },
  { id: 'l5', adminName: 'Admin User', action: 'Updated platform settings', entityType: 'system', entityName: 'Commission Rate', timestamp: '2024-12-25 11:30', details: 'Changed commission from 8% to 10%' },
  { id: 'l6', adminName: 'Admin User', action: 'Rejected application', entityType: 'provider', entityName: 'Quick Bites Delhi', timestamp: '2024-12-24 15:20', details: 'Invalid FSSAI license' },
];

// Stats for overview
export const overviewStats = {
  totalUsers: 1247,
  totalMesses: 89,
  liveMesses: 67,
  pendingVerifications: 12,
  platformRevenue: 2340000,
  monthlyGrowth: 15.3,
};

// Monthly earnings data for charts
export const monthlyEarningsData = [
  { month: 'Jul', earnings: 145000 },
  { month: 'Aug', earnings: 167000 },
  { month: 'Sep', earnings: 189000 },
  { month: 'Oct', earnings: 201000 },
  { month: 'Nov', earnings: 218000 },
  { month: 'Dec', earnings: 234000 },
];

// User growth data
export const userGrowthData = [
  { month: 'Jul', users: 820 },
  { month: 'Aug', users: 910 },
  { month: 'Sep', users: 985 },
  { month: 'Oct', users: 1067 },
  { month: 'Nov', users: 1158 },
  { month: 'Dec', users: 1247 },
];
