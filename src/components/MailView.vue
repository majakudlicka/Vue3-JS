<template>
  <div class="email-display">
    <div class="toolbar">
      <button @click="toggleArchive">{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</button>
      <button @click="toggleRead">{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
      <button @click="goNewer">Newer (k)</button>
      <button @click="goOlder">Older (j)</button>
    </div>

    <h2 class="mb-0">Subject: <strong>{{ email.subject }}</strong></h2>
    <div><em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em></div>
    <div v-html="marked(email.body)"/>
  </div>
</template>

<script>
import {format} from 'date-fns';
import marked from 'marked';
import {useKeydown} from '../composables/use-keydown';

export default {
  setup(props) {
    const toggleArchive = () => props.changeEmail({ toggleArchive: true, save: true, closeModal: true })
    const toggleRead = () => props.changeEmail({ toggleRead: true, save: true })
    const goNewer = () => props.changeEmail({ indexChange: -1 })
    const goOlder = () => props.changeEmail({ indexChange: 1 })
    const goNewerAndArchive = () => props.changeEmail({ indexChange: -1, toggleArchive: true })
    const goOlderAndArchive = () => props.changeEmail({ indexChange: 1, toggleArchive: true })
    useKeydown([
      { key: 'e', fn: toggleArchive },
      { key: 'r', fn: toggleRead },
      { key: 'k', fn: goNewer },
      { key: 'j', fn: goOlder },
      { key: '[', fn: goNewerAndArchive },
      { key: ']', fn: goOlderAndArchive }
    ])
    return {
      format,
      marked,
      goOlder,
      goNewer,
      toggleRead,
      toggleArchive
    }
  },
  props: {
    email: {
      type: Object,
      required: true
    },
    changeEmail: {
      type: Function,
      required: true
    }
  }
}
</script>
