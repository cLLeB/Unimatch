import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import UserInformation from '../components/UserInformation';
import AcademicInformation from '../components/AcademicInformation';
import { EditProfileButton, LogOutButton } from '../components/ProfileActions';
import SettingsCard from '../components/SettingsCard';
import SavedPrograms from '../components/SavedPrograms';
import ApplicationProgress from '../components/ApplicationProgress';
import { currentUser } from '../data/universityData';
import {
  studentDetails,
  savedProgrammes as initialSavedProgrammes,
  applicationChecklist,
} from '../data/profileData';

export default function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [savedProgrammes, setSavedProgrammes] = useState(initialSavedProgrammes);
  const [checklist, setChecklist] = useState(applicationChecklist);

  const handleRemoveProgramme = (id: string) => {
    setSavedProgrammes((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar user={currentUser} />

      <div className="flex">
        <Sidebar active="profile" />

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10">
          <ProfileHeader />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <UserInformation student={studentDetails} />
                <div className="mt-5 border-t border-slate-100 pt-5">
                  <AcademicInformation student={studentDetails} />
                </div>
                <EditProfileButton onEditProfile={() => console.log('Edit profile clicked')} />
              </div>

              <SettingsCard darkMode={darkMode} onDarkModeChange={setDarkMode} />

              <LogOutButton onLogOut={() => console.log('Log out clicked')} />
            </div>

            <div className="flex flex-col gap-6 lg:col-span-2">
              <SavedPrograms
                programmes={savedProgrammes}
                onRemove={handleRemoveProgramme}
                onAddProgramme={() => console.log('Add programme clicked')}
              />
              <ApplicationProgress items={checklist} onToggleItem={handleToggleChecklistItem} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
