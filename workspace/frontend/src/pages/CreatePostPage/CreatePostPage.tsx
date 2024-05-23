import './createPostPage.css';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';
import { TextArea } from '../../components/TextArea/TextArea';

export const CreatePostPage = () => {
  return (
    <div className="createPostPage">
      <div className="createPostPage__box">
        <h1 className="createPostPage__header">Create offer</h1>

        <TextArea placeholder="description"></TextArea>
        <TextInput placeholder="$/hr"></TextInput>
        <TextInput placeholder="hr/week"></TextInput>
        <TextInput placeholder="location"></TextInput>

        <Button label="Enter"></Button>

        <Link to="/jobs">
          <Button label="Go back"></Button>
        </Link>
      </div>
    </div>
  );
};
