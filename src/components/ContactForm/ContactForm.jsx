import { useState } from 'react';
import { selectContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { addContact } from 'redux/operation';
import Notiflix from 'notiflix';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clickBtn, setClickBtn] = useState(false);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  // Функція додавання контакту
  const handleAddContact = contact => {
    const finalContacts = {
      createdAt: new Date().toISOString(),
      ...contact,
      id: nanoid(),
    };

    // Перевірка на наявніть контакту у збережених
    const hasRepeateContact = contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (hasRepeateContact) {
      alert(`${contact.name} is already in contacts!`);
    } else {
      dispatch(addContact(finalContacts));
      setName('');
      setPhone('');
      Notiflix.Notify.info(`Contact ${contact.name} is added!`, {
        position: 'right-center',
        timeout: 3000,
      });
    }
    setTimeout(() => setClickBtn(false), 1000);
  };

  // Функція обробки подіі сабміту форми
  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      name,
      phone,
    };
    setClickBtn(true);
    handleAddContact(contact);
  };

  return (
    <form className={css.contact_form_cont} onSubmit={handleSubmit}>
      <label>
        <p className={css.contact_form_cont_text}>Name</p>
        <input
          className={css.contact_form_inp}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          onChange={event => setName(event.target.value)}
          value={name}
        />
      </label>

      <label>
        <p className={css.contact_form_cont_text}>Phone</p>
        <input
          className={css.contact_form_inp}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone"
          onChange={event => setPhone(event.target.value)}
          value={phone}
        />
      </label>
      <button type="submit" className={css.contact_form_btn}>
        {!clickBtn ? 'Add contact' : <Loader className="spinner" />}
      </button>
    </form>
  );
};

export default ContactForm;
