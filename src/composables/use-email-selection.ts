import { reactive } from "vue";
import axios from "axios";
import { IEmail } from "../types/email";

const emailSet: Set<IEmail> = new Set();

type voidFunc = () => void;

export const useEmailSelection = function (): {
  emails: Set<IEmail>;
  clear: voidFunc;
  toggle: (id: IEmail) => void;
  addMultiple: (newEmails: IEmail[]) => void;
  markRead: voidFunc;
  markUnread: voidFunc;
  archive: voidFunc;
  moveToInbox: voidFunc;
} {
  const emails: Set<IEmail> = reactive(emailSet);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const forSelected = (fn: Function) => {
    emails.forEach((email: IEmail) => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    });
  };
  const clear = () => {
    emails.clear();
  };
  const toggle = (id: IEmail) => {
    if (emails.has(id)) {
      emails.delete(id);
    } else {
      emails.add(id);
    }
  };
  const addMultiple = (newEmails: IEmail[]) => {
    newEmails.forEach((email) => {
      emails.add(email);
    });
  };
  const markRead = () => {
    forSelected((e: IEmail) => (e.read = true));
  };
  const markUnread = () => {
    forSelected((e: IEmail) => (e.read = false));
  };
  const archive = () => {
    forSelected((e: IEmail) => (e.archived = true));
    clear();
  };
  const moveToInbox = () => {
    forSelected((e: IEmail) => (e.archived = false));
    clear();
  };

  return {
    emails,
    clear,
    toggle,
    addMultiple,
    markRead,
    markUnread,
    archive,
    moveToInbox,
  };
};
