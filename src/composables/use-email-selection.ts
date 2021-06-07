import { reactive } from 'vue';
import axios from 'axios';
import { IEmail} from "@/types/email";

const emailSet = new Set()

export const useEmailSelection = function(){
  const emails = reactive(emailSet)

  const forSelected = (fn: Function) => {
    emails.forEach((email: any) => {
      fn(email)
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  }
  const clear = () => {
    emails.clear();
  }
  const toggle = (id: string) => {
    if(emails.has(id)) {
      emails.delete(id)
    } else {
      emails.add(id);
    }
  }
  const addMultiple = (newEmails: IEmail[]) => {
    newEmails.forEach(email => {
      emails.add(email)
    })
  }
  const markRead = () => { forSelected((e: IEmail ) => e.read = true )}
  const markUnread = () => { forSelected((e: IEmail) => e.read = false )}
  const archive = () => { forSelected((e: IEmail) => e.archived = true); clear();}
  const moveToInbox = () => { forSelected((e: IEmail)=> e.archived = false); clear();}

  return {
    emails,
    clear,
    toggle,
    addMultiple,
    markRead,
    markUnread,
    archive,
    moveToInbox
  }
}

export default useEmailSelection;
