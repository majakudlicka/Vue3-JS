<template>
  <button @click="selectScreen('inbox');"
          :class="[selectedScreen === 'inbox' ? 'selected' : '']">
    Inbox View
  </button>
  <button @click="selectScreen('archive')"
          :class="[selectedScreen === 'archive' ? 'selected' : '']">
    Archived View
  </button>

  <h1>VMail {{ capitalize(selectedScreen) }}</h1>

  <BulkActionBar :emails="filteredEmails"
                 :selectedScreen="selectedScreen"/>

  <MailTable :emails="filteredEmails"/>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import MailTable from '@/components/MailTable.vue';
import BulkActionBar from '@/components/BulkActionBar.vue';
import {useEmailSelection} from '@/composables/use-email-selection';

export default {
  async setup() {
    const response = await axios.get('http://localhost:3000/emails');
    const emails = response.data;
    const selectedScreen = 'inbox';
    return {
      emails,
      selectedScreen,
      emailSelection: useEmailSelection()
    }
  },
  components: {
    BulkActionBar,
    MailTable
  },
  methods: {
    selectScreen(newScreen) {
      this.selectedScreen = newScreen;
      this.emailSelection.clear();
    },
    capitalize(word) {
      if (!word || !word.length) {
        return;
      }
      return word[0].toUpperCase() + word.slice(1)
    }
  },
  computed: {
    sortedEmails() {
      return _.sortBy(this.emails, 'sentAt');
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(e => !e.archived)
    },
    archivedEmails() {
      return this.sortedEmails.filter(e => e.archived)
    },
    filteredEmails() {
      const filters = {
        inbox: this.unarchivedEmails,
        archive: this.archivedEmails
      }
      return filters[this.selectedScreen]
    }
  }
}
</script>
