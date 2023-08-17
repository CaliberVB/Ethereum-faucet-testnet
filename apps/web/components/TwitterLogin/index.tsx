import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { LoadingButton } from '../Button';

export const TwitterLogin = () => {
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn('twitter');
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', paddingTop: '10px' }}
    >
      <LoadingButton
        onClick={handleLogin}
        sx={{
          ':hover': {
            bgcolor: '#39a1f2',
          },
        }}
        fullWidth
      >
        <span>Login with Twitter</span>
        <Image
          src={'/assets/images/svg/twitter.svg'}
          alt="Twitter Logo"
          width={20}
          height={20}
          style={{ marginLeft: '8px', marginRight: '3px' }}
        />
      </LoadingButton>
    </div>
  );
};
