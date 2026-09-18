import { redirect } from 'next/navigation';

export default function HelpDirectoryRedirect() {
  redirect('/health');
}
