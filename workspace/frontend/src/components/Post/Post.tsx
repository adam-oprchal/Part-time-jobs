import './post.css';
import { Button } from '../Button/Button';

interface PostProps {
  description: string;
  wage: number;
  location: string;
  hours: number;
  className?: string;
}

export const Post = ({
  description,
  wage,
  location,
  hours,
  className,
}: PostProps) => {
  const cName = className === undefined ? '' : className;

  return (
    <div className={`post ${cName}`}>
      <div className="post__description">{description}</div>
      <div className="post__numbers">
        <p>${wage}/hr</p>
        <p>{hours} hr/week</p>
      </div>
      <div className="post__location">{location}</div>
      <Button label="Apply" className="post__button" />
    </div>
  );
};
