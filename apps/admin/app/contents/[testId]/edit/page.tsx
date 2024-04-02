import MbtiTestForm from '@/containers/MbtiTestForm';

export default async function Page({ params }: { params: { testId: string } }) {
  return <MbtiTestForm title="Edit Content" testId={params.testId} />;
}
