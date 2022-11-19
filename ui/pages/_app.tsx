import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import dynamic from 'next/dynamic';

const ProgressBar = dynamic(() => import('../components/ProgressBar'), { ssr: false });

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
	<SessionProvider session={session}>
		<Component {...pageProps} />
		<ProgressBar />
	</SessionProvider>
  )
}
