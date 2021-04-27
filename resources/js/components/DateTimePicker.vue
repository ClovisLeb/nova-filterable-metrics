<script>
import DateTimePicker from "@/components/DateTimePicker";
export default {
  extends: DateTimePicker,
  props: {
    mode: {
      type: String,
      default: "single"
    }
  },

  mounted() {
    try {
      this.$parent.filter.mode ? (this.mode = this.$parent.filter.mode) : "";
    } catch (e) {}

    if (this.mode == "range") {
      this.placeholder = "Choisissez une période";
    }

    this.$nextTick(() => {
      this.flatpickr = flatpickr(this.$refs.datePicker, {
        enableTime: this.enableTime,
        enableSeconds: this.enableSeconds,
        onClose: this.onChange,
        // onChange: this.onChange,
        dateFormat: this.dateFormat,
        allowInput: true,
        // static: true,
        time_24hr: !this.twelveHourTime,
        locale: { firstDayOfWeek: this.firstDayOfWeek },
        mode: this.mode
      });
    });
  },

  methods: {
    onChange(event) {
        console.log("flatpicker onChange");
    },
  },

  watch: {
    value: function (newValue, oldValue) {
          console.log("flapicker value watcher triggered1: ", newValue);
      if (this.flatpickr) {
          console.log("flapicker value watcher triggered2: ", newValue);
        this.flatpickr.setDate(newValue)
      }
    },
  },
};
</script>
