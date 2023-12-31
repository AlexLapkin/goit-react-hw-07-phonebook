import { selectFilteredContacts } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operation';
import css from './ContactList.module.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contacts_cont}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li className={css.contacts_item} key={id}>
          {name}: {phone}
          <button
            className={css.contacts_item_btn}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
