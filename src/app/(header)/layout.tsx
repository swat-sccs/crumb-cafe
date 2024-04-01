import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import { config } from '@/app/lib/auth';
import BottomNavigation from '@/app/components/bottomBar';
import { getServerSession } from 'next-auth/next';

export default async function SideBar({ children }: { children: React.ReactNode }) {
  //const { data: session, status } = useSession();
  //const handler = NextAuth(config);
  const session: any = await getServerSession(config);

  if (session) {
    return (
      <section>
        <BottomNavigation></BottomNavigation>
        <Container>{children}</Container>
      </section>
    );
  }
  redirect('/');
}

/*Old

<Grid container>
        <Grid
          item
          xs={1}
          sm={1}
          md={1}
          lg={1}
          xl={1}
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: '' }}
        >
          <Navigation></Navigation>
        </Grid>

        <Grid
        item
        xs={10}
        sm={10}
        md={10}
        lg={10}
        xl={10}
        justifyContent="flex-start"
        alignItems="center"
        sx={{ backgroundColor: '' }}
      >
        {children}
      </Grid>

      </Grid>

    */
