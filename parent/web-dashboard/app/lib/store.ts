// Basic in-memory store specifically for the demo session.
// In a real app, this would be a database like MongoDB or Postgres.

interface DeviceState {
    deviceId: string;
    name: string;
    battery: number;
    status: 'online' | 'offline';
    lastSync: number; // timestamp
}

interface UserSettings {
    realtimeAlerts: boolean;
    emailReports: boolean;
    pushNotifications: boolean;
}

// Initial Mock Data
let device: DeviceState | null = {
    deviceId: 'DEV_789',
    name: "Rahul's Pixel 7",
    battery: 84,
    status: 'online',
    lastSync: Date.now()
};

let settings: UserSettings = {
    realtimeAlerts: true,
    emailReports: true,
    pushNotifications: false
};

interface PairingCode {
    code: string;
    expiresAt: number;
    used: boolean;
}

let currentPairingCode: PairingCode | null = null;

export const getDevice = () => device;

export const updateDeviceHeartbeat = (data: { battery: number; network: string }) => {
    if (device) {
        device = {
            ...device,
            battery: data.battery,
            status: data.network === 'online' ? 'online' : 'offline',
            lastSync: Date.now()
        };
        return device;
    }
    return null;
};

export const unpairDevice = () => {
    device = null;
    return true;
};

export const getSettings = () => settings;

export const updateSettings = (newSettings: Partial<UserSettings>) => {
    settings = { ...settings, ...newSettings };
    return settings;
};

export const getPairingCode = () => {
    // If no code, expired, or used, generate new one
    if (!currentPairingCode || Date.now() > currentPairingCode.expiresAt || currentPairingCode.used) {
        return generatePairingCode();
    }
    return currentPairingCode;
};

export const generatePairingCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    currentPairingCode = {
        code,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
        used: false
    };
    return currentPairingCode;
};

export const markCodeAsUsed = (code: string) => {
    if (currentPairingCode && currentPairingCode.code === code) {
        currentPairingCode.used = true;
        return true;
    }
    return false;
};
