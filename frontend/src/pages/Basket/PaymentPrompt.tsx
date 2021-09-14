import { IonAlert } from '@ionic/react';
import { VFC } from 'react';
import { selectBasket, setPaymentMethod } from 'redux/basketSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { usePaymentMethods } from 'redux/paymentMethodSlice';

export interface PaymentPromptProps {
  open: boolean;
  onDidDismiss?: () => void;
  onDidFinish: () => void;
}

const PaymentPrompt: VFC<PaymentPromptProps> = ({ open, onDidDismiss, onDidFinish }) => {
  const dispatch = useAppDispatch();
  const paymentMethods = usePaymentMethods();
  const basket = useAppSelector(selectBasket);

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={onDidDismiss}
      header={'Payment'}
      subHeader={paymentMethods.data ? 'Indiquez comment le client vous a payé' : 'Chargement...'}
      inputs={paymentMethods.data?.map((paymentMethod) => ({
        name: 'paymentMethod',
        type: 'radio',
        label: paymentMethod.name,
        value: paymentMethod.id,
        checked: basket.data?.editable.payment_method?.id === paymentMethod.id,
      }))}
      buttons={[
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Terminer',
          handler: (value) => {
            if (paymentMethods.data) {
              const paymentMethod = paymentMethods.data.find((paymentMethod) => paymentMethod.id === value);
              if (paymentMethod) {
                dispatch(setPaymentMethod(paymentMethod));
                onDidFinish();
              }
            } else {
              return false;
            }
          },
        },
      ]}
    />
  );
};

export default PaymentPrompt;
