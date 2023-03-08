import { useEffect, useState } from 'react';
import './ExcalidrawEmbed.css';
import Excalidraw from 'excalidraw';
import InitialData from './initialData';

import 'excalidraw/dist/excalidraw.min.css';
import './styles.css';

function ExcalidrawEmbed(): JSX.Element {
  const onChange = (elements, state) => {
    console.log('Elements :', elements, 'State : ', state);
  };

  const onUsernameChange = (username) => {
    console.log('current username', username);
  };
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { width, height } = dimensions;
  const options = { zenModeEnabled: true, viewBackgroundColor: '#AFEEEE' };
  return (
    <div className="excalidraw-wrapper">
      <Excalidraw
        width={width}
        height={height}
        initialData={InitialData}
        onChange={onChange}
        user={{ name: 'Excalidraw User' }}
        onUsernameChange={onUsernameChange}
        options={options}
      />
    </div>
  );
}

export default ExcalidrawEmbed;
