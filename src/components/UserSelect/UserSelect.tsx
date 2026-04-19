import { useState } from 'react';
import { UserProfile } from '../../types/models';
import { storageService } from '../../services/StorageService';

interface UserSelectProps {
  onSelectUser: (username: string) => void;
}

export default function UserSelect({ onSelectUser }: UserSelectProps) {
  const [users, setUsers] = useState<UserProfile[]>(() => storageService.getUsers());
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    if (name.length < 2) { setError('Name must be at least 2 characters'); return; }
    if (name.length > 20) { setError('Name must be 20 characters or less'); return; }
    if (users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
      setError('That name is already taken');
      return;
    }
    storageService.createUser(name);
    onSelectUser(name);
  };

  const handleDelete = (username: string) => {
    storageService.deleteUser(username);
    setUsers(storageService.getUsers());
    setConfirmDelete(null);
  };

  const sorted = [...users].sort((a, b) => b.lastActiveAt - a.lastActiveAt);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/img/kling.png" alt="Qapla'" className="w-32 h-32 mx-auto mb-4 object-contain" />
          <h1 className="text-5xl font-bold text-text-primary klingon-text">Qapla'</h1>
          <p className="text-text-secondary mt-1">tlhIngan Hol yIghoj!</p>
        </div>

        {/* Existing users */}
        {sorted.length > 0 && (
          <div className="mb-6">
            <p className="text-text-secondary text-sm mb-3">Choose your warrior:</p>
            <div className="space-y-2">
              {sorted.map(user => (
                <div key={user.username} className="flex items-center gap-2">
                  {confirmDelete === user.username ? (
                    <div className="flex-1 flex items-center gap-2 rounded-lg border border-red-500 border-opacity-50 px-4 py-3 bg-red-500 bg-opacity-10">
                      <span className="text-text-primary text-sm flex-1">Delete {user.username}?</span>
                      <button
                        onClick={() => handleDelete(user.username)}
                        className="text-red-400 text-sm font-semibold hover:text-red-300"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="text-text-secondary text-sm hover:text-text-primary"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => onSelectUser(user.username)}
                        className="flex-1 flex items-center justify-between rounded-lg border-2 border-opacity-40 px-4 py-3 text-left transition-all hover:border-opacity-80 hover:scale-[1.01]"
                        style={{ borderColor: '#f97316', backgroundColor: '#f9731610' }}
                      >
                        <span className="text-text-primary font-semibold">{user.username}</span>
                        <span className="text-text-secondary text-xs">
                          {new Date(user.lastActiveAt).toLocaleDateString()}
                        </span>
                      </button>
                      <button
                        onClick={() => setConfirmDelete(user.username)}
                        className="p-2 text-text-secondary hover:text-red-400 transition-colors rounded-lg"
                        aria-label={`Delete ${user.username}`}
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create new */}
        <div>
          <p className="text-text-secondary text-sm mb-3">
            {sorted.length === 0 ? 'Enter your warrior name:' : 'Or create a new warrior:'}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={e => { setNewName(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="Your name..."
              maxLength={20}
              className="flex-1 px-4 py-3 rounded-lg bg-bg-end border-2 border-text-secondary border-opacity-30 text-text-primary placeholder-text-secondary focus:outline-none focus:border-opacity-60 focus:border-orange-400"
            />
            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="px-5 py-3 rounded-lg font-bold text-white transition-all disabled:opacity-40"
              style={{ backgroundColor: '#f97316' }}
            >
              Go
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
