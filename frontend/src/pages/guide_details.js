import OneGuide from '../components/guide/OneGuide';

const GuideDetails = ({ query }) => {
  return <OneGuide guideId={query.guideId} />;
};

export default GuideDetails;
