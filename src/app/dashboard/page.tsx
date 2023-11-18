import { getXataClient } from '@/xata'
import React from 'react'
import FolderForm from './FolderForm';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const schema = z.object({
  name: z.string().min(5)
})

export default async function DashboardPage() {
  const { userId } = auth();
  const xataClient = getXataClient();
  if (!userId) {
    redirect('/');
  }
  const folders = await xataClient.db.folders.filter({
    userId
  }).getMany();
  async function createFolder(formData: FormData) {
    'use server';
    const parsedForm = schema.parse({
      name: formData.get('name')
    });
    if (!userId) {
      return;
    }
    const newRecord = { ...parsedForm, userId }
    const xataClient = getXataClient();
    await xataClient.db.folders.create(newRecord);
    // displaying the record to the browser
    revalidatePath('/')
  }
  return (
    <div>
      <h1 className='mb-4'>dashboard page</h1>
      <FolderForm handleCreateFolder={createFolder} />
      <div className='mb-10'>
        {folders.map((folder) => (
          <p key={folder.id}>{folder.name}</p>
        ))}
      </div>
    </div>
  )
}
