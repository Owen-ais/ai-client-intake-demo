import './globals.css';

export const metadata = {
  title: 'AI Client Intake Demo',
  description: 'A simple AI automation demo for client intake summaries and follow-up email drafts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
