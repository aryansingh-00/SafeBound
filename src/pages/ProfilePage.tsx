import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../components/profile-page/ProfileHeader';
import { ProfileSidebar, ProfileTabId } from '../components/profile-page/ProfileSidebar';
import { PersonalInfo } from '../components/profile-page/PersonalInfo';
import { TravellerList } from '../components/profile-page/TravellerList';
import { TravelPreferences } from '../components/profile-page/TravelPreferences';
import { AIPersonalization } from '../components/profile-page/AIPersonalization';
import { SavedPlaces } from '../components/profile-page/SavedPlaces';
import { SavedPlans } from '../components/profile-page/SavedPlans';
import { NotificationSettings } from '../components/profile-page/NotificationSettings';
import { LanguageCurrency } from '../components/profile-page/LanguageCurrency';
import { PrivacySecurity } from '../components/profile-page/PrivacySecurity';
import { 
  DEFAULT_USER_PROFILE, 
  INITIAL_SAVED_TRAVELLERS, 
  INITIAL_USER_PREFERENCES,
  INITIAL_SAVED_DESTINATIONS,
  INITIAL_SAVED_PLANS,
  UserProfileData,
  SavedTraveller,
  UserPreferences,
  SavedDestinationItem,
  SavedTripPlanItem
} from '../data/profileData';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState<UserProfileData>(DEFAULT_USER_PROFILE);
  const [travellers, setTravellers] = useState<SavedTraveller[]>(INITIAL_SAVED_TRAVELLERS);
  const [preferences, setPreferences] = useState<UserPreferences>(INITIAL_USER_PREFERENCES);
  const [savedDestinations, setSavedDestinations] = useState<SavedDestinationItem[]>(INITIAL_SAVED_DESTINATIONS);
  const [savedPlans, setSavedPlans] = useState<SavedTripPlanItem[]>(INITIAL_SAVED_PLANS);

  const [activeTab, setActiveTab] = useState<ProfileTabId>('personal-info');

  const handleRemoveSavedDestination = (id: string) => {
    setSavedDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDeleteSavedPlan = (id: string) => {
    setSavedPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-[#FBFBFE] min-h-screen py-8 sm:py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 1. Profile Hero with Completeness Indicator */}
        <ProfileHeader
          user={userProfile}
          onCompleteProfile={() => setActiveTab('personal-info')}
        />

        {/* 2. Main 2-Column Responsive Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <ProfileSidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
            />
          </div>

          {/* Right Column: Active Tab Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {activeTab === 'personal-info' && (
              <PersonalInfo
                user={userProfile}
                onSave={setUserProfile}
              />
            )}

            {activeTab === 'travellers' && (
              <TravellerList
                travellers={travellers}
                onSaveTravellers={setTravellers}
              />
            )}

            {activeTab === 'travel-preferences' && (
              <div className="space-y-8">
                <TravelPreferences
                  preferences={preferences}
                  onSavePreferences={setPreferences}
                />
                <AIPersonalization
                  onUpdatePreferences={() => {}}
                />
              </div>
            )}

            {activeTab === 'saved-places' && (
              <SavedPlaces
                destinations={savedDestinations}
                onRemove={handleRemoveSavedDestination}
              />
            )}

            {activeTab === 'saved-plans' && (
              <SavedPlans
                plans={savedPlans}
                onDeletePlan={handleDeleteSavedPlan}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationSettings />
            )}

            {activeTab === 'language-currency' && (
              <LanguageCurrency />
            )}

            {activeTab === 'privacy-security' && (
              <PrivacySecurity />
            )}

          </div>

        </div>

        {/* Bottom Call to Action */}
        <section className="text-center py-12 space-y-4 max-w-2xl mx-auto border-t border-slate-200/80 pt-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ready for a smarter trip?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            SafeBound applies your saved preferences and traveller details to instantly build customized travel packages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/plan-trip')}
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>✨ Plan My Trip</span>
            </button>

            <button
              onClick={() => navigate('/ai-chat')}
              className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-brand-600" />
              <span>🤖 Chat with SafeBound AI</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
