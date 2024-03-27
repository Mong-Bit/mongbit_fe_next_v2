import TestFormTemplate from '@/components/layout/TestFormTemplate';


export default async function Page({ params }: { params: { testId: string } }) {
  return <TestFormTemplate title="Edit Content" testId={params.testId} />;
}
