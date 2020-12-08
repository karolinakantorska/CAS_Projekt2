import EditGuide from '../components/guide/EditGuide';

const edit_guide = (props) => (
  <div>
    <EditGuide id={props.query.id} />
  </div>
);

export default edit_guide;
