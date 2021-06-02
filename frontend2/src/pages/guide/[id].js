import OneGuide from '../../components/guide/OneGuide';

export default function guide({query}) {
  return <OneGuide guideId={query.id} />;
}

