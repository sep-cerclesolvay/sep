import { useRef, useReducer, FC } from 'react';
import classes from './Info.module.scss';
import { informationCircleOutline, informationCircleSharp } from 'ionicons/icons';
import { IonAlert, IonIcon } from '@ionic/react';

interface InfoProps {
  infos?: string;
}

function reducer(state: { clicked: boolean }, action: { type: string; payload: boolean }) {
  const newState = { ...state };
  switch (action.type) {
    case 'click':
      newState.clicked = action.payload;
      break;
    default:
      throw new Error();
  }
  return newState;
}

const Info: FC<InfoProps> = ({ infos, children }) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [state, dispatch] = useReducer(reducer, { clicked: false });

  const handleClick = () => {
    dispatch({ type: 'click', payload: !state.clicked });
  };

  const handleClickAway = () => {
    dispatch({ type: 'click', payload: false });
  };

  return (
    <div className={classes.container}>
      {children}
      <button className={classes.info_button} ref={ref} onClick={handleClick} type="button">
        <IonIcon md={informationCircleOutline} ios={informationCircleSharp} />
      </button>
      <IonAlert
        isOpen={state.clicked}
        onDidDismiss={() => {
          handleClickAway;
        }}
        message={infos}
        buttons={[
          {
            text: 'Fermer',
          },
        ]}
      />
    </div>
  );
};

export default Info;
