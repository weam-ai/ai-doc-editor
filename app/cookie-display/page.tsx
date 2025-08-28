import { cookies } from 'next/headers';
import { getSession } from '../config/withSession';

export default async function CookieDisplayPage() {
  // Get the weam cookie using Next.js cookies
  const cookieStore = cookies();
  const weamCookie = cookieStore.get('weam');
  
  // Console log the cookie (this will appear in your server logs)
  console.log('Weam cookie on server:', weamCookie);

  const session = await getSession();
    console.log('Session:', session);
    if (session.user) {
        return <div>Welcome, {session.user.email}!</div>;
    }
    
    return <div>Please log in</div>;
}