import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operation';
import { selectIsLoading, selectError } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  // Запуск рендера за допомогою useEffect
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.app_cont}>
      <h1 className={css.app_cont_title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.app_cont_subtitle}>Contacts</h2>
      <Filter />
      {isLoading && !error}
      <ContactList />
    </div>
  );
};
