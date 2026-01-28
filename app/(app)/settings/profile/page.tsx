'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditIcon, Loader2Icon, UserIcon } from 'lucide-react';

import {
  ProfileFormValues,
  profileSchema,
} from '@/features/settings/profile/schemas/profile-form';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/shared/components/ui/input-group';
import { cn } from '@/shared/lib/utils';
import { ProfileImageUploader } from '@/features/settings/profile/components/ProfileImageUploader';
import { useGetMyProfile } from '@/features/my-profile/hooks/useGetMyProfile';
import { useUpdateMyProfile } from '@/features/my-profile/hooks/useUpdateMyProfile';

export default function SettingsProfilePage() {
  const { data } = useGetMyProfile();
  const { mutate: updateMyProfile } = useUpdateMyProfile();

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: ProfileFormValues) => {
    console.log('제출 데이터:', data);
    // API 통신 로직...

    updateMyProfile({
      nickname: data.nickname,
      profileImageUrl: data.profileImageUrl,
    });
  };

  return (
    <Card className='animate-in fade-in slide-in-from-bottom-2 duration-500 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors rounded-2xl'>
      <CardHeader className='border-b border-border dark:border-slate-800 dark:bg-slate-900'>
        <div className='flex items-center gap-x-2'>
          <UserIcon className='w-5 h-5 text-brand-500 stroke-[2.5px]' />
          <CardTitle className='text-lg font-bold'>프로필 설정</CardTitle>
        </div>
        <CardDescription className='text-muted-foreground'>
          서비스에서 사용되는 프로필 정보를 관리합니다.
        </CardDescription>
      </CardHeader>

      <CardContent className='p-6 md:p-8 bg-white dark:bg-slate-900'>
        <FormProvider {...methods}>
          <form
            id='profile-form'
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col md:flex-row gap-8'
          >
            {/* 프로필 이미지 섹션 */}
            <ProfileImageUploader />

            {/* 입력 필드 섹션 */}
            <div className='flex-1'>
              <div className='flex flex-col gap-y-6'>
                <div className='space-y-2'>
                  <Label
                    htmlFor='nickname'
                    className='text-sm font-bold text-slate-700 dark:text-slate-300 ml-1'
                  >
                    닉네임
                  </Label>
                  <InputGroup
                    className={cn(
                      'group transition-all duration-200',
                      'focus-within:border-primary! focus-within:ring-4! focus-within:ring-brand-500/20!',
                    )}
                  >
                    <InputGroupAddon>
                      <UserIcon className='w-4 h-4 stroke-3 text-slate-400 transition-colors group-focus-within:text-brand-500' />
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder='닉네임을 입력하세요.'
                      id='nickname'
                      {...register('nickname')}
                    />
                  </InputGroup>
                  {errors.nickname && (
                    <p className='text-xs font-medium text-red-500 ml-1'>
                      {errors.nickname.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </CardContent>

      <CardFooter className='p-6 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex justify-end'>
        <Button
          size='lg'
          variant='default'
          form='profile-form' // form id와 연결하여 Footer 밖의 form 제출 가능
          type='submit'
          disabled={isSubmitting}
          className='font-bold'
        >
          {isSubmitting ? (
            <Loader2Icon className='w-4 h-4 animate-spin' />
          ) : (
            <EditIcon className='w-4 h-4' />
          )}
          수정하기
        </Button>
      </CardFooter>
    </Card>
  );
}
