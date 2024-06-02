import './posts-section.css';
import { Post } from '../Post/Post';

export const PostsSection = () => {
  return (
    <div className="posts">
      <Post
        name="Java Developer"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="React Developer"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="Python Developer"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="Assistant"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
      <Post
        name="Scrum Master"
        description="Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. "
        wage={11}
        hours={10}
        location="brno"
      />
    </div>
  );
};
