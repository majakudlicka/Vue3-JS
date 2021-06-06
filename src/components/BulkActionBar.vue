<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="allAreSelected"
        :class="[partialSelection ? 'partial-check' : '']"
        @click="bulkSelect"
      />
    </span>

    <span class="buttons">
      <button
        @click="emailSelection.markRead()"
        :disabled="Array.from(emailSelection.emails).every((e) => e.read)"
      >
        Mark Read
      </button>
      <button
        @click="emailSelection.markUnread()"
        :disabled="Array.from(emailSelection.emails).every((e) => !e.read)"
      >
        Mark Unread
      </button>
      <button
        v-if="selectedScreen === 'inbox'"
        @click="emailSelection.archive()"
        :disabled="numberSelected === 0"
      >
        Archive
      </button>
      <button
        v-else
        @click="emailSelection.moveToInbox()"
        :disabled="numberSelected === 0"
      >
        Move to Inbox
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useEmailSelection } from "../composables/use-email-selection";
import { computed } from "vue";
import { IEmail } from "../types/email";

export default defineComponent({
  setup(props) {
    const emailSelection = useEmailSelection();
    const numberSelected = computed(() => {
      return emailSelection.emails.size;
    });
    const allAreSelected = computed(() => {
      return (
        props.emails.length === numberSelected.value &&
        numberSelected.value !== 0
      );
    });
    const partialSelection = computed(() => {
      return numberSelected.value > 0 && !allAreSelected.value;
    });

    const bulkSelect = function () {
      if (allAreSelected.value) {
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    };
    return {
      partialSelection,
      allAreSelected,
      bulkSelect,
      emailSelection,
      numberSelected,
    };
  },
  props: {
    emails: {
      type: Array as PropType<IEmail[]>,
      required: true,
    },
    selectedScreen: {
      type: String,
      required: true,
    },
  },
});
</script>
