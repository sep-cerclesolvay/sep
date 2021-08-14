import { VFC } from 'react';
import classes from './RequiredAsterisk.module.scss';

const RequiredAsterisk: VFC = () => {
  return <span className={`${classes.required_asterisk}`}>*</span>;
};

export default RequiredAsterisk;
