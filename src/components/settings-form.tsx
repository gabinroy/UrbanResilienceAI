'use client';

import { useTransition } from 'react';
import { useUser } from '@/firebase';
import {
  deleteUserAccount,
} from '@/app/actions';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

export function SettingsForm() {
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleting, startDeleteTransition] = useTransition();

  async function handleDeleteAccount() {
    startDeleteTransition(async () => {
        const result = await deleteUserAccount();
        if (result.error) {
            toast({
                variant: 'destructive',
                title: 'Error Deleting Account',
                description: result.error,
            });
        } else {
            toast({
                title: 'Account Deleted',
                description: 'Your account has been permanently deleted.',
            });
            router.push('/login');
        }
    });
  }


  return (
    <div className="grid gap-8">      
      <Card className="border-destructive">
         <CardHeader>
          <CardTitle className="font-headline text-lg text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeleting}>
                        <Trash className="mr-2" />
                        {isDeleting ? 'Deleting...' : 'Delete My Account'}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
