'use server';

import { cookies } from 'next/headers';
import { getIronSession, IronSession } from 'iron-session';
import ironOption from './ironOption';
import { IronSessionData } from '@/types/user';

export async function getSession(): Promise<IronSession<IronSessionData>> {
    const session = await getIronSession(cookies(), ironOption);
    return session;
};