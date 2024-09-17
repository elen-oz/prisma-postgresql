'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="flex items-center justify-between p-4 bg-gray-100">
            <div className="flex space-x-4">
                <Link href="/" className={`font-bold ${isActive('/') ? 'text-gray-500' : ''}`}>
                    Feed
                </Link>
                {session && (
                    <Link href="/drafts" className={isActive('/drafts') ? 'text-gray-500' : ''}>
                        My drafts
                    </Link>
                )}
            </div>
            <div>
                {status === 'loading' && <p>Validating session ...</p>}
                {!session && (
                    <Link href="/api/auth/signin" className="border border-black px-4 py-2 rounded">
                        Log in
                    </Link>
                )}
                {session && (
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">
                            {session.user?.name} ({session.user?.email})
                        </p>
                        <Link href="/create" className="border border-black px-4 py-2 rounded">
                            New post
                        </Link>
                        <button onClick={() => signOut()} className="border border-black px-4 py-2 rounded">
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;