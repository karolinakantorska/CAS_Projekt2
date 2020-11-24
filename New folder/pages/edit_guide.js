import EditGuide from '../components/guide/EditGuide';

const edit_guide = (props) => (
  <div>
    <p>Add new MTB Guide</p>
    <EditGuide id={props.query.id} />
  </div>
);

export default edit_guide;
