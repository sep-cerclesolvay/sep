import Page from 'components/Page';
import { useState, VFC } from 'react';
import { useFormik } from 'formik';
import { IonInput, IonItem, IonLabel, IonNote, IonSpinner } from '@ionic/react';
import classes from './Login.module.scss';
import * as yup from 'yup';
import { loginUser } from 'api/loginUser';
import FormSubmitButton from 'components/FormSubmitButton';
import Message from 'components/Message';
import { useAppDispatch } from 'redux/hooks';
import { login } from 'redux/userSlice';

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required('Le nom est requis'),
  password: yup.string().required('Mot de passe requis'),
});

const Login: VFC = () => {
  const initialValues: LoginFormValues = { username: '', password: '' };
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const dispatch = useAppDispatch();
  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await loginUser(values.username, values.password);
        setErrors(undefined);
        dispatch(login(result));
      } catch (e) {
        setErrors('Utilisateur ou mot de passe incorrect');
        console.error(e);
      }
    },
  });
  return (
    <Page title="Connexion">
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.logo_container}>
          <img src="/assets/icon/icon.png" alt="logo" />
        </div>
        {errors && (
          <Message color="danger" onDismiss={() => setErrors(undefined)}>
            {errors}
          </Message>
        )}
        <IonItem>
          <IonLabel position="stacked">Nom</IonLabel>
          <IonInput type="text" name="username" value={formik.values.username} onIonChange={formik.handleChange} />
        </IonItem>
        {formik.touched.username && Boolean(formik.errors.username) && (
          <IonNote color="danger">{formik.touched.username && formik.errors.username}</IonNote>
        )}
        <IonItem>
          <IonLabel position="stacked">Mot de passe</IonLabel>
          <IonInput type="password" name="password" value={formik.values.password} onIonChange={formik.handleChange} />
        </IonItem>
        {formik.touched.password && Boolean(formik.errors.password) && (
          <IonNote color="danger">{formik.touched.password && formik.errors.password}</IonNote>
        )}
        <FormSubmitButton disabled={formik.isSubmitting} expand="block">
          {formik.isSubmitting ? <IonSpinner /> : 'Se connecter'}
        </FormSubmitButton>
      </form>
    </Page>
  );
};

export default Login;
