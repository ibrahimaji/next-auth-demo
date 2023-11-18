import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();
  console.log(userId)
  if (userId) {
    redirect('/dashboard'); // if there is userid, it will redirected to /dashboard
  }
  return (
    <main className='p-24'>
      <h1>Next.js auth tutorial</h1>
    </main>
  )
}
