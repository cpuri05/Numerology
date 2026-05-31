// Local Storage Manager for Numerology Profiles
class ProfileStorage {
    constructor() {
        this.STORAGE_KEY = 'numerology_profiles';
        this.MAX_PROFILES = 100;
    }

    // Generate unique ID
    _generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Get all profiles
    getAllProfiles() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading profiles:', error);
            return [];
        }
    }

    // Save a new profile
    saveProfile(profileData) {
        try {
            const profiles = this.getAllProfiles();
            
            // Check limit
            if (profiles.length >= this.MAX_PROFILES) {
                return { success: false, error: 'Maximum profile limit reached' };
            }

            const newProfile = {
                id: this._generateId(),
                name: profileData.name,
                dob: profileData.dob,
                category: profileData.category,
                text: profileData.text,
                results: {
                    basicNumber: profileData.basicNumber,
                    luckyNumbers: profileData.luckyNumbers,
                    vibration: profileData.vibration,
                    suitability: profileData.suitability,
                    suitabilityCode: profileData.suitabilityCode
                },
                createdAt: new Date().toISOString(),
                notes: profileData.notes || ''
            };

            profiles.unshift(newProfile); // Add to beginning
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
            
            return { success: true, profile: newProfile };
        } catch (error) {
            console.error('Error saving profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Get profile by ID
    getProfile(id) {
        const profiles = this.getAllProfiles();
        return profiles.find(p => p.id === id);
    }

    // Delete profile by ID
    deleteProfile(id) {
        try {
            const profiles = this.getAllProfiles();
            const filtered = profiles.filter(p => p.id !== id);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            return { success: true };
        } catch (error) {
            console.error('Error deleting profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Update profile
    updateProfile(id, updates) {
        try {
            const profiles = this.getAllProfiles();
            const index = profiles.findIndex(p => p.id === id);
            
            if (index === -1) {
                return { success: false, error: 'Profile not found' };
            }

            profiles[index] = { ...profiles[index], ...updates };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
            
            return { success: true, profile: profiles[index] };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, error: error.message };
        }
    }

    // Clear all profiles
    clearAll() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return { success: true };
        } catch (error) {
            console.error('Error clearing profiles:', error);
            return { success: false, error: error.message };
        }
    }

    // Search profiles by name
    searchProfiles(query) {
        const profiles = this.getAllProfiles();
        const lowerQuery = query.toLowerCase();
        return profiles.filter(p => 
            p.name.toLowerCase().includes(lowerQuery) ||
            p.text.toLowerCase().includes(lowerQuery)
        );
    }

    // Get profile count
    getCount() {
        return this.getAllProfiles().length;
    }
}
