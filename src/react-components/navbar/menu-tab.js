import {useHistory} from 'react-router-dom';

export const MenuTab = ({path, children}) => {
  const history = useHistory();
  const link = (path) => {
    history.push(path);
  };

  return(
      <div className="menu-box" onClick={() => {link(path)}}>
        <div className="defaultText">
          {children}
        </div>
      </div>
  );
};
