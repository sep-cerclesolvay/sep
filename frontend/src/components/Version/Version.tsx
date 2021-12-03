import { useToast } from '@agney/ir-toast';
import environment from 'environment';
import { closeOutline, closeSharp } from 'ionicons/icons';
import { VFC } from 'react';
import classes from './Version.module.scss';

const Version: VFC = () => {
  const version = `v${environment.VERSION_NUMBER}`;
  const commit = `Commit SHA: ${environment.VERSION_GIT_SHA}`;

  const Toast = useToast();

  const handleClick = () => {
    Toast.create({
      message: commit,
      color: 'medium',
      duration: undefined,
      buttons: [
        {
          role: 'dismiss',
          icon: {
            md: closeSharp,
            ios: closeOutline,
          },
        },
      ],
    }).present();
  };

  return (
    <span className={classes.version} title={commit} onClick={handleClick}>
      {version}
    </span>
  );
};

export default Version;
