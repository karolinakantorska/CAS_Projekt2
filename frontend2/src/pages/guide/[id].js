import OneGuide from '../../components/guide/OneGuide';

export default function guide({query}) {
  console.log('query', query);
  return <OneGuide guideId={query.id} />;
}

