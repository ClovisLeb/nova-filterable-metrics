<template>
  <modal class="modal" tabindex="-1" role="dialog">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden w-action-fields">
      <div>
        <heading
          :level="2"
          class="border-b border-40 py-8 px-8 text-90 font-normal text-xl"
        >Filtration "{{ title }}"</heading>

        <div class="py-6 action">
          <div v-if="ranges && ranges.length > 0" class="flex border-b border-40">
            <div class="w-1/5 px-8 py-6">
              <label
                for="nova-time-range"
                class="inline-block text-80 pt-2 leading-tight"
              >Time Range</label>
            </div>
            <div class="py-6 px-8 w-1/2">
              <select
                id="nova-time-range"
                v-if="ranges.length > 0"
                @change="handleChange(null,$event)"
                class="w-full form-control form-select"
              >
                <option
                  v-for="option in ranges"
                  :key="option.value"
                  :value="option.value"
                  :selected="selectedRangeKey == option.value"
                >{{ option.label }}</option>
              </select>
            </div>
          </div>
          <div v-for="filter in filters" :key="filter.value" class="flex border-b border-40">
            <div class="w-1/5 px-8 py-6">
              <label
                :for="filter.name"
                class="inline-block text-80 pt-2 leading-tight"
              >{{ filter.name + " " + selectedFilters[filter.class]}}</label>
            </div>
            <div class="py-6 px-8 w-1/2">
              <date-time-picker
                :id="filter.name"
                :mode="filter.mode"
                v-if="filter.component.includes('date')"
                class="w-full form-control form-input form-input-bordered"
                dusk="date-filter"
                name="date-filter"
                autocomplete="off"
                :value="selectedFilters[filter.class]"
                dateFormat="Y-m-d H:i:s"
                :placeholder="placeholder"
                :enable-time="filter.enableTime"
                :enable-seconds="filter.enableSeconds"
                :first-day-of-week="firstDayOfWeek"
                @input.prevent
                @change="handleChange(filter, $event)"
              />
              <input
                :id="filter.name"
                :class="inputClasses(filter.component)"
                v-else-if="filter.component !== 'select-filter'"
                @change="handleChange(filter, $event)"
                :type="filter.component"
                :checked="selectedFilters[filter.class] === 1"
                :value="selectedFilters[filter.class]"
              />
              <select
                :id="filter.name"
                v-if="filter.component === 'select-filter'"
                @change="handleChange(filter, $event)"
                class="w-full form-control form-select"
              >
                <option
                  v-for="option in filter.options"
                  :key="option.value"
                  :value="option.value"
                  :selected="option.value == selectedFilters[filter.class]"
                >{{ option.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-30 px-6 py-3 flex">
        <div class="flex items-center ml-auto">
          <button @click.prevent="closeModal" type="submit" class="btn btn-default btn-primary">
            <span>Sauvegarder</span>
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  props: ["title", "ranges", "filters", "selectedRangeKey", "selectedFilters"],

 created() {
      console.log("created");
    },

   mounted() {
      console.log("mounted");
        console.log(this);
        console.log(this.filters);
        console.log(this.selectedFilters);
        this.filters.forEach(filter => {
            console.log("filter x: ");
            console.log(filter);
            console.log(filter.class);
            console.log(this.selectedFilters[filter.class])
        });
    },

  methods: {
    inputClasses(inputType) {
      if (inputType !== "checkbox") {
        return "w-full form-control form-input form-input-bordered";
      }
    },

    closeModal() {
      this.$emit("closeModal");
    },

    handleChange(filter, event) {
        console.log("filter: ", filter);
      if (filter === null) {
        this.$emit("selected", event.target.value);
        this.$toasted.show("Période filtrée", {
          type: "success"
        });
        return;
      }
      let selected;
      if (filter.component.includes("date")) {
        selected = event;
        console.log("datepicker val", selected);
        this.flatpickr.setDate(selected);
      } else {
        selected = event.target.value;
      }

      if (filter.component === "boolean-filter") {
        selected = event.target.checked ? 1 : 0;
      }

      if (selected !== "") {
        this.$emit("selected", {
          filter,
          selected
        });
        this.$toasted.show(filter.name + " filtré(e)", {
          type: "success"
        });
      }
    }
  }
};
</script>
