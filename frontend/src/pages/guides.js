import GuidesList from '../components/guide/GuidesList';

// render props vs high order components

const Guides = (props) => {
  return (
    <div>
      <GuidesList />
    </div>
  );
};

export default Guides;
