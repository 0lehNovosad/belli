'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export function LogoutLink() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push('/account/login');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      <span>🚪</span>
      Вийти
    </button>
  );
}
