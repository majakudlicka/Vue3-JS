<template>
  <table class="mail-table">
    <tbody>
      <tr v-for="email in emails"
          :key="email.id"
          :class="[email.read ? 'read': '', 'clickable']">
        <td>
          <input type="checkbox"
                 :checked="emailSelection.emails.has(email)"
                 @click="emailSelection.toggle(email)"/>
        </td>
        <td @click="openEmail(email)">{{ email.from }}</td>
        <td @click="openEmail(email)">
          <p><strong>{{ email.subject }}</strong> - {{ email.body }}</p>
        </td>
        <td @click="openEmail(email)" class="date">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
        <td>
          <button @click="archiveEmail(email)">Archive</button>
        </td>
      </tr>
    </tbody>
  </table>

  <ModalView v-if="openedEmail" :closeModal="() => { openedEmail = null; }">
    <MailView :email="openedEmail"
              :changeEmail="(args) => changeEmail(openedEmail, args)"/>
  </ModalView>
</template>

<script>
import {format} from 'date-fns';
import MailView from '@/components/MailView.vue';
import ModalView from '@/components/ModalView.vue';
import {useEmailSelection} from '@/composables/use-email-selection';
import axios from 'axios';

export default {
  async setup() {
    return {
      format,
      openedEmail: null,
      emailSelection: useEmailSelection()
    }
  },
  components: {
    MailView,
    ModalView,
  },
  methods: {
    openEmail(email) {
      this.openedEmail = email;
      if (email) {
        email.read = true
        axios.put(`http://localhost:3000/emails/${email.id}`, email)
      }
    },
    archiveEmail(email) {
      email.archived = true;
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    },
    changeEmail(email, { indexChange, toggleArchive, toggleRead, save, closeModal }) {
      if (toggleArchive) {
        email.archived = !email.archived
      }
      if (toggleRead) {
        email.read = !email.read
      }
      if (save) {
        axios.put(`http://localhost:3000/emails/${email.id}`, email)
      }
      if (closeModal) {
        this.openedEmail = null;
        return null;
      }
      if (indexChange) {
        const index = this.emails.findIndex(e => e === email);
        this.openEmail(this.emails[index + indexChange])
      }
    }
  },
  props: {
    emails: {
      type: Array,
      required: true
    }
  }
}
</script>
